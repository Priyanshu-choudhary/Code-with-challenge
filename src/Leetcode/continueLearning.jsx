import React, { useState, useEffect, useContext, useCallback, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '/src/LeetcodeClone.css';
import Dashboard from '../dashBoard/Dashboard';
import { UserContext } from '../Context/UserContext';
import Tags from '../UploadSection/Tags';
import { CircularProgress, Button } from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import PleaseLogin from '../PageNotFound/PleaseLogin';
import styled from 'styled-components';
import DoneIcon from '@mui/icons-material/Done'; // Import done icon
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos';
import remarkGfm from 'remark-gfm';
import Test from './test';
import HtmlRenderer from './HtmlRenderer'; // Adjust path as per your project structure
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import CreateIcon from '@mui/icons-material/Create';
import BoxLoader from '../Loader/BoxLoader';
import YourProgressCard from '../learnPath/YourProgressCard';

const ContinueLearing = () => {
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
  const [currentCourse, setcurrentCourse] = useState();

  const navigate = useNavigate();
  const { bc, ibg, bg, light, dark, user, password, role } = useContext(UserContext);
  const location = useLocation();
  const { language, totalQuestions, title, description, progress, courseId, course } = location.state || {};
  const PageContainer = styled.div`
    background-color: ${bg};
    height: 100vh;
  `;

  const [isExpanded, setIsExpanded] = useState(false);
  const [contentHeight, setContentHeight] = useState(520);
  const contentRef = useRef(null);


  useEffect(() => {
    if (contentRef.current) {
      // const fullHeight = contentRef.current.scrollHeight;
      setContentHeight(520); // Set initial height to 70% of full content
    }

  }, []);
  const scrollToRef = useRef(null);

  // Step 3: Define the scroll functionality in the event handler
  const handleClick = () => {
    // Scroll to the element
    scrollToRef.current.scrollIntoView({ behavior: 'smooth' });
  };
  const toggleReadMore = () => {
    setIsExpanded(!isExpanded);
  };
  useEffect(() => {
    const handleResize = () => {
      setScreenSize({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);

  }, []);

  const fetchProblems = async (selectedTags = []) => {
    let API_URL = tags.length > 0 ? "https://hytechlabs.online:9090/Posts/filter" : `https://hytechlabs.online:9090/Posts/Course/${course.title}/username/OfficialCources`;
    setLoading(true); // Start loading indicator

    try {
      let url = API_URL;
      if (selectedTags.length > 0) {
        const tagsQuery = selectedTags.join(',');
        url += `?tags=${tagsQuery}&exactMatch=true`;
      }

      const cachedData = JSON.parse(localStorage.getItem(course.title)) || {};
      const lastModified = cachedData.lastModified || null;

      const basicAuth = 'Basic ' + btoa(`OfficialCources:OfficialCources`);
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          ...(lastModified && { 'If-Modified-Since': lastModified })
        }
      });

      if (response.status === 204) {
        setProblems([]);
      } else if (response.status === 304) {
        const sortedProblems = cachedData.problems.sort((a, b) => a.sequence - b.sequence);
        setProblems(sortedProblems);
        setResponseOk(true);
      } else if (response.ok) {
        const data = await response.json();
        const sortedProblems = data.sort((a, b) => a.sequence - b.sequence);
        setProblems(sortedProblems);
        setResponseOk(true);

        const newLastModified = response.headers.get('Last-Modified');
        localStorage.setItem(course.title, JSON.stringify({
          problems: sortedProblems,
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
      const response = await fetch(`https://hytechlabs.online:9090/Course/${user}/0/10`, {
        method: 'GET',
        headers: {
          'Authorization': basicAuth,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const data = await response.json();

        if (Array.isArray(data) && data.length > 0) {
          const courses = data[0].courses || [];
          const matchedCourse = courses.find(course => course.title === title);

          if (matchedCourse) {
            setCompleteQuestions(matchedCourse.completeQuestions || []);
            console.log(matchedCourse.completeQuestions);
          } else {
            setCompleteQuestions([]);
          }

          console.log(data);
        } else {
          console.error('No data found.');
          setCompleteQuestions([]);
        }
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
    const cachedData = JSON.parse(localStorage.getItem(course.title));
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
    navigate(`/question/${problem.id}/Course`, {
      state: {
        problems,
        currentIndex: index,
        navHistory,
        currentPage,
        CourseDescription: description,
        totalProblems: problems.length,// Pass the total number of problems
        language
      }
    });
  };

  const handleDeleteProblem = async (problemId) => {
    const confirmed = window.confirm("Are you sure you want to delete this problem?");
    if (confirmed) {
      try {
        const basicAuth = 'Basic ' + btoa(`OfficialCources:OfficialCources`);
        const response = await fetch(`https://hytechlabs.online:9090/Posts/id/${problemId}`, {
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
    navigate(`/edit/${problemId}/OfficialCources`);
  };




  return (
    <PageContainer>
      <div style={{ backgroundColor: bg, color: ibg }}>
        <Dashboard />
        {user ? (
          <div className="leetcode-clone-container">
            <div className="content" >
            <YourProgressCard
             title={course.title}
             progress={course.progress}
             totalQuestions={course.totalQuestions}
             rating={course.rating}
             completeQuestions={course.completeQuestions}
             course={course}
             place="continue Learning"
            width={95}
            />
<br />
<br />
              <div ref={scrollToRef} className='Description' style={{ marginLeft: 20, marginRight: 20, background: dark, padding: 20, borderRadius: 20, marginBottom: 30 }}>
                <p className='Profileheading' style={{ color: ibg }}>Questions:</p>
                <hr />
                <br />

                {loading ? (
                  <div >
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
                              {completeQuestions.includes(problem.id) && <DoneIcon style={{ backgroundColor: "#C0F5AB", borderRadius: "10px", marginLeft: "10px", color: 'green',position: 'absolute', left: '400px' }} />} {/* Show done icon for completed questions */}
                            </div>
                            <div className="problem-details">
                              {problem.type === "MCQ" ? (
                                <p style={{ borderWidth: "1.5px", borderRadius: "5px", padding: "2px 5px 0px", borderColor: "blueviolet" }}>MCQ</p>
                              ) : (
                                <span className={`problem-difficulty ${problem.difficulty.toLowerCase()}`} style={{ color: ibg }}>{problem.difficulty}</span>
                              )}
                            </div>

                          </div>

                        ))}
                      </div>
                    ) : <BoxLoader />}
                  </div>
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
                          {completeQuestions.includes(problem.id) && <DoneIcon style={{ backgroundColor: "#C0F5AB", borderRadius: "10px", marginLeft: "10px", color: 'green',position: 'absolute', left: '400px' }} />} {/* Show done icon for completed questions */}
                        </div>
                        {role === "ADMIN" && <div style={{ color: ibg, position: 'absolute', right: '150px' }}>{problem.sequence}</div>}
                        <div className="problem-details">
                          {problem.type === "MCQ" ? (
                            <p style={{ borderWidth: "1.5px", borderRadius: "5px", padding: "10px 1px,10px,15px", borderColor: "blueviolet" }}>MCQ</p>
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
            </div>
          </div>
        ) : <PleaseLogin />}
      </div>
    </PageContainer>
  );
};

export default ContinueLearing;
