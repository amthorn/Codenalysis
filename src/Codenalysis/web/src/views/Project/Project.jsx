import Footer from "components/base/Footer";
import { request } from "functions/request";
import React from "react";
import { Col,Row } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import { Spinner } from "reactstrap";
import { NotFoundPage }  from "views/Error";
import { ProjectChart, ProjectChart2 } from "views/Project/Charts";


export const Project = ({ pageData }) => (
	<React.Fragment>
 		<Row>
 			<Col xs="12">
 				<ProjectChart project={ pageData }/>
			</Col>
		</Row>
		<ProjectChart2 />
 	</React.Fragment>
)

Project.urlData = {
	url: '/api/v1/projects/',
	params: ['projectId'],
}