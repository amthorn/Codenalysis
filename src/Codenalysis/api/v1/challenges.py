from v1 import v1
from models import db
from models.challenges import ChallengeModel
from schemas.challenges import ChallengeSchema
from schemas import validate, ProjectIdSchema
from flask_restplus import Resource, Namespace

ns = Namespace(name="challenges", api=v1)


@ns.route('/<int:challenge_id>')
class ChallengeApi(Resource):
    def get(self, challenge_id):
        return {'data': [ChallengeModel.query.get_or_404(challenge_id).to_dict(rules=('project',))]}


@ns.route('/')
class ChallengesApi(Resource):
    @validate(ProjectIdSchema(), location='args')
    def get(self, project_id):
        # TODO:
        return {'data': [
            i.to_dict(rules=('project',))
            for i in ChallengeModel.query.filter_by(project_id=project_id).all()
        ]}

    @validate(ChallengeSchema())
    def post(self, **kwargs):
        data = ChallengeModel(**kwargs)
        db.session.add(data)
        db.session.commit()
        return {
            'data': [data.to_dict(rules=('project',))],
            'message': {'text': 'Posted Successfully!!', 'priority': 'success'}
        }
