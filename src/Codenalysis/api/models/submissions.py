import datetime

from . import Base, BaseMixin
from sqlalchemy import Column, Integer, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.ext.hybrid import hybrid_property
from core.s3 import S3Client
from core.lambda_client import LambdaClient
from models.runs import RunModel
from . import db


class SubmissionModel(Base, BaseMixin):
    __tablename__ = 'submissions'
    serialize_rules = ('-challenge',)

    ##########
    # FIELDS #
    ##########

    challenge_id = Column(Integer, ForeignKey('challenges.id'), nullable=False)
    # TODO: user id

    # Relationships
    challenge = relationship('ChallengeModel', backref='submissions')

    @property
    def script_path(self):
        return f'challenges/{self.challenge.id}/submissions/{self.id}'

    @hybrid_property
    def script(self):
        # Returns s3 file stream
        obj = S3Client().get_object(Key=self.script_path)
        if 'Body' in obj:
            return obj['Body'].read().decode()
        else:
            return ''

    @script.setter
    def script(self, value):
        # Upload to s3
        self.updated_at = datetime.datetime.utcnow()
        return S3Client().upload_file(
            value,
            f'challenges/{self.challenge.id}/submissions/{self.id}'
        )

    def run(self):
        # Create run object
        model = RunModel()
        self.runs.append(model)
        db.session.add(model)
        db.session.commit()

        # Run lambda function
        LambdaClient().run(
            payload={
                'runId': model.id,
                's3ObjectKey': self.script_path
            }
        )
        return model