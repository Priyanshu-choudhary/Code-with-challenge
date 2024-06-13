import React, { useState, useEffect, useContext, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './LeetcodeClone.css';
import Dashboard from '../dashBoard/Dashboard';
import { UserContext } from '../Context/UserContext';
import Tags from '../UploadSection/Tags';
import CircularProgress from '@mui/material/CircularProgress'; // Importing Material-UI CircularProgress


const LeetCodeClone = () => {
  const [problems, setProblems] = useState([]);
  const [tags, setTags] = useState([]);
  const [responseOk, setResponseOk] = useState(false);
  const [loading, setLoading] = useState(true);
  const [screenSize, setScreenSize] = useState({ width: window.innerWidth, height: window.innerHeight });

  const navigate = useNavigate();
  const { user, password } = useContext(UserContext);
  const location = useLocation();

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
  }, []);

  const handleProblemClick = (problem) => {
    navigate(`/question/${problem.id}`, { state: problem });
  };

  const { title, description, progress } = location.state || {};

  return (
    <>
      <Dashboard />
      <div className="leetcode-clone-container">
        <div className="content">
        {/* style={{ maxHeight: screenSize.height - 100,overflowY:"scroll" }} */}
          <div className='Profileheading'>
            {title || 'Java Questions'}
          </div>
          {description && <p>{description}</p>}
          <p style={{ fontSize: "18px", fontWeight: "bolder" }}>Progress: {progress}%</p>
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
        <div className="tags-container">
          <Tags onTagsChange={handleTagsChange} />
        </div>
      </div>
    </>
  );
};

export default LeetCodeClone;
