import React from "react";
import { Row } from "components/base/Row";
import classNames from "classnames/dedupe";


export const RightAlignRow = ({ children, ...props }) => {
	return (
		<Row { ...props } className={ classNames(props.className, 'd-flex', 'justify-content-end') }>
			{ children }
		</Row>
	);
};