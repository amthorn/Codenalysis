import boto3
import json
from typing import Any
from werkzeug.exceptions import BadGateway


class LambdaClient:
    LAMBDA_CONFIG: dict[str, str] = {
        'FunctionName': 'submission_runner',  # This is the entrypoint function
        'InvocationType': 'Event',  # This runs asynchronously
    }
    BUCKET: str = 'codenalysis'

    def __init__(self) -> None:
        self.client = boto3.client('lambda', region_name='us-east-2')

    def run(self, payload: dict[str, Any]) -> dict[str, Any]:
        try:
            return self.client.invoke(
                **self.LAMBDA_CONFIG,
                Payload=json.dumps(payload).encode()
            )
        except Exception:
            raise BadGateway("Lambda is not accessible right now. Please try again.")

    def get_object(self, *args: list[Any], **kwargs: dict[Any, Any]) -> dict[str, Any]:
        return self.client.get_object(*args, **kwargs, Bucket=LambdaClient.BUCKET)
