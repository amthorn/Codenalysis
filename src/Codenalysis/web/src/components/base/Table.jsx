import React from "react";
import classNames from "classnames/dedupe";
import { v4 } from "uuid";


const TableComponent = ({ component, children, ...props}) => (
	React.createElement(component, { ...props, key: v4() }, children)
)

const Row = (props) => <TableComponent component="tr" { ...props } />
const Header = (props) => <TableComponent component="th" { ...props } />
const Col = (props) => <TableComponent component="td" { ...props } />


export const Table = ({ data, columns, keys, ...props }) => {
	const noContent = (
		<Row className="text-center text-info">
			<Col colSpan={4} className="justify-content-center">
				No Data Found
			</Col>
		</Row>
	);

	columns = (columns !== undefined ? columns : []);
	data = (data !== undefined ? data : []);

	const columnContent = columns.map(name => <Header>{ name }</Header>);

	const dataContent = data.map(row => (
		<Row>{ keys.map(key => <Col>{ row[key] }</Col>) }</Row>
	));

	return (
		<div className="table-responsive">
			<table className={ classNames("table", dataContent.length ? "table-hover" : "") }>
				<thead className="text-primary">
					<Row>{ columnContent }</Row>
				</thead>
				<tbody>
					{ dataContent.length ? dataContent : noContent }
				</tbody>
			</table>
		</div>
	);
}