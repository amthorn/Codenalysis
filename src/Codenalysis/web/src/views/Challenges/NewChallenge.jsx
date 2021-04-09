import { useEffect, useState } from "react";
import { PaddedCard, DataContainer, HorizontalRule, Title, Table, Button, CreateChallengeTestModal , Form } from "components/Components";
import { Container, Input, Modal, ModalHeader, ModalBody, Label, FormGroup, FormText, FormFeedback } from "reactstrap";
import { withRouter } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import { request } from "functions/request";
import { FaPlus } from "react-icons/fa";


// 1-20 count by 1 then 20 - 100 count by 5.
// TODO: get from API
const doNotAllowGiveUpString = "Do not allow giving up";
let attemptsBeforeGiveUp = [
	{name: doNotAllowGiveUpString, value: 'doNotAllowGiveUp'}
]
attemptsBeforeGiveUp = attemptsBeforeGiveUp.concat([...Array(20).keys()].map(i => ({name: i + 1, value: i + 1})))
attemptsBeforeGiveUp = attemptsBeforeGiveUp.concat([...Array(16).keys()].map(i => ({name: (i + 5) * 5, value: (i + 5) * 5})))

// TODO: get from API
const difficulties = [
	{name: 'Beginner', value: 'beginner'},
	{name: 'Intermediate', value: 'intermediate'},
	{name: 'Difficult', value: 'difficult'},
	{name: 'Very Difficult', value: 'veryDifficult'},
	{name: 'Extremely Difficult', value: 'extremelyDifficult'}
]

const types = [
    {name: 'Integer', value: 'integer'},
    {name: 'String', value: 'string'},
    {name: 'Boolean', value: 'boolean'}
]

const ButtonSection = ({ history, match }) => (
	<div className="d-flex justify-content-end">
		<Button id="cancelButton" help="Cancel and go back" placement="left" color="secondary" onClick={ () => history.push(`/projects/${match.params.projectId}/challenges`) }>
			Cancel
		</Button>
		<Button id="submitButton" placement="top" help="Submit the challenge" color="info" type="submit">
			Submit
		</Button>
	</div>
);

