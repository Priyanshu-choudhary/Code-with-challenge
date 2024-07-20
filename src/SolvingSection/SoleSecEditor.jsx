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
      CourseLanguage,
      spin,
      input,
      saveToDatabase,
      problem,
      answer,
      title,
      description,
      difficulty,
      Example,
      courseTitle = '',
    },
    ref
  ) => {

    const [language, setLanguage] = useState(CourseLanguage);
    const [iSubmit, setiSubmit] = useState(false);
    const [output, setOutput] = useState('');
    const [themes, setThemes] = useState('vs-dark');
    const [showConfetti, setShowConfetti] = useState(false);
    const [isCorrect, setisCorrect] = useState(false);
    const [boilerCode, setboilerCode] = useState(problem.codeTemplates[language].boilerCode);
    const [templateCode, settemplateCode] = useState(problem.codeTemplates[language].templateCode);
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

    useEffect(() => {
      setLanguage(CourseLanguage);
      settemplateCode(problem.codeTemplates[CourseLanguage].templateCode);
    }, [CourseLanguage, problem.codeTemplates]);

    useEffect(() => {
      setboilerCode(problem.codeTemplates[language].boilerCode);
    }, [language, templateCode, problem.codeTemplates]);

    const handleEditorDidMount = (editor, monaco) => {
      editorRef.current = editor;
    };

    useEffect(() => {
      if (bg === '#121418') {
        setThemes('vs-dark');
      } else {
        setThemes('light');
      }
    }, [bg]);

    useEffect(() => {
      if (editorRef.current) {
        editorRef.current.setValue(templateCode);
      }
    }, [templateCode]);

    const resetEditorState = () => {
      setOutput('');
      setShowConfetti(false);
      // setisCorrect(false);
      // Add any other state resets if needed
    };


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

    const getCode = useCallback(async (currentBoilerCode, currentTemplateCode) => {
      if (editorRef.current) {
        let code = editorRef.current.getValue();
        code = currentBoilerCode + code;
        setiSubmit(true);
        spin(true);

        const output = await JDoodleExample(code, language, input);
        setiSubmit(false);
        spin(false);
        setOutput(output);

        if (output === answer) {
          setShowConfetti(true);
          setTimeout(() => {
            setShowConfetti(false);
          }, 4000);
        }
      }
    }, [answer, courseTitle, language, input, spin]);

    // Expose getCode to parent component using useImperativeHandle
    useImperativeHandle(ref, () => ({
      getCode: () => getCode(boilerCode, templateCode),
      resetEditorState,
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

          let input = '';
          let expectedOutput = '';
          let output = '';
          let status = '';

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
              if (output === '') {
                output = line;
              } else {
                output += '\n' + line;
              }
            }
          });

          return { testCaseNumber, input, expectedOutput, output, status };
        });

      return testCaseGroups;
    };

    const testCaseGroups = parseOutput(output.output);

    const checkTestcaseAnswer = useCallback(() => {
    
      let allPass = true;
      for (let i = 0; i < testCaseGroups.length; i++) {
        if (testCaseGroups[i].status === 'Pass' || testCaseGroups[i].status == null) {
          setisCorrect(true);
        } else {
          setisCorrect(false);
          break;
        }
      }
    }, [testCaseGroups]);

    const checkAnswer = useCallback(() => {
      console.log("only ans check "+answer);
      let allPass = false;
      if (output.output == answer) {
        allPass = true;
        setbgColor('lightgreen');
      } else {
        setbgColor('lightcoral');
      }

      setisCorrect(allPass);
    }, [answer, output.output]);


    
    useEffect(() => {
       console.log("ans= "+answer);
       console.log("is correct "+isCorrect);
      if (answer[0]) {
        checkAnswer();
      } else {
        checkTestcaseAnswer();
      }

      if (isCorrect) {
   
        saveToDatabase(problem);
      }
    }, [output, isCorrect, checkTestcaseAnswer, checkAnswer, problem, saveToDatabase]);

    return (
      <>
        <div>
          <Editor
            className='editor'
            height='400px'
            width='auto'
            language={language}
            theme={themes}
            defaultValue={templateCode}
            onMount={handleEditorDidMount}
            options={options}
          />
          <div>
            {testCaseGroups.map((testCase, index) => (
              <div
                key={index}
                style={{
                  color: 'black',
                  backgroundColor: testCase.status === 'Pass' ? 'lightgreen' : 'lightcoral',
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
              {typeof output.output === 'string' ? output.output : JSON.stringify(output.output, null, 2)}
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

