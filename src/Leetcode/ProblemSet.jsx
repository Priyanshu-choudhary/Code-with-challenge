import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './LeetcodeClone.css';
import Dashboard from '../dashBoard/Dashboard';
import { UserContext } from '../Context/UserContext';
import LinearProgress from '@mui/joy/LinearProgress';
import Tags from '../UploadSection/Tags';

const API_URL = "https://testcfc.onrender.com/Posts";

const LeetCodeClone = () => {
  const [problems, setProblems] = useState([]);
  const navigate = useNavigate();
  const { user, password } = useContext(UserContext);
  const location = useLocation();

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        const basicAuth = 'Basic ' + btoa(`${"YadiChoudhary"}:${"YadiChoudhary"}`);
        const response = await fetch(API_URL, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': basicAuth
          }
        });
        const data = await response.json();
        setProblems(data);
      } catch (error) {
        console.error("Error fetching problems:", error);
      }
    };

    fetchProblems();
  }, [user, password]);

  const handleProblemClick = (problem) => {
    navigate(`/question/${problem.id}`, { state: problem });
  };

  const { title, description, progress } = location.state || {};

  return (
    <>
      <Dashboard />
      <div className="leetcode-clone-container">
        <div className="content">
          <div className='Profileheading'>
            {title || 'Java Questions'}
          </div>
          {description && <p >{description}</p>}
          <p style={{fontSize:"18px",fontWeight:"bolder"}}>Progress: {progress}%</p>
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
            )) : <LinearProgress
              color="primary"
              size="md"
              variant="plain"
            />}
          </div>
        </div>
        <div className="tags-container">
          <Tags />
        </div>
      </div>
    </>
  );
};

export default LeetCodeClone;
