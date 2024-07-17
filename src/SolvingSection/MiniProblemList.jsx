import React, { useState, useEffect, useContext } from 'react';
import { Drawer, List, ListItem, ListItemText, Divider, IconButton } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import CloseIcon from '@mui/icons-material/Close';
import '/src/ProblemList.css'; // Import your CSS file for styling
import { UserContext } from '../Context/UserContext';
const MiniProblemDrawerComponent = ({ open, onClose, problems }) => {
  const { bg, light,dark ,ibg} = useContext(UserContext);
  return (
    <Drawer anchor="left" open={open} onClose={onClose}  >
      <div className="ProblemList-container"  style={{backgroundColor:light,color:ibg}}>
        <div className="ProblemList-items">
          <div className="ProblemList-items-head">
            <p style={{color:ibg}}>Problems List</p>

            <IconButton style={{color:ibg}} onClick={onClose}>
              <CloseIcon />
            </IconButton>
            <Divider />
          </div>
          
          <div className="ProblemList-items-body ">
          {problems.map((problem, index) => (
            <div>{index + 1}. {problem.title}</div>
          ))}
            <List>
              <ListItem button>
                <ListItemText primary="Web Usability Testing" />
                <FontAwesomeIcon icon={faAngleRight} />
              </ListItem>
              <ListItem button>
                <ListItemText primary="Design of Everyday Things" />
                <FontAwesomeIcon icon={faAngleRight} />
              </ListItem>
              <ListItem button>
                <ListItemText primary="Practical Empathy: For Collaboration & Creativity in Your Work" />
                <FontAwesomeIcon icon={faAngleRight} />
              </ListItem>
              <ListItem button>
                <ListItemText primary="About Face: The Essentials of Interaction Design" />
                <FontAwesomeIcon icon={faAngleRight} />
              </ListItem>
            </List>
          </div>
        </div>
      </div>
    </Drawer>
  );
};

export default MiniProblemDrawerComponent;
