import "ace-builds/src-noconflict/mode-python.js";
import "ace-builds/src-noconflict/theme-sqlserver.js";
import "ace-builds/src-noconflict/ext-language_tools.js";
import "ace-builds/src-noconflict/ext-modelist.js";
import "ace-builds/src-noconflict/ext-searchbox.js";
import "ace-builds/src-noconflict/ext-statusbar.js";
import "ace-builds/src-noconflict/ext-themelist.js";
import "ace-builds/src-noconflict/ext-keybinding_menu.js";
import "ace-builds/src-noconflict/ext-options.js";

import SettingsMenu from "ace-builds/src-noconflict/ext-settings_menu.js";
import React from "react";
import AceEditor from "react-ace";

// https://github.com/securingsincity/react-ace

const style = {
	"max-width": "100%",
	"border-radius": "5px"
};

export var CodeEditor = function({ resizable, height, ...properties }) {
	return (
		<AceEditor
			focus={ true }
			width="100%"
			height={ height }
			mode="python"
			theme="sqlserver"
			fontSize={ 14 }
			showPrintMargin={ false }
			showGutter={ true }
			highlightActiveLine={ true }
			value={ `def main(**kwargs):
    """
    This function is how your program will be tested.
    Please don't change the name of this function.
    The input to the challenge will be sent to this
    function as keyword arguments. These arguments are
    specified in the above challenge description.
    
    The output of this function must be *only* the
    target solution output specified above. The output
    must be of the correct type or it will be marked
    as incorrect.
    """
    ` }
			setOptions={ {
				enableBasicAutocompletion: false,
				enableLiveAutocompletion: true,
				enableSnippets: false,
				showLineNumbers: true,
				tabSize: 4,
			} }
			style={ resizable ? {resize: "both", overflow: "auto", ...style} : style }
			{ ...properties }
		/>
            
	);
};