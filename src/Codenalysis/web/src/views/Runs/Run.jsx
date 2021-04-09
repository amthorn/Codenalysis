import React from "react";
import ServerTable from "components/ServerTable";
import { Col, Row, Table, ChallengeTests } from "components/Components";
import { FaSort, FaSortAmountUp, FaSortAmountDown, FaSearch } from "react-icons/fa";


export const Run = ({ match, history, pageData }) => {
	console.log(pageData)
	return <Row>
		<Col xs="12">
			<ChallengeTests
				tests={ Object.values(pageData.results) }
				results={ true }
				bordered={ true }
				style={{width: "99%"}}
			/>
			<p>Several results have been redacted</p>
		</Col>
	</Row>
}

Run.urlData = {
	url: '/api/v1/runs/{0}',
	params: ["runId"]
}