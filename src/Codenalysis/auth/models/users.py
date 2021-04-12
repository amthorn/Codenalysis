import hashlib
from . import Base, BaseMixin
from sqlalchemy import Column, String
from sqlalchemy.ext.hybrid import hybrid_property


class UserModel(Base, BaseMixin):
    __tablename__ = 'users'
    serialize_rules = ('-passwordHash', '-password')  # '-api_key_hash')

    ##########
    # FIELDS #
    ##########

    firstName = Column(String(64), nullable=False)
    lastName = Column(String(64), nullable=False)
    username = Column(String(32), unique=True, nullable=False)
    passwordHash = Column(String(512), nullable=False)
    email = Column(String(64), unique=True, nullable=False)

    @hybrid_property
    def password(self):
        return self.passwordHash

    @password.setter
    def password(self, plaintextPassword):
        self.passwordHash = self._hash(plaintextPassword)

    def _hash(self, value):
        return hashlib.sha3_512(value.encode(), usedforsecurity=True).hexdigest()

    @hybrid_property
    def api_key(self):
        return self.api_key_hash

    @api_key.setter
    def api_key(self, plaintext_api_key):
        self.api_key_hash = hashlib.sha3_512(
            plaintext_api_key.encode(),
            usedforsecurity=True
        ).hexdigest()
