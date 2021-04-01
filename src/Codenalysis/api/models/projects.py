from . import Base, BaseMixin
from sqlalchemy import Column, String


class ProjectModel(Base, BaseMixin):
    __tablename__ = 'projects'
    serialize_rules = ('-challenges',)

    ##########
    # FIELDS #
    ##########

    name = Column(String(255), nullable=False)
