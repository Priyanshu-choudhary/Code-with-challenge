import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CloseIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);
const CheckMark = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);
const ChevronRight = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 18 15 12 9 6"/>
  </svg>
);

const MiniProblemDrawerComponent = ({
  setsubmitProblemTitle,
  setsubmitProblem,
  open,
  onClose,
  problems,
  setIndex,
  contestName,
  user,
}) => {
  const [completedProblems, setCompletedProblems] = useState([]);
  const [activeIdx, setActiveIdx] = useState(null);

  useEffect(() => {
    if (!open || !contestName || !user) return;
    const fetch = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/UserDetailsContest/${user}/${contestName}`
        );
        const posts = response.data[0].posts || [];
        setCompletedProblems(posts.map((p) => p.title));
        setsubmitProblem(posts.map((p) => ({ id: p.id, title: p.title })));
      } catch {
        // silent
      }
    };
    fetch();
  }, [open]);

  // Close on Escape
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    if (open) document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [open, onClose]);

  const handleClick = (index) => {
    setActiveIdx(index);
    setIndex(index);
    onClose();
  };

  return (
    <>
      {/* Backdrop */}
      {open && (
        <div
          onClick={onClose}
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.3)', zIndex: 200 }}
        />
      )}

      {/* Drawer */}
      <div style={{
        position: 'fixed', top: 0, left: 0, bottom: 0, width: 300,
        background: '#fff', borderRight: '1px solid #e5e7eb',
        boxShadow: '4px 0 24px rgba(0,0,0,0.12)',
        zIndex: 300,
        display: 'flex', flexDirection: 'column',
        transform: open ? 'translateX(0)' : 'translateX(-100%)',
        transition: 'transform 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
      }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 18px', borderBottom: '1px solid #f3f4f6', flexShrink: 0 }}>
          <h2 style={{ fontSize: 14, fontWeight: 700, color: '#111827', margin: 0 }}>
            Problem List
            <span style={{ fontSize: 12, fontWeight: 400, color: '#9ca3af', marginLeft: 8 }}>
              {problems.length} problems
            </span>
          </h2>
          <button
            onClick={onClose}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6b7280', padding: 4, display: 'flex', alignItems: 'center', borderRadius: 6 }}
          >
            <CloseIcon />
          </button>
        </div>

        {/* List */}
        <div style={{ flex: 1, overflowY: 'auto' }}>
          {problems.map((problem, index) => {
            const done = completedProblems.includes(problem.title);
            const active = activeIdx === index;
            return (
              <div
                key={index}
                onClick={() => handleClick(index)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 10,
                  padding: '11px 18px', cursor: 'pointer',
                  background: active ? '#eff6ff' : 'transparent',
                  borderBottom: '1px solid #f9fafb',
                  transition: 'background 0.1s',
                }}
                onMouseEnter={(e) => { if (!active) e.currentTarget.style.background = '#f9fafb'; }}
                onMouseLeave={(e) => { if (!active) e.currentTarget.style.background = 'transparent'; }}
              >
                <span style={{ fontSize: 12, color: '#9ca3af', fontWeight: 500, width: 24, flexShrink: 0 }}>{index + 1}</span>
                <span style={{ flex: 1, fontSize: 13, color: active ? '#2563eb' : '#374151', fontWeight: active ? 600 : 400, lineHeight: 1.4 }}>
                  {problem.title}
                </span>
                {done && (
                  <span style={{ display: 'flex', alignItems: 'center', background: '#f0fdf4', borderRadius: '50%', padding: 3 }}>
                    <CheckMark />
                  </span>
                )}
                <ChevronRight />
              </div>
            );
          })}

          {problems.length === 0 && (
            <p style={{ fontSize: 13, color: '#9ca3af', textAlign: 'center', padding: '32px 16px' }}>
              No problems loaded.
            </p>
          )}
        </div>

        {/* Footer summary */}
        <div style={{ padding: '10px 18px', borderTop: '1px solid #f3f4f6', flexShrink: 0 }}>
          <p style={{ fontSize: 12, color: '#9ca3af', margin: 0 }}>
            {completedProblems.length} of {problems.length} completed
          </p>
        </div>
      </div>
    </>
  );
};

export default MiniProblemDrawerComponent;
