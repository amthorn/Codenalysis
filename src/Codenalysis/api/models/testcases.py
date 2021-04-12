from . import Base, BaseMixin
from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship


class TestcaseModel(Base, BaseMixin):
    __tablename__ = 'testcases'
    serialize_rules = ('-challenge',)

    ##########
    # FIELDS #
    ##########

    input = Column(String(255), nullable=False)
    inputType = Column(String(255), nullable=False)  # TODO: make this enum
    output = Column(String(255), nullable=False)
    outputType = Column(String(255), nullable=False)  # TODO: make this enum
    challengeId = Column(Integer, ForeignKey('challenges.id'), nullable=False)

    # Relationships
    challenge = relationship('ChallengeModel', backref='testcases')
