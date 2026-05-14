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
import { runCode as judge0Run, submitCode as judge0Submit } from '../judge0/judge0Service';
import { UserContext } from '../Context/UserContext';
import useCreateCourse from '../learnPath/CourseCreateApi';

// ─── Icons ────────────────────────────────────────────────────────────────────
const PassIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);
const FailIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);

// ─── Test case card ───────────────────────────────────────────────────────────
function TestCaseCard({ tc, index }) {
  const [open, setOpen] = useState(!tc.passed);
  const passed = tc.passed;

  return (
    <div style={{
      border: `1px solid ${passed ? '#bbf7d0' : '#fecaca'}`,
      borderRadius: 8,
      marginBottom: 8,
      overflow: 'hidden',
      background: passed ? '#f0fdf4' : '#fef2f2',
    }}>
      {/* Header */}
      <button
        onClick={() => setOpen((v) => !v)}
        style={{
          width: '100%', display: 'flex', alignItems: 'center', gap: 8,
          padding: '9px 12px', background: 'none', border: 'none', cursor: 'pointer',
          textAlign: 'left',
        }}
      >
        <span style={{ display: 'flex', alignItems: 'center' }}>
          {passed ? <PassIcon /> : <FailIcon />}
        </span>
        <span style={{ fontSize: 13, fontWeight: 600, color: passed ? '#15803d' : '#dc2626', flex: 1 }}>
          Test Case {tc.testCaseNumber ?? index + 1} — {passed ? 'Passed' : tc.status || 'Failed'}
        </span>
        {tc.time && (
          <span style={{ fontSize: 11, color: '#6b7280' }}>{tc.time}s · {tc.memory} KB</span>
        )}
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.15s' }}>
          <polyline points="6 9 12 15 18 9"/>
        </svg>
      </button>

      {/* Body */}
      {open && (
        <div style={{ padding: '0 12px 12px', display: 'flex', flexDirection: 'column', gap: 8 }}>
          {[
            ['Input',    tc.input],
            ['Expected', tc.expectedOutput],
            ['Got',      tc.actualOutput],
          ].filter(([, v]) => v != null).map(([label, val]) => (
            <div key={label}>
              <p style={{ fontSize: 11, fontWeight: 600, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.05em', margin: '0 0 4px' }}>{label}</p>
              <pre style={{ margin: 0, fontSize: 12, fontFamily: "'JetBrains Mono', monospace", color: '#111827', background: 'rgba(0,0,0,0.04)', padding: '6px 10px', borderRadius: 5, whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>
                {String(val)}
              </pre>
            </div>
          ))}
          {tc.compileError && (
            <pre style={{ margin: 0, fontSize: 12, fontFamily: "'JetBrains Mono', monospace", color: '#dc2626', background: '#fef2f2', padding: '6px 10px', borderRadius: 5, whiteSpace: 'pre-wrap' }}>
              {tc.compileError}
            </pre>
          )}
          {tc.stderr && !tc.compileError && (
            <pre style={{ margin: 0, fontSize: 12, fontFamily: "'JetBrains Mono', monospace", color: '#b45309', background: '#fffbeb', padding: '6px 10px', borderRadius: 5, whiteSpace: 'pre-wrap' }}>
              {tc.stderr}
            </pre>
          )}
        </div>
      )}
    </div>
  );
}

// ─── Verdict summary bar ──────────────────────────────────────────────────────
function VerdictSummary({ verdictResult }) {
  if (!verdictResult?.results) return null;
  const total  = verdictResult.results.length;
  const passed = verdictResult.results.filter((r) => r.passed).length;
  const allOk  = verdictResult.allPassed;

  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 10,
      padding: '10px 14px',
      background: allOk ? '#f0fdf4' : '#fef2f2',
      borderBottom: `1px solid ${allOk ? '#bbf7d0' : '#fecaca'}`,
    }}>
      <span style={{ display: 'flex', alignItems: 'center' }}>
        {allOk ? <PassIcon /> : <FailIcon />}
      </span>
      <span style={{ fontSize: 13, fontWeight: 700, color: allOk ? '#15803d' : '#dc2626' }}>
        {allOk ? 'All test cases passed!' : `${passed}/${total} test cases passed`}
      </span>
    </div>
  );
}

// ─── Run result panel ─────────────────────────────────────────────────────────
function RunResultPanel({ runResult, isCorrect }) {
  if (!runResult) return null;
  const hasError = runResult.compile_output || runResult.stderr;

  return (
    <div style={{ padding: '12px 14px' }}>
      {/* Status line */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
        <div style={{ width: 8, height: 8, borderRadius: '50%', background: isCorrect ? '#16a34a' : hasError ? '#dc2626' : '#6b7280' }} />
        <span style={{ fontSize: 12, fontWeight: 600, color: isCorrect ? '#15803d' : hasError ? '#dc2626' : '#374151' }}>
          {isCorrect ? 'Correct answer' : hasError ? (runResult.compile_output ? 'Compilation error' : 'Runtime error') : 'Code executed'}
        </span>
        {runResult.time && (
          <span style={{ marginLeft: 'auto', fontSize: 11, color: '#9ca3af' }}>
            {runResult.time}s · {runResult.memory} KB
          </span>
        )}
      </div>

      <pre style={{
        margin: 0, fontSize: 12, fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
        padding: '10px 12px', borderRadius: 6, whiteSpace: 'pre-wrap', wordBreak: 'break-all',
        color: hasError ? '#dc2626' : '#e2e8f0',
        background: hasError ? '#1a0808' : '#0d1117',
        border: `1px solid ${hasError ? '#450a0a' : '#1d2432'}`,
      }}>
        {runResult.compile_output
          ? '// Compilation Error:\n' + runResult.compile_output
          : runResult.stderr
            ? '// Runtime Error:\n' + runResult.stderr
            : runResult.stdout || '(no output)'}
      </pre>
    </div>
  );
}

// ─── Confetti ─────────────────────────────────────────────────────────────────
function SuccessBanner() {
  return (
    <div style={{
      padding: '14px 16px', background: 'linear-gradient(135deg, #f0fdf4, #dcfce7)',
      border: '1px solid #86efac', borderRadius: 8, margin: '12px 14px',
      display: 'flex', alignItems: 'center', gap: 10,
    }}>
      <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#16a34a', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <PassIcon />
      </div>
      <div>
        <p style={{ margin: 0, fontSize: 14, fontWeight: 700, color: '#15803d' }}>Accepted</p>
        <p style={{ margin: 0, fontSize: 12, color: '#16a34a' }}>Your solution passed all test cases</p>
      </div>
    </div>
  );
}

// ─── Main editor component ────────────────────────────────────────────────────
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
    const [language, setLanguage]     = useState(CourseLanguage);
    const [iSubmit, setiSubmit]       = useState(false);
    const [runResult, setRunResult]   = useState(null);
    const [verdictResult, setVerdictResult] = useState(null);
    const [isCorrect, setisCorrect]   = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [boilerCode, setboilerCode]   = useState(problem?.codeTemplates?.[language]?.boilerCode || '');
    const [templateCode, settemplateCode] = useState(problem?.codeTemplates?.[language]?.templateCode || '');
    const [resultsTab, setResultsTab]   = useState('results'); // 'results'

    const editorRef = useRef(null);
    const { fontSize } = useContext(UserContext);
    const createCourse = useCreateCourse();

    useEffect(() => {
      if (problem?.codeTemplates?.[CourseLanguage]) {
        settemplateCode(problem.codeTemplates[CourseLanguage].templateCode || '');
      }
    }, [CourseLanguage, problem]);

    useEffect(() => {
      if (problem?.codeTemplates?.[language]) {
        setboilerCode(problem.codeTemplates[language].boilerCode || '');
      }
    }, [language, templateCode, problem]);

    useEffect(() => {
      if (editorRef.current) editorRef.current.setValue(templateCode);
    }, [templateCode]);

    const handleEditorDidMount = (editor) => { editorRef.current = editor; };

    const resetEditorState = () => {
      setRunResult(null);
      setVerdictResult(null);
      setisCorrect(false);
      setShowSuccess(false);
    };

    const getCode = useCallback(async (currentBoilerCode, currentTemplateCode) => {
      if (!editorRef.current) return;
      const code = editorRef.current.getValue();
      getSolution(code);

      const hasTestCases = problem?.testcase && Object.keys(problem.testcase).length > 0;

      setiSubmit(true);
      spin(true);
      setRunResult(null);
      setVerdictResult(null);
      setisCorrect(false);
      setShowSuccess(false);

      try {
        if (hasTestCases) {
          const result = await judge0Submit(
            code, language, problem.testcase,
            problem.timeLimitSeconds || null,
            problem.memoryLimitKb || null
          );
          setVerdictResult(result);
        } else {
          let fullCode = code;
          if (language === 'python') {
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

    // Answer checking
    useEffect(() => {
      if (verdictResult) {
        const passed = verdictResult.allPassed === true;
        setisCorrect(passed);
        if (passed) {
          setShowSuccess(true);
          setTimeout(() => setShowSuccess(false), 5000);
          saveToDatabase(problem);
        }
      } else if (runResult) {
        if (answer && answer[0]) {
          const stdout   = (runResult.stdout || '').trim();
          const expected = answer[0].trim();
          const passed   = stdout === expected;
          setisCorrect(passed);
          if (passed) {
            setShowSuccess(true);
            setTimeout(() => setShowSuccess(false), 5000);
            saveToDatabase(problem);
          }
        }
      }
    }, [verdictResult, runResult]);

    const hasResults = verdictResult?.results || runResult;

    return (
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        {/* Monaco editor */}
        <div style={{ flex: hasResults ? '0 0 auto' : 1, minHeight: hasResults ? 260 : '100%' }}>
          <Editor
            height={hasResults ? '260px' : '100%'}
            language={language === 'python3' || language === 'python2' ? 'python' : language}
            theme="vs-dark"
            defaultValue={templateCode}
            onMount={handleEditorDidMount}
            options={{
              fontSize: parseInt(fontSize) || 14,
              lineHeight: 22,
              fontFamily: "'JetBrains Mono', 'Fira Code', 'Consolas', monospace",
              fontLigatures: true,
              minimap: { enabled: false },
              scrollbar: { vertical: 'auto', horizontal: 'auto' },
              wordWrap: 'on',
              scrollBeyondLastLine: false,
              renderLineHighlight: 'line',
              cursorBlinking: 'smooth',
              smoothScrolling: true,
              padding: { top: 10 },
              suggestOnTriggerCharacters: true,
              matchBrackets: 'always',
              autoIndent: 'full',
              automaticLayout: true,
            }}
          />
        </div>

        {/* Results panel */}
        {hasResults && (
          <div style={{ flex: 1, overflow: 'auto', background: '#111827', borderTop: '1px solid #1e2432' }}>
            {showSuccess && !verdictResult?.results && <SuccessBanner />}

            {/* Verdict results (test cases) */}
            {verdictResult?.results && (
              <>
                <VerdictSummary verdictResult={verdictResult} />
                {showSuccess && <SuccessBanner />}
                <div style={{ padding: '12px 14px' }}>
                  {verdictResult.results.map((tc, i) => (
                    <TestCaseCard key={i} tc={tc} index={i} />
                  ))}
                </div>
              </>
            )}

            {/* Playground run result */}
            {runResult && !verdictResult && (
              <RunResultPanel runResult={runResult} isCorrect={isCorrect} />
            )}
          </div>
        )}
      </div>
    );
  }
);

export default React.memo(MyEditor);
