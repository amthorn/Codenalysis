from . import APIDecorator
from flask import request, jsonify


class Search(APIDecorator):
    QUERY_KEY = 'query'

    def get_query_args(self):
        self.query = request.args.get(self.QUERY_KEY, '')

    def operation(self, *args, **kwargs):
        matches = []
        for i in self.data:
            for k, v in i.items():
                if self.query.lower() in str(v).lower():
                    matches.append(i)
                    break
        return jsonify({
            **{k: v for k, v in self.response.json.items() if k != 'data'},
            'data': matches
        })
