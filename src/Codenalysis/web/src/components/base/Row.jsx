import React from "react";
import { Row as _Row } from "react-bootstrap";
import classNames from "classnames/dedupe";

// bootstrap doesn't always add "row" class. E.G. "row-md-9"
export const Row = ({ children, ...props }) => {
	return (
		<_Row { ...props }>
			{ children }
		</_Row>
	);
};