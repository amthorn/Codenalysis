from app import app
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import Column
from sqlalchemy.types import DateTime, Integer
from sqlalchemy.sql import func
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy_serializer import SerializerMixin

app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:root@db/codenalysis'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

# TODO: make config handling better
engine = db.create_engine(
    app.config['SQLALCHEMY_DATABASE_URI'],
    engine_opts={'convert_unicode': True}
)
db_session = db.scoped_session(db.sessionmaker(autocommit=False, autoflush=False, bind=engine))

Base = declarative_base(db.Model)
Base.query = db.session.query_property()

migrate = Migrate(app, db)

# version = VersionAttribute()
# created_at = UTCDateTimeAttribute(default=datetime.utcnow)
# updated_at = UTCDateTimeAttribute(default=datetime.utcnow)
# deleted_at = UTCDateTimeAttribute(null=True)


class TimestampMixin:
    created_at = Column(DateTime, default=func.now(), nullable=False)
    updated_at = Column(DateTime, default=func.now(), onupdate=func.now(), nullable=False)
    deleted_at = Column(DateTime, nullable=True)


class BaseMixin(SerializerMixin, TimestampMixin):
    id = Column(Integer, primary_key=True)


def init_db():
    from .users import UserModel  # noqa
    # alembic.migrate()
    # Base.metadata.create_all(bind=engine)
