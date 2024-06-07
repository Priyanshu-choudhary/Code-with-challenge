import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import SignUpPage, { Logo, Email, Submit, Banner, ButtonAfter, Password, Input } from '@react-login-page/page2';
import LoginLogo from 'react-login-page/logo-rect';
import defaultBannerImage from '@react-login-page/page2/banner-image';
import Spinner from 'react-bootstrap/Spinner';
import signUp from './SignUpApi';

function RegisterUser() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

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
      const response = await signUp(username, password);
      if (response.ok) {
        navigate('/login');
      } else if (response.status === 409) {
        alert('User already exists. Please choose a different username.');
      } else {
        console.error('Error registering:', response.statusText);
        alert('An error occurred during registration. Please try again.');
      }
    } catch (error) {
      console.error('Error registering:', error);
      alert('An error occurred during registration. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  }, [navigate, username, password]);

  return (
    <SignUpPage style={{ height: 580 }}>
      <Logo>
        <LoginLogo />
      </Logo>
      <Email index={0} type="text" placeholder="Set Username" onChange={handleUsernameChange} />
      <Password index={1} onChange={handlePasswordChange} />
      <Submit onClick={handleSubmit}>
        Register {isSubmitting && <Spinner style={{ marginLeft: "5px" }} animation="border" size="sm" />}
      </Submit>
      <Banner>
        <img src={defaultBannerImage} alt="Banner" />
      </Banner>
      <ButtonAfter>
        <a href="/login">or Login</a>
      </ButtonAfter>
    </SignUpPage>
  );
}

export default React.memo(RegisterUser);
