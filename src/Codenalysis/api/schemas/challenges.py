from models.challenges import ChallengeModel
from marshmallow import validate
from marshmallow_sqlalchemy import SQLAlchemySchema, auto_field


class ChallengeSchema(SQLAlchemySchema):
    class Meta:
        model = ChallengeModel

    id = auto_field(dump_only=True)
    name = auto_field(
        required=True,
        validate=validate.Length(
            min=3,
            max=255,
            error="Challenge name must be at least 3 characters"
        ),
        error_messages={
            'required': 'The challenge name is required!',
        }
    )
    description = auto_field(
        required=True,
        validate=validate.Length(
            min=20,
            error="Challenge description must be at least 20 characters"
        ),
        error_messages={
            'required': 'The challenge description is required!',
        }
    )
    project_id = auto_field(required=True)
