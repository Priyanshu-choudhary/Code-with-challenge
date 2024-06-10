import React, { useState, useRef, useCallback,useContext } from 'react';
import Editor from '@monaco-editor/react';
import "./editor.css"
import JDoodleExample from '../JDoodle/JDoodleExample';
import OutputSec from '../outputSec/OutputSec';
import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';

function MyEditor({ myfun }) {
  const [language, setLanguage] = useState("java");
  const [iSubmit, setiSubmit] = useState(false);
  const [output, setOutput] = useState('');
  const [theme, setTheme] = useState('light'); // Add state for theme
  const editorRef = useRef(null);
  

  const handleEditorDidMount = (editor, monaco) => {
    editorRef.current = editor;
  };

  const downloadFile = (file) => {
    const code = editorRef.current.getValue();
    const blobCode = createFileFromString(code, "mycode.java");
    const url = URL.createObjectURL(blobCode);
    const a = document.createElement('a');
    a.href = url;
    a.download = blobCode.name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const createFileFromString = (str, fileName) => {
    const blob = new Blob([str], { type: 'text/plain' });
    return new File([blob], fileName, { type: 'text/plain' });
  };

  const getCode = async () => {
    myfun();
    if (editorRef.current) {
      const code = editorRef.current.getValue();
      setiSubmit(true);
      // Modify userInput to include multiple inputs separated by newline characters
      const userInput = `12\n`; // Input for age: 12
      const output = await JDoodleExample(code, language, userInput);
      setiSubmit(false);
      setOutput(output);
    }
  };
  
  
  const handleLanguageChange = useCallback((lang) => {
    setLanguage(lang);
  }, []);

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'vs-dark' : 'light'));
  };

  const options = {
    autoIndent: 'full',
    contextmenu: true,
    fontFamily: 'monospace',
    fontSize: 14,
    lineHeight: 24,
    hideCursorInOverviewRuler: true,
    matchBrackets: 'always',
    suggestOnTriggerCharacters: true,
    minimap: {
      enabled: false,
    },
    scrollbar: {
      horizontal: 'hidden',
      vertical: 'hidden',
    },
    selectOnLineNumbers: true,
    roundedSelection: false,
    readOnly: false,
    cursorStyle: 'line',
    automaticLayout: true,
  };

  

  return (
    <>
      <Editor
        className='editor'
        height="430px"
        width="auto"
        defaultLanguage={language}
        theme={theme} // Use theme state
        defaultValue={`//Example code
import java.util.*;
public class MyClass {
    public static void main(String[] args) {
        //Write your code here...
        System.out.println("Hello World!");
    }
}`}
        onMount={handleEditorDidMount}
        options={options}
      />
      <div className="button-container">
        <button onClick={getCode} className="btn btn-secondary">
          Run {iSubmit && <Spinner style={{ marginLeft: "5px" }} animation="border" size="sm" />}
        </button>{' '}
        <button className="btn btn-secondary">
          Submit
        </button>{' '}
        <button onClick={downloadFile} className="btn btn-secondary">
            Download
        </button>{' '}
        <Dropdown as={ButtonGroup}>
          <Button variant="secondary">{language}</Button>
          <Dropdown.Toggle split variant="secondary" id="dropdown-split-basic" />
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
        </Dropdown>{' '}
        <button onClick={toggleTheme} className="btn btn-secondary">
          Toggle Theme
        </button>
      </div>
      {output && <OutputSec output={output} />}
    </>
  );
}

export default React.memo(MyEditor);
