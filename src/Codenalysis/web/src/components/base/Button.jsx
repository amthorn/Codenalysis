import React from "react";
import { Button as _Button, OverlayTrigger, Tooltip } from "react-bootstrap";


export const Button = ({ placement, delay, id, children, help, ...properties }) => {
	return (
		  <OverlayTrigger
		  	id={ id }
		    placement={ placement || "right" }
		    delay={ delay || { show: 250, hide: 400 } }
		    overlay={ 
				<Tooltip>
					{ help }
				</Tooltip>
  			}
		  >
			<_Button { ...properties }>{ children }</_Button>
		  </OverlayTrigger>
	);
};