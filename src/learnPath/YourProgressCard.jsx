// src/components/YourProgressCard.js
import React from 'react';
import LinearProgress from '@mui/material/LinearProgress';
import { Button } from '@mui/material';
import  {  useContext } from 'react';
import { UserContext } from '../Context/UserContext';

function YourProgressCard({ title, progress }) {
  const {bc, ibg,bg, light,dark } = useContext(UserContext);
  return (
    <div style={{ margin: "20px",borderWidth:"0.5px" ,borderColor:light,borderRadius:"15px"}}>
      <div style={{ backgroundColor: light, paddingLeft: "20px", paddingBottom: "10px",paddingRight: "230px", Width: "80%", borderRadius: "15px" }}>
        <p style={{ fontSize: "15px",paddingTop:"10px" }}>Topic:</p>
        <p style={{ fontSize: "30px", fontWeight: "bold" }}>{title}</p>
        <LinearProgress  variant="determinate" value={progress} />
        <div style={{display:"flex",flex:"wrap"}}>
        <p style={{ fontSize: "22px", fontWeight: "bold" }}>{progress}%</p>
        <p style={{ fontSize: "20px",  marginLeft:"70px"}}>[12/30]</p>
        </div>
        {/* <Button style={{marginTop:"20px"}}
          variant="contained"
          color="green"
          size='large'
          // onClick={() => handleToggleView('stats')}
        >
          Continue Learning
        </Button> */}
        <button style={{backgroundColor:bc,padding:"7px 20px", borderRadius:"10px",color:ibg,fontWeight:"bold"}}>Continue Learning</button>
      </div>
    </div>
  );
}

export default YourProgressCard;
