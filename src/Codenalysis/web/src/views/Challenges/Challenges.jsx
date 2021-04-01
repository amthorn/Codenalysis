import Footer from "components/base/Footer";
import CreateChallengeModal from "components/modals/CreateChallengeModal";
import ServerTable from "components/ServerTable";
import { request } from "functions/request";
import React from "react";
import { Col, Container,Row } from "react-bootstrap";
import { FaPlus, FaSearch,FaSort, FaSortAmountDown, FaSortAmountUp } from "react-icons/fa";
import { Spinner } from "reactstrap";



export default class Challenges extends React.Component {
	constructor(properties){
		super(properties);
		this.ref = React.createRef(this);
		
	}

 state = {isFetching: true, data: [], "notFound": false}

 componentDidMount() {
    	this.fetch();
 }

 fetch(){
    	this.setState({isFetching: true});
    	request(`/api/v1/projects/${this.props.match.params.project_id}`, {method: "GET"}).then(({ response, data }) => {
    		if(response.status === 404){
    			this.setState({"notFound": true, "isFetching": false});
    		}else{
 			this.setState({data: data.data[0], isFetching: false});
		        this.props.setBreadcrumbs([
		        	{name: "Home", to: "/"}, 
		        	{name: "Projects", to: "/projects"}, 
		        	{name: this.state.data.id, to: `/projects/${this.state.data.id}`},
		        	{name: "Challenges"}, 
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
 		<Container fluid={ true }>
 			<Row>
 				<Col>
 					<CreateChallengeModal 
                        openModalButtonProps={ {size: "lg", variant: "success" } }
                        openModalButtonText={ <FaPlus size="16"/> }
                        projectId={ this.props.match.params.project_id }
                        onSubmit={ () => setTimeout(() => {this.ref.current.refreshData();}, 1_000) }
                    />
	</Col>
	</Row>
		<Row>
			<Col>
				<ServerTable 
					id="challenge_table"
	                ref={ this.ref }
	                url={ `/api/v1/challenges?project_id=${this.props.match.params.project_id}` }
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
	                    this.props.history.push(`/projects/${this.props.match.params.project_id}/challenges/${a.target.parentNode.getAttribute("data-id")}/submissions`);
	                } }
	            />
			</Col>
		</Row>
	</Container>
 	);
		
 }
}

;