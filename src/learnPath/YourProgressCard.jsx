// src/components/YourProgressCard.js
import React from 'react';
import LinearProgress from '@mui/material/LinearProgress';
import { Button } from '@mui/material';
import  {  useContext } from 'react';
import { UserContext } from '../Context/UserContext';
import { useNavigate } from 'react-router-dom';

function YourProgressCard({ title, progress ,rating,completeQuestions,totalQuestions,course,place,width}) {
  const {bc, ibg,bg, light,dark } = useContext(UserContext);
  const navigate = useNavigate();
  const handleCardClick = (course) => {
    // console.log(card);
    navigate('/ContinueLearing', { state: { ...course, totalQuestions: course.totalQuestions, courseId: course.id, course } });
  };

  return (
    <div style={{width:`${width}%`, margin: "20px",borderWidth:"0.5px" ,borderColor:light,borderRadius:"15px"}}>
     
      <div style={{ backgroundColor: light, paddingLeft: "20px", paddingBottom: "10px",paddingRight: "20px", Width: "80%", borderRadius: "15px" }}>
      
        <p style={{ fontSize: "15px",paddingTop:"10px" }}>Topic:</p>
        <div style={{display:"flex"}}> 
        <p style={{ fontSize: "30px", fontWeight: "bold" }}>{title}</p>
        <p style={{ fontSize: "20px", fontWeight: "bold",marginLeft:"80px" }}>Score: {rating}</p>

      </div>
        <LinearProgress  variant="determinate" value={(progress/totalQuestions)*100} />
        <div style={{display:"flex",flex:"wrap"}}>
        <p style={{ fontSize: "22px", fontWeight: "bold" }}>{((progress/totalQuestions)*100).toFixed(2)}%</p>
        <p style={{ fontSize: "20px",  marginLeft:"150px"}}>{progress}/{totalQuestions}</p>
        </div>
        
     { !place &&  <button onClick={() => handleCardClick(course)} style={{backgroundColor:bc,padding:"7px 20px", borderRadius:"10px",color:ibg,fontWeight:"bold"}}>Continue Learning</button>
     }
      </div>
    </div>
  );
}

export default YourProgressCard;
