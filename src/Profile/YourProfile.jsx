import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Dashboard from '../dashBoard/Dashboard';
import { UserContext } from '../Context/UserContext';
import Footer2 from '../home/Footer2';

// ─── Stat card ────────────────────────────────────────────────────────────────
function StatCard({ label, value, color = '#2563eb' }) {
  return (
    <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 10, padding: '16px 20px', flex: 1, minWidth: 100 }}>
      <p style={{ fontSize: 11, fontWeight: 600, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.05em', margin: '0 0 6px' }}>{label}</p>
      <p style={{ fontSize: 26, fontWeight: 700, color, margin: 0 }}>{value ?? '—'}</p>
    </div>
  );
}

// ─── Progress bar ─────────────────────────────────────────────────────────────
function ProgressBar({ value, total }) {
  const pct = total > 0 ? Math.round((value / total) * 100) : 0;
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: '#6b7280', marginBottom: 4 }}>
        <span>{pct}%</span>
        <span>{value}/{total}</span>
      </div>
      <div style={{ height: 5, borderRadius: 4, background: '#f3f4f6', overflow: 'hidden' }}>
        <div style={{ width: `${pct}%`, height: '100%', background: '#2563eb', borderRadius: 4 }} />
      </div>
    </div>
  );
}

// ─── Section box ─────────────────────────────────────────────────────────────
function Section({ title, children, action }) {
  return (
    <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 12, padding: '20px 22px', marginBottom: 16 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
        <h2 style={{ fontSize: 14, fontWeight: 600, color: '#111827', margin: 0 }}>{title}</h2>
        {action}
      </div>
      {children}
    </div>
  );
}

// ─── Edit profile modal ───────────────────────────────────────────────────────
function EditModal({ user, onClose }) {
  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.35)', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      onClick={onClose}>
      <div style={{ background: '#fff', borderRadius: 14, padding: 28, width: '90%', maxWidth: 420, boxShadow: '0 20px 60px rgba(0,0,0,0.15)' }}
        onClick={(e) => e.stopPropagation()}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
          <h2 style={{ fontSize: 16, fontWeight: 600, color: '#111827', margin: 0 }}>Edit profile</h2>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6b7280', fontSize: 20 }}>×</button>
        </div>
        <p style={{ fontSize: 14, color: '#6b7280' }}>Profile editing is managed via your account settings.</p>
        <button onClick={onClose}
          style={{ marginTop: 16, padding: '9px 20px', borderRadius: 8, fontSize: 14, fontWeight: 600, color: '#fff', background: '#2563eb', border: 'none', cursor: 'pointer' }}>
          Close
        </button>
      </div>
    </div>
  );
}

