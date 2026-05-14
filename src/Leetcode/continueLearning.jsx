import React, { useState, useEffect, useContext, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Dashboard from '../dashBoard/Dashboard';
import { UserContext } from '../Context/UserContext';
import Footer2 from '../home/Footer2';

// ─── SVG Icons ────────────────────────────────────────────────────────────────
const CheckIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);
const LockIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
  </svg>
);
const ChevronDown = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 12 15 18 9"/>
  </svg>
);
const ChevronUp = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="18 15 12 9 6 15"/>
  </svg>
);
const EditIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
  </svg>
);
const TrashIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
  </svg>
);
const BackIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>
  </svg>
);
const CodeIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
  </svg>
);

// ─── Difficulty badge ─────────────────────────────────────────────────────────
const DIFF_STYLE = {
  easy:   { color: '#16a34a', background: '#f0fdf4', border: '#bbf7d0' },
  medium: { color: '#d97706', background: '#fffbeb', border: '#fde68a' },
  hard:   { color: '#dc2626', background: '#fef2f2', border: '#fecaca' },
};
function DiffBadge({ value }) {
  const key = (value || '').toLowerCase();
  const s = DIFF_STYLE[key] || { color: '#6b7280', background: '#f3f4f6', border: '#e5e7eb' };
  return (
    <span style={{ fontSize: 11, fontWeight: 600, color: s.color, background: s.background, border: `1px solid ${s.border}`, padding: '2px 8px', borderRadius: 999 }}>
      {value}
    </span>
  );
}

// ─── Skeleton row ─────────────────────────────────────────────────────────────
function SkeletonRow() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 20px', borderBottom: '1px solid #f3f4f6' }}>
      <div style={{ width: 28, height: 14, borderRadius: 4, background: '#f3f4f6' }} />
      <div style={{ flex: 1, height: 14, borderRadius: 4, background: '#f3f4f6' }} />
      <div style={{ width: 56, height: 20, borderRadius: 999, background: '#f3f4f6' }} />
      <div style={{ width: 56, height: 20, borderRadius: 999, background: '#f3f4f6' }} />
    </div>
  );
}

