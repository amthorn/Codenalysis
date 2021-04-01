import NavSidebar from "components/NavSidebar";
import ThemeWrapper from "components/layout/ThemeWrapper";
import React from "react";
import Dashboard from "views/Dashboard";


export default class Admin extends React.Component {
	componentDidMount() {
		this.props.setBreadcrumbs([{name: "Administration", active: true}]);
	}

	render() {
		return (
			<div className="main-panel" data="blue">
				<Dashboard />
			</div>
	  	);
	}
}