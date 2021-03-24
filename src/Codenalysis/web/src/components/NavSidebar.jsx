import React from "react";
import StretchSticky from "components/utilities/StretchSticky";

import { Navigation } from 'react-minimal-side-navigation';
import { 
	FaHome, 
	FaProjectDiagram, 
	FaCubes, 
	FaHistory, 
	FaFileCode, 
	FaClipboardList, 
	FaChartLine, 
	FaComment, FaChess, FaCheckCircle, FaChartBar, FaEdit, FaLandmark, FaSlidersH, FaAward } from 'react-icons/fa';
import { withRouter } from "react-router-dom";
import { Container, Row } from "react-bootstrap";
import config from "config.json";

import Sidebar from "assets/js/components/Sidebar/Sidebar";
import Projects from "views/Projects"

// import 'react-minimal-side-navigation/lib/ReactMinimalSideNavigation.css';

const navItems = {
	// TODO: authenticate admin appearance in sidebar:
	'^/$': [
		{
			path: "",
			name: "Projects",
			icon: <FaProjectDiagram size="20" className="sidenav-icon" />,
			component: Projects,
			layout: "/projects",
		},
		{
			path: "library",
			name: "Library",
			icon: <FaCubes size="20" className="sidenav-icon" />,
			// component: Dashboard,
			layout: "/",
		},
	],
	'^/projects/(.*)$': [
		{
			path: "edit",
			name: "Edit",
			icon: <FaEdit size="20" className="sidenav-icon" />,
			// component: Dashboard,
			layout: "/projects/:id/",
		},
		{
			path: "challenges",
			name: "Challenges",
			icon: <FaChess size="20" className="sidenav-icon" />,
			// component: Dashboard,
			layout: "/projects/:id/",
		},
		{
			path: "submissions",
			name: "Submissions",
			icon: <FaClipboardList size="20" className="sidenav-icon" />,
			// component: Dashboard,
			layout: "/projects/:id/",
		},
		{
			path: "achievements",
			name: "Achievements",
			icon: <FaAward size="20" className="sidenav-icon" />,
			// component: Dashboard,
			layout: "/projects/:id/achievements",
		},
		{
			path: "history",
			name: "History",
			icon: <FaHistory size="20" className="sidenav-icon" />,
			// component: Dashboard,
			layout: "/projects/:id/",
		},
		{
			path: "metrics",
			name: "Metrics",
			icon: <FaChartLine size="20" className="sidenav-icon" />,
			// component: Dashboard,
			layout: "/projects/:id/",
		},
		{
			path: "settings",
			name: "Settings",
			icon: <FaSlidersH size="20" className="sidenav-icon" />,
			// component: Dashboard,
			layout: "/projects/:id/",
		},
	],
	'/projects/:id/challenges/:id': [
		{
			path: "edit",
			name: "Edit",
			icon: <FaEdit size="20" className="sidenav-icon" />,
			// component: Dashboard,
			layout: "/projects/:id/challenges/:id/",
		},
		{
			path: "solutions",
			name: "Solutions",
			icon: <FaCheckCircle size="20" className="sidenav-icon" />,
			// component: Dashboard,
			layout: "/projects/:id/challenges/:id/",
		},
		/* TODO , nice circle notification next to this menu item if submissions need to be reviewed*/
		{
			path: "submissions",
			name: "Submissions",
			icon: <FaClipboardList size="20" className="sidenav-icon" />,
			// component: Dashboard,
			layout: "/projects/:id/challenges/:id/",
		},
		{
			path: "comments",
			name: "Comments",
			icon: <FaComment size="20" className="sidenav-icon" />,
			// component: Dashboard,
			layout: "/projects/:id/challenges/:id/comments",
		},
		{
			path: "rankings",
			name: "Rankings",
			icon: <FaLandmark size="20" className="sidenav-icon" />,
			// component: Dashboard,
			layout: "/projects/:id/challenges/:id/",
		},
		{
			path: "metrics",
			name: "Metrics",
			icon: <FaChartBar size="20" className="sidenav-icon" />,
			// component: Dashboard,
			layout: "/projects/:id/challenges/:id/",
		},
		{
			path: "history",
			name: "History",
			icon: <FaHistory size="20" className="sidenav-icon" />,
			// component: Dashboard,
			layout: "/projects/:id/challenges/:id/",
		},
		{
			path: "settings",
			name: "Settings",
			icon: <FaSlidersH size="20" className="sidenav-icon" />,
			// component: Dashboard,
			layout: "/projects/:id/challenges/:id/",
		},
	],
	'/admin': [

	]
}

export function getNavItems(path){
	for(const regex in navItems){
		if(path.match(RegExp(regex))){
			return navItems[regex]
		}
	}
	return navItems['^/$']
}

class NavSidebar extends React.Component {
	render() {
	    return (
	    	<Sidebar 
	    		routes={ getNavItems(window.location.pathname) }
	    		logoElement={
	    			<a href="/"><img src="/logo.png" /></a>
	    		}
	    	/>
		)
	}
};
export default withRouter(NavSidebar)
