// src/components/LearningPage.js
import React, { useEffect, useState, useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Dashboard from '../dashBoard/Dashboard';
import ImgMediaCard from './cards';
import YourProgressCard from './YourProgressCard';
import { UserContext } from '../Context/UserContext';

function LearningPage() {
  const navigate = useNavigate();
  const { ibg,user, password, bg, dark, light } = useContext(UserContext); // Access the user and password from context
  const [courses, setCourses] = useState([]);
  const coursesRef = useRef(null); // Use useRef to store the courses

  useEffect(() => {
    // Load courses from localStorage if available
    const storedCourses = JSON.parse(localStorage.getItem('courses'));
    if (storedCourses) {
      setCourses(storedCourses);
      coursesRef.current = storedCourses;
    }

    const fetchCourses = async () => {
      const basicAuth = 'Basic ' + btoa(`${user}:${password}`);

      try {
        const response = await fetch('https://testcfc.onrender.com/Course', {
          headers: {
            'Authorization': basicAuth,
          },
        });
        const data = await response.json();
        if (Array.isArray(data)) {
          localStorage.setItem('courses', JSON.stringify(data)); // Store fetched data in localStorage
          coursesRef.current = data; // Store the fetched data in useRef
          setCourses(data);
        } else {
          console.error('Fetched data is not an array:', data);
          setCourses([]);
        }
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchCourses();
  }, [user, password]);

  const basicCards = [
    { title: 'DSA', image: '/DSA.jpeg', description: 'This is a data structures and algorithms course with a strong focus on passing coding interviews', progress: 0 },
    { title: 'Web Development', image: '/R.jpeg', description: 'Learn the basics of web development, including HTML, CSS, and JavaScript.', progress: 50 },
  ];

  const intermediateCards = [
    { title: 'Advanced DSA', image: '/AdvanceDSA.png', description: 'Deep dive into advanced data structures and algorithms.', progress: 30 },
    { title: 'React', image: '/react.jpg', description: 'Learn how to build interactive user interfaces with React.', progress: 70 },
  ];

  const handleCardClick = (card) => {
    navigate('/QuestionApi', { state: card });
  };

  return (
    <div style={{ maxHeight: "100vh", overflow: "scroll", backgroundColor: bg, color: ibg }}>
      <Dashboard />
      <p style={{ color: ibg, fontSize: '40px', fontFamily: 'revert-layer', fontWeight: 'bold' }}>
        Learn Skills
        <hr />
      </p>
       && <div style={{ borderRadius: "15px", margin: '20px', padding: "10px", backgroundColor: dark }}>
        <p style={{ fontSize: '20px', fontFamily: 'revert-layer', fontWeight: 'bold', marginBottom: "20px" }}>
          Resume Preparation.
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
          {courses.map((course, index) => (
            <YourProgressCard key={index} title={course.title} progress={course.progress} />
          ))}
        </div>
      </div>

      <div style={{ borderRadius: "15px", margin: '20px', padding: "10px", backgroundColor: dark }}>
        <p style={{ fontSize: '20px', fontFamily: 'revert-layer', fontWeight: 'bold', marginBottom: "20px" }}>
          Basic
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
          {basicCards.map((card, index) => (
            <div key={index} style={{ flex: '1 1 45%', minWidth: '300px' }} onClick={() => handleCardClick(card)}>
              <ImgMediaCard title={card.title} image={card.image} description={card.description} progress={card.progress} />
            </div>
          ))}
        </div>
      </div>

      <div style={{ borderRadius: "15px", margin: '20px', padding: "10px", backgroundColor: dark }}>
        <p style={{ fontSize: '20px', fontFamily: 'revert-layer', fontWeight: 'bold', marginBottom: "20px" }}>
          Intermediate
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
          {intermediateCards.map((card, index) => (
            <div key={index} style={{ flex: '1 1 45%', minWidth: '300px' }} onClick={() => handleCardClick(card)}>
              <ImgMediaCard title={card.title} image={card.image} description={card.description} progress={card.progress} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default LearningPage;
