import boto3
import io


class S3Client():
    def __init__(self):
        self.bucket = 'codenalysis'
        self.client = boto3.client('s3')
        GB = 1024 ** 3
        self.config = boto3.s3.transfer.TransferConfig(multipart_threshold=1*GB)

    def upload_file(self, contents, key):
        return self.client.upload_fileobj(
            io.BytesIO(contents.encode()),
            self.bucket,
            key,
            Config=self.config
        )

    def get_object(self, *args, **kwargs):
        return self.client.get_object(*args, **kwargs, Bucket=self.bucket)
