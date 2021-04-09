import AceEditor from "react-ace";
import { Form, PaddedCard, Container, Row, Col } from "components/Components";

// This line imports all themes
import "ace-builds/webpack-resolver";

import "ace-builds/src-noconflict/ext-language_tools.js";
import "ace-builds/src-noconflict/ext-searchbox.js";
import ModeList from "ace-builds/src-noconflict/ext-modelist.js";
import ThemeList from "ace-builds/src-noconflict/ext-themelist.js";

import React, { useState } from "react";

// https://github.com/securingsincity/react-ace

const style = {
	"maxWidth": "100%",
	"borderRadius": "5px",
    "border": "1px solid #ccc"
};
const resizable = {resize: "both", overflow: "auto", ...style}


export const CodeEditorPanel = ({ theme, mode, fontSize, setTheme, setMode, setFontSize, onChange, value, resizable }) => (
    <Container>
        <Row>
            <Col md={9}>
                <AceEditor
                    className="border-2"
                    focus={ true }
                    width="100%"
                    mode={ mode }
                    theme={ theme }
                    fontSize={ parseInt(fontSize) }
                    showPrintMargin={ false }
                    showGutter={ true }
                    highlightActiveLine={ true }
                    onChange={ onChange }
                    value={ ![undefined, ""].includes(value) ? value : `def main(argument):
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
                    style={ resizable ? resizable : style }
                />
            </Col>
            <Col md={3}>
                <CodeEditorSettingsPanel 
                    theme={ theme }
                    mode={ mode }
                    fontSize={ fontSize }
                    setTheme={ setTheme }
                    setMode={ setMode }
                    setFontSize={ setFontSize }
                />
            </Col>
        </Row>
    </Container>
)

const CodeEditorSettingsPanel = ({ theme, mode, fontSize, setFontSize, setTheme, setMode, ...props }) => (
    <PaddedCard>
        <Form>
            <Form.Select
                label="Editor Themes"
                name="editorThemes"
                subtext="Editor theme determins the color preferences for the editor."
                options={ ThemeList.themes.map(
                    i => ({name: `${i.caption} (${i.isDark ? 'dark' : 'light'})`, value: i.name})
                ) }
                defaultValue={ theme }
                onChange={ ({ target }) => setTheme(target.value) }
            />
            <Form.Select
                label="Editor Mode"
                name="editorMode"
                subtext="Editor Mode determines the programming language."
                options={ ModeList.modes.map(i => ({name: i.caption, value: i.name})) }
                defaultValue={ mode }
                onChange={ ({ target }) => setMode(target.value) }
            />
            <Form.Select
                label="Font Size"
                label="fontSize"
                subtext="Font Size determines the size of the editor text."
                options={ [6, 8, 10, 12, 14, 16, 18, 20, 24, 28].map(i => ({name: i, value: i})) }
                defaultValue={ String(fontSize) }
                onChange={ ({ target }) => setFontSize(target.value) }
            />
        </Form>
    </PaddedCard>
)
