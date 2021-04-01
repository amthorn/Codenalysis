import Footer from "components/base/Footer";
import { request } from "functions/request";
import React from "react";
import { Col,Row } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import { Spinner } from "reactstrap";
import { NotFoundPage }  from "views/Error";
import { ProjectChart, ProjectChart2 } from "views/Project/Charts";


export default class Project extends React.Component {
	constructor(properties){
		super(properties);
		
	}

 state = {isFetching: true, data: [], "notFound": false}

 componentDidMount(){
 	this.fetch();
 }

 fetch(){
    	this.setState({isFetching: true});
    	request(`/api/v1/projects/${this.props.match.params.project_id}`, {method: "GET"}).then(({ response, data }) => {
    		if(response.status === 404){
    			this.setState({"notFound": true, "isFetching": false});
    		}else{
 			this.setState({data: data.data[0], isFetching: false});
 			this.props.setBreadcrumbs([
 				{name: "Home", to: "/"}, 
 				{name: "Projects", to: "/projects"}, 
 				{name: this.state.data.id, active: true}
 			]);
 		}
    	});
 }

 render(){
 	if(this.state.isFetching){
 		return <Spinner color="primary"/>;
 	}

 	if(this.state.notFound){
 		this.props.notFound();

 		return null;
 	}

 	return (
	<React.Fragment>
 			<Row>
 				<Col xs="12">
 					<ProjectChart project={ this.state.data || {} }/>
	</Col>
		</Row>
	<ProjectChart2 />
 		</React.Fragment>
 	);
		
 }
}