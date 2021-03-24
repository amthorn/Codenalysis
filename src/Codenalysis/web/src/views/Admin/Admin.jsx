import React from "react";

import NavSidebar from "components/NavSidebar"
// import Navbar from "assets/js/components/Navbars/AdminNavbar";
import ThemeWrapper from "assets/js/components/ThemeWrapper/ThemeWrapper"
import Dashboard from "assets/js/views/Dashboard";


export default class Admin extends React.Component {
	componentDidMount() {
		this.props.setBreadcrumbs([{name: "Administration", active: true}])
	}
	render() {
		return (
	      			<div className="main-panel" data="blue">
	          			<Dashboard />
	      			</div>
	  	)
	}
}