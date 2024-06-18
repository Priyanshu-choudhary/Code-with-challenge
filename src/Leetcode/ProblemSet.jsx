import React, { useState, useEffect, useContext, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './LeetcodeClone.css';
import Dashboard from '../dashBoard/Dashboard';
import { UserContext } from '../Context/UserContext';
import Tags from '../UploadSection/Tags';
import { CircularProgress, Button } from '@mui/material';
import LinearProgress from '@mui/material/LinearProgress';
import IconBreadcrumbs from '../dashBoard/BreadCrumb';

const LeetCodeClone = () => {
  const [problems, setProblems] = useState([]);
  const [tags, setTags] = useState([]);
  const [responseOk, setResponseOk] = useState(true);
  const [loading, setLoading] = useState(true);
  const [screenSize, setScreenSize] = useState({ width: window.innerWidth, height: window.innerHeight });
  const [navHistory, setNavHistory] = useState('');
  const [view, setView] = useState('stats');
  const [currentPage, setCurrentPage] = useState('Learn Skills');
  const [hoverIndex, setHoverIndex] = useState(null);

  const navigate = useNavigate();
  const { bc, ibg, bg, light, dark, user, password } = useContext(UserContext);
  const location = useLocation();
  const {totalQuestions, title, description, progress } = location.state || {};
  // const { totalQuestions, ...otherData } = location.state || {};


  useEffect(() => {
    const handleResize = () => {
      setScreenSize({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const fetchProblems = async (selectedTags = []) => {
    let API_URL = tags.length > 0 ? "https://testcfc.onrender.com/Posts/filter" : "https://testcfc.onrender.com/Posts";
    setLoading(true); // Start loading indicator

    try {
      let url = API_URL;
      if (selectedTags.length > 0) {
        const tagsQuery = selectedTags.join(',');
        url += `?tags=${tagsQuery}&exactMatch=true`;
      }

      const cachedData = JSON.parse(localStorage.getItem('problemsData')) || {};
      const lastModified = cachedData.lastModified || null;

      const basicAuth = 'Basic ' + btoa(`${title}:${title}`);
      console.log(title);
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': basicAuth,
          ...(lastModified && { 'If-Modified-Since': lastModified })
        }
      });

      if (response.status === 204) {
        setProblems([]);
      } else if (response.status === 304) {
        setProblems(cachedData.problems);
        setResponseOk(true);
      } else if (response.ok) {
        const data = await response.json();
        setProblems(data);
        setResponseOk(true);

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
    const cachedData = JSON.parse(localStorage.getItem('problemsData'));
    if (cachedData && cachedData.problems) {
      setProblems(cachedData.problems);
      setLoading(false);
    }

    fetchProblems(tags);
  }, [tags]);

  useEffect(() => {
    fetchProblems();
    if (title) {
      setNavHistory(`${title}`);
    }
  }, [title]);

  const handleProblemClick = (problem, index) => {
    navigate(`/question/${problem.id}`, { 
      state: { 
        problems, 
        currentIndex: index, 
        navHistory, 
        currentPage, 
        totalProblems: problems.length // Pass the total number of problems
      } 
    });
  };

  const handleToggleView = (view) => {
    setView(view);
  };

  return (
    <div style={{ backgroundColor: bg, color: ibg }}>
      <Dashboard />
      <IconBreadcrumbs currentPage={currentPage} title={title} history={location.state} />
      <div className="leetcode-clone-container">
        <div className="content" style={{ background: dark }}>
          <div className='Profileheading' style={{ color: ibg }}>
            {title || 'Java Questions'}
          </div>
          {loading ? (
            <CircularProgress />
          ) : responseOk ? (
            <div className="problem-list" style={{ color: ibg }}>
              {problems.length > 0 ? problems.map((problem, index) => (
                <div
                  key={problem.id}
                  className="problem"
                  onClick={() => handleProblemClick(problem, index)}
                  style={{
                    backgroundColor: hoverIndex === index ? bc : light,
                    transition: 'background-color 0.3s',
                    cursor: 'pointer',
                    color: ibg,
                    borderRadius: "5px"
                  }}
                  onMouseEnter={() => setHoverIndex(index)}
                  onMouseLeave={() => setHoverIndex(null)}
                >
                  <div className="problem-title">{index + 1}. {problem.title}</div>
                  <div className="problem-details">
                    {problem.type === "MCQ" ? (
                      <p style={{ borderWidth: "1.5px", borderRadius: "5px", padding: "2px 5px 0px", borderColor: "blueviolet" }}>MCQ</p>
                    ) : (
                      <span className={`problem-difficulty ${problem.difficulty.toLowerCase()}`} style={{ color: ibg }}>{problem.difficulty}</span>
                    )}
                  </div>
                </div>
              )) : <p>No problems found.</p>}
            </div>

          ) : (
            <p>Failed to load problems. Please try again later.</p>
          )}
        </div>
        <div className="toggle-container">
          <div style={{ display: 'flex', gap: '50px', color: ibg }}>
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
            <div className="stats-container" style={{ background: dark, color: ibg }}>
              <p style={{ fontSize: "18px", fontWeight: "bolder" }}>In progress: {((progress/totalQuestions)*100).toFixed(2)}%
                <LinearProgress thickness={4} variant="determinate" value={(progress/totalQuestions)*100} />
              </p>
              {description && <p>{description}</p>}
            </div>
          ) : (
            <div className="tags-container" style={{ background: dark, color: ibg }}>
              <Tags onTagsChange={handleTagsChange} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LeetCodeClone;
