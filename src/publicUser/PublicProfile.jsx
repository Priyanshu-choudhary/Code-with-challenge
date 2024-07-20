import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './YourProfile.css';
import Grid from '@mui/material/Unstable_Grid2';
import Dashboard from '../dashBoard/Dashboard';
import { UserContext } from '../Context/UserContext';
import Avatar from '@mui/material/Avatar';
import CircularProgress from '@mui/material/CircularProgress';
import BoxLoader from '../Loader/BoxLoader';

const tags = ["Basics", "Array", "String", "Hash Table", "Maths", "Statics", "Heap", "Dynamic Programming", "Sliding Window", "Sorting", "Greedy", "BinarySearch"];

const PublicProfile = () => {
  const [problems, setProblems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hoverIndex, setHoverIndex] = useState(null); // State to track which card is hovered
  const navigate = useNavigate();
  const location = useLocation(); // Get the location object
  const { userId } = location.state; // Retrieve userId from location.state
  const { bg, bc, dark, light, ibg } = useContext(UserContext);
  const [userData, setUserData] = useState({});
  const [noOfQuestion, setNoOfQuestion] = useState(0);
  const [avatarName, setAvatarName] = useState('');

  console.log("public rerender");

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch user data
        const userResponse = await fetch(`https://hytechlabs.online:9090/Public/${userId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        });
        if (userResponse.status === 200) {
          const userData = await userResponse.json();
          setUserData(userData);
          // console.log(userData);

          // Set avatar name (e.g., first letter of the user's name)
          setAvatarName(userData.name ? userData.name[0] : '');
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [userId]);

  const handleProblemClick = (problem) => {
    navigate(`/question/${problem.id}`, { state: problem });
  };

  return (
    <div style={{ backgroundColor: bg }}>
      <Dashboard />
      {isLoading ? (
        <div className="loading-screen">
          <BoxLoader />
        </div>
      ) : (
        <Grid container spacing={3} style={{ marginRight: "3px" }}>
          <Grid xs>
            <div style={{ margin: "10px", boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)" }}>
              <div className="max-w-xs mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
                <div className="p-4" style={{ backgroundColor: light, color: ibg }}>
                  <div className="text-center">
                    <div className="inline-block relative">
                    {userData.profileImg ? (
                        <Avatar alt={userData.name} src={userData.profileImg} sx={{ width: 120, height: 120 }} />
                      ) : (
                        <Avatar style={{ fontSize: "70px" }} sx={{ bgcolor: bc, width: 120, height: 120 }}>{avatarName}</Avatar>
                      )}
                      </div>
                    <h2 className="mt-2 text-lg font-semibold text-gray-900" style={{ backgroundColor: light, color: ibg }}>{userData.name}</h2>
                    <p className="mt-1 text-sm text-gray-600" style={{ backgroundColor: light, color: ibg }}>Rating: {userData.rating}</p>
                  </div>
                </div>
                <div style={{ backgroundColor: light, color: ibg }} >
                  <div className="p-4">
                    <p><b>Personal info:</b></p>
                    {/* Ph: {userData.number} <br /> */}
                    gmail: {userData.email}
                  </div>
                  <div className="p-4">
                    <p><b>Collage:</b></p>
                    {userData.collage} <br />
                    <p><b>Branch:</b></p>
                    {userData.branch}
                    <p><b>Year:</b></p>
                    {userData.year}
                  </div>
                  <div className="p-4">
                    <p><b>Links:</b></p>
                    Github<br />
                    Instagram <br />
                    Linkdin
                  </div>
                </div>
              </div>
            </div>
          </Grid>
          <Grid xs={6}>
            <div className="skill" style={{ backgroundColor: dark, color: ibg }}>
              <p style={{ fontSize: "large", fontWeight: "bold" }}>Skill</p>
              <div className='skillinside' style={{ backgroundColor: light, color: ibg }}>
                <p>{userData.skills}</p>
              </div>
            </div>
            <div className="skill" style={{ backgroundColor: dark, color: ibg, marginTop: "20px" }}>
              <p style={{ fontSize: "large", fontWeight: "bold" }}>Badge :</p>
              <div className='skillinside' style={{ backgroundColor: light, color: ibg }}>{userData.badages}</div>
            </div>
          </Grid>
          <Grid xs>
            <div className="Profileleetcode-clone">
              <div className="Profileheader">
                <div className="Profiletags"></div>
              </div>
              {/* <div className="Profilecontent" style={{ backgroundColor: dark, color: ibg }}>
                <div className='Profileheading' style={{ backgroundColor: dark, color: ibg }}>
                  <Grid container spacing={2}>
                    <Grid xs={10}>Problem Solved:</Grid>
                    <Grid>{noOfQuestion}</Grid>
                  </Grid>
                </div>
                <div className="Profileproblem-list" style={{ backgroundColor: light, color: ibg }}>
                  {problems.length > 0 ? problems.map((problem, index) => (
                    <div key={problem.id} className="Profileproblem" style={{
                      backgroundColor: hoverIndex === index ? bc : light, // Change background color on hover
                      transition: 'background-color 0.3s', // Smooth transition for background color change
                      cursor: 'pointer',
                      color: ibg,
                      borderRadius: "5px"
                    }}
                      onMouseEnter={() => setHoverIndex(index)}
                      onMouseLeave={() => setHoverIndex(null)}>
                      <div className="Profileproblem-title" onClick={() => handleProblemClick(problem)}>{index + 1}. {problem.title}</div>
                    </div>
                  )) : <p>Solve Your First Problems...</p>}
                </div>
              </div> */}
            </div>
          </Grid>
        </Grid>
      )}
    </div>
  );
};

export default PublicProfile;
