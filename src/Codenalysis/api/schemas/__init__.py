import flask
import functools
from marshmallow_sqlalchemy import SQLAlchemySchema
from marshmallow import fields, Schema
from typing import Callable, Any


def validate(
    schema_object: Schema,
    location: str = 'json'
) -> Callable[Callable[Any, Any], Callable[Any, Any]]:
    # Use 'json' for body
    # Use 'args' for query args
    def decorator(f: Callable[Any, Any]) -> Callable[Any, Any]:
        @functools.wraps(f)
        def closure(*args: list[Any], **kwargs: dict[Any]) -> Any:
            # Let it error so error handler catches it
            try:
                result = getattr(flask.request, location)
            except Exception:
                result = None

            parsed = schema_object.load(result or {})

            if isinstance(parsed, (list, tuple)):
                return f(*args, *parsed, **kwargs)
            else:
                return f(*args, **kwargs, **parsed)
        return closure
    return decorator


class Schema(SQLAlchemySchema):
    class Meta:
        # Raise errors for unknown values submitted
        unknown = 'RAISE'

        # Optional: deserialize to model instances
        # load_instance = True

        # Include relationships in schema validations
        # include_relationships = True

        # Include foreign keys in schema validation
        # include_fk = True


class ProjectIdSchema(Schema):
    projectId = fields.Integer(required=True)


class ChallengeIdSchema(Schema):
    challengeId = fields.Integer(required=True)


class SubmissionIdSchema(Schema):
    submissionId = fields.Integer(required=True)
