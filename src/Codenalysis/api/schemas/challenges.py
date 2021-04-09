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
    hint = auto_field(required=False)
    difficulty = auto_field(
        required=True,
        # TODO add enum validation
        error_messages={
            'required': 'The challenge description is required!',
        }
    )
    giveUpAllowed = auto_field(
        required=True,
        error_messages={
            'required': 'The challenge description is required!',
        }
    )
    attemptsBeforeGiveUpAllowed = auto_field(
        required=False,
        default=0
    )
    projectId = auto_field(required=True)
