from . import Base, BaseMixin
from sqlalchemy import Column, Integer, String


class ProjectModel(Base, BaseMixin):
    __tablename__ = 'projects'
    serialize_rules = ('-challenges',)

    ##########
    # FIELDS #
    ##########

    id = Column(Integer, primary_key=True)
    name = Column(String(255), nullable=False)
