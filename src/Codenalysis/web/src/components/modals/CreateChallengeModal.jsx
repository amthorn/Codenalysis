import FormModal from "components/modals/FormModal";
import HorizontalRule from "components/base/HorizontalRule";
import { request } from "functions/request";
import React from "react";
import { Button,Form } from "react-bootstrap";


export default class CreateChallengeForm extends FormModal {
	constructor(properties){
		super(properties);
		this.title = this.props.title || "Create Challenge";
		this.help = this.props.help || "Create a New Challenge";
		this.state = {
			name: "",
			description: "",
			project_id: this.props.projectId,
		};
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

    	console.log(values);

    	request("/api/v1/challenges", { method: "POST", body: JSON.stringify(values) }).then(() => {
    		this.handleClose();
    	});
    }

    renderBody() {
    	return (
	<Form onSubmit={ (...e) => { this.handleValidate(...e); this.onSubmit(); this.props.onSubmit(); } }>
	<Form.Group controlId="formChallengeName">
	<Form.Label>Name</Form.Label>
	<Form.Control required={ true } type="text" placeholder="Enter challenge name" name="name" value={ this.state.name } onChange={ this.handleChange }  />
	<Form.Text className="text-muted">
	This is the name of your challenge. It can be changed later in the challenge settings.
    				</Form.Text>
    			</Form.Group>
	<Form.Group controlId="formChallengeDescription">
	<Form.Label>Description</Form.Label>
	<Form.Control required={ true } as="textarea" rows={ 3 } placeholder="Enter challenge description" name="description" value={ this.state.description } onChange={ this.handleChange }  />
	<Form.Text className="text-muted">
	This is a description of your challenge. It must contain all information that will be needed by anyone attempting your challenge.
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