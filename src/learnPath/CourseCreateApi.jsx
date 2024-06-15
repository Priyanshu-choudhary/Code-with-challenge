import { useContext } from 'react';
import { UserContext } from '../Context/UserContext';

const useCreateCourse = () => {
  const { user, password } = useContext(UserContext);

  const createCourse = async (courseTitle) => {
    // Check if the course title already exists in local storage
    const existingCourses = JSON.parse(localStorage.getItem("courses") || "[]");
    if (existingCourses.includes(courseTitle)) {
      throw new Error('Course with the same title already exists');
    }

   
    const newCourse = {
      title: courseTitle,
      description: `${courseTitle} description`,
      progress: 0
    };

    try {
      // Make API call to create the course
      console.log(user+" "+password);
      const basicAuth = 'Basic ' + btoa(`${user}:${password}`);
      const response = await fetch('https://testcfc.onrender.com/Course', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': basicAuth
        },
        body: JSON.stringify(newCourse)
      });

      if (!response.ok) {
        throw new Error('Failed to create course');
      }

      // Update local storage with the new course title
      const updatedCourses = [...existingCourses, courseTitle];
      localStorage.setItem("courses", JSON.stringify(updatedCourses));

      const data = await response.json();
      console.log('Course created:', data);
      return data; // Return the created course data
    } catch (error) {
      console.error('Error creating course:', error);
      throw error; // Rethrow the error to handle it in the calling component
    }
  };

  return createCourse;
};

export default useCreateCourse;
