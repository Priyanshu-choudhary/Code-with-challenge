import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import StopIcon from '@mui/icons-material/Stop';
import RotateLeftIcon from '@mui/icons-material/RotateLeft';
const Timer = ({ running }) => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(running);
const setToZero=()=>{
    setTime(0);
};
  useEffect(() => {
    let timer;
    if (isRunning) {
      timer = setInterval(() => {
        setTime(prevTime => prevTime + 1);
      }, 1000);
    } else if (!isRunning && time !== 0) {
      clearInterval(timer);
    }
    return () => clearInterval(timer);
  }, [isRunning]);

  useEffect(() => {
    setIsRunning(running);
  }, [running]);

  const handleToggle = () => {
    setIsRunning(prevState => !prevState);
  };

  const formatTime = (seconds) => {
    const hrs = String(Math.floor(seconds / 3600)).padStart(2, '0');
    const mins = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0');
    const secs = String(seconds % 60).padStart(2, '0');
    return `${hrs}:${mins}:${secs}`;
  };

  return (
    <Box display="flex" alignItems="center" justifyContent="center">
        {isRunning && <RotateLeftIcon onClick={setToZero}/> }
      {isRunning&&<Box>{formatTime(time)}</Box>}
      
      {/* <Button onClick={handleToggle} startIcon={isRunning ? <StopIcon /> : <PlayArrowIcon />}>
        {isRunning ? 'Stop' : 'Start'}
      </Button> */}
   
    </Box>
  );
};

Timer.propTypes = {
  running: PropTypes.bool.isRequired,
};

export default Timer;
