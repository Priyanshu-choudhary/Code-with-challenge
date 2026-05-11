import React, { useEffect, useState, useCallback, useContext } from 'react';
import Editor from '@monaco-editor/react';
import './EditorComponent.css';
import Dashboard from '../dashBoard/Dashboard';
import { runCode as judge0Run } from '../judge0/judge0Service';
import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import TextField from '@mui/material/TextField';
import { UserContext } from '../Context/UserContext';

const EditorComponent = ({initialValue}) => {
   const [code, setCode] = useState(initialValue || 
`// Online Java Compiler
// Use this editor to write, compile and run your Java code online

public class Main {
    public static void main(String[] args) {
        System.out.println("Made by Yadi!");
    }
}`);
    const [output, setOutput] = useState('');
    const [iSubmit, setiSubmit] = useState(false);
    const [language, setLanguage] = useState('java');
    const [input, setInput] = useState('');
    const { ibg, bc, bg, light, dark } = useContext(UserContext);
    const [themes, setThemes] = useState('vs-dark');
    const [editorLanguage, setEditorLanguage] = useState(language);

    useEffect(() => {
        if (bg === '#121418') {
            setThemes('vs-dark');
        } else {
            setThemes('light');
        }
    }, [bg]);

    useEffect(() => {
        if (language === "python3" || language === "python2") {
            setEditorLanguage("python");
        } else {
            setEditorLanguage(language);
        }
    }, [language]);

    const handleEditorChange = (value) => {
        setCode(value);
    };

    const runCode = async () => {
        setiSubmit(true);
        try {
            const result = await judge0Run(code, language, input);
            setOutput(result);
        } catch (e) {
            setOutput({ stderr: e.message });
        } finally {
            setiSubmit(false);
        }
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
           {!initialValue && <Dashboard />}
            <div className="editor-container">
                <div className="editor-section">
                    <div className="editor-header" style={{ backgroundColor: dark, color: ibg }}>
                        <span className='left-button'>Main</span>
                        <div className="right-buttons">
                            <Dropdown as={ButtonGroup} style={{ backgroundColor: bc, color: ibg }}>
                                <Button variant="primary" style={{ backgroundColor: bc, color: ibg }}>{language}</Button>
                                <Dropdown.Toggle split variant="primary" id="dropdown-split-basic" style={{ backgroundColor: bc, color: ibg }} />
                                <Dropdown.Menu>
                                    <Dropdown.Item onClick={() => handleLanguageChange('java')}>Java</Dropdown.Item>
                                    <Dropdown.Item onClick={() => handleLanguageChange('c')}>C</Dropdown.Item>
                                    <Dropdown.Item onClick={() => handleLanguageChange('cpp')}>C++</Dropdown.Item>
                                    <Dropdown.Item onClick={() => handleLanguageChange('javascript')}>JavaScript</Dropdown.Item>
                                    <Dropdown.Item onClick={() => handleLanguageChange('python3')}>Python3</Dropdown.Item>
                                    <Dropdown.Item onClick={() => handleLanguageChange('python2')}>Python2</Dropdown.Item>
                                    <Dropdown.Item onClick={() => handleLanguageChange('php')}>PHP</Dropdown.Item>
                                    <Dropdown.Item onClick={() => handleLanguageChange('typescript')}>TypeScript</Dropdown.Item>
                                    <Dropdown.Item onClick={() => handleLanguageChange('bash')}>Bash</Dropdown.Item>
                                    <Dropdown.Item onClick={() => handleLanguageChange('sh')}>Shell</Dropdown.Item>
                                    <Dropdown.Item onClick={() => handleLanguageChange('kotlin')}>Kotlin</Dropdown.Item>
                                    <Dropdown.Item onClick={() => handleLanguageChange('rust')}>Rust</Dropdown.Item>
                                    <Dropdown.Item onClick={() => handleLanguageChange('scala')}>Scala</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                            <Button onClick={runCode} variant="primary" style={{ backgroundColor: bc, color: ibg }}>
                                Run {iSubmit && <Spinner animation="border" size="sm" />}
                            </Button>
                        </div>
                    </div>
                    <Editor
                        height="calc(100vh - 40px)" // Adjust height considering header size
                        language={editorLanguage}
                        value={code}
                        onChange={handleEditorChange}
                        theme={themes}
                        options={{
                            minimap: { enabled: false },  // Disable minimap
                            scrollbar: {
                                vertical: 'hidden',  // Hide vertical scrollbar
                                horizontal: 'hidden'  // Hide horizontal scrollbar
                            }
                        }}
                    />
                </div>
                <div className="output-section" style={{ backgroundColor: dark, color: ibg }}>
                    <div className="output-header" style={{ backgroundColor: dark, color: ibg }}>
                        <span>Output</span>
                        <Button onClick={clearOutput} variant="primary" style={{ backgroundColor: bc, color: ibg }}>
                            Clear
                        </Button>
                    </div>
                    <pre style={{ backgroundColor: bg, color: ibg }}>
                        {output.compile_output || output.stderr
                            ? (output.compile_output || '') + (output.stderr || '')
                            : (output.stdout || '')}
                    </pre>
                    {output.time && <small style={{ color: ibg, opacity: 0.6 }}>Time: {output.time}s | Memory: {output.memory} KB</small>}
                    <TextField
                        style={{ color: ibg }}
                        id="outlined-multiline-flexible"
                        label="Input"
                        multiline
                        maxRows={4}
                        value={input}
                        onChange={handleInput}
                    />
                    <p style={{ marginTop: "40px", color: dark, backgroundColor: bg }}>.</p>
                </div>
            </div>
        </div>
    );
};

export default React.memo(EditorComponent);

