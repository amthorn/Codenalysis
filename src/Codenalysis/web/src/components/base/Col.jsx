import React from "react";
import { Col as _Col } from "react-bootstrap";
import classNames from "classnames/dedupe";

// bootstrap doesn't always add "col" class. E.G. "col-md-9"
export const Col = ({ children, ...props }) => {
	return (
		<_Col { ...props } >
			{ children }
		</_Col>
	);
};