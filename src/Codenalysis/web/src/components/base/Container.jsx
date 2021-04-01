import React from "react";
import { Container as _Container } from "react-bootstrap";
import classNames from "classnames";


export const Container = ({ children, ...props }) => {
	return (
		<_Container { ...props } fluid={ props.fluid || "inf" }>
			{ children }
		</_Container>
	);
};