// ─── Main profile page ────────────────────────────────────────────────────────
const YourProfile = () => {
  const navigate  = useNavigate();
  const { user, role } = useContext(UserContext);
  const [userData,   setUserData]   = useState({});
  const [isLoading,  setIsLoading]  = useState(true);
  const [editOpen,   setEditOpen]   = useState(false);

  const username = typeof user === 'string' ? user : user?.name;
  const initial  = username ? username[0].toUpperCase() : '?';

  useEffect(() => {
    if (!username) { setIsLoading(false); return; }
    fetch(`${import.meta.env.VITE_API_URL}/Public/showUser/${username}`)
      .then((r) => r.json())
      .then((d) => { setUserData(d); })
      .catch(() => {})
      .finally(() => setIsLoading(false));
  }, [username]);

  const handleProblemClick = (problem) => {
    navigate(`/question/${problem.id}/ProblemSet`, {
      state: { problems: [problem], currentIndex: 0, navHistory: 'no def', currentPage: 'no current page', CourseDescription: 'description', totalProblems: 0, language: [problem.language || 'java'] },
    });
  };

  if (isLoading) {
    return (
      <div style={{ minHeight: '100vh', background: '#f9fafb' }}>
        <Dashboard />
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 'calc(100vh - 60px)' }}>
          <div style={{ width: 36, height: 36, border: '3px solid #e5e7eb', borderTopColor: '#2563eb', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
        </div>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f9fafb', display: 'flex', flexDirection: 'column' }}>
      <Dashboard />

      <div style={{ flex: 1, maxWidth: 1100, margin: '0 auto', width: '100%', padding: '24px', boxSizing: 'border-box' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '240px 1fr 260px', gap: 16, alignItems: 'start' }}>

          {/* ── Left: identity card ── */}
          <div>
            <Section title="">
              <div style={{ textAlign: 'center', paddingTop: 4 }}>
                {/* Avatar */}
                <div style={{ width: 80, height: 80, borderRadius: '50%', background: '#2563eb', color: '#fff', fontSize: 30, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 14px' }}>
                  {initial}
                </div>
                <h2 style={{ fontSize: 17, fontWeight: 700, color: '#111827', margin: '0 0 4px' }}>{userData.name || username}</h2>
                <p style={{ fontSize: 13, color: '#6b7280', margin: '0 0 14px' }}>Rating: <strong style={{ color: '#111827' }}>{userData.rating ?? '—'}</strong></p>
                <button
                  onClick={() => setEditOpen(true)}
                  style={{ padding: '7px 18px', borderRadius: 8, fontSize: 13, fontWeight: 500, color: '#374151', background: '#fff', border: '1px solid #e5e7eb', cursor: 'pointer' }}
                >
                  Edit profile
                </button>
              </div>

              {/* Info */}
              <div style={{ marginTop: 20, borderTop: '1px solid #f3f4f6', paddingTop: 16, display: 'flex', flexDirection: 'column', gap: 10 }}>
                {userData.email && (
                  <div>
                    <p style={{ fontSize: 11, fontWeight: 600, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.05em', margin: '0 0 2px' }}>Email</p>
                    <p style={{ fontSize: 13, color: '#374151', margin: 0, wordBreak: 'break-all' }}>{userData.email}</p>
                  </div>
                )}
                {userData.number && (
                  <div>
                    <p style={{ fontSize: 11, fontWeight: 600, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.05em', margin: '0 0 2px' }}>Phone</p>
                    <p style={{ fontSize: 13, color: '#374151', margin: 0 }}>{userData.number}</p>
                  </div>
                )}
                {userData.collage && (
                  <div>
                    <p style={{ fontSize: 11, fontWeight: 600, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.05em', margin: '0 0 2px' }}>College</p>
                    <p style={{ fontSize: 13, color: '#374151', margin: 0 }}>{userData.collage}</p>
                  </div>
                )}
                {userData.branch && (
                  <div>
                    <p style={{ fontSize: 11, fontWeight: 600, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.05em', margin: '0 0 2px' }}>Branch / Year</p>
                    <p style={{ fontSize: 13, color: '#374151', margin: 0 }}>{userData.branch}{userData.year ? ` · ${userData.year}` : ''}</p>
                  </div>
                )}
                {userData.skills && (
                  <div>
                    <p style={{ fontSize: 11, fontWeight: 600, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.05em', margin: '0 0 6px' }}>Skills</p>
                    <p style={{ fontSize: 13, color: '#374151', margin: 0 }}>{userData.skills}</p>
                  </div>
                )}
              </div>
            </Section>
          </div>

          {/* ── Middle: stats + solved problems ── */}
          <div>
            {/* Stats row */}
            <div style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
              <StatCard label="Problems solved" value={userData.postCount} color="#2563eb" />
              <StatCard label="Courses"         value={userData.courses?.length ?? 0} color="#7c3aed" />
              <StatCard label="Contests"        value={userData.userContestDetails?.length ?? 0} color="#059669" />
            </div>

            {/* Solved problems */}
            <Section title={`Solved problems (${userData.posts?.length ?? 0})`}>
              {userData.posts?.length > 0 ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 2, maxHeight: 440, overflowY: 'auto' }}>
                  {userData.posts.map((problem, index) => (
                    <div
                      key={problem.id}
                      onClick={() => handleProblemClick(problem)}
                      style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '9px 10px', borderRadius: 7, cursor: 'pointer', transition: 'background 0.1s' }}
                      onMouseEnter={(e) => { e.currentTarget.style.background = '#f9fafb'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
                    >
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"/>
                      </svg>
                      <span style={{ fontSize: 13, color: '#374151' }}>{index + 1}. {problem.title}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p style={{ fontSize: 14, color: '#9ca3af', textAlign: 'center', padding: '24px 0' }}>No problems solved yet. Start practicing!</p>
              )}
            </Section>
          </div>

          {/* ── Right: courses + contests ── */}
          <div>
            {/* Courses */}
            <Section title={`Courses (${userData.courses?.length ?? 0})`}>
              {userData.courses?.length > 0 ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14, maxHeight: 280, overflowY: 'auto' }}>
                  {userData.courses.map((course, i) => (
                    <div key={i}>
                      <p style={{ fontSize: 13, fontWeight: 600, color: '#111827', margin: '0 0 6px' }}>{course.title}</p>
                      <ProgressBar value={course.progress} total={course.totalQuestions} />
                    </div>
                  ))}
                </div>
              ) : (
                <p style={{ fontSize: 13, color: '#9ca3af' }}>No courses enrolled.</p>
              )}
            </Section>

            {/* Contests */}
            <Section title={`Contests (${userData.userContestDetails?.length ?? 0})`}>
              {userData.userContestDetails?.length > 0 ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10, maxHeight: 260, overflowY: 'auto' }}>
                  {userData.userContestDetails.map((contest, i) => (
                    <div key={i} style={{ padding: '10px 12px', background: '#f9fafb', borderRadius: 8, border: '1px solid #f3f4f6' }}>
                      <p style={{ fontSize: 13, fontWeight: 600, color: '#111827', margin: '0 0 4px' }}>{contest.nameOfContest}</p>
                      <p style={{ fontSize: 12, color: '#6b7280', margin: '0 0 2px' }}>By {contest.nameOfOrganization}</p>
                      <p style={{ fontSize: 11, color: '#9ca3af', margin: 0 }}>{contest.date}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p style={{ fontSize: 13, color: '#9ca3af' }}>No contests participated.</p>
              )}
            </Section>
          </div>

        </div>
      </div>

      <Footer2 />

      {editOpen && <EditModal user={userData} onClose={() => setEditOpen(false)} />}
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
};

export default YourProfile;
