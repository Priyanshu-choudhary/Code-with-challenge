    import React, { useState, useEffect, useCallback, useContext } from 'react';
    import Editor from '@monaco-editor/react';
    import { Rnd } from 'react-rnd';
    import Dropdown from 'react-bootstrap/Dropdown';
    import Button from 'react-bootstrap/Button';
    import ButtonGroup from 'react-bootstrap/ButtonGroup';
    import Spinner from 'react-bootstrap/Spinner';
    import TextField from '@mui/material/TextField';
    import { UserContext } from '../Context/UserContext';
    import JDoodleExample from '../JDoodle/JDoodleExample';
    import './EditorComponent.css';
    import CloseIcon from '@mui/icons-material/Close';
    import Split from 'react-split';
import zIndex from '@mui/material/styles/zIndex';
    const EditorComponent = ({ initialValue }) => {
        const [code, setCode] = useState(initialValue || '// Online Java Compiler\n// Use this editor to write, compile and run your Java code online\n\npublic class HelloWorld {\n    public static void main(String[] args) {\n        System.out.println("Made by Yadi!");\n    }\n}');
        const [output, setOutput] = useState('');
        const [iSubmit, setiSubmit] = useState(false);
        const [language, setLanguage] = useState('java');
        const [input, setInput] = useState('');
        const { ibg, bc, bg, light, dark } = useContext(UserContext);
        const [themes, setThemes] = useState('vs-dark');
        const [editorLanguage, setEditorLanguage] = useState(language);
        const [isVisible, setIsVisible] = useState(false);
        const [editorSize, setEditorSize] = useState({ width: 800, height: 400 });
        const [scrollY, setScrollY] = useState(0);

        useEffect(() => {
            setThemes(bg === '#121418' ? 'vs-dark' : 'light');
        }, [bg]);

        useEffect(() => {
            setEditorLanguage(language === "python3" || language === "python2" ? "python" : language);
        }, [language]);

        const handleEditorChange = (value) => {
            setCode(value);
        };

        const runCode = async () => {
            setiSubmit(true);
            const result = await JDoodleExample(code, language, input);
            setiSubmit(false);
            setOutput(result);  // Assume result is an object with an output property
        };

        const handleLanguageChange = useCallback((lang) => {
            setLanguage(lang);
        }, []);

        const toggleVisibility = () => {
            setIsVisible(!isVisible);
        };

        const handleResize = (e, direction, ref, delta, position) => {
            setEditorSize({
                width: ref.offsetWidth,
                height: ref.offsetHeight,
            });
        };

        const clearOutput = () => {
            setOutput('');
            setInput('');
        };

        const handleInput = (e) => {
            setInput(e.target.value);
        };
        useEffect(() => {
            const handleScroll = () => {
                setScrollY(window.scrollY);
            };
    
            window.addEventListener('scroll', handleScroll);
            return () => {
                window.removeEventListener('scroll', handleScroll);
            };
        }, []);
    
        // Extracting text from output object, defaulting to empty string if not available
        const outputText = output && typeof output === 'object' && 'output' in output
            ? output.output
            : JSON.stringify(output, null, 2); // Display as JSON if output is not an object with 'output' property

        return (
            <div >
                <button
                    onClick={toggleVisibility}
                    style={{
                        position: 'fixed',
                        bottom: '10px',
                        right: '100px',
                        zIndex: 1000,
                        padding: '5px 10px',
                        backgroundColor: '#007bff',
                        color: 'white',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                    }}
                >
                    {isVisible ? 'Hide' : 'Inline IDE'}
                </button>

                {isVisible && (
                    <Rnd
                        size={{ width: editorSize.width, height: editorSize.height }}
                        onResize={handleResize}
                        default={{
                            x: window.innerWidth - editorSize.width - 100,
                            y: scrollY,
                            width: 500,
                            height: 10,
                        }}
                        bounds="window"
                        style={{
                            backgroundColor: light,
                            border: '1px solid #ccc',
                            padding: '10px',
                            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
                            zIndex: 9999,
                        }}
                    >
                        
                        <div className="editor-container">
                        {/* <Split sizes={[50, 50]} direction="vertical" style={{ height: '100%' }}> */}
                            <div className="editor-section">
                                <div className="editor-header" style={{ backgroundColor: dark, color: ibg }}>
                                    <span className="left-button">Main</span>
                                    <div className="right-buttons z-50">
                                        <Dropdown as={ButtonGroup} style={{ backgroundColor: bc, color: ibg }}>
                                            <Button variant="primary" style={{ backgroundColor: bc, color: ibg }}>{language}</Button>
                                            <Dropdown.Toggle split variant="primary" id="dropdown-split-basic" style={{ backgroundColor: bc, color: ibg }} />
                                            <Dropdown.Menu>
                                                {/* Dropdown items for different languages */}
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
                                    height={editorSize.height - 80} // Adjust height dynamically based on Rnd container size and accounting for output section
                                    // width={editorSize.width} // Adjust width dynamically based on Rnd container size
                                    language={editorLanguage}
                                    value={code}
                                    onChange={handleEditorChange}
                                    theme={"vs-dark"}
                                    options={{
                                        minimap: { enabled: false },
                                        scrollbar: {
                                            vertical: 'hidden',
                                            horizontal: 'hidden',
                                        },
                                    }}
                                    style={{zIndex:9999999}}
                                />
                            </div>
                            <div className="output-section"  
                                style={{ height: editorSize.height -27, backgroundColor: dark, color: ibg }}>
                                <div className="output-header" style={{ backgroundColor: dark, color: ibg }}>
                                    <span style={{paddingBottom:10,paddingTop:4}}>Output</span>
                                    <Button onClick={clearOutput} variant="primary" style={{ backgroundColor: bc, color: ibg,position:"absolute",right:60 }}>
                                        Clear
                                    </Button>
                                    <CloseIcon onClick={toggleVisibility} fontSize='large' style={{cursor:"pointer",position:"absolute",right:15,borderWidth:1,borderRadius:5,borderColor:"black"}} />
                                        
                                    
                                </div>
                                <pre style={{ backgroundColor: bg, color: ibg }}>{outputText}</pre>
                                <TextField
                                    style={{ color: ibg }}
                                    id="outlined-multiline-flexible"
                                    label="Input"
                                    multiline
                                    maxRows={4}
                                    value={input}
                                    onChange={handleInput}
                                />
                            </div>
                            {/* </Split> */}
                        </div>
                    </Rnd>
                )}
            </div>
        );
    };

    export default React.memo(EditorComponent);
