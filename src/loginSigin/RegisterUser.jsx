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
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const validateInputs = () => {
    if (!username) {
      alert('Username is required');
      return false;
    }
    if (/\s/.test(username)) {
      alert('Username must not contain spaces');
      return false;
    }
    if (!password) {
      alert('Password is required');
      return false;
    }
    if (password.length < 8) {
      alert('Password must be at least 8 characters long');
      return false;
    }
    if (!email) {
      alert('Email is required');
      return false;
    }
    return true;
  };

  const handleSubmit = useCallback(async (event) => {
    event.preventDefault();
    if (!validateInputs()) {
      return;
    }
    setIsSubmitting(true);
    try {
      const response = await signUp(username, password, email);
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
  }, [navigate, username, password, email]);

  return (
    <SignUpPage style={{ height: 580 }}>
      <Logo>
        <LoginLogo />
      </Logo>
      <Email index={1} type="text" placeholder="Set Email" onChange={handleEmailChange} />
      <Input name="username" index={0} placeholder="Set Username" onChange={handleUsernameChange} />
      <Password index={2} onChange={handlePasswordChange} />
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
