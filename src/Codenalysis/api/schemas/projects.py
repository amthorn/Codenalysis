from . import Schema
from models.projects import ProjectModel
from marshmallow_sqlalchemy import auto_field
from marshmallow import validate


class ProjectSchema(Schema):
    class Meta:
        model = ProjectModel

    id = auto_field(dump_only=True)
    name = auto_field(
        required=True,
        validate=validate.Length(min=3, error="Project name must be at least 3 letters long"),
        error_messages={
            'required': 'The project name is required!',
        }
    )
