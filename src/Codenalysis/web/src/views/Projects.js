import React from "react";
import RestTable from "../components/RestTable";
import Layout from "../components/Layout";
import CreateProjectModal from "../components/modals/CreateProjectModal";
import { FaPlus } from 'react-icons/fa';
import { Container, Row, Col } from "react-bootstrap";
import { withRouter } from "react-router-dom"
import Footer from "components/Footer"

const columns = [
  {
    name: "Name",
    selector: "name",
    sortable: true
  },
  {
    name: "Created At",
    selector: "created_at",
    sortable: true
  }
];

class Projects extends React.Component {
    constructor(props) {
        super(props)
        this.ref = React.createRef(this);
    }
    tableProps = {
        defaultSortField: "created_at",
        defaultSortAsc: false,
        onRowClicked: this.goToProjectPage.bind(this)
    }
    componentDidMount() {
        this.props.setBreadcrumbs([{name: "Home", to: "/"}, {name: "Projects", active: true}])
    }
    goToProjectPage(row) {
        this.props.history.push(`/projects/${row.id}`)
        return row
    }
    refreshPage = () => {
        this.ref.current.fetch();
    }

  render() {
    console.log(this.ref)
    return (
        <div className="content">
            <Container>
                <Row>
                    <Col>
                        <CreateProjectModal 
                            openModalButtonProps={{size: "lg", variant: "success" }}
                            openModalButtonText={<FaPlus size="16"/>}
                            onSubmit={ () => setTimeout(this.refreshPage, 1000) }
                        />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <RestTable
                            ref={ this.ref }
                            title="Projects"
                            columns={columns}
                            defaultSortField="created_at"
                            // pagination
                            endpoint="/api/v1/projects"
                            expandableComponent={<p>HELLO MY DEAR</p>} // TODO
                            tableProps={ this.tableProps }
                        />
                    </Col>
                </Row>
            </Container>
            <Footer fluid />
        </div>
    )
  }
}

export default withRouter(Projects);