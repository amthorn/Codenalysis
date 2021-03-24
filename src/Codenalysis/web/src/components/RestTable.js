import React from "react";
// import { Table } from "react-bootstrap";
import DataTable from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import request from "../functions/request"
import { FaChevronDown } from 'react-icons/fa';

export default class RestTable extends React.Component {
	constructor(props) {
        super(props);
        this.state = {
            isFetching: false,
            data: [],
            toggledClearRows: false
        };
    }
    componentDidMount() {
        this.fetch();
    }

    fetch() {
    	this.setState({...this.state, isFetching: true});
    	request(this.props.endpoint, {method: "GET"}).then(({data}) => {
			this.setState({...this.state, data: data.data});
			this.setState({...this.state, isFetching: false});
    	});
    }

    handleToggleClearRows() {
    	this.setState({ toggledClearRows: !this.state.toggledClearRows })
    }

	render() {
		if (this.state.isFetching) {
			return <DataTable progressPending/>
		}else{
			return (
				<div style={{'borderStyle': 'solid', 'borderWidth': '1px', 'borderColor': 'LightGray'}}>
					<DataTableExtensions columns={ this.props.columns } data={ this.state.data }>
						<DataTable
							columns={ this.props.columns }
							data={ this.state.data }
							noHeader
							selectableRows
							Clicked
	          				Selected={ this.handleChange }
	        				clearSelectedRows={ this.state.toggledClearRows }
	        				sortIcon={<FaChevronDown className="p-1"/>}
					        expandableRows
					        expandableRowsComponent={ this.props.expandableComponent }
					        pagination
					        highlightOnHover
					       	pointerOnHover
					       	// dense
					       	{ ...this.props.tableProps }
						/>
					</DataTableExtensions>
				</div>
			)
	    }
	}
}