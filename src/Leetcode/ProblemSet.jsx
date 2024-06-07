// LeetCodeClone.js
import React, { useState, useEffect,useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import './LeetcodeClone.css';
import Dashboard from '../dashBoard/Dashboard';
import { UserContext } from '../Context/UserContext';
import Stack from '@mui/joy/Stack';
import LinearProgress from '@mui/joy/LinearProgress';


const API_URL = "https://testcfc-1.onrender.com/Posts";

const tags = ["Basics", "Array", "String", "Hash Table", "Maths", "Statics", "Heap", "Dynamic Programming", "Sliding Window", "Sorting", "Greedy", "BinarySearch"];

const LeetCodeClone = () => {
  const [problems, setProblems] = useState([]);
  const navigate = useNavigate();
  const { user, password } = useContext(UserContext);

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        const basicAuth = 'Basic ' + btoa(`${"YadiChoudhary"}:${"YadiChoudhary"}`);
        const response = await fetch(API_URL, {
          method: 'GET', // or 'POST' depending on your API
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
  }, [user, password]); // Dependencies ensure it refetches if user or password changes


  const handleProblemClick = (problem) => {
    navigate(`/question/${problem.id}`, { state: problem });
  };

  return (
    <>
      <Dashboard />
      <div className="leetcode-clone">
        <div className="header">
          <div className="tags">
            {tags.map(tag => <span className="tag" key={tag}>{tag}</span>)}
          </div>
        </div>
        <div className="content">
          <div className="filter">
            <button>Lists</button>
            <button>Difficulty</button>
            <button>Status</button>
            <button>Tags</button>
            <input type="text" placeholder="Search questions" />
            <button>Pick One</button>
          </div>
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
      </div>
    </>
  );
};

export default LeetCodeClone;
