import React from "react";
import { Col } from "components/base/Col";
import classNames from "classnames/dedupe";


export const RightAlignCol = ({ children, ...props }) => {
	return (
		<Col { ...props } className={ classNames(props.className, 'd-flex', 'justify-content-end') }>
			{ children }
		</Col>
	);
};