import { Accordion, CodeEditor, NiceContainer, PillContainer, TooltipTable } from "components/Components";
import { request } from "functions/request";
import React, { useContext } from "react";
import { 
	AccordionContext, 
	Button, 

	// OverlayTrigger, 
	Card, 
	Col, 
	Container, 
	Nav,
	Row, 
	Sonnet,
	Tab,
	Table,
	Tooltip,
	useAccordionToggle 
} from "react-bootstrap";
import { FaAngleDown, FaAngleUp } from "react-icons/fa.js";
import { Spinner } from "reactstrap";

const ChallengeInfo = function({ data }) {
	return (
		<Container className="py-2">
			<h4 className="mb-0">Description</h4>
			<small className="text-primary">Be sure to read the instructions carefully.</small>
			<p className="mt-2">
				{ data.description }
			</p>
		</Container>
	);
};

export default class Challenge extends React.Component {
	constructor(properties){
		super(properties);
		
	}

 state = {isFetching: true, data: [], "notFound": false}

 componentDidMount(){
 	this.fetch();
 }

 fetch(){
    	this.setState({isFetching: true});
    	request(`/api/v1/challenges/${this.props.match.params.challenge_id}`, {method: "GET"}).then(({ response, data }) => {
    		if(response.status === 404){
    			this.setState({"notFound": true, "isFetching": false});
    		}else{
 			this.setState({data: data.data[0], isFetching: false});
 			this.props.setBreadcrumbs([
 				{name: "Home", to: "/"}, 
 				{name: "Projects", to: "/projects"}, 
 				{name: this.state.data.project_id, to: `/projects/${this.state.data.id}`},
 				{name: "Challenges", to: `/projects/${this.state.data.id}/challenges`}, 
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
	<Container className="d-flex flex-column mw-100 mx-1">
	<Row className="d-flex">
	<Col className="d-flex justify-content-end pb-4">
	<Button className="px-5" variant="primary">Save</Button>
	<Button className="px-5" variant="success">Run</Button>
 				</Col>
 			</Row>
	<Row className="flex-grow-1">
	<PillContainer pills={ ["Challenge Info", "Code Editor", "Editor Settings"] }>
	<Tab.Content>
	<Tab.Pane eventKey="first">
	<Container fluid={ true } className="p-0">
	<Card>
	<ChallengeInfo data={ this.state.data }/>
 								</Card>
	<TooltipTable 
 									title="Examples"
 									subtitle="Hover over a row to see the data type"
 									columns={ ["#", "Input", "Ouput"] }
 									data={ [
 										[{value: 1}, {value: 2, tip: "Integer"}, {value: 3, tip: "Integer"}], 
 										[{value: 2}, {value: "foo", tip: "String"}, {value: "bar", tip: "String"}]
 									] }
 								/>
 							</Container>
 						</Tab.Pane>
	<Tab.Pane eventKey="second">
	<Container fluid={ true }>
	<CodeEditor/>
 							</Container>
 						</Tab.Pane>
	<Tab.Pane eventKey="third">
	<Container fluid={ true }>
	<h1> Hello </h1>
 							</Container>
 						</Tab.Pane>
 					</Tab.Content>
 				</PillContainer>
 			</Row>
 		</Container>
 	);
		
 }
}