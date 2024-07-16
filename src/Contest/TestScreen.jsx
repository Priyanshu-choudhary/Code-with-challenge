import React, { useState, useEffect } from 'react';
import screenfull from 'screenfull';
import { Alert, Snackbar } from '@mui/material';
import '/src/ContestRules.css';
import TermsAndServise from '../TermsAndService/TermsAndServise';
import GetStartButton from '/src/Buttons/GetStart';

const ContestRules = ({ onAgree }) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [termExpand, setTermExpand] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [vertical, setvertical] = useState("top")
  const [horizontal, sethorizontal] = useState("right")

  useEffect(() => {
    if (screenfull.isEnabled) {
      screenfull.on('change', () => {
        setIsFullscreen(screenfull.isFullscreen);
        if (!screenfull.isFullscreen) {
          setAlertMessage('Please stay in fullscreen mode during the contest.');
          setAlertOpen(true);
        }
      });
    }

    const handleBeforeUnload = (e) => {
      e.preventDefault();
      e.returnValue = '';
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    window.addEventListener('contextmenu', (e) => e.preventDefault());

    return () => {
      if (screenfull.isEnabled) {
        screenfull.off('change');
      }
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('contextmenu', (e) => e.preventDefault());
    };
  }, []);

  const handleStartContest = () => {
    if (screenfull.isEnabled && !screenfull.isFullscreen) {
      screenfull.request();
    }
    if (agreed) {
      onAgree();
    } else {
      setAlertMessage('Please agree to the rules and regulations.');
      setAlertOpen(true);
    }
  };

  const handleAgreeChange = () => {
    setAgreed(!agreed);
  };

  const handleCloseAlert = () => {
    setAlertOpen(false);
  };

  return (
    <div className="contest-rules" style={{ borderWidth: 2, borderColor: " rgb(36, 153, 255)", borderRadius: 10 ,marginTop:50}}>
      <h1>Contest Rules and Regulations</h1>
      <hr />
      <br />
      <br />
      <p>Please read the following rules and regulations carefully before starting the contest:</p>
      <ul>
        <li>No plagiarism is allowed. All submissions must be your own work.</li>
        <li>Maintain full-screen mode throughout the contest.</li>
        <li>No external help or collaboration is allowed.</li>
        <li>Any violation of these rules will result in disqualification.</li>
        <li>
          I agree to <span style={{ color: "blue", cursor: "pointer" }} onClick={() => setTermExpand(!termExpand)}>user and service agreements</span>.
          {termExpand && <TermsAndServise />}
        </li>
      </ul>
      <label>
        <input style={{ width: 20 }} type="checkbox" checked={agreed} onChange={handleAgreeChange} />
        I agree to the rules and regulations
      </label>
      {!isFullscreen && <GetStartButton onClick={handleStartContest} disabled={!agreed} value={"Full Screen"} />}
      {isFullscreen && <GetStartButton onClick={handleStartContest} disabled={!agreed} value={"Start"} />}
      
      <Snackbar open={alertOpen} autoHideDuration={60000} onClose={handleCloseAlert}  anchorOrigin={{ vertical, horizontal }}>
        <Alert onClose={handleCloseAlert} severity="error" sx={{ width: '100%' }}>
          {alertMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default ContestRules;
