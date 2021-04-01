import datetime

from . import Base, BaseMixin
from sqlalchemy import Column, Integer, String, Text, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.ext.hybrid import hybrid_property
from core.s3 import S3Client


class RunModel(Base, BaseMixin):
    __tablename__ = 'runs'
    serialize_rules = ('-submission',)

    ##########
    # FIELDS #
    ##########

    submission_id = Column(Integer, ForeignKey('submissions.id'), nullable=False)
    # TODO: user id

    # Relationships
    submission = relationship('SubmissionModel', backref='runs')