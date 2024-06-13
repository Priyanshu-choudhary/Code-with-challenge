import React, { useState, useEffect, useContext, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './LeetcodeClone.css';
import Dashboard from '../dashBoard/Dashboard';
import { UserContext } from '../Context/UserContext';
import Tags from '../UploadSection/Tags';
import { CircularProgress, Button } from '@mui/material';
import PropTypes from 'prop-types';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import IconBreadcrumbs from './Test';
const LeetCodeClone = () => {
  const [problems, setProblems] = useState([]);
  const [tags, setTags] = useState([]);
  const [responseOk, setResponseOk] = useState(false);
  const [loading, setLoading] = useState(true);
  const [screenSize, setScreenSize] = useState({ width: window.innerWidth, height: window.innerHeight });
  const [navHistory, setNavHistory] = useState('');
  const [view, setView] = useState('stats'); // New state variable to track the current view

  const navigate = useNavigate();
  const { user, password } = useContext(UserContext);
  const location = useLocation();
  const { title, description, progress } = location.state || {};

  useEffect(() => {
    const handleResize = () => {
      setScreenSize({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const fetchProblems = async (selectedTags = []) => {
    setLoading(true);
    let API_URL = tags[0] != null ? "https://testcfc.onrender.com/Posts/filter" : "https://testcfc.onrender.com/Posts";
    try {
      let url = API_URL;
      if (selectedTags.length > 0) {
        const tagsQuery = selectedTags.join(',');
        url += `?tags=${tagsQuery}&exactMatch=true`;
      }
      const basicAuth = 'Basic ' + btoa(`${user}:${password}`);
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': basicAuth
        }
      });
      if (response.ok) {
        const data = await response.json();
        setProblems(data);
        setResponseOk(true);
      } else {
        setResponseOk(false);
      }
    } catch (error) {
      console.error("Error fetching problems:", error);
      setResponseOk(false);
    } finally {
      setLoading(false);
    }
  };

  const handleTagsChange = useCallback((selectedTags) => {
    setTags(selectedTags);
  }, []);

  useEffect(() => {
    fetchProblems(tags);
  }, [tags]);

  useEffect(() => {
    fetchProblems();
    if (title) {
      setNavHistory(`${title}`);
    }
  }, [title]);

  const handleProblemClick = (problem) => {
    navigate(`/question/${problem.id}`, { state: { ...problem, navHistory } });
  };

  const handleToggleView = (view) => {
    setView(view);
  };

  return (
    <>
      <Dashboard />
      {/* <p style={{ color: "grey", fontSize: '20px', fontFamily: 'revert-layer', fontWeight: 'bold' }}>
        {navHistory}
        <hr />
      </p> */}
      <IconBreadcrumbs title={title} />
      <div className="leetcode-clone-container">
        <div className="content">
          <div className='Profileheading'>
            {title || 'Java Questions'}
          </div>
          {/* {description && <p>{description}</p>} */}
          {/* <p style={{ fontSize: "18px", fontWeight: "bolder" }}>Progress: {progress}%</p> */}
          {loading ? (
            <div className="spinner-container">
              <CircularProgress />
            </div>
          ) : responseOk ? (
            <div className="problem-list">
              {problems.length > 0 ? problems.map((problem, index) => (
                <div
                  key={problem.id}
                  className="problem"
                  onClick={() => handleProblemClick(problem)}
                >
                  <div className="problem-title">{index + 1}. {problem.title}</div>
                  <div className="problem-details">
                    <span className={`problem-difficulty ${problem.difficulty.toLowerCase()}`}>{problem.difficulty}</span>
                  </div>
                </div>
              )) : <p>Question not found.....</p>}
            </div>
          ) : (
            <p>Failed to fetch problems. Please try again later.</p>
          )}
        </div>
        <div className="toggle-container">
          <div style={{ display: 'flex', gap: '50px' }}>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => handleToggleView('stats')}
            >
              Show Specs
            </Button>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => handleToggleView('tags')}
            >
              Search by Tags
            </Button>
          </div>
          {view === 'stats' ? (
            <div className="stats-container">
              {/* Render your stats content here */}
              <p style={{ fontSize: "18px", fontWeight: "bolder" }}>In progress: {progress}%
              <LinearProgress thickness={4} variant="determinate" value={progress} />
              </p>
              {description && <p>{description}</p>}
            </div>
          ) : (
            <div className="tags-container">
              <Tags onTagsChange={handleTagsChange} />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default LeetCodeClone;
