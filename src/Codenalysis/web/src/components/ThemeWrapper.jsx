import React, { useEffect,useState } from "react";

import { ThemeContext, themes } from "../../contexts/ThemeContext.js";

export default function ThemeContextWrapper(properties) {
	const [theme, setTheme] = useState(properties.theme);

	function changeTheme(theme) {
		setTheme(theme);
	}

	useEffect(() => {
		switch (theme) {
		case themes.light:
			document.body.classList.add("white-content");

			break;
		case themes.dark:

		default:
			document.body.classList.remove("white-content");

			break;
		}
	}, [theme]);

	return (
		<ThemeContext.Provider value={ { theme, changeTheme } }>
			{properties.children}
		</ThemeContext.Provider>
	);
}
