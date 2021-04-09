import React from "react";
import { Button as _Button, UncontrolledTooltip } from "reactstrap";
import { OverlayTrigger } from "react-bootstrap";
import PropTypes from "prop-types";


const Button = ({ placement, delay, id, children, help, ...properties }) => {
	return (
		<React.Fragment>
		<UncontrolledTooltip placement={ placement || "right" } target={ id } delay={ delay !== undefined ? delay : { show: 250, hide: 400 } }>
        			{ help }
      	</UncontrolledTooltip>
		<_Button id={ id } { ...properties }>{ children }</_Button>
		</React.Fragment>
	);
};

Button.propTypes = {
	id: PropTypes.string.isRequired,
	help: PropTypes.string.isRequired,
    placement: PropTypes.string,
	delay: PropTypes.object,
};

export { Button };