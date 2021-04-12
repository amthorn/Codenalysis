import { Layout } from "components/layout/Layout";
import React from "react";
import { Route, Switch } from "react-router-dom";
import Admin from "views/Admin/Admin";
import { Submission } from "views/Submissions/Submission";
import { Run } from "views/Runs/Run";
import { Runs } from "views/Runs/Runs";
import { NewSubmission } from "views/Submissions/NewSubmission";
import Submissions from "views/Submissions/Submissions";
import Challenges from "views/Challenges/Challenges";
import { Challenge } from "views/Challenges/Challenge";
import { NotFoundPage }  from "views/Error";
import Home from "views/Home";
import { Project } from "views/Project/Project";
import Projects from "views/Project/Projects";
import { NewChallenge } from "views/Challenges/NewChallenge";
import { Login } from "views/Auth/Login";


const Routes = function() {
	const layoutRender = component => function(properties) {
		return <Layout component={ component } urlData={ component?.urlData } { ...properties } />;
	};

	const _routes = [
		// Projects //
		{ path: "/projects", exact: true, component: layoutRender(Projects) },
		{ path: "/projects/:projectId(\\d+)", exact: true, component: layoutRender(Project) },

		// Project Challenges //
		{ path: "/projects/:projectId(\\d+)/challenges", exact: true, component: layoutRender(Challenges) },
		{ path: "/projects/:projectId(\\d+)/challenges/:challengeId(\\d+)", exact: true, component: layoutRender(Challenge) },
		{ path: "/projects/:projectId(\\d+)/challenges/new", exact: true, component: layoutRender(NewChallenge) },

		// Submissions //
		{ path: "/projects/:projectId(\\d+)/challenges/:challengeId(\\d+)/submissions", exact: true, component: layoutRender(Submissions) },
		{ path: "/projects/:projectId(\\d+)/challenges/:challengeId(\\d+)/submissions/new", exact: true, component: layoutRender(NewSubmission) },
		{ path: "/projects/:projectId(\\d+)/challenges/:challengeId(\\d+)/submissions/:submissionId(\\d+)", exact: true, component: layoutRender(Submission) },

		// Runs //
		{ path: "/projects/:projectId(\\d+)/challenges/:challengeId(\\d+)/submissions/:submissionId(\\d+)/runs", exact: true, component: layoutRender(Runs) },
		{ path: "/projects/:projectId(\\d+)/challenges/:challengeId(\\d+)/submissions/:submissionId(\\d+)/runs/:runId(\\d+)", exact: true, component: layoutRender(Run) },

		// Admin //
		{ path: "/admin", exact: true, component: layoutRender(Admin) },
		// TODO: Authenticate/authorize //

		{ path: "/", exact: true, component: layoutRender(Home) },
		{ path: "/login", exact: true, component: Login },
		{ path: "*", component: () => <NotFoundPage />, status: 404 },
	]

	return (
		<Switch>
			{
				_routes.map(r => <Route key={ r.path } { ...r } /> )
			}
		</Switch>
	);
};

export default Routes;