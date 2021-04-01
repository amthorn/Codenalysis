from v1 import v1
from models import db
from models.submissions import SubmissionModel
from schemas.submissions import SubmissionSchema
from schemas import validate, ChallengeIdSchema
from flask_restplus import Resource, Namespace

ns = Namespace(name="submissions", api=v1)


@ns.route('/<int:submission_id>')
class SubmissionApi(Resource):
    def get(self, submission_id):
        obj = SubmissionModel.query.get_or_404(submission_id)
        return {'data': [{**obj.to_dict(), 'script': obj.script}]}

    @validate(SubmissionSchema())
    def put(self, submission_id, **kwargs):
        script = kwargs.pop('script')
        data = SubmissionModel.query.get_or_404(submission_id)
        data.script = script
        return {
            'data': [data.to_dict()],
            'message': {'text': 'Updated Submission Successfully!', 'priority': 'success'}
        }


@ns.route('/<int:submission_id>/run')
class SubmissionRunApi(Resource):
    def post(self, submission_id, **kwargs):
        return {
            'data': [SubmissionModel.query.get_or_404(submission_id).run().to_dict()],
            'message': {'text': 'Submission Ran Successfully!', 'priority': 'success'}
        }


@ns.route('/')
class SubmissionsApi(Resource):
    @validate(ChallengeIdSchema(), location='args')
    def get(self, challenge_id):
        # TODO:
        return {'data': [
            i.to_dict()
            for i in SubmissionModel.query.filter_by(challenge_id=challenge_id).all()
        ]}

    @validate(SubmissionSchema())
    def post(self, **kwargs):
        script = kwargs.pop('script')
        data = SubmissionModel(**kwargs)
        db.session.add(data)
        db.session.commit()
        data.script = script
        return {
            'data': [data.to_dict()],
            'message': {'text': 'Created Submission Successfully!', 'priority': 'success'}
        }
