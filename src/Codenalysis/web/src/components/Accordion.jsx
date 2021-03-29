import React, { useContext } from "react";
import { 
	Accordion as _Accordion,
	AccordionContext,
	Button, 
	Card, 
	Col,
	Row,
	useAccordionToggle} from "react-bootstrap";
import { FaAngleDown, FaAngleUp } from "react-icons/fa.js";


const CustomToggle = function({ children, eventKey, callback, value, name }) {
 	const currentEventKey = useContext(AccordionContext);
	const decoratedOnClick = useAccordionToggle(eventKey, () => callback && callback(eventKey));
  	const isCurrentEventKey = currentEventKey === eventKey;

  	return (
		<div>
		<Row>
				<Col md={ 3 }>
				<div className="text-left">{ isCurrentEventKey ? <FaAngleDown /> : <FaAngleUp />} { name } Info</div>
			</Col>
				<Col>
				<div className="text-right">{ value }</div>
			</Col>
			</Row>
	</div>
  	);
};

export var Accordion = function({ title, subtitle, content }) {
	return (
		<_Accordion defaultActiveKey="0">
			<Card>
				<Card.Header>
					<_Accordion.Toggle as={ Button } className="w-100" variant="link" eventKey="0">
						<CustomToggle name={ title } value={ subtitle } eventKey="0" />
					</_Accordion.Toggle>
				</Card.Header>
				<_Accordion.Collapse eventKey="0">
					<Card.Body className="pt-0">
						{ content }
					</Card.Body>
				</_Accordion.Collapse>
			</Card>
		</_Accordion>
	);
};