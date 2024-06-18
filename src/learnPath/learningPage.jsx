import React, { useEffect, useState, useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Dashboard from '../dashBoard/Dashboard';
import ImgMediaCard from './cards';
import YourProgressCard from './YourProgressCard';
import { UserContext } from '../Context/UserContext';

function LearningPage() {
  const navigate = useNavigate();
  const { ibg, user, password, bg, dark } = useContext(UserContext);
  const [userCourses, setUserCourses] = useState([]);
  const [officialCourses, setOfficialCourses] = useState([]);

  const userCoursesRef = useRef(null);
  const officialCoursesRef = useRef(null);

  useEffect(() => {
    const fetchUserCourses = async () => {
      const basicAuth = 'Basic ' + btoa(`${user}:${password}`);
      console.log('Fetching user courses with auth:', basicAuth);

      try {
        const response = await fetch('https://testcfc.onrender.com/Course', {
          method: 'GET',
          headers: {
            'Authorization': basicAuth,
          },
        });
        if (response.ok) {
          const data = await response.json();
          if (Array.isArray(data)) {
            localStorage.setItem('userCourses', JSON.stringify(data));
            userCoursesRef.current = data;
            setUserCourses(data);
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
      const officialAuth = 'Basic ' + btoa(`OfficialCources:OfficialCources`);
      console.log('Fetching official courses with auth:', officialAuth);

      try {
        const response = await fetch('https://testcfc.onrender.com/Course', {
          method: 'GET',
          headers: {
            'Authorization': officialAuth,
          },
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
      }
    };

    fetchUserCourses();
    fetchOfficialCourses();
  }, [user, password]);

  const handleCardClick = (course) => {
    navigate('/QuestionApi', { state: { ...course, totalQuestions: course.totalQuestions } });
  };

  return (
    <div style={{ maxHeight: "100vh", overflow: "scroll", backgroundColor: bg, color: ibg }}>
      <Dashboard />
      <p style={{ color: ibg, fontSize: '40px', fontFamily: 'revert-layer', fontWeight: 'bold' }}>
        Learn Skills
        <hr />
      </p>
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
            />
          ))}
          {!userCourses[0] && <p style={{color:ibg,fontSize:"13px"}}>Please enroll in any course.</p>}
        </div>
      </div>

      <div style={{ borderRadius: "15px", margin: '20px', padding: "10px", backgroundColor: dark }}>
        <p style={{ fontSize: '20px', fontFamily: 'revert-layer', fontWeight: 'bold', marginBottom: "20px" }}>
          Basic
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
          {officialCourses.map((course, index) => (
            <div key={index} style={{ flex: '1 1 45%', minWidth: '300px' }} onClick={() => handleCardClick(course)}>
              <ImgMediaCard
                title={course.title}
                image={"./DSA.jpeg"}
                description={course.description}
                totalQuestions={course.totalQuestions}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default LearningPage;
