import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import './YourProfile.css';
import Grid from '@mui/material/Unstable_Grid2';
import Dashboard from '../dashBoard/Dashboard';
import { UserContext } from '../Context/UserContext';
import ValidationTextFields from './EditProfile';
import Avatar from '@mui/material/Avatar';
import { deepPurple } from '@mui/material/colors';
// import ValidationTextFields from './ValidationTextFields';

const tags = ["Basics", "Array", "String", "Hash Table", "Maths", "Statics", "Heap", "Dynamic Programming", "Sliding Window", "Sorting", "Greedy", "BinarySearch"];

const YourProfile = () => {
  const [problems, setProblems] = useState([]);
  const [showForm, setShowForm] = useState(false); // State to manage form visibility
  const navigate = useNavigate();
  const { user, password } = useContext(UserContext);
  const [userData, setuserData] = useState("no");
  const [noOfQuestion, setnoOfQuestion] = useState();
  const [AvtarName, setAvtarName] = useState()

  useEffect(() => {
    const fetchProblems = async () => {
      console.log("user " + user);
      console.log("per " + password);
      try {
        const basicAuth = 'Basic ' + btoa(`${user}:${password}`);
        const response = await fetch("http://localhost:9090/Posts", {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': basicAuth
          }
        });
        const data = await response.json();
        setProblems(data);
        setnoOfQuestion(data.length); // Update total count here
      } catch (error) {
        console.error("Error fetching problems:", error);
      }
    };

    const fetchUserData = async () => {
      try {
        console.log("user " + user);
        console.log("per " + password);
        const basicAuth = 'Basic ' + btoa(`${user}:${password}`);
        console.log("bs" + basicAuth);
        const response = await fetch("http://localhost:9090/users/getUser", {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': basicAuth
          }
        });
        const data = await response.json();
        setuserData(data);
      } catch (error) {
        console.error("Error fetching problems:", error);
      }
    };

    fetchProblems();
    fetchUserData();
  }, [user, password]); // Dependencies ensure it refetches if user or password changes

  const handleProblemClick = (problem) => {
    navigate(`/question/${problem.id}`, { state: problem });
  };

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  return (
    <>
      <Dashboard />
      <Grid container spacing={3} style={{ marginRight: "3px" }}>
        <Grid xs>
          <div style={{ overflow: "scroll", overflowX: "hidden", maxHeight: "72%", boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)" }}>
            <div className="max-w-xs mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
              <div className="p-4">
                <div className="text-center">
                  <div className="inline-block relative">
                    
                    {/* <img className="w-20 h-20 rounded-full" src="https://via.placeholder.com/150" alt="User avatar" /> */}
                    <Avatar style={{fontSize:"70px"}} sx={{ bgcolor: deepPurple[500] ,width: 120, height: 120}}>{AvtarName}</Avatar>
                  </div>
                  <h2 className="mt-2 text-lg font-semibold text-gray-900"></h2>
                  <p className="mt-1 text-sm text-gray-600">Rank ?</p>
                  <button className="mt-4 px-4 py-2 bg-green-500 text-white text-sm font-medium rounded-full" onClick={toggleForm}>Edit Profile</button>
                </div>
              </div>

              <div className="p-4">
                <h1><b>Personal info:</b></h1>
                Ph: {userData.number} <br />
                gmail: {userData.email}
              </div>
              <div className="p-4">
                <h1><b>Collage:</b></h1>
                {userData.collage} <br />
                <h1><b>Branch:</b></h1>
                 {userData.branch} 
                <h1><b>Year:</b></h1>
                {userData.year}
              </div>
              <div className="p-4">
                <h1><b>Links:</b></h1>
                Github<br />
                Instagram <br />
                Linkdin
              </div>
            </div>
          </div>
        </Grid>
        <Grid xs={6}>
          <div className="skill">
            <p style={{ fontSize: "large", fontWeight: "bold" }}>Skill</p>
            <div className='skillinside'>
              <p>{userData.skills}</p>
            </div>
          </div>
          <div className="skill" style={{ marginTop: "20px" }}>
            <p style={{ fontSize: "large", fontWeight: "bold" }}>Badge :</p>
            <div className='skillinside'>{userData.badages}</div>
          </div>
        </Grid>
        <Grid xs>
          <div className="Profileleetcode-clone">
            <div className="Profileheader">
              <div className="Profiletags"></div>
            </div>
            <div className="Profilecontent">
              <div className='Profileheading'>
                <Grid container spacing={2}>
                  <Grid xs={10}>Problem Solved:</Grid>
                  <Grid>{noOfQuestion}</Grid>
                </Grid>
              </div>
              <div className="Profileproblem-list">
                {problems.length > 0 ? problems.map((problem, index) => (
                  <div key={problem.id} className="Profileproblem" onClick={() => handleProblemClick(problem)}>
                    <div className="Profileproblem-title">{index + 1}. {problem.title}</div>
                  </div>
                )) : <p>Solve Your First Problems...</p>}
              </div>
            </div>
          </div>
        </Grid>
      </Grid>
      {showForm && (
        <div className="modal">
          <div className="modal-content">
            <ValidationTextFields/>
            <button onClick={toggleForm}>Close</button>
          </div>
        </div>
      )}
    </>
  );
};

export default YourProfile;
