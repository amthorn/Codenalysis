import { NiceContainer } from "components/Components";
import React from "react";
import { Card, Col, Container,Nav, Row, Tab } from "react-bootstrap";

const eventKeys = [
	"first",
	"second",
	"third",
	"fourth",
	"fifth",
	"sixth",
	"seventh",
	"eighth",
	"ninth",
	"tenth"
];

export var PillContainer = function({ children, pills }) {
	if(pills.length > eventKeys.length){
		console.error("Pill length cannot be longer than eventKey length");

		return;
	}

	return (
		<Tab.Container id="left-tabs-example" defaultActiveKey="first">
			<Container className="mx-1 mw-100">
				<Row className="h-100">
					<Col sm={ 2 }>
						<NiceContainer data="blue" className="p-2 h-100">
							<Nav variant="pills" className="flex-column">
								{
									pills.map((text, index) => (
										<Nav.Item className="mb-2">
											<Nav.Link eventKey={ eventKeys[index] }>{ text }</Nav.Link>
										</Nav.Item>
									)
									)
								}
							</Nav>
						</NiceContainer>
					</Col>
					<Col sm={ 10 }>
						{ children }
					</Col>
				</Row>
			</Container>
		</Tab.Container>
	);
};