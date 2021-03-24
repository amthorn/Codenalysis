from marshmallow import Schema, fields, validate


class ProjectSchema(Schema):
    id = fields.UUID(dump_only=True)
    name = fields.String(
        required=True,
        validate=validate.Length(min=3, error="Project name must be at least 3 letters long"),
        error_messages={
            'required': 'The project name is required!',
        }
    )
