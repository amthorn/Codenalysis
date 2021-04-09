from v1 import v1
from models import db
from models.runs import RunModel
from schemas import validate, SubmissionIdSchema
from flask_restplus import Resource, Namespace

ns = Namespace(name="runs", api=v1)


@ns.route('/<int:runId>')
class RunApi(Resource):
    def get(self, runId):
        return {'data': [RunModel.query.get_or_404(runId).to_dict(rules=('submission',))]}


@ns.route('/')
class RunsApi(Resource):
    @validate(SubmissionIdSchema(), location='args')
    def get(self, submissionId):
        return {'data': [
            i.to_dict()
            for i in RunModel.query.filter_by(submissionId=submissionId).all()
        ]}
