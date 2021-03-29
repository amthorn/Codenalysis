import functools


class APIDecorator:
    def __init__(self, f):
        functools.update_wrapper(self, f)
        self.f = f

    def get_query_args(self):
        raise NotImplementedError()

    def operation(self):
        raise NotImplementedError()

    def __call__(self, *args, **kwargs):
        self.get_query_args()
        # Call function
        self.response = self.f(*args, **kwargs)

        # If the endpoint successfully returned and the data is json, save it.
        if 200 <= self.response.status_code < 300 and self.response.is_json:
            self.data = self.response.json['data']
        else:
            # Abort if non-200 code occurs
            return self.response

        return self.operation(*args, **kwargs)
