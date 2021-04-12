import json

from typing import Any, Callable
from . import Base, BaseMixin
from sqlalchemy import Column, Integer, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.ext.hybrid import hybrid_property
from core.s3 import S3Client


class RunModel(Base, BaseMixin):
    __tablename__ = 'runs'
    serialize_rules = ('-submission', 'results')
    parseMap = [
        {'name': 'integer', 'class': int},
        {'name': 'boolean', 'class': bool},
        {'name': 'string', 'class': str}
    ]

    ##########
    # FIELDS #
    ##########

    submissionId = Column(Integer, ForeignKey('submissions.id'), nullable=False)
    # TODO: user id

    # Relationships
    submission = relationship('SubmissionModel', backref='runs')

    @property
    def resultPath(self) -> str:
        return f'{self.submission.script_path[:-7]}/{self.id}_result.json'

    @hybrid_property
    def results(self) -> dict[str, dict[str, Any]]:
        # Returns s3 file stream
        try:
            obj = S3Client().get_object(Key=self.resultPath)
            if 'Body' in obj:
                return self.parseResults(json.loads(obj['Body'].read().decode()).get('body', []))
        except Exception as e:
            print(e)

    def parseType(self, value: Any, _type: str) -> Any:
        return [i for i in self.parseMap if i['name'] == _type][0]['class'](value)

    def getTypeName(self, _class: Callable[Any, Any]) -> str:
        return [i for i in self.parseMap if i['class'] == _class][0]['name']

    def parseResults(self, results: dict[str, dict[str, Any]]) -> dict[str, dict[str, Any]]:
        for key, result in results.items():
            result['actualOutputType'] = self.getTypeName(type(result['actualOutput']))
            result['passed'] = self.parseType(
                result['output'], result['outputType']) == result['actualOutput']
        return self.hideResults(results)

    def hideResults(self, results: dict[str, dict[str, Any]]) -> dict[str, dict[str, Any]]:
        numberOfSecretTests = self.submission.challenge.NUMBER_OF_SECRET_TESTS
        return {
            i: results[i]
            for key, i in enumerate(results)
            if key < len(results) - numberOfSecretTests
        }
