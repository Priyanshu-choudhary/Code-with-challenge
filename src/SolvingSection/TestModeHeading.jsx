import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';

const HourglassIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 22h14"/><path d="M5 2h14"/><path d="M17 22v-4.172a2 2 0 0 0-.586-1.414L12 12l-4.414 4.414A2 2 0 0 0 7 17.828V22"/><path d="M7 2v4.172a2 2 0 0 0 .586 1.414L12 12l4.414-4.414A2 2 0 0 0 17 6.172V2"/>
  </svg>
);

function TestModeHeading({ initialTimeLeft, startedAt }) {
  const [timeLeft, setTimeLeft] = useState((initialTimeLeft || 0) * 60);

  useEffect(() => {
    const startTime = dayjs(startedAt);
    const update = () => {
      const diff = (initialTimeLeft * 60) - dayjs().diff(startTime, 'second');
      setTimeLeft(diff > 0 ? diff : 0);
    };
    update();
    const t = setInterval(update, 1000);
    return () => clearInterval(t);
  }, [initialTimeLeft, startedAt]);

  const h = Math.floor(timeLeft / 3600);
  const m = Math.floor((timeLeft % 3600) / 60);
  const s = timeLeft % 60;

  const urgent = timeLeft < 300; // under 5 minutes

  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '8px 20px', background: '#fff', borderBottom: '1px solid #e5e7eb',
      flexShrink: 0,
    }}>
      <span style={{ fontSize: 14, fontWeight: 700, color: '#111827' }}>CFC</span>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 16px', borderRadius: 999, background: urgent ? '#fef2f2' : '#eff6ff', border: `1px solid ${urgent ? '#fecaca' : '#bfdbfe'}` }}>
        <span style={{ color: urgent ? '#dc2626' : '#2563eb' }}><HourglassIcon /></span>
        <span style={{ fontSize: 13, fontWeight: 700, fontFamily: "'JetBrains Mono', monospace", color: urgent ? '#dc2626' : '#2563eb', letterSpacing: '0.05em' }}>
          {String(h).padStart(2, '0')}:{String(m).padStart(2, '0')}:{String(s).padStart(2, '0')}
        </span>
      </div>
      <div style={{ fontSize: 12, fontWeight: 600, color: '#9ca3af', background: '#fef3c7', border: '1px solid #fde68a', padding: '3px 10px', borderRadius: 999, color: '#d97706' }}>
        Test Mode
      </div>
    </div>
  );
}

export default TestModeHeading;
