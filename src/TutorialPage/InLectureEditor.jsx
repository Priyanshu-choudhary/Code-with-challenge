import React, { useEffect, useState, useCallback, useContext } from 'react';
import Editor from '@monaco-editor/react';
import './EditorComponent.css';
import Dashboard from '../dashBoard/Dashboard';
import JDoodleExample from '../JDoodle/JDoodleExample';
import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import TextField from '@mui/material/TextField';
import { UserContext } from '../Context/UserContext';

const InLectureEditor = ({ initialValue }) => {
    const [code, setCode] = useState(initialValue || '// Online Java Compiler\n// Use this editor to write, compile and run your Java code online\n\npublic class HelloWorld {\n    public static void main(String[] args) {\n        System.out.println("Made by Yadi!");\n    }\n}');
    const [output, setOutput] = useState('');
    const [iSubmit, setiSubmit] = useState(false);
    const [language, setLanguage] = useState('java');
    const [input, setInput] = useState('');
    const { bg, light, } = useContext(UserContext);
    const [themes, setThemes] = useState('vs-dark');
    const [editorLanguage, setEditorLanguage] = useState(language);



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

 
    function cleanCode(code) {
        // Regular expression to match non-breaking space and other invisible characters
        const specialCharsRegex = /[\u00A0\u200B\u00C2]/g;
    
        // Replace with regular space
        return code.replace(specialCharsRegex, ' ');
    }
    
    return (
        <div className='super'>
            {!initialValue && <Dashboard />}
            <div className="-z-0">
                <div style={{ width: "80%" }} className="editor-section ml-20 ">
                    <div className="  editor-header border-x-2 border-black border-t-2 rounded-t-xl" style={{ backgroundColor: "#1f202a", color: "white" }}>
                        <span className='left-button'>CFC Editor</span>
                        <div className="right-buttons">
                            <Dropdown as={ButtonGroup} style={{ backgroundColor: "#5D12A8", color: "#5D12A8" }}>
                                <Button variant="primary" style={{ backgroundColor: "#5D12A8", color: "white" }}>{language}</Button>
                                <Dropdown.Toggle split variant="primary" id="dropdown-split-basic" style={{ backgroundColor: "#5D12A8", color: "white" }} />
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
                            <Button onClick={runCode} variant="primary" style={{ backgroundColor: "#5D12A8", color: "white" }}>
                                Run {iSubmit && <Spinner animation="border" size="sm" />}
                            </Button>
                        </div>
                    </div>
                    <div style={{ minWidth: 800 }} className='border-x-2 border-black '>
                        <Editor
                            height="calc(50vh - 40px)" // Adjust height considering header size
                            width={"100%"}
                            language={editorLanguage}
                            value={cleanCode(code)} // Apply the unescapeHtml function here
                            onChange={handleEditorChange}
                            theme={themes}
                            options={{
                                minimap: { enabled: false },
                                scrollbar: {
                                    vertical: 'hidden',
                                    horizontal: 'hidden'
                                }
                            }}
                        />

                    </div>

                    <div className="output-section border-t-0 border-x-2 border-b-2 rounded-t-none rounded-b-xl border-black" >
                        <div className='pt-2 w-full'>
                            <TextField
                                style={{ color: "#5D12A8" }}
                                id="outlined-multiline-flexible"
                                label="Input"
                                multiline
                                maxRows={4}
                                value={input}
                                onChange={handleInput}
                                fullWidth
                            />
                        </div>
                        <div className="output-header">
                            <span>Output</span>
                            <Button onClick={clearOutput} variant="primary" style={{ backgroundColor: "#5D12A8", color: "white" }}>
                                Clear
                            </Button>
                        </div>
                        <pre style={{ backgroundColor: bg, color: "#5D12A8" }}>{output.output}</pre>


                    </div>
                </div>

            </div>
        </div>
    );
};

export default React.memo(InLectureEditor);
