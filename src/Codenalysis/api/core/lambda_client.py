import boto3
import json
from werkzeug.exceptions import BadGateway


class LambdaClient():
    LAMBDA_CONFIG = {
        'FunctionName': 'submission_runner',  # This is the entrypoint function
        'InvocationType': 'Event',  # This runs asynchronously
    }

    def __init__(self):
        self.client = boto3.client('lambda', region_name='us-east-2')

    def run(self, payload):
        try:
            return self.client.invoke(
                **self.LAMBDA_CONFIG,
                Payload=json.dumps(payload).encode()
            )
        except boto3.botocore.exceptions.ClientError as e:
            import pdb; pdb.set_trace()
            print()
            raise BadGateway("Lambda is not accessible right now. Please try again.")

    def get_object(self, *args, **kwargs):
        return self.client.get_object(*args, **kwargs, Bucket=self.bucket)
