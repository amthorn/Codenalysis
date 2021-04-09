from . import Base, BaseMixin
from sqlalchemy import Column, Integer, String, Text, ForeignKey, Boolean
from sqlalchemy.orm import relationship


class ChallengeModel(Base, BaseMixin):
    __tablename__ = 'challenges'
    serialize_rules = ('-project',)
    NUMBER_OF_SECRET_TESTS = 3

    ##########
    # FIELDS #
    ##########

    name = Column(String(255), nullable=False)
    description = Column(Text, nullable=False)
    hint = Column(Text)
    difficulty = Column(String(255), nullable=False)  # TODO make this an enum
    giveUpAllowed = Column(Boolean, nullable=False)
    attemptsBeforeGiveUpAllowed = Column(Integer, nullable=False, default=0)
    projectId = Column(Integer, ForeignKey('projects.id'), nullable=False)

    # Relationships
    project = relationship('ProjectModel', backref='challenges')
