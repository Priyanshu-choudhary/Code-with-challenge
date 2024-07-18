import React, { useState, useEffect } from 'react';
import screenfull from 'screenfull';
import { Alert, Snackbar } from '@mui/material';
import '/src/ContestRules.css';
import TermsAndServise from '../TermsAndService/TermsAndServise';
import GetStartButton from '/src/Buttons/GetStart';
import { useLocation, useNavigate } from 'react-router-dom';

const TestScreen = ({ onAgree }) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [termExpand, setTermExpand] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [vertical, setVertical] = useState('top');
  const [horizontal, setHorizontal] = useState('right');
  const navigate = useNavigate();

  const location = useLocation();
  const { contest } = location.state || {}; // Default to an empty object if state is undefined

  const [problems, setProblems] = useState([]);
  const [responseOk, setResponseOk] = useState(true);
  const [loading, setLoading] = useState(true);
  // console.log("2 "+JSON.stringify(contest));
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

    const fetchProblems = async () => {
      const API_URL = `https://hytechlabs.online:9090/Posts/Contest/${contest.nameOfContest}/username/Contest`;
      setLoading(true);

      try {
        const response = await fetch(API_URL, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.status === 204) {
          setProblems([]);
        } else if (response.status === 304) {
          // Handle 304 Not Modified if you are caching responses
          // setProblems(cachedData.problems);
          setResponseOk(true);
        } else if (response.ok) {
          const data = await response.json();
          const sortedProblems = data.sort((a, b) => a.sequence - b.sequence);
          setProblems(sortedProblems);
          setResponseOk(true);
        } else {
          setResponseOk(false);
        }
      } catch (error) {
        console.error('Error fetching problems:', error);
        setResponseOk(false);
      } finally {
        setLoading(false);
      }
    };

    fetchProblems();

    return () => {
      if (screenfull.isEnabled) {
        screenfull.off('change');
      }
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('contextmenu', (e) => e.preventDefault());
    };
  }, [contest]);

  const handleStartContest = () => {
    if (screenfull.isEnabled && !screenfull.isFullscreen) {
      screenfull.request();
    }
    if (agreed) {
      // onAgree();
      navigate(`/question/${contest.nameOfContest}/Contest`, {
        state: {
          problems,
          currentIndex: 0,
          totalProblems: problems.length,
          language: contest.language,
          timeLeft:contest.timeDuration,
          contest:contest,
        },
      });
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
    <div className="contest-rules" style={{ borderWidth: 2, borderColor: 'rgb(36, 153, 255)', borderRadius: 10, marginTop: 50 }}>
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
          I agree to <span style={{ color: 'blue', cursor: 'pointer' }} onClick={() => setTermExpand(!termExpand)}>user and service agreements</span>.
          {termExpand && <TermsAndServise />}
        </li>
      </ul>
      <label>
        <input style={{ width: 20 }} type="checkbox" checked={agreed} onChange={handleAgreeChange} />
        I agree to the rules and regulations
      </label>
      {!isFullscreen && <GetStartButton onClick={handleStartContest} disabled={!agreed} value={'Full Screen'} />}
      {isFullscreen && <GetStartButton onClick={handleStartContest} disabled={!agreed} value={'Start'} />}

      <Snackbar open={alertOpen} autoHideDuration={6000} onClose={handleCloseAlert} anchorOrigin={{ vertical, horizontal }}>
        <Alert onClose={handleCloseAlert} severity="error" sx={{ width: '100%' }}>
          {alertMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default TestScreen;
