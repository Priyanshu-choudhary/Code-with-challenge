import React, { useState, useEffect } from 'react';
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';
import logo from "/logo2.png";
import dayjs from 'dayjs';

function TestModeHeading({ initialTimeLeft, startedAt }) {
  const [timeLeft, setTimeLeft] = useState(initialTimeLeft * 60); // Convert minutes to seconds

  useEffect(() => {
    const startTime = dayjs(startedAt);

    const updateRemainingTime = () => {
      const now = dayjs();
      const diffInSeconds = initialTimeLeft * 60 - now.diff(startTime, 'second');
      setTimeLeft(diffInSeconds > 0 ? diffInSeconds : 0);
    };

    updateRemainingTime(); // Update immediately
    const timer = setInterval(updateRemainingTime, 1000);

    return () => clearInterval(timer);
  }, [initialTimeLeft, startedAt]);

  const convertTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const remainingSeconds = seconds % 3600;
    const mins = Math.floor(remainingSeconds / 60);
    const secs = remainingSeconds % 60;

    return { hours, mins, secs };
  };

  const { hours, mins, secs } = convertTime(timeLeft);

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <img height={40} width={70} src={logo} style={{ marginLeft: 5, padding: 5 }} alt='logo' />
        <p style={{ marginLeft: 20, fontSize: 20, color: '#FE9900' }}>
          <strong>Test Mode</strong>
        </p>
        <p style={{ marginRight: 50 }}>
          <HourglassBottomIcon />
          {`${hours}h ${mins}m ${secs}s`}
        </p>
      </div>
    </div>
  );
}

export default TestModeHeading;
