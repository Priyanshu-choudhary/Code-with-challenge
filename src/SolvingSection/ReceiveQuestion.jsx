import { useLocation, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import React, { useRef, useContext, useEffect, useState, useCallback } from 'react';
import MyEditor from './SoleSecEditor';
import { UserContext } from '../Context/UserContext';
import Mcq from './Mcq';
import Timer from './timer';
import useCreateCourse from '../learnPath/CourseCreateApi';
import useCreateUserContestDetail from '/src/Contest/UserDetails/CreateUserDetails';
import { useUpdateCourse } from '../SolvingSection/UpdateCourse';
import YouTubePlayer from './youtubeVideo';
import SettingsPanel from './SideDrover';
import Spinner from 'react-bootstrap/Spinner';
import HtmlRenderer from '../Leetcode/HtmlRenderer';
import MiniProblemDrawerComponent from './MiniProblemList';
import TestModeHeading from './TestModeHeading';
import SecurityChecks from '../Contest/Security/SecurityChecks';
import SubmitButton from '../Buttons/SubmitButton';
import CodeBlock from './prismjsCodeViewer';
import IconBreadcrumbs from '../dashBoard/BreadCrumb';

// ─── Inline SVG icons ─────────────────────────────────────────────────────────
const PrevIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 18 9 12 15 6"/>
  </svg>
);
const NextIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 18 15 12 9 6"/>
  </svg>
);
const RunIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
    <polygon points="5 3 19 12 5 21 5 3"/>
  </svg>
);
const ListIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/>
    <line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/>
  </svg>
);
const SettingsIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
  </svg>
);
const TimerIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
  </svg>
);
const EditIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
  </svg>
);
const ChevronDown = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 12 15 18 9"/>
  </svg>
);

// ─── Difficulty badge ─────────────────────────────────────────────────────────
const DIFF = {
  easy:   { color: '#16a34a', bg: '#f0fdf4', border: '#bbf7d0' },
  medium: { color: '#d97706', bg: '#fffbeb', border: '#fde68a' },
  hard:   { color: '#dc2626', bg: '#fef2f2', border: '#fecaca' },
};
function DiffBadge({ value }) {
  const key = (value || '').toLowerCase();
  const s = DIFF[key] || { color: '#6b7280', bg: '#f3f4f6', border: '#e5e7eb' };
  return (
    <span style={{ fontSize: 11, fontWeight: 600, color: s.color, background: s.bg, border: `1px solid ${s.border}`, padding: '2px 10px', borderRadius: 999 }}>
      {value}
    </span>
  );
}

// ─── Toast notification ───────────────────────────────────────────────────────
function Toast({ open, onClose, children }) {
  useEffect(() => {
    if (open) { const t = setTimeout(onClose, 4000); return () => clearTimeout(t); }
  }, [open, onClose]);
  if (!open) return null;
  return (
    <div style={{
      position: 'fixed', top: 20, right: 20, zIndex: 1000,
      background: '#fff', border: '1px solid #bbf7d0', borderRadius: 10,
      padding: '12px 18px', boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
      display: 'flex', alignItems: 'center', gap: 10, fontSize: 14, color: '#15803d', fontWeight: 600,
    }}>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12"/>
      </svg>
      {children}
    </div>
  );
}

