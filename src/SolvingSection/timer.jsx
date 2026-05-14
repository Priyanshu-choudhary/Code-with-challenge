import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const ResetIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/>
  </svg>
);

const Timer = ({ running }) => {
  const [time, setTime]         = useState(0);
  const [isRunning, setIsRunning] = useState(running);

  useEffect(() => { setIsRunning(running); }, [running]);

  useEffect(() => {
    if (!isRunning) return;
    const interval = setInterval(() => setTime((t) => t + 1), 1000);
    return () => clearInterval(interval);
  }, [isRunning]);

  const formatTime = (seconds) => {
    const h = String(Math.floor(seconds / 3600)).padStart(2, '0');
    const m = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0');
    const s = String(seconds % 60).padStart(2, '0');
    return `${h}:${m}:${s}`;
  };

  if (!isRunning) return null;

  return (
    <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
      <span style={{ fontSize: 12, fontFamily: "'JetBrains Mono', monospace", color: '#93c5fd', letterSpacing: '0.05em' }}>
        {formatTime(time)}
      </span>
      <button
        onClick={() => setTime(0)}
        title="Reset timer"
        style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6b7280', padding: 0, display: 'flex', alignItems: 'center' }}
      >
        <ResetIcon />
      </button>
    </span>
  );
};

Timer.propTypes = {
  running: PropTypes.bool.isRequired,
};

export default Timer;
