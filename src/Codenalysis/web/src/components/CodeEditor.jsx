import AceEditor from "react-ace";
import { FormSelect, PaddedCard } from "components/Components";

import { Form, Container } from "react-bootstrap";

// This line imports all themes
import "ace-builds/webpack-resolver";

import "ace-builds/src-noconflict/ext-language_tools.js";
import "ace-builds/src-noconflict/ext-searchbox.js";
import ModeList from "ace-builds/src-noconflict/ext-modelist.js";
import ThemeList from "ace-builds/src-noconflict/ext-themelist.js";

import React, { useState } from "react";

// https://github.com/securingsincity/react-ace

const style = {
	"max-width": "100%",
	"border-radius": "5px",
    "border": "1px solid #ccc"
};
const resizable = {resize: "both", overflow: "auto", ...style}

export class CodeEditor extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            theme: this.props.defaultSelectedTheme || "sqlserver",
            mode: this.props.defaultSelectedMode || "python",
            fontSize: this.props.defaultSelectedFontSize || 14
        }
    }
    render(){
        console.log(this.state)
        return (
        	<AceEditor
                ref="ace"
            	focus={ true }
            	width="100%"
            	height={ this.props.height }
            	mode={ this.state.mode }
            	theme={ this.state.theme }
            	fontSize={ parseInt(this.state.fontSize) }
            	showPrintMargin={ false }
            	showGutter={ true }
            	highlightActiveLine={ true }
            	value={ this.props.value || `def main(**kwargs):
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
        			enableLiveAutocompletion: false,  // TODO Disable enable basic autocomplete (Make this an option per challenge)
        			enableSnippets: false,
        			showLineNumbers: true,
        			tabSize: 4,
                    useWorker: false // TODO Disable syntax check (Make this an option per challenge)
        		} }
        		style={ this.props.resizable ? resizable : style }
        		{ ...this.props }
        	/>
        )
    }
};

export const CodeEditorSettings = {
    'themeList': ThemeList,
    'modeList': ModeList
};

export const CodeEditorSettingsPanel = ({ defaultSelectedTheme, defaultSelectedMode, defaultSelectedFontSize, fontSizeChanged, themeChanged, modeChanged, ...props }) => {
    const [theme, setTheme] = useState(defaultSelectedTheme)
    const [mode, setMode] = useState(defaultSelectedMode)
    const [fontSize, setFontSize] = useState(defaultSelectedFontSize)
    console.log(fontSizeChanged)
    return (
        <PaddedCard>
            <Form>
                <FormSelect 
                    label="Editor Themes" 
                    subtext="Editor theme determins the color preferences for the editor."
                    controlId="CodeEditorForm.Themes"
                    options={ CodeEditorSettings.themeList.themes.map(
                        i => ({name: `${i.caption} (${i.isDark ? 'dark' : 'light'})`, value: i.name})
                    ) }
                    selectedValue={ theme }
                    onChange={ (event) => {
                        setTheme(event.target.value)
                        themeChanged(event.target.value)
                    } }
                    { ...props }
                />
                <FormSelect 
                    label="Editor Mode" 
                    subtext="Editor Mode determines the programming language."
                    controlId="CodeEditorForm.Modes"
                    options={ CodeEditorSettings.modeList.modes.map(i => ({name: i.caption, value: i.name})) }
                    selectedValue={ mode }
                    onChange={ (event) => {
                        setMode(event.target.value)
                        modeChanged(event.target.value)
                    } }
                    { ...props }
                />
                <FormSelect 
                    label="Font Size" 
                    subtext="Font Size determines the size of the editor text."
                    controlId="CodeEditorForm.FontSize"
                    options={ [6, 8, 10, 12, 14, 16, 18, 20, 24, 28].map(i => ({name: i, value: i})) }
                    selectedValue={ fontSize }
                    onChange={ (event) => {
                        setFontSize(event.target.value)
                        fontSizeChanged(event.target.value)
                    } }
                    { ...props }
                />
            </Form>
        </PaddedCard>
    )
}