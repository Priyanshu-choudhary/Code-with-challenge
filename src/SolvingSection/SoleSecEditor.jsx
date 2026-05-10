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
import { runCode as judge0Run, submitCode as judge0Submit } from '../judge0/judge0Service';
import Spinner from 'react-bootstrap/Spinner';
import { UserContext } from '../Context/UserContext';
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
      getSolution,
    },
    ref
  ) => {

    const [language, setLanguage] = useState(CourseLanguage);
    const [iSubmit, setiSubmit] = useState(false);
    const [runResult, setRunResult] = useState(null);
    const [verdictResult, setVerdictResult] = useState(null);
    const [themes, setThemes] = useState('vs-dark');
    const [showConfetti, setShowConfetti] = useState(false);
    const [isCorrect, setisCorrect] = useState(false);
    const [boilerCode, setboilerCode] = useState(problem?.codeTemplates?.[language]?.boilerCode || "");
    const [templateCode, settemplateCode] = useState(problem?.codeTemplates?.[language]?.templateCode || "");

    const editorRef = useRef(null);

    const {
      fontSize,
      ibg,
      bg,
      bc,
      dark,
      light,
      currentthemes,
    } = useContext(UserContext);
    const [bgColor, setbgColor] = useState(light);
    const createCourse = useCreateCourse();

    useEffect(() => {
      if (problem?.codeTemplates?.[CourseLanguage]) {
        settemplateCode(problem.codeTemplates[CourseLanguage].templateCode || "");
      }
    }, [CourseLanguage, problem]);

    useEffect(() => {
      if (problem?.codeTemplates?.[language]) {
        setboilerCode(problem.codeTemplates[language].boilerCode || "");
      }
    }, [language, templateCode, problem]);

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
      setRunResult(null);
      setVerdictResult(null);
      setShowConfetti(false);
    };

    const getCode = useCallback(async (currentBoilerCode, currentTemplateCode) => {
      if (!editorRef.current) return;

      let code = editorRef.current.getValue();
      getSolution(code);

      const hasTestCases = problem?.testcase && Object.keys(problem.testcase).length > 0;

      setiSubmit(true);
      spin(true);
      setRunResult(null);
      setVerdictResult(null);

      try {
        if (hasTestCases) {
          // Judge0 batch: each testcase entry is stdin → expectedOutput
          const result = await judge0Submit(
            code,
            language,
            problem.testcase,
            problem.timeLimitSeconds || null,
            problem.memoryLimitKb || null
          );
          setVerdictResult(result);
        } else {
          // Playground run: prepend boilerCode (legacy answer-check mode)
          let fullCode = code;
          if (language === "python") {
            fullCode = code + currentBoilerCode;
          } else {
            fullCode = currentBoilerCode + code;
          }
          const result = await judge0Run(fullCode, language, input);
          setRunResult(result);
        }
      } catch (e) {
        setRunResult({ stderr: 'Execution error: ' + e.message });
      } finally {
        setiSubmit(false);
        spin(false);
      }
    }, [problem, language, input, spin, getSolution]);

    useImperativeHandle(ref, () => ({
      getCode: () => getCode(boilerCode, templateCode),
      resetEditorState,
    }));

    // Answer checking effect
    useEffect(() => {
      if (verdictResult) {
        const passed = verdictResult.allPassed === true;
        setisCorrect(passed);
        if (passed) {
          setShowConfetti(true);
          setTimeout(() => setShowConfetti(false), 4000);
          saveToDatabase(problem);
        }
      } else if (runResult) {
        if (answer && answer[0]) {
          const stdout = (runResult.stdout || '').trim();
          const expected = answer[0].trim();
          const passed = stdout === expected;
          setisCorrect(passed);
          if (passed) {
            setShowConfetti(true);
            setTimeout(() => setShowConfetti(false), 4000);
            saveToDatabase(problem);
          } else {
            setbgColor('lightcoral');
          }
        }
      }
    }, [verdictResult, runResult]);

    const options = {
      autoIndent: 'full',
      contextmenu: true,
      fontFamily: 'monospace',
      fontSize: fontSize,
      lineHeight: 24,
      hideCursorInOverviewRuler: true,
      matchBrackets: 'always',
      suggestOnTriggerCharacters: true,
      minimap: { enabled: false },
      scrollbar: { horizontal: 'hidden', vertical: 'hidden' },
      selectOnLineNumbers: true,
      roundedSelection: false,
      readOnly: false,
      cursorStyle: 'line',
      automaticLayout: true,
    };

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

          {/* Judge0 batch submit results */}
          {verdictResult && verdictResult.results && verdictResult.results.map((tc, i) => (
            <div
              key={i}
              style={{
                color: 'black',
                backgroundColor: tc.passed ? 'lightgreen' : 'lightcoral',
                margin: '10px',
                padding: '10px',
                borderRadius: '5px',
              }}
            >
              <p><strong style={{ fontSize: '18px', color: '#413F3F' }}>Test Case {tc.testCaseNumber}</strong></p>
              <p><strong style={{ fontSize: '18px', color: '#413F3F' }}>Input:</strong> {tc.input}</p>
              <p><strong style={{ fontSize: '18px', color: '#413F3F' }}>Expected:</strong> {tc.expectedOutput}</p>
              <p><strong style={{ fontSize: '18px', color: '#413F3F' }}>Got:</strong> {tc.actualOutput}</p>
              <p><strong style={{ fontSize: '18px', color: '#413F3F' }}>Status:</strong> {tc.status}</p>
              {tc.time && <p><strong>Time:</strong> {tc.time}s | <strong>Memory:</strong> {tc.memory} KB</p>}
              {tc.compileError && <pre style={{ color: '#b00' }}>{tc.compileError}</pre>}
              {tc.stderr && <pre style={{ color: '#b00' }}>{tc.stderr}</pre>}
            </div>
          ))}

          {/* Playground run result */}
          {runResult && !verdictResult && (
            <pre
              style={{
                backgroundColor: isCorrect ? 'lightgreen' : (runResult.compile_output || runResult.stderr ? '#fff3cd' : dark),
                color: isCorrect ? 'black' : ibg,
                margin: '10px',
                padding: '10px',
                borderRadius: '5px',
              }}
            >
              {runResult.compile_output
                ? '// Compilation Error:\n' + runResult.compile_output
                : runResult.stderr
                  ? '// Runtime Error:\n' + runResult.stderr
                  : runResult.stdout || '(no output)'}
              {runResult.time && (
                <small style={{ display: 'block', marginTop: 4, opacity: 0.7 }}>
                  Time: {runResult.time}s | Memory: {runResult.memory} KB
                </small>
              )}
            </pre>
          )}

          {isCorrect && (
            <div className='confetti-container'>
              <div className='confetti'></div>
            </div>
          )}
        </div>
      </>
    );
  }
);

export default React.memo(MyEditor);
