import React, { useEffect, useState } from 'react';
import { Avatar } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import "./style.css";

const cardStyles = {
  container: {
    backgroundColor: '#E2EAF4',
    borderRadius: '5px',
    borderColor: 'black',
    boxShadow: '0px 10px 20px -10px #4603E9',
    color: '#B3B8CD',
    paddingTop: '30px',
    position: 'relative',
    width: '280px',
    maxWidth: '100%',
    textAlign: 'center',
    overflow: 'hidden',
    cursor: 'pointer'
  },
  pro: {
    color: '#231E39',
    backgroundColor: '#FEBB0B',
    borderColor: 'black',
    borderRadius: '3px',
    fontSize: '14px',
    fontWeight: 'bold',
    padding: '3px 7px',
    position: 'absolute',
    top: '10px',
    left: '20px',
    fontSize: '22px',
  },
  avatarContainer: {
    display: 'flex',
    justifyContent: 'center',
    borderColor: 'black',
    alignItems: 'center',
    marginBottom: '15px',
  },
  skills: {
    backgroundColor: '#1F1A36',
    textAlign: 'left',
    padding: '15px',
    marginTop: '30px',
  },
  skillsList: {
    listStyleType: 'none',
    margin: '0',
    padding: '0',
  },
  skillItem: {
    border: '1px solid #2D2747',
    borderRadius: '2px',
    display: 'inline-block',
    fontSize: '12px',
    margin: '0 7px 7px 0',
    padding: '7px',
  },
};

const appStyles = {
  backgroundColor: 'white',
  fontFamily: 'Montserrat, sans-serif',
  display: 'flex',
  alignItems: 'top',
  justifyContent: 'top',
  flexDirection: 'column',
  // minHeight: '100vh',
};

function UserCard({ userId, index }) { // Renamed Card to UserCard to avoid naming conflict
  console.log(index);

  const [user, setUser] = useState(null);
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    let isMounted = true; // Track whether the component is still mounted

    if (userId) {
      fetch(`https://testcfc.onrender.com/Public/${userId}`)
        .then(response => response.json())
        .then(data => {
          if (isMounted) { // Update state only if the component is still mounted
            setUser(data);
          }
        })
        .catch(error => console.error('Error fetching user data:', error));
    }

    return () => {
      isMounted = false; // Set to false when the component unmounts
    };
  }, [userId]);

  if (!user) {
    return <p>Loading...</p>;
  }

  const handleCardClick = () => {
    navigate('/publicProfile', { state: { userId } }); // Navigate to /publicProfile with userId in state
  };

  return (
    <div style={cardStyles.container} className="shine-effect" onClick={handleCardClick}>
      <span style={cardStyles.pro}>#{index}</span>
      <div style={cardStyles.avatarContainer}>
        <Avatar
          alt={user.name}
          src={user.avatarUrl} // Assuming you have an avatarUrl in your user data
          sx={{ width: 80, height: 80, border: '2px solid #03BFCB' }}
        />
      </div>
      <h3 style={{ fontSize: "20px", color: "black", fontWeight: "bolder" }}>{user.name}</h3>
      <h6>{user.location}</h6>
      <p>{user.collage}</p>
      <p>{user.city}</p>
      <div style={cardStyles.skills}>
        <h6>Rating: {user.rating}</h6>
        <h6>Question Solved: {user.postCount}</h6>
      </div>
    </div>
  );
}

function MyCard({ userId, index }) {
  return (
    <div style={appStyles}>
      <UserCard userId={userId} index={index} /> {/* Updated component name */}
    </div>
  );
}

export default MyCard;
