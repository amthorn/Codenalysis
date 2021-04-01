import React from "react";
import classNames from "classnames/dedupe";

export const ComingSoon = () => {
	const style = {
		'border': '1px solid',
		'border-radius': '5px',
		'line-height': '18px',
		'float': 'right',
		'margin-right': '-10px',
		'margin-top': '5px'
	}
	return (
		<div className={ classNames('bg-danger', 'd-inline-flex', 'px-1') } style={style}>
			Coming
		</div>
	)
}