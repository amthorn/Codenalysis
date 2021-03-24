import React from "react";
import NavSidebar, { getNavItems } from "components/NavSidebar";
import StretchSticky from "components/utilities/StretchSticky"
import { Container, Button } from "react-bootstrap";
import { FaChevronRight, FaChevronLeft } from 'react-icons/fa';
import ThemeContextWrapper from "assets/js/components/ThemeWrapper/ThemeWrapper";
import { themes } from "assets/js/contexts/ThemeContext";
import Navbar from "assets/js/components/Navbars/AdminNavbar";
import { withRouter } from "react-router-dom";


class Layout extends React.Component {
	constructor(props){
		super(props)
		this.state = {sidebarOpened: false}
	}

	toggleSidebar = () => {
		document.documentElement.classList.toggle("nav-open");
	    this.setState({sidebarOpened: !this.state.sidebarOpened});
	};

	// getPathText() {
	// 	console.log(this.props)
	// 	return `Project ${this.props.match.params.project_id}`
	// }

	render() {
     	return (
    		<ThemeContextWrapper theme={themes.light}>
	     		<div className="wrapper">
	     			<NavSidebar toggleSidebar={ this.toggleSidebar } sidebarOpened={ this.state.sidebarOpened } { ...this.props }/>
	     			<div className="main-panel" data="blue">
	     				<Navbar toggleSidebar={ this.toggleSidebar } component={ this.props.component } { ...this.props }/>
		    		</div>
	            </div>
            </ThemeContextWrapper>
        )
	}
}

export default Layout;