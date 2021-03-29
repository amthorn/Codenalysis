from . import Base, BaseMixin
from sqlalchemy import Column, Integer, String, Text, ForeignKey
from sqlalchemy.orm import relationship


class ChallengeModel(Base, BaseMixin):
    __tablename__ = 'challenges'
    serialize_rules = ('-project',)

    ##########
    # FIELDS #
    ##########

    id = Column(Integer, primary_key=True)
    name = Column(String(255), nullable=False)
    description = Column(Text, nullable=False)
    project_id = Column(Integer, ForeignKey('projects.id'), nullable=False)

    # Relationships
    project = relationship('ProjectModel', backref='challenges')
