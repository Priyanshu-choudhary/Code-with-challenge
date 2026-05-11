import React, { createContext, useState, useEffect } from 'react';

export const CourseContext = createContext();

export const CourseProvider = ({ children }) => {
  const [officialCourses, setOfficialCourses] = useState([]);
  const [userCourses, setUserCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOfficialCourses = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/Course/user?userName=OfficialCources&page=0&size=10`, {
        method: 'GET',
      });
      if (response.ok) {
        const data = await response.json();
        if (Array.isArray(data.content)) {
          // console.log("> "+JSON.stringify(data[0].courses[0]));
          setOfficialCourses(data.content);
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
    fetchOfficialCourses();
  }, []);

  const updateCourses = () => {
    fetchOfficialCourses();
  };

  return (
    <CourseContext.Provider value={{ updateCourses, officialCourses, setOfficialCourses, userCourses, setUserCourses, loading, setLoading }}>
      {children}
    </CourseContext.Provider>
  );
};

