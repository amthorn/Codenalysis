from models.submissions import SubmissionModel
from marshmallow import validate, fields
from marshmallow_sqlalchemy import SQLAlchemySchema, auto_field


class SubmissionSchema(SQLAlchemySchema):
    class Meta:
        model = SubmissionModel

    id = auto_field(dump_only=True)
    script = fields.String(
        length=64000,
        required=True,
        validate=validate.Length(
            min=20,
            max=64000,
            error="Submission script length cannot be less than 20 characters "
                  "and cannot exceed 64,000"
        ),
        error_messages={
            'required': 'The script is required!',
        }
    )
    challengeId = auto_field(required=True)
