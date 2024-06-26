import React, { useState, useEffect, useContext, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './LeetcodeClone.css';
import Dashboard from '../dashBoard/Dashboard';
import { UserContext } from '../Context/UserContext';
import Tags from '../UploadSection/Tags';
import { CircularProgress, Button } from '@mui/material';
import LinearProgress from '@mui/material/LinearProgress';
import IconBreadcrumbs from '../dashBoard/BreadCrumb';
import PleaseLogin from '../PageNotFound/PleaseLogin';
import styled from 'styled-components';
import MarkdownDisplay from './MarkdownFormate';
import DoneIcon from '@mui/icons-material/Done'; // Import done icon
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import './markdownCSS.css';
import Test from './test';

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
  const [completeQuestions, setCompleteQuestions] = useState([]);

  const navigate = useNavigate();
  const { bc, ibg, bg, light, dark, user, password, role } = useContext(UserContext);
  const location = useLocation();
  const { totalQuestions, title, description, progress } = location.state || {};
  const PageContainer = styled.div`
    background-color: ${bg};
    height: 100vh;
  `;

  useEffect(() => {
    const handleResize = () => {
      setScreenSize({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const fetchProblems = async (selectedTags = []) => {
    let API_URL = tags.length > 0 ? "https://testcfc.onrender.com/Posts/filter" : `https://testcfc.onrender.com/Posts/Course/${title}`;
    setLoading(true); // Start loading indicator

    try {
      let url = API_URL;
      if (selectedTags.length > 0) {
        const tagsQuery = selectedTags.join(',');
        url += `?tags=${tagsQuery}&exactMatch=true`;
      }

      const cachedData = JSON.parse(localStorage.getItem('problemsData')) || {};
      const lastModified = cachedData.lastModified || null;

      const basicAuth = 'Basic ' + btoa(`OfficialCources:OfficialCources`);
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

  const fetchUserData = async () => {
    try {
      const basicAuth = 'Basic ' + btoa(`${user}:${password}`);
      const response = await fetch(`https://testcfc.onrender.com/Course`, {
        headers: {
          'Authorization': basicAuth
        }
      });

      if (response.ok) {
        const data = await response.json();
        const matchedCourse = data.find(course => course.title === title);
        if (matchedCourse) {
          setCompleteQuestions(matchedCourse.completeQuestions || []);
          console.log(matchedCourse.completeQuestions);
        } else {
          setCompleteQuestions([]);
        }
        console.log(">>>>>>>>>>>>>>", completeQuestions);
      } else {
        console.error('Failed to fetch user data.');
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const handleTagsChange = useCallback((selectedTags) => {
    setTags(selectedTags);
  }, []);

  useEffect(() => {
    const cachedData = JSON.parse(localStorage.getItem('problemsData'));
    if (cachedData && cachedData.problems) {
      setProblems(cachedData.problems);
      setLoading(false); // Set loading to false immediately if we have cached data
    } else {
      fetchProblems(tags);
    }
  }, [tags]);

  useEffect(() => {
    fetchProblems();
    fetchUserData();
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
        CourseDescription: description,
        totalProblems: problems.length // Pass the total number of problems
      }
    });
  };

  const handleDeleteProblem = async (problemId) => {
    const confirmed = window.confirm("Are you sure you want to delete this problem?");
    if (confirmed) {
      try {
        const basicAuth = 'Basic ' + btoa(`OfficialCources:OfficialCources`);
        const response = await fetch(`https://testcfc.onrender.com/Posts/id/${problemId}`, {
          method: 'DELETE',
          headers: {
            'Authorization': basicAuth,
          }
        });
        if (response.ok) {
          setProblems(problems.filter(problem => problem.id !== problemId));
          alert("Problem deleted successfully.");
        } else {
          alert("Failed to delete the problem.");
        }
      } catch (error) {
        console.error("Error deleting problem:", error);
        alert("An error occurred while deleting the problem.");
      }
    }
  };

  const handleToggleView = (view) => {
    setView(view);
  };

  const handleEditProblem = (problemId) => {
    navigate(`/edit/${problemId}`);
  };

  return (
    <PageContainer>
      <div style={{ backgroundColor: bg, color: ibg }}>
        <Dashboard />
        <IconBreadcrumbs currentPage={currentPage} title={title} history={location.state} />
        {user ? (
          <div className="leetcode-clone-container">
            <div className="content" style={{ background: dark }}>
              <div className='Profileheading' style={{ color: ibg }}>
                {title || 'Java Questions'}
              </div>
              {loading ? (
                <>
                  {problems.length > 0 ? (
                    <div className="problem-list" style={{ color: ibg }}>
                      {problems.map((problem, index) => (
                        <div
                          key={problem.id}
                          className="problem"
                          onClick={() => handleProblemClick(problem, index)}
                          style={{
                            backgroundColor: hoverIndex === index ? bc : light,
                            transition: 'background-color 0.3s',
                            cursor: 'pointer',
                            color: ibg,
                            borderRadius: "5px",
                            position: 'relative'
                          }}
                          onMouseEnter={() => setHoverIndex(index)}
                          onMouseLeave={() => setHoverIndex(null)}
                        >
                          <div className="problem-title">
                            {index + 1}. {problem.title}
                            {completeQuestions.includes(problem.id) && <DoneIcon style={{ backgroundColor: "#C0F5AB", borderRadius: "10px", marginLeft: "10px", color: 'green' }} />} {/* Show done icon for completed questions */}
                          </div>
                          <div className="problem-details">
                            {problem.type === "MCQ" ? (
                              <p style={{ borderWidth: "1.5px", borderRadius: "5px", padding: "2px 5px 0px", borderColor: "blueviolet" }}>MCQ</p>
                            ) : (
                              <span className={`problem-difficulty ${problem.difficulty.toLowerCase()}`} style={{ color: ibg }}>{problem.difficulty}</span>
                            )}
                          </div>
                          {role === "ADMIN" && (
                            <Button
                              variant="contained"
                              color="secondary"
                              style={{ background: "darkred", color: ibg, position: 'absolute', right: '200px' }}
                              onClick={(e) => {
                                e.stopPropagation(); // Prevent navigating to the problem detail page
                                handleDeleteProblem(problem.id);
                              }}
                              size='small'
                            >
                              Delete
                            </Button>
                          )}
                          {role === "ADMIN" && (
                            <Button
                              style={{ background: bc, color: ibg, position: 'absolute', right: '100px' }}
                              onClick={(e) => {
                                e.stopPropagation(); // Prevent navigating to the problem detail page
                                handleEditProblem(problem.id);
                              }}
                              size='small'
                            >
                              Edit
                            </Button>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : <div style={{position:"fixed",top:"50%",left:"30%",transform: "translate(-50%, -50%)", textAlign: "center"  }}><CircularProgress /></div>}
                </>
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
                        borderRadius: "5px",
                        position: 'relative'
                      }}
                      onMouseEnter={() => setHoverIndex(index)}
                      onMouseLeave={() => setHoverIndex(null)}
                    >
                      <div className="problem-title">
                        {index + 1}. {problem.title}
                        {completeQuestions.includes(problem.id) && <DoneIcon style={{ backgroundColor: "#C0F5AB", borderRadius: "10px", marginLeft: "10px", color: 'green' }} />} {/* Show done icon for completed questions */}
                      </div>
                      <div className="problem-details">
                        {problem.type === "MCQ" ? (
                          <p style={{ borderWidth: "1.5px", borderRadius: "5px", padding: "10px 1px,10px,15px", borderColor: "blueviolet" }}>MCQ</p>
                        ) : (
                          <span className={`problem-difficulty ${problem.difficulty.toLowerCase()}`} style={{ color: ibg }}>{problem.difficulty}</span>
                        )}
                      </div>
                      {role === "ADMIN" && (
                        <Button
                          variant="contained"
                          // color="secondary"
                          style={{ background: "lightcoral", color: ibg, position: 'absolute', right: '200px' }}
                          onClick={(e) => {
                            e.stopPropagation(); // Prevent navigating to the problem detail page
                            handleDeleteProblem(problem.id);
                          }}
                          size='small'
                        >
                          Delete
                        </Button>
                      )}
                      {role === "ADMIN" && (
                        <Button
                          style={{ background: bc, color: ibg, position: 'absolute', right: '100px' }}
                          onClick={(e) => {
                            e.stopPropagation(); // Prevent navigating to the problem detail page
                            handleEditProblem(problem.id);
                          }}
                          size='small'
                        >
                          Edit
                        </Button>
                      )}
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
                  {progress && <p style={{ fontSize: "18px", fontWeight: "bolder" }}>In progress: {((progress / totalQuestions) * 100).toFixed(2)}%
                    <LinearProgress thickness={4} variant="determinate" value={(progress / totalQuestions) * 100} />
                  </p>}
                  <Test description={description} />
                </div>
              ) : (
                <div className="tags-container" style={{ background: dark, color: ibg }}>
                  <Tags onTagsChange={handleTagsChange} />
                </div>
              )}
            </div>
          </div>
        ) : <PleaseLogin />}
      </div>
    </PageContainer>
  );
};

export default LeetCodeClone;
