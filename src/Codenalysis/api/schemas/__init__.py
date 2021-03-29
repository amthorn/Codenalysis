import flask
import functools
from marshmallow_sqlalchemy import SQLAlchemySchema
from marshmallow import fields


def validate(schema_object, location='json'):
    # Use 'json' for body
    # Use 'args' for query args
    def decorator(f):
        @functools.wraps(f)
        def closure(*args, **kwargs):
            # Let it error so error handler catches it
            return f(*args, **kwargs, **schema_object.load(getattr(flask.request, location, {})))
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
    project_id = fields.Integer(required=True)
