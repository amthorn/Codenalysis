from app import app
from blacklist_handler import BlacklistHandler
from encoder import JWTEncoder
from flask import jsonify, request
from flask_restplus import Api, Resource
from marshmallow import Schema, fields
from marshmallow_sqlalchemy import SQLAlchemySchema, auto_field
from models import db
from models.users import UserModel
from werkzeug.exceptions import Conflict, Unauthorized
from typing import Union

v1 = Api(
    app,
    version='1.0',
    title='Codenalysis v1 auth service API',
    prefix='/api/v1/auth',
)


class LoginSchema(Schema):
    # TODO set password requirements
    password = fields.Str(required=True)
    username = fields.Str(required=True)


class UserSchema(SQLAlchemySchema):
    class Meta:
        model = UserModel

    id = auto_field(dump_only=True)
    firstName = auto_field(required=True)
    lastName = auto_field(required=True)
    username = auto_field(required=True)
    # TODO set password requirements
    password = fields.Str(required=True)
    email = auto_field(required=True)


@v1.route('/check')
class AuthCheckApi(Resource):
    def get(self) -> dict[str, dict[str, bool]]:
        # Will raise an error if not authzed
        JWTEncoder().decode(request.cookies.get(app.config.get('TOKEN_COOKIE_NAME')))
        return {'data': {'success': True}}


@v1.route('/register')
class AuthRegisterApi(Resource):
    def post(self) -> dict[str, Union[list[dict], dict[str, str]]]:
        data = UserSchema().load(request.json)
        # Check if user already exists
        if UserModel.query.filter_by(username=data['username']).first():
            raise Conflict(f"User with username '{data['username']}' already exists.")
        elif UserModel.query.filter_by(email=data['email']).first():
            raise Conflict(f"User with email {data['email']} already exists.")

        password = data.pop('password')
        user = UserModel(**data)
        user.password = password
        db.session.add(user)
        db.session.commit()
        return {
            'data': [user.to_dict()],
            'message': {
                'text': f'Registered user "{user.username}" Successfully!!',
                'priority': 'success'
            }
        }


@v1.route('/login')
class LoginApi(Resource):
    def post(self) -> dict[str, dict[str, str]]:
        data = LoginSchema().load(request.json)
        user = UserModel.query.filter_by(username=data['username']).first()
        if not user or user.password != user._hash(data['password']):
            raise Unauthorized('Username or password incorrect')
        else:
            token = JWTEncoder().encode(user.id)
            response = jsonify({
                'data': {'token': token},
                'message': {
                    'text': f'Logged in user "{user.username}" Successfully!!',
                    'priority': 'success'
                }
            })
            response.set_cookie(app.config.get('TOKEN_COOKIE_NAME'), token)
            return response


@v1.route('/logout')
class LogoutApi(Resource):
    def post(self) -> dict[str, Union[bool, dict[str, str]]]:
        token = request.cookies.get(app.config.get('TOKEN_COOKIE_NAME'))
        BlacklistHandler().add(token, expiration=JWTEncoder().decode(token)['exp'])
        return {
            'data': {'success': True},
            'message': {
                'text': 'Logged out successfully.',
                'priority': 'success'
            }
        }


@v1.route('/healthcheck')
class HealthcheckApi(Resource):
    def get(self) -> dict[str, dict[str, str]]:
        return {'data': {'status': 'OK'}}
