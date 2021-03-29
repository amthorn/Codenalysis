import React from "react";

export default class StretchSticky extends React.Component{
	render() {
		const style = {...this.props.style, top: 0, bottom: 0};

		return (
			<div { ...this.props } className={ `${this.props.className  } position-fixed` } style={ style }>
				{this.props.children}
			</div>
		);
	}
}