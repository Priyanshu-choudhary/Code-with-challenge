import React, { useEffect, useState, useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Dashboard from '../dashBoard/Dashboard';
import { UserContext } from '../Context/UserContext';
import { CourseContext } from '/src/Context/CourseContex.jsx';
import Footer2 from '../home/Footer2';

// ─── SVG icons ────────────────────────────────────────────────────────────────
const BookIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
  </svg>
);
const ArrowRight = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
  </svg>
);
const RefreshIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/>
  </svg>
);

// ─── Progress card (enrolled courses) ────────────────────────────────────────
function ProgressCard({ course }) {
  const navigate = useNavigate();
  const pct = course.totalQuestions > 0
    ? Math.round((course.progress / course.totalQuestions) * 100)
    : 0;

  return (
    <div
      onClick={() => navigate('/ContinueLearing', { state: { ...course, courseId: course.id, course } })}
      style={{
        background: '#fff', border: '1px solid #e5e7eb', borderRadius: 12,
        padding: '18px 20px', cursor: 'pointer', width: 240, flexShrink: 0,
        transition: 'border-color 0.15s',
      }}
      onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#2563eb'; }}
      onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#e5e7eb'; }}
    >
      <p style={{ fontSize: 11, color: '#9ca3af', margin: '0 0 4px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>In progress</p>
      <h3 style={{ fontSize: 15, fontWeight: 600, color: '#111827', margin: '0 0 12px', lineHeight: 1.3 }}>{course.title}</h3>
      <div style={{ height: 4, borderRadius: 4, background: '#f3f4f6', marginBottom: 8, overflow: 'hidden' }}>
        <div style={{ width: `${pct}%`, height: '100%', background: '#2563eb', borderRadius: 4 }} />
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: '#6b7280' }}>
        <span>{pct}% complete</span>
        <span>{course.progress}/{course.totalQuestions}</span>
      </div>
      <div style={{ marginTop: 12, display: 'flex', alignItems: 'center', gap: 4, fontSize: 13, fontWeight: 500, color: '#2563eb' }}>
        Continue <ArrowRight />
      </div>
    </div>
  );
}

// ─── Course card (official / all courses) ────────────────────────────────────
function CourseCard({ course, role, onClick }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: '#fff', border: `1px solid ${hovered ? '#2563eb' : '#e5e7eb'}`,
        borderRadius: 12, padding: '20px', cursor: 'pointer', width: 220, flexShrink: 0,
        transition: 'border-color 0.15s',
      }}
    >
      {/* Icon placeholder */}
      <div style={{ width: 40, height: 40, borderRadius: 8, background: '#eff6ff', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#2563eb', marginBottom: 14 }}>
        <BookIcon />
      </div>
      <h3 style={{ fontSize: 14, fontWeight: 600, color: '#111827', margin: '0 0 6px', lineHeight: 1.35 }}>{course.title}</h3>
      <p style={{ fontSize: 12, color: '#6b7280', margin: '0 0 12px' }}>{course.totalQuestions} questions</p>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontSize: 11, padding: '2px 8px', borderRadius: 999, background: '#f0fdf4', color: '#16a34a', border: '1px solid #bbf7d0', fontWeight: 500 }}>Free</span>
        {role === 'ADMIN' && (
          <span style={{ fontSize: 11, padding: '2px 8px', borderRadius: 999, background: '#eff6ff', color: '#2563eb', border: '1px solid #bfdbfe' }}>{course.permission}</span>
        )}
      </div>
    </div>
  );
}

// ─── Skeleton card ────────────────────────────────────────────────────────────
function SkeletonCard() {
  return (
    <div style={{ width: 220, flexShrink: 0, border: '1px solid #f3f4f6', borderRadius: 12, padding: 20, background: '#fff' }}>
      <div style={{ width: 40, height: 40, borderRadius: 8, background: '#f3f4f6', marginBottom: 14, animation: 'pulse 1.5s ease-in-out infinite' }} />
      <div style={{ height: 14, width: '80%', borderRadius: 4, background: '#f3f4f6', marginBottom: 8, animation: 'pulse 1.5s ease-in-out infinite' }} />
      <div style={{ height: 12, width: '50%', borderRadius: 4, background: '#f3f4f6', animation: 'pulse 1.5s ease-in-out infinite' }} />
    </div>
  );
}

