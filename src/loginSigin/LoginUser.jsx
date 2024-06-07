import React, { useState, useCallback, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import LoginPage, { Logo, Email, Submit, Banner, ButtonAfter, Password } from '@react-login-page/page2';
import LoginLogo from 'react-login-page/logo-rect';
import defaultBannerImage from '@react-login-page/page2/banner-image';
import { useNavigate } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';
import Dashboard from '../dashBoard/Dashboard';
import { UserContext } from '../Context/UserContext';
import login from './LoginApi';

function LoginUser() {
  console.log("login user rerender");

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { setUser, setPassword: setContextPassword } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedPassword = localStorage.getItem('password');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setContextPassword(storedPassword);
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
    await login(username, password); 
    setIsLoggedIn(true);
    setUser(username);
    setContextPassword(password);
    localStorage.setItem('user', JSON.stringify(username));
    localStorage.setItem('password', password);
    if (error.message === 'Wrong Username/Password') {
      alert("Wrong Username/Password");
    }else{
    navigate('/yourProfile'); 
    }
  } catch (error) {
    console.error('Error logging in:', error);
    setIsSubmitting(false);
    setIsLoggedIn(false); 
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
        <Password index={1} onChange={handlePasswordChange} />
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
