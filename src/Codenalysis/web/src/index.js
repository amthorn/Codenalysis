import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom';
import Routes from "./views/_routes";
import { ToastContainer } from "react-toastify";

// Library Styles
// import "bootswatch/dist/spacelab/bootstrap.min.css";
import 'react-data-table-component-extensions/dist/index.css';
import 'react-toastify/dist/ReactToastify.css';
import 'font-awesome/css/font-awesome.min.css'; // So we can use classnames, not just react objects

import './assets/js/assets/css/nucleo-icons.css';
import './assets/js/assets/css/black-dashboard-react.css';
// import './assets/js/assets/demo/demo.css';
// Useful for reference:
// import 'assets/js/index';

// App styles
import "./assets/css/main.css"


ReactDOM.render((
  <React.StrictMode>
  	<BrowserRouter>
		<ToastContainer position="top-center"/>
		<Routes />
	</BrowserRouter>
  </React.StrictMode>
), document.getElementById('root'))
