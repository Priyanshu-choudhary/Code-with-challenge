import React, { Fragment, useEffect, useState, useContext, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Dashboard from '../dashBoard/Dashboard';
import ImgMediaCard from './cards';
import YourProgressCard from './YourProgressCard';
import { UserContext } from '../Context/UserContext';
import { CourseContext } from '/src/Context/CourseContex.jsx';
import styled from 'styled-components';
import { CircularProgress, Button } from '@mui/material';
import BoxLoader from '../Loader/BoxLoader';
import CreateButton from '../Buttons/CreateButton';
import CourseForm from '/src/UploadSection/newCourse.jsx';
import RefreshIcon from '@mui/icons-material/Refresh';
const PageContainer = styled.div`
  background-color: ${({ bg }) => bg};
  height: 100vh;
`;

function LearningPage() {
  const navigate = useNavigate();
  const { ibg, user, password, bg, dark, role } = useContext(UserContext);
  const { updatCoursee,officialCourses, setOfficialCourses, userCourses, setUserCourses, loading, setLoading } = useContext(CourseContext);
  const [maxCardWidth, setMaxCardWidth] = useState(0);

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

    if (user != null) {
      fetchUserCourses();
    }
  }, [user, setUserCourses, updateMaxCardWidth]);

  const handleCardClick = (course) => {
    navigate('/QuestionApi', { state: { ...course, totalQuestions: course.totalQuestions, courseId: course.id, course } });
    console.log("click");
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

  const handleCreateContestClick = () => {
    navigate(`/CourseForm`);
  };

  return (
    <PageContainer bg={bg}>
      <div style={{ backgroundColor: bg, color: ibg }}>
        <Dashboard />
        {loading && <p style={{ color: ibg, position: "absolute", left: 350, bottom: 20 }}>loading</p>}
        <div style={{ color: "black", display: "flex", textAlign: "center", justifyContent: "center", alignContent: "center", width: "100%", height: 80, backgroundColor: "gold", clipPath: "polygon(5% 0%, 100% 0%, 95% 100%, 0% 100%)", marginTop: 20 }}>
          <p style={{ paddingTop: 30, fontSize: "20px" }}>Create your own Courses now.</p>
          <div style={{ paddingTop: 10, paddingLeft: 50 }}> <CreateButton onClick={handleCreateContestClick} value={"Create New"} /></div>
        </div>
        <p style={{ marginLeft: 10, color: ibg, fontSize: '40px', fontFamily: 'revert-layer', fontWeight: 'bold' }}>
          Learn Skills
          <hr />
        </p>
        {userCourses.length > 0 && (
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
              {userCourses.length === 0 && <p style={{ color: ibg, fontSize: "13px" }}>Please enroll in any course.</p>}
            </div>
          </div>
        )}
        <div style={{ borderRadius: "15px", margin: '20px', padding: "10px", backgroundColor: dark }}>
          <p style={{display:"flex" ,gap:30,fontSize: '20px', fontFamily: 'revert-layer', fontWeight: 'bold', marginBottom: "20px" }}>
            Official Courses
           {role=="ADMIN" && <button onClick={() => updatCoursee()}> <RefreshIcon/></button>}
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '90px' }}>
            {officialCourses.map((course, index) => (
             <div onClick={() => handleCardClick(course)}>
             <ImgMediaCard
                key={index}
                title={course.title}
                description={course.description}
                image={course.image}
                permission={course.permission}
                totalQuestions={course.totalQuestions}
                
                role={role}
              />
              </div>
            ))}
            {officialCourses.length === 0 && <p style={{ color: ibg, fontSize: "13px" }}>No official courses available.</p>}
          </div>
        </div>
      </div>
    </PageContainer>
  );
}

export default LearningPage;
