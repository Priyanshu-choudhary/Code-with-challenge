import React from 'react';
import './CourseAds.css'; // Assuming you will create a corresponding CSS file
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook


const Card = () => {
    const navigate = useNavigate(); // Initialize useNavigate hook

    return (
        <div className="card " style={{backgroundColor: "#b577e1",
            backgroundImage: "linear-gradient(90deg, #b577e1 0%, #5041dd 100%)",
            maxWidth:300,
            marginLeft:5
            }}>
            <div className="header">
                <TipsAndUpdatesIcon fontSize={"large"} style={{color:"gold"}}/>
                <span className="title">Beginner</span>
                <span className="price">Free</span>
            </div>
            <hr />
            <p className="desc">Boost your Java skills for FREE with our comprehensive practice course—grab your spot now!</p>
          <hr />
            <ul className="lists">
                <li className="list">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                    </svg>
                    <span>Coding practice Problem</span>
                </li>
                <li className="list">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                    </svg>
                    <span>Mcq question</span>
                </li>
                <li className="list">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                    </svg>
                    <span>Onilne Editor</span>
                </li>
            </ul>
            <button type="button" className="action  hover:text-black" onClick={()=>{ navigate(`/learn`);}}>JAVA Course</button>
        </div>
    );
};

export default Card;
