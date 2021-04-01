import React from "react";
import {
	OverlayTrigger,
	Tooltip
} from "react-bootstrap";
import {
	CardBody,
	CardHeader,
	CardTitle,
	Col,
	Row,
	Table,
} from "reactstrap";
import { PaddedCard } from "components/PaddedCard";

export var TooltipTable = function({ title, subtitle, columns, data }) {
	console.log(data);

	return (
		<Table responsive={ true }>
			<thead className="text-primary">
				<tr>
					{
						columns.map(index => <th className="text-center">{ index }</th>)
					}
				</tr>
			</thead>
			<tbody>
				{
					data.map(row => (
						<tr>{ row.map(col => ( col.tip ? (
							<OverlayTrigger
								id="foo"
								delay={ { show: 250, hide: 400 } }
								overlay={
									<Tooltip>
										{ col.tip }
									</Tooltip>
								}
							>
								<td className="text-center" style={ { "cursor": "pointer" } }>
									{ col.value }
								</td>
							</OverlayTrigger>
						) : (
							<td className="text-center">{ col.value }</td>
						)
						)) }</tr>
					))
				}
			</tbody>
		</Table>
	);
};
