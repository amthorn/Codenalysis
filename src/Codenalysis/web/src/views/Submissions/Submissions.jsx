import CreateProjectModal from "components/modals/CreateProjectModal";
import ServerTable from "components/ServerTable";
import React from "react";
import { Col, Container, Row, Button } from "react-bootstrap";
import { FaPlus, FaSearch, FaSort, FaSortAmountDown, FaSortAmountUp } from "react-icons/fa";
import { withRouter } from "react-router-dom";


class Projects extends React.Component {
	constructor(properties) {
		super(properties);
		this.ref = React.createRef(this);
	}

	componentDidMount() {
		this.props.setBreadcrumbs([{name: "Home", to: "/"}, {name: "Projects", active: true}]);
	}

	render() {
		return (
			<Container fluid={ true }>
				<Row>
					<Col>
						<Button variant="success" size="lg" onClick={ () => this.props.history.push('submissions/new') }>
							<FaPlus size="16"/>
						</Button>
					</Col>
				</Row>
				<Row>
					<Col>
						<ServerTable 
							id="submission_table"
							ref={ this.ref }
							url={ `/api/v1/submissions?challenge_id=${this.props.match.params.challenge_id}` }
							columns={ ["created_at", "created_by"] }
							hover={ true }
							striped={ true }
							search={ true }
							pagination={ true }
							perPage={ true }
							options={ {
								sortable: ["created_at", "created_by"],

								icons: {
									sortBase: FaSort,
									sortUp: FaSortAmountUp,
									sortDown: FaSortAmountDown,
									search: FaSearch
								}
							} }
							onClick={ (a) => {
								this.props.history.push(`submissions/${a.target.parentNode.getAttribute("data-id")}`);
							} }
						/>
					</Col>
				</Row>
			</Container>
		);
	}
}

export default withRouter(Projects);