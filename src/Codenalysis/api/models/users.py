import hashlib
from . import Base, BaseMixin
from sqlalchemy import Column, String
from sqlalchemy.ext.hybrid import hybrid_property


class UserModel(Base, BaseMixin):
    __tablename__ = 'users'
    serialize_rules = ('-password_hash', '-api_key_hash')

    ##########
    # FIELDS #
    ##########

    first_name = Column(String(64), nullable=False)
    last_name = Column(String(64), nullable=False)
    username = Column(String(32), unique=True, nullable=False)
    password_hash = Column(String(64), nullable=False)
    email = Column(String(64), unique=True, nullable=False)
    api_key_hash = Column(String(64), nullable=True)

    @hybrid_property
    def password(self):
        return self.password_hash

    @password.setter
    def password(self, plaintext_password):
        self.password_hash = hashlib.sha3_512(
            plaintext_password.encode(),
            usedforsecurity=True
        ).hexdigest()

    @hybrid_property
    def api_key(self):
        return self.api_key_hash

    @api_key.setter
    def api_key(self, plaintext_api_key):
        self.api_key_hash = hashlib.sha3_512(
            plaintext_api_key.encode(),
            usedforsecurity=True
        ).hexdigest()
