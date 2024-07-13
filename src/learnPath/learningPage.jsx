import React, { Fragment,useEffect, useState, useContext, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Dashboard from '../dashBoard/Dashboard';
import ImgMediaCard from './cards';
import YourProgressCard from './YourProgressCard';
import { UserContext } from '../Context/UserContext';
import styled from 'styled-components';
import { CircularProgress, Button } from '@mui/material';

const PageContainer = styled.div`
  background-color: ${({ bg }) => bg};
  height: 100vh;
`;

function LearningPage() {
  const navigate = useNavigate();
  const { ibg, user, password, bg, dark, role } = useContext(UserContext);
  const [userCourses, setUserCourses] = useState(() => JSON.parse(localStorage.getItem('userCourses')) || []);
  const [officialCourses, setOfficialCourses] = useState(() => JSON.parse(localStorage.getItem('officialCourses')) || []);
  const [maxCardWidth, setMaxCardWidth] = useState(0);
  const [loading, setLoading] = useState(false);

  const userCoursesRef = useRef(null);
  const officialCoursesRef = useRef(null);

  const updateMaxCardWidth = useCallback((courses) => {
    let maxWidth = 0;
    courses.forEach((course) => {
      const textWidth = Math.max(
        course.title.length,
        `${((course.progress / course.totalQuestions) * 100).toFixed(2)}%`.length,
        `[${course.progress}/${course.totalQuestions}]`.length,
        `Rating: ${course.rating}`.length
      );
      if (textWidth > maxWidth) {
        maxWidth = textWidth;
      }
    });
    setMaxCardWidth(maxWidth * 10); // Adjust the multiplier to account for font size and padding
  }, []);

  useEffect(() => {
    const fetchUserCourses = async () => {
      try {
        console.log("user"+user);
        const response = await fetch(`https://hytechlabs.online:9090/Course/${user}`, {
          method: 'GET',
        });
        if (response.ok) {
          const data = await response.json();
          if (Array.isArray(data)) {
            localStorage.setItem('userCourses', JSON.stringify(data));
            userCoursesRef.current = data;
            setUserCourses(data);
            updateMaxCardWidth(data);
          } else {
            console.error('Fetched user data is not an array:', data);
            setUserCourses([]);
          }
        } else {
          console.error('Failed to fetch user courses:', response.status, response.statusText);
        }
      } catch (error) {
        console.error('Error fetching user courses:', error);
      }
    };

    const fetchOfficialCourses = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://hytechlabs.online:9090/Course/OfficialCources', {
          method: 'GET',
        });
        if (response.ok) {
          const data = await response.json();
          if (Array.isArray(data)) {
            localStorage.setItem('officialCourses', JSON.stringify(data));
            officialCoursesRef.current = data;
            setOfficialCourses(data);
          } else {
            console.error('Fetched official data is not an array:', data);
            setOfficialCourses([]);
          }
        } else {
          console.error('Failed to fetch official courses:', response.status, response.statusText);
        }
      } catch (error) {
        console.error('Error fetching official courses:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOfficialCourses();
    if (user != null) {
      fetchUserCourses();
      
    } 
  }, []);

  const handleCardClick = (course) => {
    navigate('/QuestionApi', { state: { ...course, totalQuestions: course.totalQuestions,courseId:course.id,course } });
  };

  const handleDelete = async (courseId, courseName) => {
    if (window.confirm(`Are you sure you want to delete the course "${courseName}"?`)) {
      try {
        const basicAuth = 'Basic ' + btoa(`OfficialCources:OfficialCources`);
        const response = await fetch(`https://hytechlabs.online:9090/Course/id/${courseId}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': basicAuth,
           
          }
        });
        if (response.ok) {
          // Remove the course from state
          setOfficialCourses((prevCourses) => prevCourses.filter((course) => course.id !== courseId));
          localStorage.setItem('officialCourses', JSON.stringify(officialCoursesRef.current.filter((course) => course.id !== courseId)));
        } else {
          console.error('Failed to delete course:', response.status, response.statusText);
        }
      } catch (error) {
        console.error('Error deleting course:', error);
      }
    }
  };

  return (
    <PageContainer bg={bg}>
      <div style={{ backgroundColor: bg, color: ibg }}>
        <Dashboard />
        <p style={{marginLeft:10, color: ibg, fontSize: '40px', fontFamily: 'revert-layer', fontWeight: 'bold' }}>
          Learn Skills
          <hr />
        </p>
      {userCourses[0] && 
       <div style={{ borderRadius: "15px", margin: '20px', padding: "10px", backgroundColor: dark }}>
          <p style={{ fontSize: '20px', fontFamily: 'revert-layer', fontWeight: 'bold', marginBottom: "20px" }}>
            Resume Preparation
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
            {userCourses.map((course, index) => (
              <YourProgressCard
                key={index}
                title={course.title}
                progress={course.progress}
                totalQuestions={course.totalQuestions}
                rating={course.rating}
                completeQuestions={course.completeQuestions}
                course={course}
                style={{ width: `${maxCardWidth}px` }}
              />
            ))}
            {!userCourses[0] && <p style={{ color: ibg, fontSize: "13px" }}>Please enroll in any course.</p>}
          </div>  
        </div>}

        <div style={{ borderRadius: "15px", margin: '20px', padding: "10px", backgroundColor: dark }}>
          <p style={{ fontSize: '20px', fontFamily: 'revert-layer', fontWeight: 'bold', marginBottom: "20px" }}>
            Basic
          </p>
          {officialCourses[0] && <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
            {officialCourses.map((course, index) => {
              if (course.permission === 'public' || (course.permission === 'private' && role === 'ADMIN')) {
                return (
                  <div key={index} style={{ flex: '1 1 45%', minWidth: '300px' }} onClick={() => handleCardClick(course)}>
                    <ImgMediaCard
                      id={course.id}
                      title={course.title}
                      image={course.image}
                      description={course.description}
                      totalQuestions={course.totalQuestions}
                      handleDelete={handleDelete} // Pass handleDelete function
                      courseId={course.id} // Pass course ID
                      courseName={course.title} // Pass course name
                      permission={course.permission}
                    />
                  </div>
                );
              } else {
                return null;
              }
            })}
            {!officialCourses[0] && <div style={{ position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)", textAlign: "center" }}><CircularProgress /></div>}
          </div>}
        </div>
      </div>
    </PageContainer>
  );
}

export default React.memo(LearningPage);
