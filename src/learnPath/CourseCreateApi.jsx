import { useContext } from 'react';
import { UserContext } from '../Context/UserContext';

const useCreateCourse = () => {
  const { user, password } = useContext(UserContext);

  const createCourse = async (courseTitle,description) => {
    // Check if the course title already exists in local storage
    const existingCourses = JSON.parse(localStorage.getItem("courses") || "[]");
    if (existingCourses.some(course => course.title === courseTitle)) {
      throw new Error('Course with the same title already exists');
    }

    const newCourse = {
      title: courseTitle,
      description: description,
      progress: "0"
    };

    try {
      // Make API call to create the course
      console.log(user + " " + password);
      const basicAuth = 'Basic ' + btoa(`${user}:${password}`);
      console.log("course detail " + JSON.stringify(newCourse));

      const response = await fetch('http://ec2-52-62-60-176.ap-southeast-2.compute.amazonaws.com:9090/Course', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': basicAuth
        },
        body: JSON.stringify(newCourse)
      });

      const contentType = response.headers.get('content-type');
      let data;

      if (contentType && contentType.includes('application/json')) {
        data = await response.json();
      } else {
        const text = await response.text();
        console.error('Unexpected response format:', text);
        throw new Error('Failed to create course: Unexpected response format');
      }

      if (!response.ok) {
        throw new Error('Failed to create course');
      }

      // Update local storage with the new course title and ID
      const updatedCourses = [...existingCourses, { title: courseTitle, id: data.courseId }];
      localStorage.setItem("courses", JSON.stringify(updatedCourses));

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
