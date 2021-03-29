import { Button } from "components/Button";
import FormModal from "components/modals/FormModal";
import HorizontalRule from "components/utilities/HorizontalRule";
import { request } from "functions/request";
import React from "react";
import { Form } from "react-bootstrap";


export default class CreateProjectForm extends FormModal {
	constructor(properties){
		super(properties);
		this.title = this.props.title || "Create Project";
		this.help = this.props.help || "Create a New Project";

		;
	}

 state = {
 	name: "",
 }

    handleChange = (e) => this.setState({[e.target.name]: e.target.value})

    handleValidate(event) {
    	if (event.currentTarget.checkValidity() === false) {
    		event.preventDefault();
    		event.stopPropagation();
    	}

    	event.preventDefault();
    }

    onSubmit() {
    	// Remove the "show" variable from the state
    	const {show, ...values} = this.state;

    	request("/api/v1/projects", { method: "POST", body: JSON.stringify(values) }).then(() => {
    		this.handleClose();
    	});
    }

    renderBody() {
    	return (
	<Form onSubmit={ (...e) => { this.handleValidate(...e); this.onSubmit(); this.props.onSubmit(); } }>
	<Form.Group controlId="formProjectName">
	<Form.Label>Name</Form.Label>
	<Form.Control required={ true } type="text" placeholder="Enter project name" name="name" value={ this.state.name } onChange={ this.handleChange }  />
	<Form.Text className="text-muted">
	This is the name of your project. It can be changed later in the project settings.
    				</Form.Text>
    			</Form.Group>
	<HorizontalRule />
	<div className="d-flex justify-content-end">
	<Button variant="primary" type="submit">
	Submit
    				</Button>
    			</div>
    		</Form>
    	);
    }
}