// ─── Problem row ──────────────────────────────────────────────────────────────
function ProblemRow({ problem, index, done, role, onEdit, onDelete, onClick }) {
  const [hovered, setHovered] = useState(false);
  const isMcq = problem.type === 'MCQ';

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex', alignItems: 'center', gap: 12,
        padding: '13px 20px', borderBottom: '1px solid #f3f4f6',
        cursor: 'pointer', background: hovered ? '#f9fafb' : '#fff',
        transition: 'background 0.1s',
      }}
    >
      {/* Index */}
      <span style={{ fontSize: 13, color: '#9ca3af', fontWeight: 500, width: 28, flexShrink: 0 }}>
        {index + 1}
      </span>

      {/* Done indicator */}
      <div style={{ width: 20, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {done ? <CheckIcon /> : <span style={{ width: 14, height: 14, display: 'block' }} />}
      </div>

      {/* Title */}
      <span style={{ flex: 1, fontSize: 14, color: hovered ? '#2563eb' : '#111827', fontWeight: 500, transition: 'color 0.1s' }}>
        {problem.title}
      </span>

      {/* Sequence (admin) */}
      {role === 'ADMIN' && (
        <span style={{ fontSize: 11, color: '#9ca3af', width: 40, textAlign: 'center' }}>
          #{problem.sequence}
        </span>
      )}

      {/* Type badge */}
      {isMcq ? (
        <span style={{ fontSize: 11, fontWeight: 600, color: '#7c3aed', background: '#f5f3ff', border: '1px solid #ddd6fe', padding: '2px 8px', borderRadius: 999 }}>
          MCQ
        </span>
      ) : (
        <span style={{ fontSize: 11, fontWeight: 600, color: '#2563eb', background: '#eff6ff', border: '1px solid #bfdbfe', padding: '2px 8px', borderRadius: 999, display: 'flex', alignItems: 'center', gap: 4 }}>
          <CodeIcon /> Code
        </span>
      )}

      {/* Difficulty */}
      {!isMcq && problem.difficulty && <DiffBadge value={problem.difficulty} />}

      {/* Admin actions */}
      {role === 'ADMIN' && (
        <div style={{ display: 'flex', gap: 6 }}>
          <button
            onClick={(e) => { e.stopPropagation(); onEdit(problem.id); }}
            style={{ padding: '4px 8px', borderRadius: 6, fontSize: 12, color: '#2563eb', background: '#eff6ff', border: '1px solid #bfdbfe', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4 }}
          >
            <EditIcon /> Edit
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onDelete(problem.id); }}
            style={{ padding: '4px 8px', borderRadius: 6, fontSize: 12, color: '#dc2626', background: '#fef2f2', border: '1px solid #fecaca', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4 }}
          >
            <TrashIcon /> Del
          </button>
        </div>
      )}
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
const ContinueLearing = () => {
  const [problems, setProblems]             = useState([]);
  const [loading, setLoading]               = useState(true);
  const [responseOk, setResponseOk]         = useState(true);
  const [completeQuestions, setCompleteQuestions] = useState([]);
  const [descExpanded, setDescExpanded]     = useState(false);

  const navigate  = useNavigate();
  const { user, role } = useContext(UserContext);
  const location  = useLocation();
  const { language, totalQuestions, title, description, progress, courseId, course } = location.state || {};

  const pct = (course?.totalQuestions > 0)
    ? Math.round(((course?.progress || 0) / course.totalQuestions) * 100)
    : 0;

  const solvedCount = completeQuestions.length;

  // ── Fetch problems ──────────────────────────────────────────────────────────
  const fetchProblems = useCallback(async () => {
    setLoading(true);
    try {
      const cachedData    = JSON.parse(localStorage.getItem(course.title)) || {};
      const lastModified  = cachedData.lastModified || null;
      const url = `${import.meta.env.VITE_API_URL}/Posts/Course/${course.title}/username/OfficialCources`;

      const response = await fetch(url, {
        headers: { 'Content-Type': 'application/json', ...(lastModified && { 'If-Modified-Since': lastModified }) },
      });

      if (response.status === 304 && cachedData.problems) {
        setProblems(cachedData.problems.sort((a, b) => a.sequence - b.sequence));
      } else if (response.ok) {
        const data = await response.json();
        const sorted = data.sort((a, b) => a.sequence - b.sequence);
        setProblems(sorted);
        const newLastModified = response.headers.get('Last-Modified');
        localStorage.setItem(course.title, JSON.stringify({ problems: sorted, lastModified: newLastModified }));
      } else if (response.status === 204) {
        setProblems([]);
      } else {
        setResponseOk(false);
      }
    } catch {
      setResponseOk(false);
    } finally {
      setLoading(false);
    }
  }, [course?.title]);

  // ── Fetch user progress ─────────────────────────────────────────────────────
  const fetchUserData = useCallback(async () => {
    if (!user) return;
    try {
      const basicAuth = 'Bearer ' + localStorage.getItem('token');
      const res = await fetch(`${import.meta.env.VITE_API_URL}/Course/${user}/0/10`, {
        headers: { Authorization: basicAuth, 'Content-Type': 'application/json' },
      });
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          const courses = data[0].courses || [];
          const matched = courses.find((c) => c.title === title);
          setCompleteQuestions(matched?.completeQuestions || []);
        }
      }
    } catch { /* silent */ }
  }, [user, title]);

  useEffect(() => {
    const cached = JSON.parse(localStorage.getItem(course?.title));
    if (cached?.problems) {
      setProblems(cached.problems);
      setLoading(false);
    }
    fetchProblems();
    fetchUserData();
  }, []);

  const handleProblemClick = (problem, index) => {
    navigate(`/question/${problem.id}/Course`, {
      state: {
        problems,
        currentIndex: index,
        navHistory: title,
        currentPage: 'Learn Skills',
        CourseDescription: description,
        totalProblems: problems.length,
        language,
      },
    });
  };

  const handleDelete = async (problemId) => {
    if (!window.confirm('Delete this problem?')) return;
    try {
      const basicAuth = 'Bearer ' + localStorage.getItem('token');
      const res = await fetch(`${import.meta.env.VITE_API_URL}/Posts/id/${problemId}`, {
        method: 'DELETE', headers: { Authorization: basicAuth },
      });
      if (res.ok) setProblems((prev) => prev.filter((p) => p.id !== problemId));
    } catch { /* silent */ }
  };

  const handleEdit = (problemId) => navigate(`/edit/${problemId}/OfficialCources`);

  const easyCount   = problems.filter((p) => p.difficulty?.toLowerCase() === 'easy').length;
  const mediumCount = problems.filter((p) => p.difficulty?.toLowerCase() === 'medium').length;
  const hardCount   = problems.filter((p) => p.difficulty?.toLowerCase() === 'hard').length;

  return (
    <div style={{ minHeight: '100vh', background: '#f9fafb', display: 'flex', flexDirection: 'column' }}>
      <Dashboard />

      {/* ── Course header ── */}
      <div style={{ background: '#fff', borderBottom: '1px solid #e5e7eb' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', padding: '24px 24px 20px', boxSizing: 'border-box' }}>
          {/* Back + title */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
            <button
              onClick={() => navigate(-1)}
              style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '6px 12px', borderRadius: 7, fontSize: 13, color: '#374151', background: '#f3f4f6', border: '1px solid #e5e7eb', cursor: 'pointer' }}
            >
              <BackIcon /> Back
            </button>
            <h1 style={{ fontSize: 20, fontWeight: 700, color: '#111827', margin: 0 }}>{title}</h1>
          </div>

          {/* Progress bar */}
          <div style={{ marginBottom: 14 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, color: '#6b7280', marginBottom: 6 }}>
              <span style={{ fontWeight: 500, color: '#374151' }}>{pct}% complete</span>
              <span>{course?.progress ?? 0} / {course?.totalQuestions ?? 0} problems</span>
            </div>
            <div style={{ height: 8, borderRadius: 8, background: '#f3f4f6', overflow: 'hidden' }}>
              <div style={{ width: `${pct}%`, height: '100%', background: '#2563eb', borderRadius: 8, transition: 'width 0.4s' }} />
            </div>
          </div>

          {/* Stats row */}
          <div style={{ display: 'flex', gap: 20, fontSize: 12, color: '#6b7280' }}>
            <span style={{ color: '#16a34a', fontWeight: 600 }}>{easyCount} Easy</span>
            <span style={{ color: '#d97706', fontWeight: 600 }}>{mediumCount} Medium</span>
            <span style={{ color: '#dc2626', fontWeight: 600 }}>{hardCount} Hard</span>
            <span>·</span>
            <span>{solvedCount} solved</span>
          </div>

          {/* Description (collapsible) */}
          {description && (
            <div style={{ marginTop: 14 }}>
              <div style={{ fontSize: 13, color: '#4b5563', lineHeight: 1.6, overflow: 'hidden', maxHeight: descExpanded ? 'none' : 56 }}>
                {description}
              </div>
              <button
                onClick={() => setDescExpanded((v) => !v)}
                style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 4, background: 'none', border: 'none', cursor: 'pointer', fontSize: 12, color: '#2563eb', padding: 0 }}
              >
                {descExpanded ? <><ChevronUp /> Show less</> : <><ChevronDown /> Read more</>}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* ── Problem list ── */}
      <div style={{ flex: 1, maxWidth: 900, margin: '24px auto', width: '100%', padding: '0 24px', boxSizing: 'border-box' }}>
        <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 12, overflow: 'hidden' }}>

          {/* Table header */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 20px', background: '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>
            <span style={{ width: 28, fontSize: 11, fontWeight: 600, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.05em' }}>#</span>
            <span style={{ width: 20 }} />
            <span style={{ flex: 1, fontSize: 11, fontWeight: 600, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Title</span>
            {role === 'ADMIN' && <span style={{ width: 40, fontSize: 11, fontWeight: 600, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Seq</span>}
            <span style={{ fontSize: 11, fontWeight: 600, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Type</span>
            <span style={{ fontSize: 11, fontWeight: 600, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Difficulty</span>
            {role === 'ADMIN' && <span style={{ fontSize: 11, fontWeight: 600, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Actions</span>}
          </div>

          {/* Rows */}
          {loading ? (
            Array.from({ length: 8 }).map((_, i) => <SkeletonRow key={i} />)
          ) : !responseOk ? (
            <div style={{ padding: '48px 24px', textAlign: 'center', color: '#6b7280', fontSize: 14 }}>
              Failed to load problems. Please try again.
            </div>
          ) : problems.length === 0 ? (
            <div style={{ padding: '48px 24px', textAlign: 'center', color: '#9ca3af', fontSize: 14 }}>
              No problems in this course yet.
            </div>
          ) : (
            problems.map((problem, index) => (
              <ProblemRow
                key={problem.id}
                problem={problem}
                index={index}
                done={completeQuestions.includes(problem.id)}
                role={role}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onClick={() => handleProblemClick(problem, index)}
              />
            ))
          )}
        </div>

        {/* Bottom summary */}
        {!loading && problems.length > 0 && (
          <p style={{ textAlign: 'center', fontSize: 13, color: '#9ca3af', marginTop: 16 }}>
            {problems.length} problem{problems.length !== 1 ? 's' : ''} · {solvedCount} completed
          </p>
        )}
      </div>

      <Footer2 />
    </div>
  );
};

export default ContinueLearing;
