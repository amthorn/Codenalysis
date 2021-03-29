import Navbar from "components/AdminNavbar";
import Footer from "components/Footer";
import NavSidebar, { getNavItems } from "components/NavSidebar";
import { themes } from "components/ThemeContext";
import ThemeContextWrapper from "components/ThemeWrapper";
import React from "react";
import { Col,Container, Row } from "react-bootstrap";

export var NotFoundPage = function() {
	return (
		<ThemeContextWrapper theme={ themes.light }>
			<div className="wrapper">
				<div className="main-panel" data="blue">
					<div className="content p-5">
						<Container fluid={ true } >
							<Row className="justify-content-center">
								<h1>Page Not Found:(</h1>
							</Row>
							<Row className="justify-content-center">
								<text>404 Page not found</text>
							</Row>
						</Container>
					</div>
					<Footer fluid={ true }/>
				</div>
			</div>
		</ThemeContextWrapper>
	);
};