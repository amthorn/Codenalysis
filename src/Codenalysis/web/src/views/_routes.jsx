import React from "react";
import { Switch, Route } from "react-router-dom";
import config from "config.json";

import Home from "views/Home";
import Projects from "views/Projects";
import Project from "views/Project/Project";
import Admin from "views/Admin/Admin";
import Layout from "components/Layout"

const Routes = () => {
    const layoutRender = component => props => <Layout component={ component } { ...props } />

    return (
        <Switch>
            {/* PROJECTS */}
            <Route exact path={ `/projects/:project_id(${config.REGEXES.UUID})` } component={ layoutRender(Project) }/>
            <Route exact path="/projects" component={ layoutRender(Projects) } />

            {/* ADMIN */}
            {/* TODO: AUTHENTICATE/AUTHORIZE  */}
            <Route exact path="/admin" component={ layoutRender(Admin) } />

            <Route exact path="/" component={ layoutRender(Home) } />
            <Route component={() => <h1> 404 not found </h1>} />
        </Switch>
    );
};

export default Routes;