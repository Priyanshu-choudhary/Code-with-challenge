// src/components/YourProgressCard.js
import React from 'react';
import LinearProgress from '@mui/material/LinearProgress';
import { Button } from '@mui/material';

function YourProgressCard({ title, progress }) {
  return (
    <div style={{ margin: "20px",borderWidth:"0.5px" ,borderColor:"#060270",borderRadius:"15px"}}>
      <div style={{ backgroundColor: "#E2EAF4", paddingLeft: "20px", paddingBottom: "10px",paddingRight: "230px", Width: "80%", borderRadius: "15px" }}>
        <p style={{ fontSize: "15px",paddingTop:"10px" }}>Topic:</p>
        <p style={{ fontSize: "30px", fontWeight: "bold" }}>{title}</p>
        <LinearProgress variant="determinate" value={progress} />
        <div style={{display:"flex",flex:"wrap"}}>
        <p style={{ fontSize: "22px", fontWeight: "bold" }}>{progress}%</p>
        <p style={{ fontSize: "20px",  marginLeft:"70px"}}>[12/30]</p>
        </div>
        <Button style={{marginTop:"20px"}}
          variant="contained"
          color="success"
          size='large'
          // onClick={() => handleToggleView('stats')}
        >
          Continue Learning
        </Button>
      </div>
    </div>
  );
}

export default YourProgressCard;
