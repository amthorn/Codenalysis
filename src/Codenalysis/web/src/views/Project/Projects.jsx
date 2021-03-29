import CreateProjectModal from "components/modals/CreateProjectModal";
import ServerTable from "components/ServerTable";
import React from "react";
import { Col,Container, Row } from "react-bootstrap";
import { FaPlus , FaSearch,FaSort, FaSortAmountDown, FaSortAmountUp } from "react-icons/fa.js";
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
						<CreateProjectModal 
							openModalButtonProps={ {size: "lg", variant: "success" } }
							openModalButtonText={ <FaPlus size="16"/> }
							onSubmit={ () => setTimeout(() => {this.ref.current.refreshData();}, 1_000) }
						/>
					</Col>
				</Row>
				<Row>
					<Col>
						<ServerTable 
							ref={ this.ref }
							url="/api/v1/projects"
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
								this.props.history.push(`/projects/${a.target.parentNode.getAttribute("data-id")}`);
							} }
						/>
					</Col>
				</Row>
			</Container>
		);
	}
}

export default withRouter(Projects);