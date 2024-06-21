import React, {useEffect, useState, useRef, useCallback, useContext } from 'react';
import Editor from '@monaco-editor/react';
import "./editor.css";
import JDoodleExample from '../JDoodle/JDoodleExample';
import OutputSec from '../outputSec/OutputSec';
import Spinner from 'react-bootstrap/Spinner';
import axios from 'axios';
import { UserContext } from '../Context/UserContext';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import useCreateCourse from '../learnPath/CourseCreateApi';


function MyEditor({ problem ,myfun, answer, title, description, difficulty, Example, testcase, boilerCode, courseTitle = '' }) {
  const [language, setLanguage] = useState("java");
  const [iSubmit, setiSubmit] = useState(false);
  const [output, setOutput] = useState('');
  const [themes, setThemes] = useState('vs-dark');
  const [showConfetti, setShowConfetti] = useState(false);
  const editorRef = useRef(null);
  const {ibg, bg,bc,dark,light,user, password ,currentthemes} = useContext(UserContext);
  const createCourse = useCreateCourse(); // Call the custom hook

console.log(problem.templateCode);
  const handleEditorDidMount = (editor, monaco) => {
    editorRef.current = editor;
  };

  useEffect(() => {
   console.log(">>>>>>>",bg);
    if (bg=="#121418") {
      setThemes("vs-dark");
    }else{
      setThemes("light");
    }
    console.log(themes);
}, [bg]);

  const downloadFile = () => {
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

  const getCode = useCallback(async () => {
    myfun();
    if (editorRef.current) {
      let code = editorRef.current.getValue();
      code = code + boilerCode;
      setiSubmit(true);

      const output = await JDoodleExample(code, language, '', testcase);
      setiSubmit(false);
      setOutput(output);
      if (output === answer) {
        setShowConfetti(true);
        handleSubmit();
        setTimeout(() => {
          setShowConfetti(false);
        }, 4000);
      }

      // Create course after checking output
      try {
        // const response = await useCreateCourse(courseTitle);

        const response = await createCourse(courseTitle);
        console.log('Course created:', response);
      } catch (error) {
        console.error('Error creating course:', error);
      }
    }
  }, [myfun, answer, boilerCode, courseTitle, language, testcase]);

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        'https://testcfc.onrender.com/Posts',
        {
          title: title,
          description: description,
          example: Example,
          difficulty: difficulty,
          answer: answer,
          testCases: testcase,
        },
        {
          auth: {
            username: user,
            password: password,
          },
        }
      );
      console.log('Post created:', response.data);
      alert('Correct Answer.');
      showmsg();
      let timer = setInterval(hidesmg, 3000);
    } catch (error) {
      console.error('Error upload post:', error);
    }
  };

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
  };

  // const toggleTheme = () => {
  //   setTheme(prevTheme => (prevTheme === 'light' ? 'vs-dark' : 'light'));
  // };

  const options = {
    autoIndent: 'full',
    contextmenu: true,
    fontFamily: 'monospace',
    fontSize: 14,
    lineHeight: 24,
    hideCursorInOverviewRuler: true,
    matchBrackets: 'always',
    suggestOnTriggerCharacters: true,
    defaultLanguage:{language},
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
    <div >
      <Editor
        className='editor'
        height="400px"
        width="auto"
       
        theme={themes}
        defaultValue={problem.templateCode}
        onMount={handleEditorDidMount}
        options={options}
        language='java'
      />
      <div className="button-container">
        <button onClick={getCode} className="btn btn-secondary" style={{backgroundColor:bc, color:ibg}}>
          Run {iSubmit && <Spinner style={{ marginLeft: "5px" }} animation="border" size="sm" />}
        </button>{' '}
       
        <button onClick={downloadFile} className="btn btn-secondary" style={{backgroundColor:bc, color:ibg}}>
          Download
        </button>{' '}
        <Dropdown as={ButtonGroup}>
          <Button variant="secondary" style={{backgroundColor:bc, color:ibg}}>{language}</Button>
          <Dropdown.Toggle split variant="secondary" id="dropdown-split-basic"style={{backgroundColor:bc, color:ibg}} />
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
       
      </div>
      <pre>
        {output.output}
      </pre>
      {showConfetti && (
        <div className="confetti-container">
          <div className="confetti">
            {/* Confetti elements */}
          </div>
        </div>
      )}
    </div>
  );
}

export default React.memo(MyEditor);
