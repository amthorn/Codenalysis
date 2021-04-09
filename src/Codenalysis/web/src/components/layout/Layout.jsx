import Footer from "components/base/Footer";
import Navbar from "components/AdminNavbar";
import NavSidebar, { getNavItems } from "components/NavSidebar";
import { themes } from "components/layout/ThemeContext";
import ThemeContextWrapper from "components/layout/ThemeWrapper";
import StretchSticky from "components/utilities/StretchSticky";
import React from "react";
import { Button,Container } from "react-bootstrap";
import { FaChevronLeft,FaChevronRight } from "react-icons/fa";
import { withRouter } from "react-router-dom";
import { NotFoundPage } from "views/Error";


class Layout extends React.Component {

 	state = {sidebarOpened: false, notFound: false}

	toggleSidebar = () => {
		document.documentElement.classList.toggle("nav-open");
	    this.setState({sidebarOpened: !this.state.sidebarOpened});
	};

	notFound(){
		this.setState({notFound: true});
	}

	render() {
		if(this.state.notFound){
			return <NotFoundPage />;
		}

	    return (
			<ThemeContextWrapper theme={ themes.light }>
				<div className="wrapper">
					<NavSidebar toggleSidebar={ this.toggleSidebar } sidebarOpened={ this.state.sidebarOpened } { ...this.props }/>
					<div className="main-panel" data="blue">
						<Navbar toggleSidebar={ this.toggleSidebar } component={ this.props.component } { ...this.props } notFound={ () => this.notFound() } footer={ <Footer /> }/>
					</div>
				</div>
			</ThemeContextWrapper>
	    );
	}
}

export default Layout;