import { Footer, Title } from "components/Components";
import ServerTable from "components/ServerTable";
import { request } from "functions/request";
import React from "react";
import { Col, Container, Row, Button } from "react-bootstrap";
import { FaPlus, FaSearch,FaSort, FaSortAmountDown, FaSortAmountUp } from "react-icons/fa";
import { Spinner } from "reactstrap";



export default class Challenges extends React.Component {
	constructor(properties){
		super(properties);
		this.ref = React.createRef(this);
	}

	render(){
	 	return (
	 		<Container fluid={ true }>
	 			<Row>
	 				<Title text="Challenges"/>
	 			</Row>
	 			<Row>
	 				<Col>
						<Button variant="info" size="lg" onClick={ () => this.props.history.push('challenges/new') }>
							<FaPlus size="16"/>
						</Button>
					</Col>
				</Row>
				<Row>
					<Col>
						<ServerTable 
							id="challenge_table"
			                ref={ this.ref }
			                url={ `/api/v1/challenges?projectId=${this.props.match.params.projectId}` }
			                columns={ ["name", "description", "author", "created_at"] }
			                hover={ true }
			                striped={ true }
			                search={ true }
			                pagination={ true }
			                perPage={ true }
			                options={ {
			                    sortable: ["name", "description", "author", "created_at"],

			                    icons: {
			                        sortBase: FaSort,
			                        sortUp: FaSortAmountUp,
			                        sortDown: FaSortAmountDown,
			                        search: FaSearch
			                    }
			                } }
			                onClick={ (a) => {
			                    this.props.history.push(`/projects/${this.props.match.params.projectId}/challenges/${a.target.parentNode.getAttribute("data-id")}`);
			                } }
			            />
					</Col>
				</Row>
			</Container>
	 	);		
	}
};

Challenges.urlData = {
	url: '/api/v1/projects/',
	params: ['project_id']
}