// Javascript plugin used to create scrollbars on windows
import PerfectScrollbar from "perfect-scrollbar";

// Nodejs library to set properties for components
import { PropTypes } from "prop-types";
import React from "react";
import { Nav } from "react-bootstrap";
import { Link, NavLink, useLocation } from "react-router-dom";

// Reactstrap components
import { NavLink as ReactstrapNavLink } from "reactstrap";

let ps;

const Sidebar = function(properties) {
	const location = useLocation();
	const sidebarReference = React.useRef(null);

	// Verifies if routeName is the one active (in browser input)
	const activeRoute = (routeName) => location.pathname === routeName ? "active" : "";

	React.useEffect(() => {
		if (navigator.platform.includes("Win")) {
			ps = new PerfectScrollbar(sidebarReference.current, {
				suppressScrollX: true,
				suppressScrollY: false,
			});
		}


		// Specify how to clean up after this effect:
		return function cleanup() {
			if (navigator.platform.includes("Win")) {
				ps.destroy();
			}
		};
	});

	const linkOnClick = () => {
		document.documentElement.classList.remove("nav-open");
	};
	const { routes, rtlActive, logo } = properties;

	let logoImg = null;
	let logoText = null;

	if (logo !== undefined) {
		if (logo.outterLink !== undefined) {
			logoImg = (
				<a
					href={ logo.outterLink }
					className="simple-text logo-mini"
					target="_blank"
					onClick={ properties.toggleSidebar } rel="noreferrer"
				>
					<div className="logo-img">
						<img src={ logo.imgSrc } alt="react-logo" />
					</div>
				</a>
			);
			logoText = (
				<a
					href={ logo.outterLink }
					className="simple-text logo-normal"
					target="_blank"
					onClick={ properties.toggleSidebar } rel="noreferrer"
				>
					{logo.text}
				</a>
			);
		} else {
			logoImg = (
				<Link
					to={ logo.innerLink }
					className="simple-text logo-mini"
					onClick={ properties.toggleSidebar }
				>
					<div className="logo-img">
						<img src={ logo.imgSrc } alt="react-logo" />
					</div>
				</Link>
			);
			logoText = (
				<Link
					to={ logo.innerLink }
					className="simple-text logo-normal"
					onClick={ properties.toggleSidebar }
				>
					{logo.text}
				</Link>
			);
		}
	}

	return (
		<div className="sidebar" data="blue">
			<div className="sidebar-wrapper" ref={ sidebarReference }>
				<div className="logo">
					{properties.logoElement}
				</div>
				<Nav>
					{routes.map((property, key) => {
						if (property.redirect) {return null;}

						return (
							<li
								key={ key }
							>
								<NavLink
									to={ property.path.startsWith("/") ? property.path : ([location.pathname, property.path].join("/")) }
									className="nav-link"
									activeClassName="active"
									onClick={ properties.toggleSidebar }
								>
									<p>
										{ React.isValidElement(property.icon) ?  property.icon : <i className={ property.icon } />}
										{rtlActive ? property.rtlName : property.name}
									</p>
								</NavLink>
							</li>
						);
					})}
					{<li className="administration-nav-link">
						<ReactstrapNavLink href="/admin">
							<i className="fa fa-user-o" />
							<p>Administration</p>
						</ReactstrapNavLink>
					</li>}
				</Nav>
			</div>
		</div>
	);
};

Sidebar.defaultProps = {
	rtlActive: false,
	routes: [{}],
};

Sidebar.propTypes = {
	// If true, then instead of the routes[i].name, routes[i].rtlName will be rendered
	// insde the links of this component
	rtlActive: PropTypes.bool,
	routes: PropTypes.arrayOf(PropTypes.object),

	logo: PropTypes.shape({
		// InnerLink is for links that will direct the user within the app
		// it will be rendered as <Link to="...">...</Link> tag
		innerLink: PropTypes.string,

		// OutterLink is for links that will direct the user outside the app
		// it will be rendered as simple <a href="...">...</a> tag
		outterLink: PropTypes.string,

		// The text of the logo
		text: PropTypes.node,

		// The image src of the logo
		imgSrc: PropTypes.string,
	}),
};

export default Sidebar;
