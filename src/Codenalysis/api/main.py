import flask
import json
import marshmallow
import werkzeug

from flask import Flask

app = Flask(__name__)

##########
# MODELS #
##########
from models import (  # noqa
    project
)

##########
#  APIS  #
##########
from v1 import (  # noqa
    v1,
    project
)

app.register_blueprint(v1)


@app.errorhandler(Exception)
def handle_exception(e):
    return dump_data(e, flask.make_response(), {str(e.__class__.__name__): str(e)}, 500)


@app.errorhandler(werkzeug.exceptions.HTTPException)
def handle_http(e):
    return dump_data(e, e.get_response(), {e.name: e.description}, e.code)


@app.errorhandler(marshmallow.exceptions.ValidationError)
def handle_marshmallow(e):
    return dump_data(e, flask.make_response(), e.messages, 422)


def dump_data(e, response, data, code):
    message = dump_messages(data)

    response.data = json.dumps({
        "data": {
            "name": e.name if hasattr(e, 'name') else str(e.__class__.__name__),
            "description": e.description if hasattr(e, 'description') else '',
            "raw": data
        },
        "message": {
            "text": message,
            "priority": "error"
        }
    })
    response.content_type = "application/json"
    response.status_code = code
    return response


def dump_messages(data):
    messages = []
    for k, v in data.items():
        if isinstance(v, (tuple, list)) and len(v) > 0:
            messages += [f'{k}: {i}' for i in v]
        else:
            messages.append(f'{k}: {v}')
    return '\n'.join(messages)


if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0', port=4000)
