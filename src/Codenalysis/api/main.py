import flask
import json
import marshmallow
import pprint
import werkzeug
import traceback
from app import app


##########
# MODELS #
##########
from models import init_db

##########
#  APIS  #
##########
from v1 import v1

init_db()


@v1.errorhandler(Exception)
@app.errorhandler(Exception)
def handle_exception(e):
    return dump_data(e, flask.make_response(), {str(e.__class__.__name__): str(e)}, 500)


@v1.errorhandler(werkzeug.exceptions.HTTPException)
@app.errorhandler(werkzeug.exceptions.HTTPException)
def handle_http(e):
    return dump_data(e, e.get_response(), {e.name: e.description}, e.code)


@v1.errorhandler(marshmallow.exceptions.ValidationError)
@app.errorhandler(marshmallow.exceptions.ValidationError)
def handle_marshmallow(e):
    return dump_data(e, flask.make_response(), e.messages, 422)


def dump_data(e, response, data, code):
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


def dump_messages(data):
    messages = []
    for k, v in data.items():
        if isinstance(v, (tuple, list)) and len(v) > 0:
            messages += [f'{k}: {i}' for i in v]
        else:
            messages.append(f'{k}: {v}')
    return '\n'.join(messages)
