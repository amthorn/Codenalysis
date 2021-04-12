from v1 import v1
from models import db
from models.submissions import SubmissionModel
from schemas.submissions import SubmissionSchema
from schemas import validate, ChallengeIdSchema
from flask_restplus import Resource, Namespace
from typing import Any

ns = Namespace(name="submissions", api=v1)


@ns.route('/<int:submissionId>')
class SubmissionApi(Resource):
    def get(self, submissionId: int) -> dict[str, list]:
        obj = SubmissionModel.query.get_or_404(submissionId)
        return {'data': [{**obj.to_dict(), 'script': obj.script}]}

    @validate(SubmissionSchema())
    def put(self, submissionId: int, **kwargs: dict[str, Any]) -> dict[str, list]:
        script = kwargs.pop('script')
        data = SubmissionModel.query.get_or_404(submissionId)
        data.script = script
        return {
            'data': [data.to_dict()],
            'message': {'text': 'Updated Submission Successfully!', 'priority': 'success'}
        }


@ns.route('/<int:submissionId>/run')
class SubmissionRunApi(Resource):
    def post(self, submissionId: int, **kwargs: dict[str, Any]) -> dict[str, list]:
        return {
            'data': [SubmissionModel.query.get_or_404(submissionId).run().to_dict()],
            'message': {'text': 'Submission Ran Successfully!', 'priority': 'success'}
        }


@ns.route('/')
class SubmissionsApi(Resource):
    @validate(ChallengeIdSchema(), location='args')
    def get(self, challengeId: int) -> dict[str, list]:
        # TODO:
        return {'data': [
            i.to_dict()
            for i in SubmissionModel.query.filter_by(challengeId=challengeId).all()
        ]}

    @validate(SubmissionSchema())
    def post(self, **kwargs: dict[str, Any]) -> dict[str, list]:
        script = kwargs.pop('script')
        data = SubmissionModel(**kwargs)
        db.session.add(data)
        db.session.commit()
        data.script = script
        return {
            'data': [data.to_dict()],
            'message': {'text': 'Created Submission Successfully!', 'priority': 'success'}
        }
