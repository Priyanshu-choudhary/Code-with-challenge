import React, { useState, useRef, useCallback,useContext } from 'react';
import Editor from '@monaco-editor/react';
import "./editor.css"
import JDoodleExample from '../JDoodle/JDoodleExample';
import OutputSec from '../outputSec/OutputSec';
import Spinner from 'react-bootstrap/Spinner';
import axios from 'axios';
import { UserContext } from '../Context/UserContext';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';

function MyEditor({ myfun, answer, title,description,difficulty,Example}) {
  const [language, setLanguage] = useState("java");
  const [iSubmit, setiSubmit] = useState(false);
  const [output, setOutput] = useState('');
  const [theme, setTheme] = useState('light'); // Add state for theme
  const [showConfetti, setShowConfetti] = useState(false); // State to toggle confetti
  const editorRef = useRef(null);
  const { user, password } = useContext(UserContext);

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
      const output = await JDoodleExample(code, language);
      setiSubmit(false);
      setOutput(output);
      if (output === answer) {
        setShowConfetti(true); // Show confetti if output matches answer
        handleSubmit();
        setTimeout(() => {
          setShowConfetti(false); // Hide confetti after 4 seconds
        }, 4000); // 4000 milliseconds = 4 seconds
      }
    }
  };
//////////////////upload question///////////////
const handleSubmit = async (event) => {

  
  try {
      const response = await axios.post(
          'https://testcfc-1.onrender.com/Posts',
          {
              title: title, // Provide a title here
              description: description,
              example: Example, // Provide an image URL here if necessary
              difficulty: difficulty,
              answer: answer,
              
          },
          {
              auth: {
                  username: user,
                  password: password
              }
          }
      );
      console.log('Post created:', response.data);
      alert('Correct Answer.');
      showmsg();
      let timer = setInterval(hidesmg, 3000);

  } catch (error) {
      console.error('Error upload post:', error);
      // alert('Failed to Upload.');
     
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
      <pre>
      {output && <OutputSec output={output} />}
      </pre>
      {/* Conditionally render the Confetti component */}
      {showConfetti &&

<div className="confetti-container">
  <div className="confetti">
    <i style={{ "--speed": 10, "--bg": "yellow" }} className="square"></i>
    <i style={{ "--speed": 18, "--bg": "white" }} className="pentagram"></i>
    <i style={{ "--speed": 29, "--bg": "green" }} className="rectangle"></i>
    <i style={{ "--speed": 17, "--bg": "blue" }} className="hexagram"></i>
    <i style={{ "--speed": 33, "--bg": "red" }} className="pentagram"></i>
    <i style={{ "--speed": 26, "--bg": "yellow" }} className="dodecagram"></i>
    <i style={{ "--speed": 24, "--bg": "pink" }} className="wavy-line"> </i>
    <i style={{ "--speed": 5, "--bg": "blue" }} className="wavy-line"></i>
    <i style={{ "--speed": 40, "--bg": "white" }} className="square"></i>
    <i style={{ "--speed": 17, "--bg": "green" }} className="rectangle"></i>
    <i style={{ "--speed": 25, "--bg": "white" }} className="square"></i>
    <i style={{ "--speed": 18, "--bg": "green" }} className="rectangle"></i>
    <i style={{ "--speed": 15, "--bg": "yellow" }} className="wavy-line"> </i>
    <i style={{ "--speed": 32, "--bg": "yellow" }} className="pentagram"></i>
    <i style={{ "--speed": 25, "--bg": "white" }} className="square"></i>
    <i style={{ "--speed": 18, "--bg": "green" }} className="rectangle"></i>
    <i style={{ "--speed": 37, "--bg": "yellow" }} className="dodecagram"></i>
    <i style={{ "--speed": 23, "--bg": "pink" }} className="wavy-line"></i>
    <i style={{ "--speed": 37, "--bg": "red" }} className="dodecagram"></i>
    <i style={{ "--speed": 37, "--bg": "pink" }} className="wavy-line"></i>
    <i style={{ "--speed": 36, "--bg": "white" }} className="hexagram"></i>
    <i style={{ "--speed": 32, "--bg": "green" }} className="wavy-line"></i>
    <i style={{ "--speed": 32, "--bg": "yellow" }} className="pentagram"></i>
    <i style={{ "--speed": 29, "--bg": "white" }} className="square"></i>
    <i style={{ "--speed": 18, "--bg": "green" }} className="rectangle"></i>
    <i style={{ "--speed": 37, "--bg": "red" }} className="dodecagram"></i>
    <i style={{ "--speed": 23, "--bg": "pink" }} className="wavy-line"> </i>
    <i style={{ "--speed": 30, "--bg": "pink" }} className="rectangle"></i>
    <i style={{ "--speed": 30, "--bg": "red" }} className="square"></i>
    <i style={{ "--speed": 18, "--bg": "red" }} className="pentagram"></i>
    <i style={{ "--speed": 19, "--bg": "green" }} className="rectangle"></i>
    <i style={{ "--speed": 16, "--bg": "blue" }} className="hexagram"></i>
    <i style={{ "--speed": 23, "--bg": "red" }} className="pentagram"></i>
    <i style={{ "--speed": 34, "--bg": "yellow" }} className="dodecagram"></i>
    <i style={{ "--speed": 39, "--bg": "pink" }} className="wavy-line"></i>
    <i style={{ "--speed": 40, "--bg": "purple" }} className="square"></i>
    <i style={{ "--speed": 21, "--bg": "green" }} className="rectangle"></i>
    <i style={{ "--speed": 14, "--bg": "white" }} className="square"></i>
    <i style={{ "--speed": 38, "--bg": "green" }} className="rectangle"></i>
    <i style={{ "--speed": 19, "--bg": "red" }} className="dodecagram"></i>
    <i style={{ "--speed": 29, "--bg": "pink" }} className="wavy-line"> </i>
    <i style={{ "--speed": 21, "--bg": "white" }} className="hexagram"></i>
    <i style={{ "--speed": 17, "--bg": "purple" }} className="wavy-line"></i>
    <i style={{ "--speed": 32, "--bg": "yellow" }} className="pentagram"></i>
    <i style={{ "--speed": 23, "--bg": "white" }} className="square"></i>
    <i style={{ "--speed": 18, "--bg": "green" }} className="rectangle"></i>
    <i style={{ "--speed": 37, "--bg": "red" }} className="dodecagram"></i>
    <i style={{ "--speed": 48, "--bg": "pink" }} className="wavy-line"> </i>
    <i style={{ "--speed": 38, "--bg": "pink" }} className="rectangle"></i>
    <i style={{ "--speed": 13, "--bg": "red" }} className="pentagram"></i>
    <i style={{ "--speed": 49, "--bg": "yellow" }} className="dodecagram"></i>
    <i style={{ "--speed": 19, "--bg": "cyan" }} className="wavy-line"></i>
    <i style={{ "--speed": 15, "--bg": "steelblue" }} className="square"></i>
    <i style={{ "--speed": 10, "--bg": "yellow" }} className="square"></i>
    <i style={{ "--speed": 18, "--bg": "white" }} className="pentagram"></i>
    <i style={{ "--speed": 29, "--bg": "green" }} className="rectangle"></i>
    <i style={{ "--speed": 17, "--bg": "blue" }} className="hexagram"></i>
    <i style={{ "--speed": 33, "--bg": "red" }} className="pentagram"></i>
    <i style={{ "--speed": 26, "--bg": "yellow" }} className="dodecagram"></i>
    <i style={{ "--speed": 24, "--bg": "pink" }} className="wavy-line"> </i>
    <i style={{ "--speed": 5, "--bg": "white" }} className="wavy-line"></i>
    <i style={{ "--speed": 40, "--bg": "purple" }} className="square"></i>
    <i style={{ "--speed": 17, "--bg": "green" }} className="rectangle"></i>
    <i style={{ "--speed": 25, "--bg": "white" }} className="square"></i>
    <i style={{ "--speed": 18, "--bg": "green" }} className="rectangle"></i>
    <i style={{ "--speed": 15, "--bg": "cyan" }} className="wavy-line"> </i>
    <i style={{ "--speed": 32, "--bg": "yellow" }} className="pentagram"></i>
    <i style={{ "--speed": 45, "--bg": "white" }} className="square"></i>
    <i style={{ "--speed": 18, "--bg": "green" }} className="rectangle"></i>
    <i style={{ "--speed": 37, "--bg": "red" }} className="dodecagram"></i>
    <i style={{ "--speed": 23, "--bg": "pink" }} className="wavy-line"> </i>
    <i style={{ "--speed": 37, "--bg": "red" }} className="dodecagram"></i>
    <i style={{ "--speed": 37, "--bg": "pink" }} className="wavy-line"> </i>
    <i style={{ "--speed": 26, "--bg": "white" }} className="hexagram"></i>
    <i style={{ "--speed": 32, "--bg": "cyan" }} className="wavy-line"></i>
    <i style={{ "--speed": 32, "--bg": "yellow" }} className="pentagram"></i>
    <i style={{ "--speed": 45, "--bg": "white" }} className="square"></i>
    <i style={{ "--speed": 18, "--bg": "green" }} className="rectangle"></i>
    <i style={{ "--speed": 37, "--bg": "red" }} className="dodecagram"></i>
    <i style={{ "--speed": 23, "--bg": "pink" }} className="wavy-line"> </i>
    <i style={{ "--speed": 50, "--bg": "pink" }} className="rectangle"></i>
    <i style={{ "--speed": 30, "--bg": "red" }} className="square"></i>
    <i style={{ "--speed": 18, "--bg": "red" }} className="pentagram"></i>
    <i style={{ "--speed": 19, "--bg": "green" }} className="rectangle"></i>
    <i style={{ "--speed": 16, "--bg": "blue" }} className="hexagram"></i>
    <i style={{ "--speed": 23, "--bg": "red" }} className="pentagram"></i>
    <i style={{ "--speed": 33, "--bg": "yellow" }} className="dodecagram"></i>
    <i style={{ "--speed": 39, "--bg": "white" }} className="wavy-line"></i>
    <i style={{ "--speed": 40, "--bg": "orange" }} className="square"></i>
    <i style={{ "--speed": 21, "--bg": "green" }} className="rectangle"></i>
    <i style={{ "--speed": 14, "--bg": "white" }} className="square"></i>
    <i style={{ "--speed": 38, "--bg": "green" }} className="rectangle"></i>
    <i style={{ "--speed": 19, "--bg": "red" }} className="dodecagram"></i>
    <i style={{ "--speed": 29, "--bg": "pink" }} className="wavy-line"> </i>
    <i style={{ "--speed": 34, "--bg": "white" }} className="hexagram"></i>
    <i style={{ "--speed": 17, "--bg": "indigo" }} className="wavy-line"></i>
    <i style={{ "--speed": 32, "--bg": "yellow" }} className="pentagram"></i>
    <i style={{ "--speed": 23, "--bg": "white" }} className="square"></i>
    <i style={{ "--speed": 18, "--bg": "green" }} className="rectangle"></i>
    <i style={{ "--speed": 37, "--bg": "red" }} className="dodecagram"></i>
    <i style={{ "--speed": 48, "--bg": "pink" }} className="wavy-line"> </i>
    <i style={{ "--speed": 38, "--bg": "pink" }} className="rectangle"></i>
    <i style={{ "--speed": 13, "--bg": "red" }} className="pentagram"></i>
    <i style={{ "--speed": 49, "--bg": "yellow" }} className="dodecagram"></i>
    <i style={{ "--speed": 19, "--bg": "purple" }} className="wavy-line"></i>
    <i style={{ "--speed": 15, "--bg": "cyan" }} className="square"></i>

  </div>

</div> }
    </>
  );
}

export default React.memo(MyEditor);
