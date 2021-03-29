import Layout from "components/Layout";
import React from "react";
import { Route,Switch } from "react-router-dom";
import Admin from "views/Admin/Admin";
import Challenge from "views/Challenges/Challenge";
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
			<Route exact={ true } path={ "/projects/:project_id(\\d+)/challenges/:challenge_id(\\d+)" } component={ layoutRender(Challenge) } />

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