import Layout from "components/layout/Layout";
import React from "react";
import { Route,Switch } from "react-router-dom";
import Admin from "views/Admin/Admin";
import Submission from "views/Submissions/Submission";
import Submissions from "views/Submissions/Submissions";
import Challenges from "views/Challenges/Challenges";
import { NotFoundPage }  from "views/Error";
import Home from "views/Home";
import Project from "views/Project/Project";
import Projects from "views/Project/Projects";

const Routes = function() {
	const layoutRender = component => function(properties) {
		return <Layout component={ component } { ...properties } />;
	};

	return (
		<Switch>
			{/* PROJECTS */}
			<Route exact={ true } path={ "/projects/:project_id(\\d+)" } component={ layoutRender(Project) }/>
			<Route exact={ true } path="/projects" component={ layoutRender(Projects) } />

			{/* PROJECT CHALLENGES */}
			<Route exact={ true } path={ "/projects/:project_id(\\d+)/challenges" } component={ layoutRender(Challenges) } />
            {/* TODO: <Route exact={ true } path={ "/projects/:project_id(\\d+)/challenges/:challenge_id(\\d+)" } component={ layoutRender(Challenge) } /> */}
            <Route exact={ true } path={ "/projects/:project_id(\\d+)/challenges/:challenge_id(\\d+)/submissions" } component={ layoutRender(Submissions) } />
            <Route exact={ true } path={ "/projects/:project_id(\\d+)/challenges/:challenge_id(\\d+)/submissions/new" } component={ layoutRender(Submission) } />
            <Route exact={ true } path={ "/projects/:project_id(\\d+)/challenges/:challenge_id(\\d+)/submissions/:submission_id(\\d+)" } component={ layoutRender(Submission) } />

			{/* ADMIN */}
			{/* TODO: AUTHENTICATE/AUTHORIZE  */}
			<Route exact={ true } path="/admin" component={ layoutRender(Admin) } />

			<Route exact={ true } path="/" component={ layoutRender(Home) } />

			{/* ERROR ROUTE: DO NOT USE layoutRender */}
			<Route component={ () => <NotFoundPage /> } path="*" status={ 404 }/>
		</Switch>
	);
};

export default Routes;