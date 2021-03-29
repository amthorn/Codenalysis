import React from "react";
import { Container } from "react-bootstrap";


export var NiceContainer = function({ children, ...properties }) {
	const style = {
		"box-shadow": "0 2px 22px 0 rgb(0 0 0 / 10%), 0 4px 20px 0 rgb(0 0 0 / 15%)",
		"border-radius": "5px"
	};

	return (
		<Container { ...properties } data={ properties.data || "white" } style={ { ...style, ...properties.style } }>
			{ children }
		</Container>
	);
};