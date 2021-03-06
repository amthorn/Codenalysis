from v1 import v1
from models import db
from models.challenges import ChallengeModel
from schemas.challenges import ChallengeSchema
from schemas import validate, ProjectIdSchema
from flask_restplus import Resource, Namespace
from typing import Any

ns = Namespace(name="challenges", api=v1)


@ns.route('/<int:challengeId>')
class ChallengeApi(Resource):
    def get(self, challengeId: str) -> dict[str, list]:
        return {'data': [ChallengeModel.query.get_or_404(challengeId).to_dict(rules=('project',))]}


@ns.route('/')
class ChallengesApi(Resource):
    @validate(ProjectIdSchema(), location='args')
    def get(self, projectId: int) -> dict[str, list]:
        # TODO:
        return {'data': [
            i.to_dict(rules=('project',))
            for i in ChallengeModel.query.filter_by(projectId=projectId).all()
        ]}

    @validate(ChallengeSchema())
    def post(self, **kwargs: dict[str, Any]) -> dict[str, list]:
        data = ChallengeModel(**kwargs)
        db.session.add(data)
        db.session.commit()
        return {
            'data': [data.to_dict(rules=('project',))],
            'message': {'text': 'Posted Successfully!!', 'priority': 'success'}
        }
