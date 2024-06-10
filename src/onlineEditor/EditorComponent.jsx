import React, { useState, useCallback } from 'react';
import Editor from '@monaco-editor/react';
import './EditorComponent.css';
import Dashboard from '../dashBoard/Dashboard';
import JDoodleExample from '../JDoodle/JDoodleExample';
import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import TextField from '@mui/material/TextField';

const EditorComponent = () => {
    const [code, setCode] = useState('// Online Java Compiler\n// Use this editor to write, compile and run your Java code online\n\npublic class HelloWorld {\n    public static void main(String[] args) {\n        System.out.println("Made by Yadi!");\n    }\n}');
    const [output, setOutput] = useState('');
    const [iSubmit, setiSubmit] = useState(false);
    const [language, setLanguage] = useState("java");
    const [input, setInput] = useState('');

    const handleEditorChange = (value) => {
        setCode(value);
    };

    const runCode = async () => {
        setiSubmit(true);
        const output = await JDoodleExample(code, language, input);
        setiSubmit(false);
        setOutput(output);
    };

    const handleLanguageChange = useCallback((lang) => {
        setLanguage(lang);
    }, []);

    const clearOutput = () => {
        setOutput('');
        setInput('');
    };

    const handleInput = (e) => {
        setInput(e.target.value);
    };

    return (
        <div className='super'>
            <Dashboard />
            <div className="editor-container">
                <div className="editor-section">
                    <div className="editor-header">
                        <span className='left-button'>Main.java</span>
                        <div className="right-buttons">
                            <Dropdown as={ButtonGroup}>
                                <Button variant="primary">{language}</Button>
                                <Dropdown.Toggle split variant="primary" id="dropdown-split-basic" />
                                <Dropdown.Menu>
                                    <Dropdown.Item onClick={() => handleLanguageChange("java")}>Java</Dropdown.Item>
                                    <Dropdown.Item onClick={() => handleLanguageChange("c")}>C</Dropdown.Item>
                                    <Dropdown.Item onClick={() => handleLanguageChange("cpp")}>C++</Dropdown.Item>
                                    <Dropdown.Item onClick={() => handleLanguageChange("javascript")}>JavaScript</Dropdown.Item>
                                    <Dropdown.Item onClick={() => handleLanguageChange("python3")}>Python3</Dropdown.Item>
                                    <Dropdown.Item onClick={() => handleLanguageChange("python2")}>Python2</Dropdown.Item>
                                    <Dropdown.Item onClick={() => handleLanguageChange("php")}>PHP</Dropdown.Item>
                                    <Dropdown.Item onClick={() => handleLanguageChange("typescript")}>TypeScript</Dropdown.Item>
                                    <Dropdown.Item onClick={() => handleLanguageChange("bash")}>Bash</Dropdown.Item>
                                    <Dropdown.Item onClick={() => handleLanguageChange("sh")}>Shell</Dropdown.Item>
                                    <Dropdown.Item onClick={() => handleLanguageChange("kotlin")}>Kotlin</Dropdown.Item>
                                    <Dropdown.Item onClick={() => handleLanguageChange("rust")}>Rust</Dropdown.Item>
                                    <Dropdown.Item onClick={() => handleLanguageChange("scala")}>Scala</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                            <Button onClick={runCode} variant="primary">
                                Run {iSubmit && <Spinner animation="border" size="sm" />}
                            </Button>
                        </div>
                    </div>
                    <Editor
                        height="calc(100vh - 40px)" // Adjust height considering header size
                        language={language}
                        value={code}
                        onChange={handleEditorChange}
                        options={{
                            minimap: { enabled: false },  // Disable minimap
                            scrollbar: {
                                vertical: 'hidden',  // Hide vertical scrollbar
                                horizontal: 'hidden'  // Hide horizontal scrollbar
                            }
                        }}
                    />
                </div>
                <div className="output-section">
                    <div className="output-header">
                        <span>Output</span>
                        <Button onClick={clearOutput} variant="primary">
                            Clear
                        </Button>
                    </div>
                    <pre>{output}</pre>
                    <TextField
                        id="outlined-multiline-flexible"
                        label="Input"
                        multiline
                        maxRows={4}
                        value={input}
                        onChange={handleInput}
                    />
                    <p style={{marginTop:"40px", color:"white"}}>.</p>
                </div>
            </div>
        </div>
    );
};

export default React.memo(EditorComponent);