from flask_restplus import Api
from app import app
from core.paginate import Paginate
from core.sort import Sort
from core.search import Search


v1 = Api(
    app,
    version='1.0',
    title='Codenalysis v1 API',
    prefix='/api/v1',
    # Search must come first to eliminate the irrelevant rows
    # Sort must come next so that pagination is accurate for the entire dataset
    # (E.G. page1 contains data before page2)
    # Paginate comes last because it is slicing the total dataset.
    decorators=[Search, Sort, Paginate]
)

from v1.projects import ProjectApi, ProjectsApi  # noqa
from v1.challenges import ChallengeApi, ChallengesApi  # noqa
from v1.healthcheck import HealthCheckApi  # noqa
