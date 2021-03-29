/* 
eslint-disable
unicorn/no-abusive-eslint-disable,
eslint-comments/no-unlimited-disable 
*/
/* eslint-disable */
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Routes from "./views/Routes.jsx";

// Library Styles
import "react-toastify/dist/ReactToastify.css";

// So we can use classnames, not just react objects
import "font-awesome/css/font-awesome.min.css";
import "assets/js/assets/css/nucleo-icons.css";
import "assets/js/assets/css/black-dashboard-react.css";

// App styles
// Doesn't exist locally, but exists in container
import "assets/css/main.css";
/* eslint-enable */



/* eslint-disable react/jsx-filename-extension */
ReactDOM.render((
	<React.StrictMode>  
		<BrowserRouter>
			<ToastContainer position="top-center"/>
			<Routes />
		</BrowserRouter>
	</React.StrictMode>
), document.querySelector("#root"));
/* eslint-enable react/jsx-filename-extension */
