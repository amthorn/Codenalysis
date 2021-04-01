import React from "react";

import { Tabs as _Tabs } from "react-bootstrap";

export const Tabs = ({ children, defaultActiveKey, ...props }) => (
	<_Tabs defaultActiveKey={ defaultActiveKey } { ...props }>
		{ children }
	</_Tabs>
)