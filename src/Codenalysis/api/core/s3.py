import boto3
import io
from typing import Any


class S3Client():
    BUCKET = 'codenalysis'

    def __init__(self) -> None:
        self.client = boto3.client('s3')
        GB = 1024 ** 3
        self.config = boto3.s3.transfer.TransferConfig(multipart_threshold=1 * GB)

    def upload_file(self, contents: str, key: str) -> dict[str, Any]:
        return self.client.upload_fileobj(
            io.BytesIO(contents.encode()),
            self.BUCKET,
            key,
            Config=self.config
        )

    def get_object(self, Key: str) -> dict[str, Any]:
        return self.client.get_object(Bucket=self.BUCKET)
