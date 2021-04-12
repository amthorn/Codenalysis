import Navbar from "components/Navbar";
import Footer from "components/base/Footer";
import { themes } from "components/layout/ThemeContext";
import { ThemeContextWrapper } from "components/Components";
import React from "react";
import { Col, Container, Row } from "react-bootstrap";

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
								<span>404 Page not found</span>
							</Row>
						</Container>
					</div>
					<Footer fluid={ true }/>
				</div>
			</div>
		</ThemeContextWrapper>
	);
};