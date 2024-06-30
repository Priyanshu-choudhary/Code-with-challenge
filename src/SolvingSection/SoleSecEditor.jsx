import React, {
  forwardRef,
  useImperativeHandle,
  useEffect,
  useState,
  useRef,
  useCallback,
  useContext,
} from 'react';
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

const MyEditor = forwardRef(
  (
    {
      spin,
      input,
      saveToDatabase,
      problem,
      answer,
      title,
      description,
      difficulty,
      Example,
      testcase,
      boilerCode,
      courseTitle = '',
    },
    ref
  ) => {
    const [language, setLanguage] = useState('java');
    const [iSubmit, setiSubmit] = useState(false);
    const [output, setOutput] = useState('');
    const [themes, setThemes] = useState('vs-dark');
    const [showConfetti, setShowConfetti] = useState(false);
    const [isCorrect, setisCorrect] = useState(false);
    const editorRef = useRef(null);

    const {
      fontSize,
      ibg,
      bg,
      bc,
      dark,
      light,
      user,
      password,
      currentthemes,
    } = useContext(UserContext);
    const [bgColor, setbgColor] = useState(light);
    const createCourse = useCreateCourse(); // Call the custom hook
    const handleEditorDidMount = (editor, monaco) => {
      editorRef.current = editor;
    };

    useEffect(() => {
      if (bg == '#121418') {
        setThemes('vs-dark');
      } else {
        setThemes('light');
      }
    }, [bg]);

    const downloadFile = () => {
      const code = editorRef.current.getValue();
      const blobCode = createFileFromString(code, 'mycode.java');
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
      if (editorRef.current) {
        let code = editorRef.current.getValue();
        code = boilerCode + code;
        setiSubmit(true);
        spin(true);

        const output = await JDoodleExample(code, language, input, testcase);
        setiSubmit(false);
        spin(false);
        setOutput(output);
        if (output === answer) {
          setShowConfetti(true);
          // handleSubmit();
          setTimeout(() => {
            setShowConfetti(false);
          }, 4000);
        }
      }
    }, [answer, boilerCode, courseTitle, language, testcase]);

    // Expose getCode to parent component using useImperativeHandle
    useImperativeHandle(ref, () => ({
      getCode,
    }));

    const handleLanguageChange = (lang) => {
      setLanguage(lang);
    };

    const options = {
      autoIndent: 'full',
      contextmenu: true,
      fontFamily: 'monospace',
      fontSize: fontSize,
      lineHeight: 24,
      hideCursorInOverviewRuler: true,
      matchBrackets: 'always',
      suggestOnTriggerCharacters: true,
      defaultLanguage: { language },
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

    const parseOutput = (outputString) => {
      if (!outputString) return [];

      const testCaseGroups = outputString
        .split('Test Case ')
        .slice(1)
        .map((testCase, index) => {
          const [testCaseNumber, ...rest] = testCase.split(':');

          const restString = rest.join(':');
          const lines = restString
            .trim()
            .split('\n')
            .map((line) => line.trim())
            .filter((line) => line);

          // Initialize empty placeholders
          let input = '';
          let expectedOutput = '';
          let output = '';
          let status = '';

          // Process each line to match known patterns or treat as additional output
          lines.forEach((line) => {
            if (line.startsWith('Input:')) {
              input = line.replace('Input: ', '');
            } else if (line.startsWith('Expected Output:')) {
              expectedOutput = line.replace('Expected Output: ', '');
            } else if (line.startsWith('Output:')) {
              output = line.replace('Output: ', '');
            } else if (line.startsWith('Status:')) {
              status = line.replace('Status: ', '');
            } else {
              // Handle any other lines here, for example:
              if (output === '') {
                output = line; // Directly assign if it hasn't been assigned
              } else {
                // Append to existing output if needed
                output += '\n' + line;
              }
            }
          });

          // Return the structured object
          return { testCaseNumber, input, expectedOutput, output, status };
        });

      return testCaseGroups;
    };

    const testCaseGroups = parseOutput(output.output);

    const checkTestcaseAnswer = useCallback(() => {
      let allPass = true;
      for (let i = 0; i < testCaseGroups.length; i++) {
        if (testCaseGroups[i].status === 'Pass' || testCaseGroups[i].status == null) {
          console.log('testcase no ', i, ' status ', testCaseGroups[i].status);

          console.log('condition set to true');
          setisCorrect(true);
          console.log('condition after setting to true' + isCorrect);
        } else {
          setisCorrect(false);
          break;
        }
      }
    }, [testCaseGroups]);

    const checkAnswer = useCallback(() => {
      let allPass = false;
      if (output.output == answer) {
        allPass = true;
        setbgColor('lightgreen');
      } else {
        setbgColor('lightcoral');
      }

      setisCorrect(allPass);
    }, [testCaseGroups]);
    useEffect(() => {
      console.log('iscorrect', isCorrect);

      if (answer) {
        checkAnswer();
      } else {
        checkTestcaseAnswer();
      }

      if (isCorrect) {
        console.log('send problem');
        console.log('after 1 sec');
        saveToDatabase(problem);
      }
    }, [
      output,
      isCorrect,
      checkTestcaseAnswer,
      checkAnswer,
      problem,
      saveToDatabase,
    ]);

    return (
      <>
        <div>
          <Editor
            className='editor'
            height='400px'
            width='auto'
            theme={themes}
            defaultValue={problem.templateCode}
            onMount={handleEditorDidMount}
            options={options}
            language='java'
          />
          {/* <div className="button-container">
            <button onClick={getCode} className="btn btn-secondary" style={{ backgroundColor: bc, color: ibg }}>
              Run {iSubmit && <Spinner style={{ marginLeft: "5px" }} animation="border" size="sm" />}
            </button>{' '}
            <button onClick={downloadFile} className="btn btn-secondary" style={{ backgroundColor: bc, color: ibg }}>
              Download
            </button>{' '}
            <Dropdown as={ButtonGroup}>
              <Button variant="secondary" style={{ backgroundColor: bc, color: ibg }}>{language}</Button>
              <Dropdown.Toggle split variant="secondary" id="dropdown-split-basic" style={{ backgroundColor: bc, color: ibg }} />
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
          </div> */}
          <div>
            {testCaseGroups.map((testCase, index) => (
              <div
                key={index}
                style={{
                  color: 'black',
                  backgroundColor:
                    testCase.status === 'Pass' ? 'lightgreen' : 'lightcoral',
                  margin: '10px',
                  padding: '10px',
                  borderRadius: '5px',
                }}
              >
                <p>
                  <strong style={{ fontSize: '18px', color: '#413F3F' }}>
                    Test Case {testCase.testCaseNumber}
                  </strong>
                </p>

                <p>
                  <strong style={{ fontSize: '18px', color: '#413F3F' }}>
                    Input:
                  </strong>{' '}
                  {testCase.input}
                </p>
                <p>
                  <strong style={{ fontSize: '18px', color: '#413F3F' }}>
                    Expected Output:
                  </strong>{' '}
                  {testCase.expectedOutput}
                </p>
                <p>
                  <strong style={{ fontSize: '18px', color: '#413F3F' }}>
                    Output:
                  </strong>{' '}
                  {testCase.output}
                </p>
                <p>
                  <strong style={{ fontSize: '18px', color: '#413F3F' }}>
                    Status:
                  </strong>{' '}
                  {testCase.status}
                </p>
              </div>
            ))}
          </div>
          {!testCaseGroups[0] && (
            <pre
              style={{
                backgroundColor: isCorrect === true ? bgColor : dark,
                color: ibg,
                margin: '10px',
                padding: '10px',
                borderRadius: '5px',
              }}
            >
              {output.output}
            </pre>
          )}
          {isCorrect && (
            <div className='confetti-container'>
              <div className='confetti'>
                {/* Confetti elements */}
              </div>
            </div>
          )}
        </div>
      </>
    );
  }
);

export default React.memo(MyEditor);
