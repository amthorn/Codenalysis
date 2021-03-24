import React from "react";
import request from "functions/request"
import { ProjectChart, ProjectChart2 } from "views/Project/Charts"
import { Row, Col } from "react-bootstrap"
import { Spinner } from "reactstrap";
import Footer from "components/Footer";


export default class Project extends React.Component {
	constructor(props){
		super(props)
		this.state = {isFetching: false}
	}
	componentDidMount() {
		this.fetch()
	}
	fetch(){
		console.log()
    	this.setState({...this.state, isFetching: true});
    	request(`/api/v1/projects/${this.props.match.params.project_id}`, {method: "GET"}).then((data) => {
			this.setState({...this.state, data: data.data, isFetching: false});
			console.log(this.state.data)
			this.props.setBreadcrumbs([
				{name: "Home", to: "/"}, 
				{name: "Projects", to: "/projects"}, 
				{name: this.state.data.id.split('-')[0], active: true}
			])
    	});
	}
	render(){
		if(this.state.isFetching){
			return (
				<Spinner color="primary"/>
			)
		}else{
			console.log(this.state)
			return (
				<div className="content">
			        <Row>
			         	<Col xs="12">
							<ProjectChart project={ this.state.data || {} }/>
						</Col>
					</Row>
					<ProjectChart2 />
					<Footer />
			</div>
			)
		}
	}
}