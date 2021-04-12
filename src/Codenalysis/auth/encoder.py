import datetime

import jwt
from werkzeug.exceptions import Unauthorized

from app import app
from blacklist_handler import BlacklistHandler


class JWTEncoder(jwt.api_jwt.PyJWT):
    # 1 day if active
    expiration = {'days': 1, 'seconds': 0}

    def encode(self, userId: int, algorithm: str = 'HS512') -> str:
        now = datetime.datetime.utcnow()
        expr = now + datetime.timedelta(**self.expiration)
        token = super().encode({
            'exp': int(expr.timestamp()),
            'iat': int(now.timestamp()),
            'sub': userId,
        }, app.config.get('SECRET_KEY'))
        return token

    def decode(self, authToken: str) -> str:
        try:
            # TODO: Why do these hashes have to be different??
            token = super().decode(authToken, app.config.get('SECRET_KEY'), algorithms=['HS256'])

            if BlacklistHandler().exists(authToken):
                raise jwt.InvalidTokenError

            return token
        except jwt.ExpiredSignatureError:
            raise Unauthorized('Signature expired. Please log in again.')
        except jwt.InvalidTokenError:
            raise Unauthorized('Invalid token. Please log in again.')
