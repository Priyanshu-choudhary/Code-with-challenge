import React, { useState, useEffect, useContext } from 'react';
import { Drawer, Divider, IconButton } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight, faCheck } from '@fortawesome/free-solid-svg-icons';
import CloseIcon from '@mui/icons-material/Close';
import '/src/ProblemList.css'; // Import your CSS file for styling
import { UserContext } from '../Context/UserContext';
import axios from 'axios';

const MiniProblemDrawerComponent = ({ open, onClose, problems, setIndex, contestName, user }) => {
  const { bg, light, dark, ibg } = useContext(UserContext);
  const [completedProblems, setCompletedProblems] = useState([]);

  useEffect(() => {
    const fetchCompletedProblems = async () => {
      try {
        const response = await axios.get(`https://hytechlabs.online:9090/UserDetailsContest/${user}/${contestName}`);
        //  const postTitles = response.data.posts.map(post => post.title);
        setCompletedProblems(JSON.stringify(response.data[0].posts || []));
     
      } catch (error) {
        console.error('Error fetching completed problems:', error);
      }
    };

    fetchCompletedProblems();
  }, [open]);

  return (
    <Drawer anchor="left" open={open} onClose={onClose}>
      <div className="ProblemList-container" style={{ backgroundColor: light, color: ibg }}>
        <div className="ProblemList-items" style={{ backgroundColor: light, color: ibg }}>
          <div className="ProblemList-items-head">
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <p style={{ color: ibg }}>Problems List</p>
              <img style={{ marginTop: 10, background: dark }} src="/public/checklist.gif" alt="problemList" width={40} />
            </div>
            <IconButton style={{ color: ibg }} onClick={onClose}>
              <CloseIcon />
            </IconButton>
            <Divider />
          </div>
          <div className="ProblemList-items-body">
            {problems.map((problem, index) => (
              <div 
                key={index} 
                className='miniProblem' 
                style={{ display: "flex", alignItems: "center", marginTop: 15, cursor: "pointer" }} 
                onClick={() => { setIndex(index); }}>
                <div className="ProblemList-item-title">{index + 1}. {problem.title}</div>
                {completedProblems.includes(problem.title) && (
                  <FontAwesomeIcon icon={faCheck} style={{ color: "green", marginLeft: 'auto',background:"#E0F7D8",padding:5,borderRadius:5 }} />
                )}
                <FontAwesomeIcon icon={faAngleRight} style={{ marginLeft: 10 }} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </Drawer>
  );
};

export default MiniProblemDrawerComponent;
