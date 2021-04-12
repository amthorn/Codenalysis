import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { FaChevronLeft,FaChevronRight } from "react-icons/fa";
import { withRouter, Redirect } from "react-router-dom";
import { NotFoundPage } from "views/Error";
import { request } from "functions/request";
import { authCheck } from "functions/auth";
import { Spinner } from "components/base/BaseComponents";
import { 
	// // Spinner, 
	// Footer, 
	Container,
	Row,
	Navbar, 
	NavSidebar,
	Footer,
	// getNavItems, 
	ThemeContextWrapper
	// StretchSticky
} from "components/Components";
import { PageLoadRestController } from "components/Controllers/Controllers";
import { themes } from "./ThemeContext";

export const Layout = ({ location, history, ...props}) => {

 	let [sidebarOpened, setSidebarOpened] = useState(false);
 	let [notFound, setNotFound] = useState(false);
 	let [loading, setLoading] = useState(true);
 	let [authenticated, setAuthenticated] = useState(false);
 	let [breadcrumbs, setBreadcrumbs] = useState([]);
 	let [pageData, setPageData] = useState(null);

	const toggleSidebar = () => {
		document.documentElement.classList.toggle("nav-open");
	    this.setState({sidebarOpened: !this.state.sidebarOpened});
	};

	useEffect(() => {
		authCheck().then(success => {
			console.log(success)
			setAuthenticated(success);
			setLoading(false);
		})
	}, []);

	const content = () => (
		<>
			<Navbar 
				toggleSidebar={ toggleSidebar } 
				notFound={ () => setNotFound(true) }
				breadcrumbs={ breadcrumbs }
				history={ history }
			/>
			<NavSidebar 
				toggleSidebar={ toggleSidebar } 
				sidebarOpened={ sidebarOpened }
			/>
			<div className="main-panel" data="blue">
				<Container className="content" fluid={ true }>
					<Row>
	 					<PageLoadRestController 
	 						url={ props.url } 
	 						setBreadcrumbs= { setBreadcrumbs } 
	 						setData={ setPageData }
	 					>
							{ React.createElement(props.component, { ...props, pageData }) }
						</PageLoadRestController>
					</Row>
					<Row className="flex-column">
						<Footer />
					</Row>
				</Container>
			</div>
		</>
	)

	if(notFound){
		return <NotFoundPage />;
	}

	if (!authenticated && !loading) {
		return <Redirect to={ `/login?redirect=${encodeURIComponent(location.pathname)}` } />;
	}

	return (
		<ThemeContextWrapper theme={ themes.light }>
			<div className="wrapper">
				{ authenticated && !loading ? content() : <Spinner lg={ true }/> }
			</div>
		</ThemeContextWrapper>
	)
}