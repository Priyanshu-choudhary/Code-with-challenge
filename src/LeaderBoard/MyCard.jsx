import React, { useEffect, useState } from 'react';
import { Avatar } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import './style.css'; // Assuming style.css contains .shine-effect styling

const cardStyles = {
  container: (index) => ({
    backgroundColor: index === 1 ? '#ffd700' : '#E2EAF4',
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
    cursor: 'pointer',
  }),
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
};

const appStyles = {
  backgroundColor: 'white',
  fontFamily: 'Montserrat, sans-serif',
  display: 'flex',
  alignItems: 'top',
  justifyContent: 'top',
  flexDirection: 'column',
};

function UserCard({ userId, index }) {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;

    if (userId) {
      fetch(`https://hytechlabs.online:9090/Public/${userId}`)
        .then(response => response.json())
        .then(data => {
          if (isMounted) {
            setUser(data);
          }
        })
        .catch(error => console.error('Error fetching user data:', error));
    }

    return () => {
      isMounted = false;
    };
  }, [userId]);

  if (!user) {
    return <p>Loading...</p>;
  }

  const handleCardClick = () => {
    navigate('/publicProfile', { state: { userId } });
  };

  return (
    <div
      className={index === 1 ? 'shine-effect' : ''}
      style={cardStyles.container(index)}
      onClick={handleCardClick}
    >
      <span style={cardStyles.pro}>#{index}</span>
      <div style={cardStyles.avatarContainer}>
        <Avatar
          alt={user.name}
          src={user.profileImg}
          sx={{ width: 80, height: 80, border: '2px solid #03BFCB' }}
        />
      </div>
      <h3 style={{  color: "black", fontWeight: "bolder" }}>{user.name}</h3>
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
      <UserCard userId={userId} index={index} />
    </div>
  );
}

export default MyCard;
