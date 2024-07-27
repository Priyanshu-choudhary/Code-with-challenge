import React, { createContext, useState, useEffect } from 'react';

export const CourseContext = createContext();

export const CourseProvider = ({ children }) => {
  const [officialCourses, setOfficialCourses] = useState(() => JSON.parse(localStorage.getItem('officialCourses')) || []);
  const [userCourses, setUserCourses] = useState(() => JSON.parse(localStorage.getItem('userCourses')) || []);
  const [loading, setLoading] = useState(true);
  const fetchOfficialCourses = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://hytechlabs.online:9090/Course/OfficialCources', {
        method: 'GET',
      });
      if (response.ok) {
        const data = await response.json();
        if (Array.isArray(data)) {
          localStorage.setItem('officialCourses', JSON.stringify(data));
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

  useEffect(() => {
    
    if (officialCourses.length === 0) {
      fetchOfficialCourses();
    } else {
      setLoading(false);
    }
  }, [officialCourses]);
const updatCoursee=()=>{
    fetchOfficialCourses();
}
  return (
    <CourseContext.Provider value={{ updatCoursee,officialCourses, setOfficialCourses, userCourses, setUserCourses, loading, setLoading }}>
      {children}
    </CourseContext.Provider>
  );
};
