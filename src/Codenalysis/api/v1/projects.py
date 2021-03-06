from v1 import v1
from models import db
from models.projects import ProjectModel
from schemas.projects import ProjectSchema
from schemas import validate
from flask_restplus import Resource, Namespace
from typing import Any

ns = Namespace(name="projects", api=v1)


@ns.route('/<int:projectId>')
class ProjectApi(Resource):
    def get(self, projectId: int) -> dict[str, list]:
        return {'data': [ProjectModel.query.get_or_404(projectId).to_dict()]}


@ns.route('/')
class ProjectsApi(Resource):
    def get(self) -> dict[str, list]:
        # TODO:
        return {'data': [i.to_dict() for i in ProjectModel.query.all()]}

    @validate(ProjectSchema())
    def post(self, **kwargs: dict[str, Any]) -> dict[str, Any]:
        data = ProjectModel(**kwargs)
        db.session.add(data)
        db.session.commit()
        return {
            'data': [data.to_dict()],
            'message': {'text': 'Posted Successfully!!', 'priority': 'success'}
        }
