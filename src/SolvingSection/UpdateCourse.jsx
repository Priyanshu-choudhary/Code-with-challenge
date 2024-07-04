import axios from 'axios';
import { useContext } from 'react';
import { UserContext } from '../Context/UserContext'; // Adjust the import path as necessary

export const useUpdateCourse = () => {
  const { user,password } = useContext(UserContext);

  const updateCourse = async (courseId, progress, completeQuestions, rating,totalProblems) => {
    try {
        // console.log("tp "+totalProblems);
        const basicAuth = 'Basic ' + btoa(`${user}:${password}`);
        // console.log("id",courseId," progress",progress," cq ",completeQuestions," rating",rating);
      const response = await axios.put(`https://hytechlabs.online:9090/Course/id/${courseId}`, {
        progress,
        completeQuestions,
        rating,
        totalQuestions:totalProblems
      }, {
        headers: {
          'Authorization': basicAuth,
        }
      });
      console.log('Course updated:', response.data);
      return { success: true, data: response.data };
    } catch (error) {
      console.error('Error updating course:', error);
      return { success: false, error: error.message };
    }
  };

  return updateCourse;
};
