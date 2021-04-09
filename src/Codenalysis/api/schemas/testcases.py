from models.testcases import TestcaseModel
from marshmallow import validate
from marshmallow_sqlalchemy import SQLAlchemySchema, auto_field


class TestcaseSchema(SQLAlchemySchema):
    class Meta:
        model = TestcaseModel

    id = auto_field(dump_only=True)
    input = auto_field(
        required=True,
        error_messages={'required': 'The testcase input is required!'}
    )
    inputType = auto_field(
        required=True,
        error_messages={'required': 'The testcase input type is required!'}
    )
    output = auto_field(
        required=True,
        error_messages={'required': 'The testcase output is required!'}
    )
    outputType = auto_field(
        required=True,
        error_messages={'required': 'The testcase output type is required!'}
    )
    challengeId = auto_field(required=True)
