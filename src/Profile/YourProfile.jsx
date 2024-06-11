import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import './YourProfile.css';
import Grid from '@mui/material/Unstable_Grid2';
import Dashboard from '../dashBoard/Dashboard';
import { UserContext } from '../Context/UserContext';
import ValidationTextFields from './EditProfile';
import Avatar from '@mui/material/Avatar';
import { deepPurple } from '@mui/material/colors';
import CircularProgress from '@mui/material/CircularProgress';

const tags = ["Basics", "Array", "String", "Hash Table", "Maths", "Statics", "Heap", "Dynamic Programming", "Sliding Window", "Sorting", "Greedy", "BinarySearch"];

const YourProfile = () => {
  const [problems, setProblems] = useState([]);
  const [showForm, setShowForm] = useState(false); 
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { user, password,role } = useContext(UserContext);
  const [userData, setUserData] = useState({});
  const [noOfQuestion, setNoOfQuestion] = useState(0);
  const [avatarName, setAvatarName] = useState('');
console.log("profile rerender");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const basicAuth = 'Basic ' + btoa(`${user}:${password}`);

        // Fetch problems
        const problemsResponse = await fetch("https://testcfc.onrender.com/Posts", {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': basicAuth
          }
        });
        const problemsData = await problemsResponse.json();
        setProblems(problemsData);
        setNoOfQuestion(problemsData.length);

        // Fetch user data
        const userResponse = await fetch("https://testcfc.onrender.com/users/getUser", {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': basicAuth
          }
        });
        const userData = await userResponse.json();
        setUserData(userData);

        // Set avatar name (e.g., first letter of the user's name)
        setAvatarName(userData.name ? userData.name[0] : '');
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [user, password]);

  const handleProblemClick = (problem) => {
    navigate(`/question/${problem.id}`, { state: problem });
  };

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  return (
    <>
      <Dashboard />
      {isLoading ? (
        <div className="loading-screen">
          <CircularProgress />
        </div>
      ) : (
        <Grid container spacing={3} style={{ marginRight: "3px" }}>
          <Grid xs>
            <div style={{ overflow: "scroll", overflowX: "hidden", maxHeight: "72%", boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)" }}>
              <div className="max-w-xs mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
                <div className="p-4">
                  <div className="text-center">
                    <div className="inline-block relative">
                      <Avatar style={{ fontSize: "70px" }} sx={{ bgcolor: deepPurple[500], width: 120, height: 120 }}>{avatarName}</Avatar>
                    </div>
                    <h2 className="mt-2 text-lg font-semibold text-gray-900">{userData.name}</h2>
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
      )}
      {showForm && (
        <div className="modal">
          <div className="modal-content">
            <ValidationTextFields />
            <button onClick={toggleForm}>Close</button>
          </div>
        </div>
      )}
    </>
  );
};

export default YourProfile;
