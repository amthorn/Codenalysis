from flask import jsonify
from v1 import v1
from models.project import Project
from schemas.project import ProjectSchema
from schemas import validate


@v1.route('/projects/<uuid:project_id>')
def get_project(project_id):
    return jsonify(dict(Project.get(str(project_id))))


@v1.route('/projects')
def get_projects():
    return jsonify({'data': [dict(i) for i in Project.scan(limit=50)]})


@v1.route('/projects', methods=['POST'])
@validate(ProjectSchema())
def create_project(**kwargs):
    data = Project(**kwargs)
    data.save()
    return jsonify({
        'data': dict(data),
        'message': {'text': 'Posted Successfully!!', 'priority': 'success'}
    })
