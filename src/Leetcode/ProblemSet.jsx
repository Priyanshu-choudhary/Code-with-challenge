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
import IconBreadcrumbs from '../dashBoard/BreadCrumb';

const LeetCodeClone = () => {
  const [problems, setProblems] = useState([]);
  const [tags, setTags] = useState([]);
  const [responseOk, setResponseOk] = useState(false);
  const [loading, setLoading] = useState(true);
  const [screenSize, setScreenSize] = useState({ width: window.innerWidth, height: window.innerHeight });
  const [navHistory, setNavHistory] = useState('');
  const [view, setView] = useState('stats');
  const [currentPage, SetCurrentPage] = useState('Learn Skills')

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
      
      const cachedData = JSON.parse(localStorage.getItem('problemsData')) || {};
      const lastModified = cachedData.lastModified || null;

      const basicAuth = 'Basic ' + btoa(`YadiChoudhary:YadiChoudhary`);
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': basicAuth,
          ...(lastModified && { 'If-Modified-Since': lastModified })
        }
      });
        console.log(response.status);
      if (response.status === 304) {
        // Use cached data if not modified
        console.log(" data isnot modified Useing cached ");
        setProblems(cachedData.problems);
        setResponseOk(true);
      } else if (response.ok) {
        const data = await response.json();
        setProblems(data);
        setResponseOk(true);

        // Store fetched data and Last-Modified header in localStorage
        const newLastModified = response.headers.get('Last-Modified');
        localStorage.setItem('problemsData', JSON.stringify({
          problems: data,
          lastModified: newLastModified
        }));
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
    navigate(`/question/${problem.id}`, { state: { ...problem, navHistory, currentPage } });
  };

  const handleToggleView = (view) => {
    setView(view);
  };

  return (
    <>
      <Dashboard />
      <IconBreadcrumbs currentPage={currentPage} title={title} history={location.state} />
      <div className="leetcode-clone-container">
        <div className="content">
          <div className='Profileheading'>
            {title || 'Java Questions'}
          </div>
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
