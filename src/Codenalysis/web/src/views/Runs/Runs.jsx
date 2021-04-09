import React from "react";
import ServerTable from "components/ServerTable";
import { Col, Row } from "components/Components";
import { FaSort, FaSortAmountUp, FaSortAmountDown, FaSearch } from "react-icons/fa";


export const Runs = ({ match, history }) => (
	<Row>
		<Col xs="12">
			<ServerTable
                id="runTable"
				url={ `/api/v1/runs?submissionId=${match.params.submissionId}` }
				columns={ ["name", "created_at"] }
				hover={ true }
				striped={ true }
				search={ true }
				pagination={ true }
				perPage={ true }
				options={ {
					sortable: ["name", "created_at"],
					icons: {
						sortBase: FaSort,
						sortUp: FaSortAmountUp,
						sortDown: FaSortAmountDown,
						search: FaSearch
					}
				} }
				onClick={ (a) => {
					console.log(a)
					history.push(`/projects/${match.params.projectId}/challenges/${match.params.challengeId}/submissions/${match.params.submissionId}/runs/${a.target.parentNode.getAttribute("data-id")}`);
				} }
			/>
		</Col>
	</Row>
)