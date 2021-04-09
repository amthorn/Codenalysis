import { DataContainer, PaddedCard, ChallengeTests, Col, Container, Row, Table } from "components/Components";
import React, { useState } from "react";
import { Spinner } from "reactstrap";
import { PageLoadRestController } from "components/Controllers/Controllers";


const Challenge = (props) => {
	const title = () => <h2>Challenge Info</h2>

	const topLeftColumn = () => {
		return <PaddedCard className="h-100">
			<DataContainer title="Description">
				{ props.pageData.description }
			</DataContainer>
		</PaddedCard>
	};

	const topRightColumn = () => (
		// challenge tests
		<PaddedCard className="h-100">
			<DataContainer title="Challenge Tests">
				<ChallengeTests tests={ props.pageData.testcases }/>
			</DataContainer>
		</PaddedCard>
	)
	
	const bottomLeftColumn = () => (
		// Recent submission activity
		<PaddedCard className="h-100">
			<DataContainer title="Recent Submission Activity">
				<Table />
			</DataContainer>
		</PaddedCard>
	)

	const bottomRightColumn = () => (
		<PaddedCard className="h-100">
			<DataContainer title="Recent Comments">
				recent comments
			</DataContainer>
		</PaddedCard>
	)

 	return (
 		<Container fluid={ true }>
 			<Row>
 				{ title() }
 			</Row>
 			<Row>
 				<Col>
 					{ topLeftColumn() }
				</Col>
				<Col>
					{ topRightColumn() }
				</Col>
			</Row>
 			<Row>
 				<Col>
 					{ bottomLeftColumn() }
				</Col>
				<Col>
					{ bottomRightColumn() }
				</Col>
			</Row>
		</Container>
 	);
};


Challenge.urlData = {
	'url': '/api/v1/challenges/{0}', 
	'params': [
		'challengeId'
	]
}

export { Challenge };