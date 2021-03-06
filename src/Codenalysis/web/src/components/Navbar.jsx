// !
// 
// =========================================================
// Black Dashboard React v1.2.0
// =========================================================
// 
// Product Page: https://www.creative-tim.com/product/black-dashboard-react
// Copyright 2020 Creative Tim (https://www.creative-tim.com)
// Licensed under MIT (https://github.com/creativetimofficial/black-dashboard-react/blob/master/LICENSE.md)
// 
// Coded by Creative Tim
// 
// =========================================================
// 
// The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
// 
// 
// nodejs library that concatenates classes
import classNames from "classnames";
import React from "react";
import { Link } from "react-router-dom";

// Reactstrap components
import {
	Breadcrumb,
	BreadcrumbItem,
	Button,
	Container,
	DropdownItem,
	DropdownMenu,

  // Collapse,
	DropdownToggle,
	Input,
	InputGroup,
	Modal,
	ModalHeader,
	Nav,
	Navbar as NvBr,
	NavbarBrand,
	NavbarToggler,
	NavLink,
	// Row,
	UncontrolledDropdown} from "reactstrap";
import { Row } from "components/base/Row";
import { logout } from "functions/auth";

function getBreadcrumbs(breadcrumbs){
	return (
		<Breadcrumb>
			{ 
        breadcrumbs.map(index => (
          <BreadcrumbItem key={ index.to ? index.to : 'active' }>
          {
            index.to ? <Link key={ index.to ? index.to : 'active' } active={ index.active } to={ index.to }>
              { index.name }
            </Link> : <div key={ index.to ? index.to : 'active' }>
              { index.name }
            </div> 
          }
          </BreadcrumbItem>
        ))
      }
		</Breadcrumb>
	);
}

export const Navbar = (properties) => {
	const [collapseOpen, setcollapseOpen] = React.useState(false);
	const [modalSearch, setmodalSearch] = React.useState(false);
	const [pageData, setPageData] = React.useState({});
	const [color, setcolor] = React.useState("");

	React.useEffect(() => {
		window.addEventListener("resize", updateColor);


		// Specify how to clean up after this effect:
		return function cleanup() {
			window.removeEventListener("resize", updateColor);
		};
	});


	// Function that adds color white/transparent to the navbar on resize (this is for the collapse)
	const updateColor = () => {
		if (window.innerWidth < 993 && collapseOpen) {
			setcolor("bg-white");
		} else {
			setcolor("navbar-transparent");
		}
	};

	// This function opens and closes the collapse on small devices
	const toggleCollapse = () => {
		if (collapseOpen) {
			setcolor("navbar-transparent");
		} else {
			setcolor("bg-white");
		}

		setcollapseOpen(!collapseOpen);
	};

	// This function is to open the Search modal
	const toggleModalSearch = () => {
		setmodalSearch(!modalSearch);
	};

	let args = properties.urlData?.params?.map(param => properties.match.params[param])
	const url = properties.urlData?.url?.format(...args)

	return (
		<React.Fragment>
			<NvBr className={ classNames("fixed-top white-content", color) } expand="lg">
				<Container fluid={ true } className="px-0">
					<div className="navbar-wrapper">
						<div
							className={ classNames("navbar-toggle d-inline w-100 h-100", {
								toggled: properties.sidebarOpened,
							}) }
						>
							<NavbarToggler onClick={ properties.toggleSidebar }>
								<span className="navbar-toggler-bar bar1" />
								<span className="navbar-toggler-bar bar2" />
								<span className="navbar-toggler-bar bar3" />
							</NavbarToggler>
						</div>
						<NavbarBrand href="#pablo" onClick={ (error) => error.preventDefault() }/>
					</div>
					<NavbarToggler onClick={ toggleCollapse }>
						<span className="navbar-toggler-bar navbar-kebab" />
						<span className="navbar-toggler-bar navbar-kebab" />
						<span className="navbar-toggler-bar navbar-kebab" />
					</NavbarToggler>
					{ properties.breadcrumbs ? getBreadcrumbs(properties.breadcrumbs) : null }
					<Nav className="ml-auto" navbar={ true }>
						<InputGroup className="search-bar">
							<Button color="link" onClick={ toggleModalSearch }>
								<i className="tim-icons icon-zoom-split"  style={{ color: "#1d253b" }}/>
								<span className="d-lg-none d-md-block">Search</span>
							</Button>
						</InputGroup>
						<UncontrolledDropdown nav={ true }>
							<DropdownToggle
								caret={ true }
								color="default"
								data-toggle="dropdown"
								nav={ true } 
								style={{ color: "#1d253b" }}
							>
								<div className="notification d-none d-lg-block d-xl-block" />
								<i className="tim-icons icon-sound-wave"  style={{ color: "#1d253b" }}/>
								<p className="d-lg-none">Notifications</p>
							</DropdownToggle>
							<DropdownMenu className="dropdown-navbar" right={ true } tag="ul">
								<NavLink tag="li">
									<DropdownItem className="nav-item">
										Mike John responded to your email
									</DropdownItem>
								</NavLink>
								<NavLink tag="li">
									<DropdownItem className="nav-item">
										You have 5 more tasks
									</DropdownItem>
								</NavLink>
								<NavLink tag="li">
									<DropdownItem className="nav-item">
										Your friend Michael is in town
									</DropdownItem>
								</NavLink>
								<NavLink tag="li">
									<DropdownItem className="nav-item">
										Another notification
									</DropdownItem>
								</NavLink>
								<NavLink tag="li">
									<DropdownItem className="nav-item">
										Another one
									</DropdownItem>
								</NavLink>
							</DropdownMenu>
						</UncontrolledDropdown>
						<UncontrolledDropdown nav={ true }>
							<DropdownToggle
								caret={ true }
								color="default"
								nav={ true }
								onClick={ (error) => error.preventDefault() }
								style={{ color: "#1d253b" }}
							>
								<div className="photo">
									<img
										alt="..."
										src="assets/img/anime3.png"
									/>
								</div>
								<p className="d-lg-none">Log out</p>
							</DropdownToggle>
							<DropdownMenu className="dropdown-navbar" right={ true } tag="ul">
								<NavLink tag="li">
									<DropdownItem className="nav-item">Profile</DropdownItem>
								</NavLink>
								<NavLink tag="li">
									<DropdownItem className="nav-item">Settings</DropdownItem>
								</NavLink>
								<DropdownItem divider={ true } tag="li" />
								<NavLink tag="li">
									<DropdownItem onClick={ () => {
										logout();
										console.log(properties)
										properties.history.push('/login');
									} } className="nav-item">Log out</DropdownItem>
								</NavLink>
							</DropdownMenu>
						</UncontrolledDropdown>
						<li className="separator d-lg-none" />
					</Nav>
				</Container>
			</NvBr>
			<Modal
				modalClassName="modal-search"
				isOpen={ modalSearch }
				toggle={ toggleModalSearch }
			>
				<ModalHeader>
					<Input placeholder="SEARCH" type="text" />
					<button
						aria-label="Close"
						className="close"
						onClick={ toggleModalSearch }
					>
						<i className="tim-icons icon-simple-remove" />
					</button>
				</ModalHeader>
			</Modal>
		</React.Fragment>
	);
};
