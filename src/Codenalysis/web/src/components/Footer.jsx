import React from "react";
import { FaHeart } from "react-icons/fa.js";

// Reactstrap components
import { Container, Nav, NavItem, NavLink } from "reactstrap";

const Footer = function({ props: properties }) {
	return (
		<footer className="footer pb-0">
			<Container fluid={ true }>
				<Nav>
					<NavItem>
						<NavLink href="https://www.paypal.com/donate?business=W5AFLMVPNAXES&item_name=Contributing+to+the+continued+development+of+my+work.&currency_code=USD" target="_blank">
							Support Me
						</NavLink>
					</NavItem>
					<NavItem>
						<NavLink href="https://www.linkedin.com/in/ava-thorn-384059135/" target="_blank">
							About Me
						</NavLink>
					</NavItem>
				</Nav>
				<div className="copyright">
					© {new Date().getFullYear()} developed by{" "}
					<a
						href="https://www.linkedin.com/in/ava-thorn-384059135/"
						target="_blank" rel="noreferrer"
					>
						Ava Thorn <FaHeart />
					</a>
				</div>
			</Container>
		</footer>
	);
};

export default Footer;
