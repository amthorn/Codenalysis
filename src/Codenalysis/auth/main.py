import flask
import os
import json
import marshmallow
import pprint
import werkzeug
import traceback
from app import app
from typing import Union

# Set configuration
app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY')
app.config['TOKEN_COOKIE_NAME'] = 'codenalysisToken'

##########
# MODELS #
##########
from models import init_db  # noqa

##########
#  APIS  #
##########
from api.v1 import v1  # noqa

init_db()


@v1.errorhandler(Exception)
@app.errorhandler(Exception)
def handle_exception(e: Exception) -> flask.Response:
    return dump_data(e, flask.make_response(), {str(e.__class__.__name__): str(e)}, 500)


@v1.errorhandler(werkzeug.exceptions.HTTPException)
@app.errorhandler(werkzeug.exceptions.HTTPException)
def handle_http(e: werkzeug.exceptions.HTTPException) -> flask.Response:
    return dump_data(e, e.get_response(), {e.name: e.description}, e.code)


@v1.errorhandler(werkzeug.exceptions.Unauthorized)
@app.errorhandler(werkzeug.exceptions.Unauthorized)
def handle_unauthorized(e: werkzeug.exceptions.Unauthorized) -> flask.Response:
    response = dump_data(e, e.get_response(), {e.name: e.description}, e.code)
    response.delete_cookie(app.config.get('TOKEN_COOKIE_NAME'))
    return response


@v1.errorhandler(marshmallow.exceptions.ValidationError)
@app.errorhandler(marshmallow.exceptions.ValidationError)
def handle_marshmallow(e: marshmallow.exceptions.ValidationError) -> flask.Response:
    return dump_data(e, flask.make_response(), e.messages, 422)


def dump_data(
    e: Exception,
    response: flask.Response,
    data: Union[list, dict],
    code: int
) -> flask.Response:
    message = dump_messages(data)

    response.data = json.dumps({
        "data": {
            "name": e.name if hasattr(e, 'name') else str(e.__class__.__name__),
            "description": e.description if hasattr(e, 'description') else '',
        },
        "message": {
            "raw": data,
            "text": message,
            "priority": "error"
        }
    })
    response.content_type = "application/json"
    response.status_code = code
    app.logger.debug(pprint.pformat(response.data))
    app.logger.debug(traceback.format_exc())
    app.logger.debug(app.url_map)
    return response


def dump_messages(data: dict) -> str:
    messages = []
    for k, v in data.items():
        if isinstance(v, (tuple, list)) and len(v) > 0:
            messages += [f'{k}: {i}' for i in v]
        else:
            messages.append(f'{k}: {v}')
    return '\n'.join(messages)
