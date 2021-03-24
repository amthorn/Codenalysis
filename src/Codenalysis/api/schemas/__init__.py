import flask
import functools


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
