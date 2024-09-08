import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import './YourProfile.css';
import Grid from '@mui/material/Unstable_Grid2';
import Dashboard from '../dashBoard/Dashboard';
import { UserContext } from '../Context/UserContext';
import ValidationTextFields from './EditProfile';
import Avatar from '@mui/material/Avatar';
import CircularProgress from '@mui/material/CircularProgress';
import BoxLoader from '/src/Loader/BoxLoader';
import Modal from '@mui/material/Modal';
import Backdrop from '@mui/material/Backdrop';
import Fade from '@mui/material/Fade';
import YourProgressCard from '../learnPath/YourProgressCard';

const tags = ["Basics", "Array", "String", "Hash Table", "Maths", "Statics", "Heap", "Dynamic Programming", "Sliding Window", "Sorting", "Greedy", "BinarySearch"];

const YourProfile = () => {
  const [problems, setProblems] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [hoverIndex, setHoverIndex] = useState(null); // State to track which card is hovered
  const [lastModified, setLastModified] = useState(null); // State to store the last modified time
  const [open, setOpen] = useState(false); // State for modal open/close
  const navigate = useNavigate();
  const { bg, bc, dark, light, ibg, user, password, role, profileImage } = useContext(UserContext);
  const [userData, setUserData] = useState({});
  const [noOfQuestion, setNoOfQuestion] = useState(0);
  const [avatarName, setAvatarName] = useState('');



  useEffect(() => {
    const fetchData = async () => {

      try {
        // Fetch user data
        const userResponse = await fetch(`https://hytechlabs.online:9090/Public/showUser/${user}`, {
          method: 'GET',
        });

        if (userResponse.status === 200) {
          const userData = await userResponse.json();
          console.log(userData);

          setUserData(userData);

          // Set avatar name (e.g., first letter of the user's name)
          setAvatarName(userData.name ? userData.name[0] : '');
          localStorage.setItem('userData', JSON.stringify(userData));
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [user, password]);

  const handleProblemClick = (problem) => {
    // navigate(`/question/${problem.id}`, { state: problem });
    navigate(`/question/${problem.id}/ProblemSet`, {
      state: {
          problems: [problem],
          currentIndex: 0,
          navHistory: "no def",
          currentPage: "no current page",
          CourseDescription: "description",
          totalProblems: 0,
          language: [problem.language?problem.language:"java"]
      }
  });
  };

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


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
                    <div className="inline-block relative" onClick={handleOpen} style={{ cursor: 'pointer' }}>
                      {profileImage ? (
                        <Avatar alt={userData.name} src={userData.profileImg} sx={{ width: 120, height: 120 }} />
                      ) : (
                        <Avatar style={{ fontSize: "70px" }} sx={{ bgcolor: bc, width: 120, height: 120 }}>{avatarName}</Avatar>
                      )}
                    </div>
                    <h2 className="mt-2 text-lg font-semibold text-gray-900" style={{ backgroundColor: light, color: ibg }}>{userData.name}</h2>
                    <p className="mt-1 text-sm text-gray-600" style={{ backgroundColor: light, color: ibg }}>Rating: {userData.rating}</p>
                    <button className="mt-4 px-4 py-2 bg-green-500 text-white text-sm font-medium rounded-full" style={{ backgroundColor: bc, color: ibg }} onClick={toggleForm}>Edit Profile</button>
                  </div>
                </div>
                <div style={{ backgroundColor: light, color: ibg }} >
                  <div className="p-4">
                    <p><b>Personal info:</b></p>
                    Ph: {userData.number} <br />
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
            
            <div className=' ml-3 mt-3 side-navbar ' style={{ maxHeight: 520, display: 'flex', flexWrap: 'wrap', gap: '20px', color: ibg, overflowY: "scroll", maxWidth: 350, overflowX: "hidden" }}>
            <div className='rounded-lg' style={{ backgroundColor: dark }}>
                    <div className='flex '>
                      <p className='font-bold pt-2 pl-2'>Courses:</p>
                      <p className=' pr-5 text-lg pt-2 pl-60 font-bold'>{userData?.courses?.length}</p>
                    </div>
              {!isLoading && userData?.courses?.map((course, index) => (
                <div className='p-3 ml-4' style={{ minWidth: 1000 }}>
                  <YourProgressCard
                    key={index}
                    title={course.title}
                    progress={course.progress}
                    totalQuestions={course.totalQuestions}
                    rating={course.rating}
                    completeQuestions={course.completeQuestions}
                    course={course}

                  />
                </div>
              ))}
              {userData.courses?.length === 0 && <p style={{ color: ibg, fontSize: "13px" }}>Please enroll in any course.</p>}

            </div>
            </div>
          </Grid>
          <Grid xs>
            <div className="Profileleetcode-clone">
              <div className="Profileheader">
                <div className="Profiletags"></div>
              </div>
              <div className="Profilecontent" style={{ backgroundColor: dark, color: ibg }}>
                <div className='Profileheading' style={{ backgroundColor: dark, color: ibg }}>
                  <Grid container spacing={2}>
                    <Grid xs={10}>Problem Solved:</Grid>
                    <Grid>{userData.postCount}</Grid>
                  </Grid>
                </div>
                <div className="Profileproblem-list" style={{ backgroundColor: light, color: ibg }}  >
                  {userData.posts?.length > 0 ? userData.posts.map((problem, index) => (
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

              </div>
              <div className='mt-5  side-navbar' style={{ maxHeight: 520, display: 'flex', flexWrap: 'wrap', gap: '20px', color: ibg, overflowY: "scroll", maxWidth: 350, overflowX: "hidden" }}>
              <div className='rounded-lg' style={{ backgroundColor: dark }}>
                    <div style={{ justifyContent: "space-between" }} className='flex '>
                      <p className='font-bold pt-2 pl-2'>Contests:</p>
                      <p className='text-right pr-5 text-lg pt-1 pl-2 font-bold'>{userData?.userContestDetails?.length}</p>

                    </div>
                {userData?.userContestDetails?.map((Contest, index) => (
                  
                    <div className='m-2 mt-2 p-2 rounded-xl' style={{ backgroundColor: light }}>

                      <div className='flex '>
                        <p style={{ fontSize: 14, fontWeight: "blod", minWidth: 60 }} className='flex gap-2'>Contest:</p><p className='font-bold'>{Contest.nameOfContest}</p>
                      </div>
                      {/* <p>{Contest.posts?.length}</p> */}
                      <div className='flex gap-2 mt-3'>
                        <p style={{ fontSize: 14, fontWeight: "blod", minWidth: 52 }}>By:</p ><p className='font-bold'>{Contest.nameOfOrganization}</p>
                      </div>
                      <div className='flex gap-2 mt-3'>
                        <p style={{ fontSize: 14, fontWeight: "blod", minWidth: 52 }}>Date:</p ><p className='font-bold'>{Contest.date}</p>
                      </div>

                    </div>
                
                ))}
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
      <Modal
        open={open}
        onClose={handleClose}
        closeAfterTransition
        // BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '40%',
            backgroundColor: 'white',
            // boxShadow: 24,
            // padding: 'px',
            // outline: 'none',
            textAlign: 'center',
          }}>
            {profileImage ? (
              <img src={userData.profileImg} alt={userData.name} className="modal-image" style={{ width: '100%', height: 'auto', borderRadius: '10px' }} />
            ) : (
              <Avatar style={{ fontSize: "150px" }} sx={{ bgcolor: bc, width: 300, height: 300 }}>{avatarName}</Avatar>
            )}
          </div>
        </Fade>
      </Modal>
    </div>
  );
};

export default YourProfile;
