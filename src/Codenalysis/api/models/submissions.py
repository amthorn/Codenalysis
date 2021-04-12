import datetime

from . import Base, BaseMixin
from sqlalchemy import Column, Integer, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.ext.hybrid import hybrid_property
from core.s3 import S3Client
from core.lambda_client import LambdaClient
from models.runs import RunModel
from . import db
from typing import Any


class SubmissionModel(Base, BaseMixin):
    __tablename__ = 'submissions'
    serialize_rules = ('-challenge',)

    ##########
    # FIELDS #
    ##########

    challengeId = Column(Integer, ForeignKey('challenges.id'), nullable=False)
    # TODO: user id

    # Relationships
    challenge = relationship('ChallengeModel', backref='submissions')

    @property
    def script_path(self) -> str:
        return f'challenges/{self.challenge.id}/submissions/{self.id}.script'

    @hybrid_property
    def script(self) -> str:
        # Returns s3 file stream
        obj = S3Client().get_object(Key=self.script_path)
        if 'Body' in obj:
            return obj['Body'].read().decode()
        else:
            return ''

    @script.setter
    def script(self, value: str) -> dict[str, Any]:
        # Upload to s3
        self.updated_at = datetime.datetime.utcnow()
        return S3Client().upload_file(value, self.script_path)

    def run(self) -> RunModel:
        # Create run object
        model = RunModel()
        self.runs.append(model)
        db.session.add(model)
        db.session.commit()

        # Run lambda function
        LambdaClient().run(
            payload={
                'runId': model.id,
                'tests': [i.to_dict() for i in self.challenge.testcases],
                's3ObjectKey': self.script_path
            }
        )
        return model