// ─── Section divider label ────────────────────────────────────────────────────
function SectionLabel({ children }) {
  return (
    <p style={{ fontSize: 11, fontWeight: 600, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.06em', margin: '16px 0 6px' }}>
      {children}
    </p>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
function QuestionApi() {
  const { id, detailsType } = useParams();
  const { role, user, password } = useContext(UserContext);
  const location  = useNavigate ? useLocation() : {};
  const navigate  = useNavigate();
  const {
    contest = '', timeLeft, language,
    CourseDescription = '', totalProblems = '',
    problems = [], currentIndex = 0,
    navHistory = '', currentPage = '',
  } = location.state || {};

  const [currentProblemIndex, setCurrentProblemIndex] = useState(currentIndex);
  const [problem, setProblem]           = useState(problems[currentIndex] || {});
  const { title = '', description = '', example = '', difficulty = '', type = '', answer = '', optionA = '', optionB = '', optionC = '', optionD = '' } = problem;

  const [activeTab, setActiveTab]       = useState('problem'); // 'problem' | 'solution' | 'discuss'
  const [selectedOption, setSelectedOption] = useState('');
  const [flag, setflag]                 = useState('true');
  const [loading, setLoading]           = useState(false);
  const [toastOpen, setToastOpen]       = useState(false);
  const [iSubmit, setiSubmit]           = useState(false);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [problemListOpen, setProblemListOpen] = useState(false);
  const [resetMcq, setResetMcq]         = useState(false);
  const [contestStartDate, setcontestStartDate] = useState('');
  const [UserDetailsContestId, setUserDetailsContestId] = useState();
  const [editorValue, seteditorValue]   = useState();
  const [submitProblem, setsubmitProblem] = useState([]);
  const [submitProblemTitle, setsubmitProblemTitle] = useState([]);
  const [btnTitle, setBtnTitle]         = useState('Submit');
  const [currentans, setcurrentans]     = useState('');

  // Language dropdown
  const normalizedLanguages = Array.isArray(language) && language.length > 0 ? language : ['java'];
  const [selectedLang, setSelectedLang] = useState(
    normalizedLanguages[0] === 'java' ? normalizedLanguages[0] : normalizedLanguages[normalizedLanguages.length - 1]
  );
  const [langOpen, setLangOpen]         = useState(false);
  const langRef                         = useRef(null);

  const editorRef    = useRef();
  const containerRef = useRef(null);

  const createCourse = useCreateCourse();
  const updateCourse = useUpdateCourse();

  // ── Close lang dropdown on outside click ───────────────────────────────────
  useEffect(() => {
    const handler = (e) => { if (langRef.current && !langRef.current.contains(e.target)) setLangOpen(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  // ── Sync problem on index change ───────────────────────────────────────────
  useEffect(() => {
    setProblem(problems[currentProblemIndex] || {});
    setSelectedOption('');
    setActiveTab('problem');
  }, [currentProblemIndex, problems]);

  // ── Scroll to top on mount ─────────────────────────────────────────────────
  useEffect(() => {
    const t = setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 250);
    return () => clearTimeout(t);
  }, []);

  // ── Submit tracking ────────────────────────────────────────────────────────
  useEffect(() => {
    const attempted = submitProblem.some((p) => p.title === problem.title);
    setBtnTitle(attempted ? 'Submit Again' : 'Submit');
  }, [currentProblemIndex, problem, submitProblem]);

  // ── Contest init ───────────────────────────────────────────────────────────
  useEffect(() => {
    if (detailsType === 'Contest') userContestDetailsCreate();
  }, []);

  const questionOptions = [
    { value: 'optionA', label: optionA },
    { value: 'optionB', label: optionB },
    { value: 'optionC', label: optionC },
    { value: 'optionD', label: optionD },
  ];

  // ─── Handlers ─────────────────────────────────────────────────────────────
  const getRating = () => {
    const d = (difficulty || '').toLowerCase();
    return d === 'easy' ? 30 : d === 'medium' ? 60 : d === 'hard' ? 80 : 10;
  };

  const update = async () => {
    const completeQuestions = [problem.id];
    const rating = getRating();
    try {
      const existingCourses = JSON.parse(localStorage.getItem('courses') || '[]');
      const courseToUpdate  = existingCourses.find((c) => c.title === navHistory);
      if (courseToUpdate) {
        const result = await updateCourse(courseToUpdate.id, 1, completeQuestions, rating, totalProblems);
        if (result.success) setToastOpen(true);
        else alert(`Error updating course: ${result.error}`);
      } else {
        alert(`Course '${navHistory}' not found.`);
      }
    } catch (e) {
      console.error('Error updating course:', e);
    } finally {
      setLoading(false);
    }
  };

  const checkAnswer = async () => {
    setLoading(true);
    if (selectedOption === answer) {
      try {
        await createCourse(navHistory, description);
        if (flag) { update(); setflag('false'); }
      } catch {
        update();
      }
    } else if (selectedOption) {
      alert('Sorry, wrong answer!');
      setLoading(false);
    } else {
      alert('Please select an option.');
      setLoading(false);
    }
  };

  const handleOptionSelect = (value) => setSelectedOption(value);

  const handleNext = () => {
    setResetMcq(true);
    if (currentProblemIndex < problems.length - 1) {
      setCurrentProblemIndex((p) => p + 1);
      if (editorRef.current) editorRef.current.resetEditorState();
    }
  };

  const handlePrevious = () => {
    setResetMcq(true);
    if (currentProblemIndex > 0) {
      setCurrentProblemIndex((p) => p - 1);
      if (editorRef.current) editorRef.current.resetEditorState();
    }
  };

  const setIndex = (index) => setCurrentProblemIndex(index);

  const handleRunCode = () => { if (editorRef.current) editorRef.current.getCode(); };

  const getSolution = (code) => seteditorValue(code);

  const UploadAnswer = (ans) => { if (ans.id) setcurrentans(ans); };

  const handleEditProblem = (problemId) => navigate(`/edit/${problemId}/OfficialCources`);

  function generateObjectId() {
    const ts  = (new Date().getTime() / 1000 | 0).toString(16);
    const mid = 'xxxxxxxxxxxx'.replace(/[x]/g, () => (Math.random() * 16 | 0).toString(16));
    const cnt = 'xxxxxxxx'.replace(/[x]/g,    () => (Math.random() * 16 | 0).toString(16));
    return ts + mid + 'xx' + cnt;
  }

  const handleSubmitContestQuestion = async () => {
    if (!currentans.id) { alert('Run your code successfully first.'); return; }
    try {
      setLoading(true);
      if (!currentans.solution) currentans.solution = {};
      currentans.solution['java'] = { solution: editorValue };
      if (btnTitle === 'Submit') currentans.id = generateObjectId();
      await axios.post(
        `${import.meta.env.VITE_API_URL}/UserDetailsContest/${contest.nameOfContest}/username/${user}`,
        currentans
      );
      setLoading(false);
      setcurrentans('');
    } catch (e) {
      console.error('Error submitting contest question:', e);
      setLoading(false);
      setcurrentans('');
    }
  };

  const handleSubmit = async () => {
    if (!currentans.id) { alert('Run your code successfully first.'); return; }
    try {
      setLoading(true);
      try { await createCourse(navHistory, CourseDescription || description, normalizedLanguages); } catch { /* already exists */ }
      await update();
      setcurrentans('');
    } catch (e) {
      console.error('Error submitting:', e);
      alert('Solved, but progress could not be saved.');
      setLoading(false);
      setcurrentans('');
    }
  };

  const handleSubmitNormalQuestion = async () => {
    if (!currentans.id) { alert('Run your code successfully first.'); return; }
    try {
      const { id: _id, ...problemWithoutId } = problem;
      await axios.post(
        `${import.meta.env.VITE_API_URL}/Posts/username/${user}`,
        JSON.stringify(problemWithoutId),
        { headers: { 'Content-Type': 'application/json' } }
      );
    } catch (e) {
      console.error('Error submitting normal question:', e);
    }
  };

  const userContestDetailsCreate = async () => {
    try {
      const newContest = {
        nameOfContest:      contest.nameOfContest,
        nameOfOrganization: contest.nameOfOrganization,
        date: new Date(),
      };
      const basicAuth = 'Bearer ' + localStorage.getItem('token');
      const response  = await fetch(`${import.meta.env.VITE_API_URL}/UserDetailsContest`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: basicAuth },
        body: JSON.stringify(newContest),
      });
      const contentType = response.headers.get('content-type');
      const data = contentType?.includes('application/json') ? await response.json() : null;
      if (data) { setUserDetailsContestId(data); setcontestStartDate(data.date); }
    } catch (e) {
      console.error('Error creating contest details:', e);
    }
  };

  const handleTestSubmit = async () => {
    try {
      const endTime = new Date().toISOString();
      await axios.put(
        `${import.meta.env.VITE_API_URL}/UserDetailsContest/id/${UserDetailsContestId.id}`,
        { endTime },
        { auth: { username: user, password } }
      );
    } catch (e) {
      console.error('Error updating end time:', e);
    } finally {
      navigate('/contest');
    }
  };

  const getDifficultyLabel = () => difficulty?.toLowerCase() || type || 'Unknown';

  // ─── Submit button renderer ────────────────────────────────────────────────
  const renderSubmitBtn = () => {
    if (detailsType === 'Course') {
      return optionA
        ? <ActionBtn onClick={checkAnswer} loading={loading} label="Submit MCQ" primary />
        : <ActionBtn onClick={handleSubmit} loading={loading} label="Submit" primary />;
    }
    if (detailsType === 'Contest') {
      return <ActionBtn onClick={handleSubmitContestQuestion} loading={loading} label={btnTitle} primary />;
    }
    return <ActionBtn onClick={handleSubmitNormalQuestion} loading={loading} label="Submit" primary />;
  };

  // ─── Problem description content ───────────────────────────────────────────
  const descriptionPanel = (
    <div style={{ padding: '0 20px 24px', fontSize: 14, color: '#374151', lineHeight: 1.7 }}>
      {/* Title + badge */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '16px 0 14px', borderBottom: '1px solid #f3f4f6' }}>
        <span style={{ fontSize: 15, fontWeight: 700, color: '#111827' }}>
          {currentProblemIndex + 1}. {title}
        </span>
        {difficulty && <DiffBadge value={getDifficultyLabel()} />}
        {type && <span style={{ fontSize: 11, fontWeight: 600, color: '#7c3aed', background: '#f5f3ff', border: '1px solid #ddd6fe', padding: '2px 8px', borderRadius: 999 }}>{type}</span>}
        {role === 'ADMIN' && (
          <button
            onClick={() => handleEditProblem(problem.id)}
            style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 5, padding: '4px 10px', borderRadius: 6, fontSize: 12, color: '#2563eb', background: '#eff6ff', border: '1px solid #bfdbfe', cursor: 'pointer' }}
          >
            <EditIcon /> Edit
          </button>
        )}
      </div>

      {/* Description */}
      <div style={{ paddingTop: 14 }}>
        <HtmlRenderer htmlContent={description} />
      </div>

      {/* Examples */}
      {example && (
        <>
          <SectionLabel>Examples</SectionLabel>
          <pre style={{ margin: 0, fontSize: 13, fontFamily: "'JetBrains Mono', monospace", background: '#f9fafb', border: '1px solid #e5e7eb', padding: '12px 14px', borderRadius: 8, whiteSpace: 'pre-wrap', wordBreak: 'break-all', color: '#374151' }}>
            {example}
          </pre>
        </>
      )}

      {/* Input format */}
      {problem.input && (
        <>
          <SectionLabel>Input Format</SectionLabel>
          <pre style={{ margin: 0, fontSize: 13, fontFamily: "'JetBrains Mono', monospace", background: '#f9fafb', border: '1px solid #e5e7eb', padding: '12px 14px', borderRadius: 8, whiteSpace: 'pre-wrap', wordBreak: 'break-all', color: '#374151' }}>
            {problem.input}
          </pre>
        </>
      )}

      {/* Constraints */}
      {problem.constrain && (
        <>
          <SectionLabel>Constraints</SectionLabel>
          <pre style={{ margin: 0, fontSize: 13, fontFamily: "'JetBrains Mono', monospace", background: '#fffbeb', border: '1px solid #fde68a', padding: '12px 14px', borderRadius: 8, whiteSpace: 'pre-wrap', wordBreak: 'break-all', color: '#92400e' }}>
            {problem.constrain}
          </pre>
        </>
      )}
    </div>
  );

  const solutionPanel = (
    <div style={{ padding: '16px 20px' }}>
      {problem.videoUrl && <YouTubePlayer url={problem.videoUrl} />}
      {problem.solution?.[selectedLang]?.solution ? (
        <div style={{ marginTop: 10 }}>
          <SectionLabel>Solution — {selectedLang}</SectionLabel>
          <CodeBlock code={problem.solution[selectedLang].solution} Codelanguage={selectedLang} />
        </div>
      ) : (
        <p style={{ fontSize: 14, color: '#9ca3af', padding: '24px 0', textAlign: 'center' }}>
          No solution available for this language.
        </p>
      )}
    </div>
  );

  const discussPanel = (
    <div style={{ padding: '40px 20px', textAlign: 'center' }}>
      <p style={{ fontSize: 14, color: '#9ca3af' }}>No discussions yet for this problem.</p>
    </div>
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden', background: '#0d1117' }}>

      {/* Security & breadcrumb */}
      {detailsType === 'Contest' && <SecurityChecks />}
      {detailsType === 'Course'  && (
        <div style={{ background: '#fff', flexShrink: 0 }}>
          <IconBreadcrumbs currentPage={currentPage} title={navHistory} question={title} />
        </div>
      )}
      {detailsType === 'Contest' && <TestModeHeading initialTimeLeft={timeLeft} startedAt={contestStartDate} />}

      {/* ── Top toolbar ── */}
      <div style={{
        height: 46, background: '#16161f', borderBottom: '1px solid #2d2d3d',
        display: 'flex', alignItems: 'center', gap: 8, padding: '0 14px',
        flexShrink: 0,
      }}>
        {/* Problem list toggle */}
        <button
          onClick={() => setProblemListOpen((v) => !v)}
          title="Problem list"
          style={{ padding: '5px 8px', borderRadius: 6, background: 'transparent', border: '1px solid #3d3d55', color: '#c9d1d9', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
        >
          <ListIcon />
        </button>

        {/* Left tabs */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {[['problem', 'Problem'], ['solution', 'Solution'], ['discuss', 'Discuss']].map(([key, label]) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              style={{
                padding: '5px 12px', borderRadius: 6, fontSize: 13, fontWeight: 500, cursor: 'pointer',
                background: activeTab === key ? '#2d2d3d' : 'transparent',
                border: activeTab === key ? '1px solid #3d3d55' : '1px solid transparent',
                color: activeTab === key ? '#e2e8f0' : '#6b7280',
              }}
            >
              {label}
            </button>
          ))}
        </div>

        <div style={{ flex: 1 }} />

        {/* Progress indicator */}
        {problems.length > 0 && (
          <span style={{ fontSize: 12, color: '#6b7280', marginRight: 4 }}>
            {currentProblemIndex + 1} / {problems.length}
          </span>
        )}

        {/* Language dropdown (only for code problems) */}
        {!optionA && normalizedLanguages.length > 0 && (
          <div ref={langRef} style={{ position: 'relative' }}>
            <button
              onClick={() => setLangOpen((v) => !v)}
              style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '5px 10px', borderRadius: 6, background: '#2d2d3d', border: '1px solid #3d3d55', color: '#c9d1d9', fontSize: 13, cursor: 'pointer' }}
            >
              {selectedLang}
              <ChevronDown />
            </button>
            {langOpen && (
              <div style={{ position: 'absolute', top: 'calc(100% + 5px)', right: 0, minWidth: 140, background: '#1e1e2e', border: '1px solid #3d3d55', borderRadius: 8, overflow: 'hidden', zIndex: 100 }}>
                {normalizedLanguages.filter(Boolean).map((lang) => (
                  <button
                    key={lang}
                    onClick={() => { setSelectedLang(lang); setLangOpen(false); }}
                    style={{ display: 'block', width: '100%', textAlign: 'left', padding: '8px 14px', fontSize: 13, cursor: 'pointer', color: lang === selectedLang ? '#60a5fa' : '#c9d1d9', background: lang === selectedLang ? '#2563eb22' : 'transparent', border: 'none' }}
                    onMouseEnter={(e) => { if (lang !== selectedLang) e.currentTarget.style.background = '#2d2d3d'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = lang === selectedLang ? '#2563eb22' : 'transparent'; }}
                  >
                    {lang}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Timer toggle */}
        <button
          onClick={() => setIsTimerRunning((v) => !v)}
          title="Toggle timer"
          style={{ padding: '5px 8px', borderRadius: 6, background: isTimerRunning ? '#1e3a5f' : 'transparent', border: '1px solid #3d3d55', color: isTimerRunning ? '#60a5fa' : '#6b7280', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 5 }}
        >
          <TimerIcon />
          <Timer running={isTimerRunning} />
        </button>

        {/* Settings */}
        <button
          onClick={() => setSettingsOpen(true)}
          style={{ padding: '5px 8px', borderRadius: 6, background: 'transparent', border: '1px solid #3d3d55', color: '#6b7280', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
        >
          <SettingsIcon />
        </button>

        {/* Contest finish button */}
        {detailsType === 'Contest' && (
          <SubmitButton onClick={handleTestSubmit} />
        )}
      </div>

      {/* ── Main split ── */}
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>

        {/* Problem list drawer overlay */}
        {problemListOpen && detailsType !== 'normal' && (
          <MiniProblemDrawerComponent
            setsubmitProblemTitle={setsubmitProblemTitle}
            setsubmitProblem={setsubmitProblem}
            contestName={contest.nameOfContest}
            user={user}
            setIndex={setIndex}
            problems={problems}
            open={problemListOpen}
            onClose={() => setProblemListOpen(false)}
          />
        )}

        {/* ── Left panel: problem description ── */}
        <div style={{
          width: '42%', minWidth: 320, flexShrink: 0,
          background: '#fff', overflow: 'hidden',
          display: 'flex', flexDirection: 'column',
          borderRight: '1px solid #2d2d3d',
        }}>
          <div style={{ flex: 1, overflowY: 'auto' }}>
            {activeTab === 'problem'  && descriptionPanel}
            {activeTab === 'solution' && solutionPanel}
            {activeTab === 'discuss'  && discussPanel}
          </div>
        </div>

        {/* ── Right panel: editor ── */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', background: '#1e1e2e' }}>
          {/* Editor area */}
          <div style={{ flex: 1, overflow: 'hidden' }}>
            {optionA ? (
              <div style={{ padding: 20, background: '#fff', height: '100%', overflowY: 'auto' }}>
                <Mcq
                  title={title}
                  problem={problem}
                  options={questionOptions}
                  onOptionSelect={handleOptionSelect}
                  reset={resetMcq}
                />
              </div>
            ) : (
              <MyEditor
                getSolution={getSolution}
                CourseLanguage={selectedLang}
                spin={setiSubmit}
                ref={editorRef}
                input={problem.input}
                saveToDatabase={UploadAnswer}
                problem={problem}
                courseTitle={navHistory}
                answer={answer}
                title={title}
                description={description}
                difficulty={difficulty}
              />
            )}
          </div>
        </div>
      </div>

      {/* ── Bottom action bar ── */}
      <div style={{
        height: 50, background: '#16161f', borderTop: '1px solid #2d2d3d',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 16px', flexShrink: 0,
      }}>
        {/* Left: prev/next */}
        <div style={{ display: 'flex', gap: 6 }}>
          <NavBtn onClick={handlePrevious} disabled={currentProblemIndex === 0} icon={<PrevIcon />} label="Prev" />
          <NavBtn onClick={handleNext} disabled={currentProblemIndex === problems.length - 1} icon={<NextIcon />} label="Next" reverse />
        </div>

        {/* Right: run + submit */}
        <div style={{ display: 'flex', gap: 8 }}>
          {!optionA && (
            <ActionBtn
              onClick={handleRunCode}
              loading={iSubmit}
              label="Run"
              icon={<RunIcon />}
            />
          )}
          {renderSubmitBtn()}
        </div>
      </div>

      {/* Settings panel */}
      <SettingsPanel open={settingsOpen} onClose={() => setSettingsOpen(false)} />

      {/* Toast */}
      <Toast open={toastOpen} onClose={() => setToastOpen(false)}>
        Progress saved!
      </Toast>
    </div>
  );
}

// ─── Button helpers ───────────────────────────────────────────────────────────
function NavBtn({ onClick, disabled, icon, label, reverse }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        display: 'flex', alignItems: 'center', gap: 5,
        flexDirection: reverse ? 'row-reverse' : 'row',
        padding: '6px 12px', borderRadius: 6, fontSize: 13, fontWeight: 500,
        color: disabled ? '#4b5563' : '#c9d1d9',
        background: 'transparent', border: '1px solid #3d3d55',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.4 : 1,
        transition: 'background 0.15s',
      }}
      onMouseEnter={(e) => { if (!disabled) e.currentTarget.style.background = '#2d2d3d'; }}
      onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
    >
      {icon} {label}
    </button>
  );
}

function ActionBtn({ onClick, loading, label, icon, primary }) {
  return (
    <button
      onClick={onClick}
      disabled={loading}
      style={{
        display: 'flex', alignItems: 'center', gap: 6,
        padding: '6px 16px', borderRadius: 6, fontSize: 13, fontWeight: 600,
        color: primary ? '#fff' : '#c9d1d9',
        background: loading ? '#1d4ed8' : primary ? '#2563eb' : '#2d2d3d',
        border: primary ? 'none' : '1px solid #3d3d55',
        cursor: loading ? 'not-allowed' : 'pointer',
        transition: 'background 0.15s',
      }}
    >
      {loading ? (
        <Spinner animation="border" size="sm" style={{ width: 13, height: 13 }} />
      ) : icon ? icon : null}
      {loading ? 'Running...' : label}
    </button>
  );
}

export default QuestionApi;