export const NewChallenge = withRouter(({ pageData, match, history }) => {
	const [isFetching, setIsFetching] = useState(true)
	const [notFound, setNotFound] = useState(true)
	const [data, setData] = useState({})
	const [tests, setTests] = useState([])
	const [newModalOpen, setNewModalOpen] = useState(false)
	const [modalData, setModalData] = useState({})

	// TODO: YO clean this up

	const nameFormGroup = () => (
    	<Form.Input
    		placeholder="Enter challenge name"
    		name="name"
    		label="Challenge Name*"
    		onChange={ ({ target }) => { setData({ ...data, name: target.value }) } }
    		invalid={ modalData.name ? false : true && modalData.name !== undefined }
    		feedbackMessage="This field is required"
    		text="This is the name of your challenge. 
				It can be changed later in the challenge settings."
    	/>
	);

	const descriptionFormGroup = () => (
    	<Form.Input
    		placeholder="Enter challenge description"
    		type="textarea"
    		name="description"
    		label="Description*"
    		onChange={ ({ target }) => { setData({ ...data, description: target.value }) } }
    		text="This is a description of your challenge. It must contain all information that will be needed by anyone attempting your challenge."
    	/>
	);

	const hintFormGroup = () => (
    	<Form.Input
    		placeholder="Enter challenge hint"
    		type="textarea"
    		name="hint" 
    		label="Hint"
    		onChange={ ({ target }) => { setData({ ...data, hint: target.value }) } }
    		text="This is a hint that you can provide to help submitters when they get stuck."
    	/>
	);

	const difficultyFormGroup = () => (
    	<Form.Select 
    		name="difficulty"
    		label="Difficulty*"
    		onChange={ ({ target }) => { setData({ ...data, difficulty: target.value }) } }
    		options={ difficulties }
    		text="This is the level of difficulty for your challenge. Make your best assessment for its accuracy."
    	/>
	);

	const testsFormGroup = () => (
		<FormGroup controlId="formChallengeTests">
			<Label>Tests*</Label><br/>
        	<Button color="info" help="Create new challenge test" id="createChallengeTestButton" onClick={ () => setNewModalOpen(true) }><FaPlus /></Button>
			<Table 
				data={ tests } 
				columns={ ["Input", "Input Type", "Output", "Output Type"] }
				keys={ ["input", "inputType", "output", "outputType"] }
			/>
			<FormText className="text-muted">
		These are the tests that will be performed on all submissions to your challenge to assess if it was done correctly. It's highly recommended to be as exhaustive as possible. A minimum of 3 unique tests are required.
			</FormText>
    	</FormGroup>
	);

	const attemptsBeforeGiveUpAllowedFormGroup = () => (
    	<Form.Select 
    		name="attemptsBeforeGiveUpAllowed" 
    		label="Attempts before give up is permitted"
    		onChange={ ({ target }) => { setData({ ...data, attemptsBeforeGiveUpAllowed: target.value }) } }
    		options={ attemptsBeforeGiveUp }
    		text="Select the number of attempts that must be achieved before a submitter is allowed to give up and receive the solution."
    	/>
	);

	const submitNewTestcase = () => {
		console.log(modalData)
		let fail = false;
		if(!'inputType' in modalData || !types.map(i => i.value).includes(modalData.inputType)){
			setModalData({...modalData, inputType: ""});
			fail = true;
		}
		if(!'outputType' in modalData || !types.map(i => i.value).includes(modalData.outputType)){
			setModalData({...modalData, outputType: ""});
			fail = true;
		}
		if(modalData.input === undefined){
			setModalData({...modalData, input: ""});
			fail = true;
		}
		if(modalData.output === undefined){
			setModalData({...modalData, output: ""});
			fail = true;
		}
		console.log(modalData)
		if(fail){
			return;
		}
		setTests(tests.concat(modalData))
		toggleTestcaseModal()
	}

	const toggleTestcaseModal = () => {
		setNewModalOpen(!newModalOpen);
		setModalData({});
	}

	const newChallengeTestModal = () => (
    	<Modal isOpen={ newModalOpen } toggle={ toggleTestcaseModal }>
    	   	<ModalHeader toggle={ toggleTestcaseModal }>
    	   		Create New Challenge Test
        	</ModalHeader>
    	   	<ModalBody>
	            <Form onSubmit={ submitNewTestcase }>
	            	<Form.Input
	            		placeholder="Enter challenge input"
	            		name="input" 
	            		label="Input"
	            		onChange={ ({ target }) => { setModalData({ ...modalData, input: target.value }) } }
	            		invalid={ modalData.input ? false : true && modalData.input !== undefined }
	            		feedbackMessage="This field is required"
	            		text="This is the input for the test. It will be checked against the expected output"
	            	/>
	            	<Form.Select 
	            		name="inputType" 
	            		label="Input Type"
	            		onChange={ ({ target }) => { setModalData({ ...modalData, inputType: target.value }) } }
	            		options={ types }
	            		invalid={ modalData.inputType ? false : true && modalData.inputType !== undefined }
	            		text="This is the type of the specified input above. It will be cast before being saved into the database."
	            	/>
	            	<Form.Input
	            		placeholder="Enter challenge output"
	            		name="output" 
	            		label="Output"
	            		onChange={ ({ target }) => { setModalData({ ...modalData, output: target.value }) } } 
	            		invalid={ modalData.output ? false : true && modalData.output !== undefined }
	            		feedbackMessage="This field is required"
	            		text="This is the expected output for the test. This determines whether this test passes or fails"
	            	/>
	            	<Form.Select 
	            		name="outputType" 
	            		label="Output Type"
	            		onChange={ ({ target }) => { setModalData({ ...modalData, outputType: target.value }) } }
	            		options={ types }
	            		invalid={ modalData.outputType ? false : true && modalData.outputType !== undefined }
	            		feedbackMessage="This field is required"
	            		text="This is the type of the specified output above. It will be cast before being saved into the database."
	            	/>
	                <HorizontalRule />
	                <div className="d-flex justify-content-end">
	                    <Button id="newChallengeTestSubmit" onClick={ submitNewTestcase } color="info" help="Submit the test" value="newChallengeTest">
	                    	Save
	    				</Button>
	    			</div>
	    		</Form>
        	</ModalBody>
        </Modal>
	)

	const onSubmit = (event) => {
		event.preventDefault();
	    request(
	    	`/api/v1/challenges/`, 
	    	{method: "POST", body: JSON.stringify({
	    		...data, 
	    		projectId: match.params.projectId,
	    		attemptsBeforeGiveUpAllowed: data.attemptsBeforeGiveUpAllowed === doNotAllowGiveUpString ? -1 : data.attemptsBeforeGiveUpAllowed,
	    		giveUpAllowed: data.attemptsBeforeGiveUpAllowed !== doNotAllowGiveUpString
	    	})}
	    ).then(
	    	(response) => {
	    		if(response.response.status >= 200 && response.response.status <= 299){
				    request(
				    	`/api/v1/testcases`, 
				    	{method: "POST", body: JSON.stringify(tests.map(i => ({...i, challengeId: response.data.data[0].id})))}
				    ).then(
				    	(challengeTestResponse) => {
				    		if(challengeTestResponse.response.status >= 200 && challengeTestResponse.response.status <= 299){
				    			history.push(`/projects/${match.params.projectId}/challenges/${response.data.data[0].id}`)
				    		}
				    	}
				    );
	    		}
	    	}
	    );
	}

	return (
		<Container fluid="inf">
			{ newChallengeTestModal() }
			<PaddedCard>
				<Title text="New Challenge" />
				<Form onSubmit={ onSubmit }>
					{ nameFormGroup() }
					<Row form={1}>
						<Col>
							{ descriptionFormGroup() }
						</Col>
						<Col>
							{ hintFormGroup() }
						</Col>
					</Row>
					<Row form={1}>
						<Col md={ 6 }>
							{ difficultyFormGroup() }
						</Col>
						<Col md={ 6 }>
							{ attemptsBeforeGiveUpAllowedFormGroup() }
						</Col>
					</Row>
					{ testsFormGroup() }
					{/*<HorizontalRule /> */}
	    			* denotes required
					<ButtonSection history={ history } match={ match } />
	    		</Form>
    		</PaddedCard>
		</Container>
	);
});