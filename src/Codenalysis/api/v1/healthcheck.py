import requests
from models import db
from v1 import v1
from flask_restplus import Resource, Namespace

ns = Namespace(name="healthcheck", api=v1)


@ns.route('/')
class HealthCheckApi(Resource):
    def get(self):
        # Hit front end
        try:
            if requests.get('http://web:3000/').ok:
                web = 'OK'
        except Exception:
            web = 'NOT OK'

        # Hit nginx
        try:
            if requests.get('http://nginx:80/').ok:
                nginx = 'OK'
        except Exception:
            nginx = 'NOT OK'

        return {
            'data': [{
                'api': 'OK',
                'db': ('OK' if db.session.execute('SELECT 1') else 'NOT OK'),
                'web': web,
                'nginx': nginx
            }]
        }
