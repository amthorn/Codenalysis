from v1 import v1
from models import db
from models.testcases import TestcaseModel
from schemas.testcases import TestcaseSchema
from schemas import validate, ChallengeIdSchema
from flask_restplus import Resource, Namespace
from typing import Any

ns = Namespace(name="testcases", api=v1)


@ns.route('/<int:testcaseId>')
class TestcaseApi(Resource):
    def get(self, testcaseId: int) -> dict[str, list]:
        return {'data': [TestcaseModel.query.get_or_404(testcaseId).to_dict(rules=('challenge',))]}


@ns.route('/')
class TestcasesApi(Resource):
    @validate(ChallengeIdSchema(), location='args')
    def get(self, challengeId: int) -> dict[str, list]:
        # TODO:
        return {'data': [
            i.to_dict(rules=('challenge',))
            for i in TestcaseModel.query.filter_by(challengeId=challengeId).all()
        ]}

    @validate(TestcaseSchema(many=True))
    def post(self, *args: list[dict[str, Any]], **kwargs: dict[str, Any]) -> dict[str, list]:
        ids = []
        for testcase in args:
            data = TestcaseModel(**testcase)
            db.session.add(data)
            db.session.commit()
            ids.append(data.id)

        return {
            'data': ids,
            'message': {'text': 'Posted Successfully!!', 'priority': 'success'}
        }
