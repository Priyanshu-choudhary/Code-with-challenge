import React, { useState,useEffect,useContext } from 'react';
import { jwtDecode } from 'jwt-decode';
import signUp from '../SignUpApiCreateUser';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../Context/UserContext';

const CLIENT_ID = '439620692192-5gcmgal8phjd64a9qecfcqa1qu5dsj6l.apps.googleusercontent.com';

function GoogleAuth() {
  
  const { setUser,setRole, setPassword: setContextPassword } = useContext(UserContext);
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [key, setkey] = useState("hqVFNyrLZKUXyicbaIHknSH06vcM6XPunnBYWnSQ4rls9vdH61v8zDJbAoCfI1E0EJN55XyJsjT9xGggIxhr0ioGN+nLnUK+wpcN7+ezp5M=")
 
  useEffect(() => {
    /* global google */
   
    google.accounts.id.initialize({
      client_id: CLIENT_ID,
      callback: handleCredentialResponse,
    });
    google.accounts.id.renderButton(
      document.getElementById('signInDiv'),
      { theme: 'outline', size: 'large' }
    );
    google.accounts.id.prompt(); // Display the One Tap prompt
  }, []);

  const handleCredentialResponse = (response) => {
    const userObject = jwtDecode(response.credential);
   
    createUser(userObject);

  };

  const createUser=async (userObject)=>{
    try {
      const response = await signUp(userObject.name, key, userObject.email);
      if (response.ok) {
        setMessage('Registration successful! Redirecting to login...');
       
        login(userObject);
      } else if (response.status === 409) {
        setMessage('User already exists. Please choose a different username.');
        login(userObject);
      } else {
        console.error('Error registering:', response.statusText);
        setMessage('An error occurred during registration. Please try again.');
      }
    } catch (error) {
      console.error('Error registering:', error);
      setMessage('An error occurred during registration. Please try again.');
    }
  };


  const login =async(userObject)=>{
    try {
      const userRole = await login(userObject.name, key); 
    
      setUser(userObject.name);
      setContextPassword(key);
      setRole(userRole);
      
      localStorage.setItem('user', JSON.stringify(userObject.name));
      localStorage.setItem('password', key);
      localStorage.setItem('role', userRole);
      
      navigate('/yourProfile'); // Navigate only if login is successful
  } catch (error) {
      console.error('Error logging in:', error);
     
  }
  };
  return (
    <div className="App">
      <div id="signInDiv"></div>
    </div>
  );
}

export default GoogleAuth;
