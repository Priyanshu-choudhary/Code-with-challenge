import React, { useContext } from 'react';
import LinearProgress from '@mui/material/LinearProgress';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../Context/UserContext';
import "./YourProgress.css"
function YourProgressCard({ title, progress, rating, completeQuestions, totalQuestions, course, place, width }) {
  const { bc, ibg, light,dark } = useContext(UserContext);
  const navigate = useNavigate();

  const handleCardClick = (course) => {
    navigate('/ContinueLearing', { state: { ...course, totalQuestions: course.totalQuestions, courseId: course.id, course } });
  };

  return (
    <div className={`cardWidth  rounded-lg`} style={{ backgroundColor: light }}>
      <div className=" p-3 rounded-lg">
        <p className="text-sm pt-2">Topic:</p>
        <div className="flex justify-between items-center">
          <p className="text-2xl font-bold">{title}</p>
          <p className="text-lg font-bold">Score: {rating}</p>
        </div>
        <LinearProgress variant="determinate" value={(progress / totalQuestions) * 100} />
        <div className="flex justify-between items-center mt-2">
          <p className="text-xl font-bold">{((progress / totalQuestions) * 100).toFixed(2)}%</p>
          <p className="text-lg">{progress}/{totalQuestions}</p>
        </div>
        {!place && (
          <button
            onClick={() => handleCardClick(course)}
            className="bg-primary text-white font-bold py-2 px-5 rounded-md mt-3"
            style={{ backgroundColor: bc, color: ibg }}
          >
            Continue Learning
          </button>
        )}
      </div>
    </div>
  );
}

export default YourProgressCard;

