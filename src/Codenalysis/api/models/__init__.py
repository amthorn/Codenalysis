import uuid

from datetime import datetime
from pynamodb.models import Model
from pynamodb.attributes import UTCDateTimeAttribute, VersionAttribute, MapAttribute

class BaseModel(Model):
    class Meta:
        read_capacity_units = 5
        write_capacity_units = 5
        region = 'us-east-2'

    version = VersionAttribute()
    created_at = UTCDateTimeAttribute(default=datetime.utcnow)
    updated_at = UTCDateTimeAttribute(default=datetime.utcnow)
    deleted_at = UTCDateTimeAttribute(null=True)

    def __init__(self, **kwargs):
        kwargs.pop('id', None)
        return super().__init__(str(uuid.uuid4()), **kwargs)

    def __iter__(self):
        for name, attr in self.get_attributes().items():
            value = getattr(self, name)
            yield name, attr.serialize(value) if value is not None else None

    def save(self, *args, **kwargs):
        self.updated_at = datetime.utcnow()
        return super().save(*args, **kwargs)

    def update(self, actions, *args, **kwargs):
        actions.append(self.__class__.updated_at.set(datetime.utcnow()))
        return super().update(actions, *args, **kwargs)

    def delete(self, *args, **kwargs):
        return super().update(actions=[
            self.__class__.deleted_at.set(datetime.utcnow())
        ], *args, **kwargs)