from . import BaseModel
from pynamodb.attributes import UnicodeAttribute


class Project(BaseModel):
	class Meta(BaseModel.Meta):
		table_name = 'project'
	id = UnicodeAttribute(hash_key=True)
	name = UnicodeAttribute(range_key=True)