// ─── Section wrapper ──────────────────────────────────────────────────────────
function Section({ title, action, children }) {
  return (
    <section style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 12, padding: '24px 28px', marginBottom: 20 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
        <h2 style={{ fontSize: 16, fontWeight: 600, color: '#111827', margin: 0 }}>{title}</h2>
        {action}
      </div>
      {children}
    </section>
  );
}

// ─── Main learning page ───────────────────────────────────────────────────────
export default function LearningPage() {
  const navigate  = useNavigate();
  const { user, role } = useContext(UserContext);
  const { updateCourses, officialCourses, userCourses, setUserCourses, loading } = useContext(CourseContext);

  useEffect(() => {
    const fetchUserCourses = async () => {
      const userName = typeof user === 'string' ? user : user?.name;
      if (!userName) return;
      const token = localStorage.getItem('token');
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/Course/user?userName=${userName}&page=0&size=10`,
          { headers: token ? { Authorization: `Bearer ${token}` } : {} }
        );
        if (!res.ok) return;
        const page = await res.json();
        if (Array.isArray(page.content)) {
          localStorage.setItem('userCourses', JSON.stringify(page.content));
          setUserCourses(page.content);
        }
      } catch { /* silently ignore */ }
    };
    if (user) fetchUserCourses();
  }, [user, setUserCourses]);

  const handleCardClick = (course) => {
    navigate('/QuestionApi', { state: { ...course, totalQuestions: course.totalQuestions, courseId: course.id, course } });
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#f9fafb' }}>
      <Dashboard />

      {/* Page header */}
      <div style={{ background: '#fff', borderBottom: '1px solid #e5e7eb', padding: '28px 24px 24px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
          <div>
            <h1 style={{ fontSize: 22, fontWeight: 700, color: '#111827', margin: '0 0 4px' }}>Courses</h1>
            <p style={{ fontSize: 14, color: '#6b7280', margin: 0 }}>Structured learning paths for every level.</p>
          </div>
          <button
            onClick={() => navigate('/CourseForm', { state: { uploadUrl: 'OfficialCources' } })}
            style={{ padding: '8px 16px', borderRadius: 8, fontSize: 13, fontWeight: 600, color: '#fff', background: '#2563eb', border: 'none', cursor: 'pointer' }}
          >
            + Create course
          </button>
        </div>
      </div>

      <div style={{ flex: 1, maxWidth: 1100, margin: '0 auto', width: '100%', padding: '24px', boxSizing: 'border-box' }}>

        {/* Continue learning */}
        {userCourses.length > 0 && (
          <Section title="Continue learning">
            <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
              {userCourses.map((course, i) => (
                <ProgressCard key={course.id || i} course={course} />
              ))}
            </div>
          </Section>
        )}

        {/* Official courses */}
        <Section
          title="All courses"
          action={
            <button
              onClick={updateCourses}
              style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '5px 10px', borderRadius: 7, fontSize: 12, color: '#6b7280', background: 'transparent', border: '1px solid #e5e7eb', cursor: 'pointer' }}
            >
              <RefreshIcon /> Refresh
            </button>
          }
        >
          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
            {loading
              ? [1, 2, 3, 4].map((k) => <SkeletonCard key={k} />)
              : officialCourses.length === 0
              ? <p style={{ fontSize: 14, color: '#9ca3af' }}>No courses available yet.</p>
              : officialCourses.map((course, i) => (
                <CourseCard
                  key={course.id || i}
                  course={course}
                  role={role}
                  onClick={() => handleCardClick(course)}
                />
              ))
            }
          </div>
        </Section>

      </div>

      <Footer2 />
      <style>{`@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.45} }`}</style>
    </div>
  );
}
