import { 
	Accordion, 
	CodeEditor, 
	CodeEditorSettingsPanel,
	Container,
	Col,
	RightAlignCol,
	Row,
	RightAlignRow,
	NiceContainer, 
	PillContainer, 
	TooltipTable,
	PaddedCard,
	DataContainer
} from "components/Components";
import { request } from "functions/request";
import React from "react";
import { 
	AccordionContext, 
	Button, 
	Card, 
	Nav,
	Sonnet,
	Tab,
	Table,
	Tooltip,
	useAccordionToggle 
} from "react-bootstrap";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import { Spinner } from "reactstrap";
import classNames from "classnames";
import { toast } from "react-toastify";

const ChallengeInfo = function({ data }) {
	return (
		<DataContainer title="Description" subtitle="Be sure to read the instructions carefully.">
			{ data.description }
		</DataContainer>
	);
};

export default class Challenge extends React.Component {
	constructor(properties){
		super(properties);
		this.ref = React.createRef(this);
	}

 	state = {
 		isFetching: true, 
 		challenge_data: null, 
 		submission_data: null, 
 		notFound: false, 
 		script: ''
 	}

	componentDidMount(){
		this.fetch();
	}

	fetch(){
	    this.setState({isFetching: true});
	    request(`/api/v1/challenges/${this.props.match.params.challenge_id}`, {method: "GET"}).then(
	    	({ response, data }) => {
	    		if(response.status === 404){
	    			this.setState({"notFound": true, "isFetching": false});
	    		}else{
	 				this.setState({challenge_data: data.data[0], isFetching: false});
	 				this.props.setBreadcrumbs([
		 				{name: "Home", to: "/"}, 
		 				{name: "Projects", to: "/projects"}, 
		 				{name: this.props.match.params.project_id, to: `/projects/${this.props.match.params.project_id}`},
		 				{name: "Challenges", to: `/projects/${this.props.match.params.project_id}/challenges`}, 
		 				{name: this.state.challenge_data.id, to: `/projects/${this.props.match.params.project_id}/challenges/${this.state.challenge_data.id}`},
		 				{name: "Submissions", active: true}, 
		 			]);
	 			}
	    	});
	    if(this.props.match.params.submission_id){
		    request(`/api/v1/submissions/${this.props.match.params.submission_id}`, {method: "GET"}).then(
		    	({ response, data }) => {
		    		if(response.status === 404){
		    			this.setState({"notFound": true, "isFetching": false});
		    		}else{
		 				this.setState({submission_data: data.data[0], isFetching: false, script: data.data[0].script});
		 				this.props.setBreadcrumbs([
			 				{name: "Home", to: "/"}, 
			 				{name: "Projects", to: "/projects"}, 
			 				{
			 					name: this.props.match.params.project_id, 
			 					to: `/projects/${this.props.match.params.project_id}`
			 				},
			 				{
			 					name: "Challenges", 
			 					to: `/projects/${this.props.match.params.project_id}/challenges`
			 				}, 
			 				{
			 					name: this.props.match.params.challenge_id, 
			 					to: `/projects/${this.props.match.params.project_id}/challenges/${this.state.submission_data.challenge_id}`
			 				},
			 				{
			 					name: "Submissions", 
			 					to: `/projects/${this.props.match.params.project_id}/challenges/${this.state.submission_data.challenge_id}/submissions`
			 				},
			 				{name: this.state.submission_data.id, active: true},
			 			]);
		 			}
		    	});
		}

	}
	saveSubmission(){
    	request(
    		`/api/v1/submissions${this.state.submission_data ? ('/' + this.state.submission_data.id) : ''}`, 
    		{ method: (this.state.submission_data ? "PUT" : "POST"), body: JSON.stringify({
    			script: this.ref.current.refs.ace.editor.getValue(),
    			challenge_id: this.props.match.params.challenge_id
    		}) }
    	).then((response) => {
    		this.props.history.push(`/projects/${this.props.match.params.project_id}/challenges/${this.state.challenge_data.id}/submissions/${response.data.data[0].id}`)});
	}
	runSubmission(){
		if(!this.state.submission_data){
			toast['error']("You must save your submission before you can run it!");
		}else{
	    	request(
	    		`/api/v1/submissions/${this.state.submission_data.id}/run`, { method: "POST" }
	    	)
	    }
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
			<Container id="submission_container">
				<RightAlignRow>
					<Button className="px-5" variant="info" onClick={ () => this.saveSubmission() }>
						Save
					</Button>
					<Button className="px-5" variant="success" onClick={ () => this.runSubmission() }>Run</Button>
	 			</RightAlignRow>
				<Row className="flex-grow-1">
					<PillContainer pills={ ["Challenge Info", "Code Editor"] } orientation="horizontal">
						<Tab.Content className="w-100">
							<Tab.Pane eventKey="first">
								<PaddedCard>
									<ChallengeInfo data={ this.state.challenge_data }/>
 								</PaddedCard>
 								<PaddedCard>
 									<DataContainer title="Examples" subtitle="Hover over a row to see the data type">
										<TooltipTable 
		 									columns={ ["#", "Input", "Ouput"] }
		 									data={ [
		 										[{value: 1}, {value: 2, tip: "Integer"}, {value: 3, tip: "Integer"}], 
		 										[{value: 2}, {value: "foo", tip: "String"}, {value: "bar", tip: "String"}]
		 									] }
		 								/>
	 								</DataContainer>
 								</PaddedCard>
	 						</Tab.Pane>
							<Tab.Pane eventKey="second">
								<Container>
									<Row>
										<Col md={9}>
											<CodeEditor ref={ this.ref } className="border-2" { ...( this.state.script ? {value: this.state.script} : {} ) } />
										</Col>
										<Col md={3}>
											<CodeEditorSettingsPanel 
												defaultSelectedTheme="sqlserver" 
												defaultSelectedMode="python" 
												defaultSelectedFontSize={14}
												themeChanged={ (theme) => {
													this.ref.current.setState({theme: theme})
												} }
												modeChanged={ (mode) => {
													this.ref.current.setState({mode: mode})
												} }
												fontSizeChanged={ (fontSize) => {
													this.ref.current.setState({fontSize: fontSize})
												} }
											/>
										</Col>
									</Row>
	 							</Container>
	 						</Tab.Pane>
	 					</Tab.Content>
	 				</PillContainer>
	 			</Row>
	 		</Container>
	 	);	
 	}
}