"""Initial Migration

Revision ID: f4e574eb0dd6
Revises:
Create Date: 2021-03-27 05:40:30.297819

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'f4e574eb0dd6'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table(
        'projects',
        sa.Column('id', sa.Integer, primary_key=True),
        sa.Column('name', sa.String(255), nullable=False),
        sa.Column('created_at', sa.types.DateTime, default=sa.sql.func.now(), nullable=False),
        sa.Column(
            'updated_at',
            sa.types.DateTime,
            default=sa.sql.func.now(),
            onupdate=sa.sql.func.now(),
            nullable=False
        ),
        sa.Column('deleted_at', sa.types.DateTime, nullable=True)
    )
    op.create_table(
        'challenges',
        sa.Column('id', sa.Integer, primary_key=True),
        sa.Column('name', sa.String(255), nullable=False),
        sa.Column('description', sa.Text, nullable=False),
        sa.Column('hint', sa.Text, nullable=False),
        sa.Column('difficulty', sa.String(255), nullable=False),
        sa.Column('giveUpAllowed', sa.Boolean, nullable=False),
        sa.Column('attemptsBeforeGiveUpAllowed', sa.Integer, nullable=False, default=0),
        sa.Column('projectId', sa.Integer, sa.ForeignKey('projects.id'), nullable=False),
        sa.Column('created_at', sa.types.DateTime, default=sa.sql.func.now(), nullable=False),
        sa.Column(
            'updated_at',
            sa.types.DateTime,
            default=sa.sql.func.now(),
            onupdate=sa.sql.func.now(),
            nullable=False
        ),
        sa.Column('deleted_at', sa.types.DateTime, nullable=True)
    )
    op.create_table(
        'submissions',
        sa.Column('id', sa.Integer, primary_key=True),
        sa.Column('challengeId', sa.Integer, sa.ForeignKey('challenges.id'), nullable=False),
        sa.Column('created_at', sa.types.DateTime, default=sa.sql.func.now(), nullable=False),
        sa.Column(
            'updated_at',
            sa.types.DateTime,
            default=sa.sql.func.now(),
            onupdate=sa.sql.func.now(),
            nullable=False
        ),
        sa.Column('deleted_at', sa.types.DateTime, nullable=True)
    )
    op.create_table(
        'runs',
        sa.Column('id', sa.Integer, primary_key=True),
        sa.Column('submissionId', sa.Integer, sa.ForeignKey('submissions.id'), nullable=False),
        sa.Column('created_at', sa.types.DateTime, default=sa.sql.func.now(), nullable=False),
        sa.Column(
            'updated_at',
            sa.types.DateTime,
            default=sa.sql.func.now(),
            onupdate=sa.sql.func.now(),
            nullable=False
        ),
        sa.Column('deleted_at', sa.types.DateTime, nullable=True)
    )
    op.create_table(
        'testcases',
        sa.Column('id', sa.Integer, primary_key=True),
        sa.Column('challengeId', sa.Integer, sa.ForeignKey('challenges.id'), nullable=False),
        sa.Column('input', sa.String(255), nullable=False),
        sa.Column('inputType', sa.String(255), nullable=False),
        sa.Column('output', sa.String(255), nullable=False),
        sa.Column('outputType', sa.String(255), nullable=False),
        sa.Column('created_at', sa.types.DateTime, default=sa.sql.func.now(), nullable=False),
        sa.Column(
            'updated_at',
            sa.types.DateTime,
            default=sa.sql.func.now(),
            onupdate=sa.sql.func.now(),
            nullable=False
        ),
        sa.Column('deleted_at', sa.types.DateTime, nullable=True)
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('projects')
    op.drop_table('challenges')
    op.drop_table('submissions')
    op.drop_table('testcases')
    op.drop_table('runs')
    # ### end Alembic commands ###
