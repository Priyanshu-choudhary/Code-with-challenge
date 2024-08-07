import React, { useState, useCallback, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import LoginPage, { Logo, Email, Submit, Banner, ButtonAfter, Password } from '@react-login-page/page2';
import LoginLogo from 'react-login-page/logo-rect';
import defaultBannerImage from '@react-login-page/page2/banner-image';
import { useNavigate } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';
import { UserContext } from '../../Context/UserContext';
import login from './LoginApi';
import Dashboard from '../../dashBoard/Dashboard';
import GoogleAuth from '../Google/Google';

function LoginUser() {
  console.log("login user rerender");

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { setUser,setRole, setPassword: setContextPassword } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedPassword = localStorage.getItem('password');
    const storedRole=localStorage.getItem('role');

    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setContextPassword(storedPassword);
      setRole(storedRole);
      setIsLoggedIn(true);
    }
  }, [navigate, setUser, setContextPassword]);

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = useCallback(async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    try {
        const userRole = await login(username, password); 
        setIsLoggedIn(true);
        setUser(username);
        setContextPassword(password);
        setRole(userRole);
        localStorage.setItem('user', JSON.stringify(username));
        localStorage.setItem('password', password);
        localStorage.setItem('role', userRole);
        
        navigate('/yourProfile'); // Navigate only if login is successful
    } catch (error) {
        console.error('Error logging in:', error);
        setIsSubmitting(false);
        setIsLoggedIn(false); // Reset isLoggedIn state on failed login
        // No need to alert here, it's already handled in the login function
    }
}, [navigate, username, password, setUser, setContextPassword]);

  return (
    <>
      <Dashboard />
      <LoginPage >
        <Logo>
          <LoginLogo />
        </Logo>
        <Email index={0} type="text" placeholder="Username" onChange={handleUsernameChange} />
        
        <Password index={2} onChange={handlePasswordChange} />
        <Submit onClick={handleSubmit}>
          Login {isSubmitting && <Spinner style={{ marginLeft: "5px" }} animation="border" size="sm" />}
        </Submit>
        <Banner>
          <img src={defaultBannerImage} alt="Banner" />
        </Banner>
        <ButtonAfter>
          <Link to="/register">or Sign-up</Link>
        </ButtonAfter>
      </LoginPage>
      
   
    </>
  );
}

export default React.memo(LoginUser);
