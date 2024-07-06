import React, { useState, useCallback, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MDBContainer, MDBCol, MDBRow, MDBBtn, MDBInput, MDBCheckbox } from 'mdb-react-ui-kit';
import Spinner from 'react-bootstrap/Spinner';
import { UserContext } from '../../Context/UserContext';
import login from './LoginApi';
import Dashboard from '../../dashBoard/Dashboard';
import GoogleAuth from '../Google/Google';

function LoginGuiNew() {
  console.log("LoginGuiNew rerender");

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { setUser, setRole, setPassword: setContextPassword } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedPassword = localStorage.getItem('password');
    const storedRole = localStorage.getItem('role');

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
    <div>
      <Dashboard />
      <MDBContainer fluid className="p-3 my-5">
        <MDBRow>
          <MDBCol col='10' md='6'>
            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg" className="img-fluid" alt="Phone image" />
          </MDBCol>
          <MDBCol col='4' md='6'>
            <form onSubmit={handleSubmit}>
              <MDBInput 
                wrapperClass='mb-4' 
                label='username' 
                id='formControlLg' 
                type='username' 
                size="lg" 
                value={username}
                onChange={handleUsernameChange}
              />
              <MDBInput 
                wrapperClass='mb-4' 
                label='Password' 
                id='formControlLg' 
                type='password' 
                size="lg" 
                value={password}
                onChange={handlePasswordChange}
              />
              <div className="d-flex justify-content-between mx-4 mb-4">
                <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Remember me' />
                <a href="!#">Forgot password?</a>
              </div>
              <MDBBtn className="mb-4 w-100" size="lg" type="submit">
                Sign in {isSubmitting && <Spinner style={{ marginLeft: "5px" }} animation="border" size="sm" />}
              </MDBBtn>
            </form>
            <div className="divider d-flex align-items-center my-4">
              <p className="text-center fw-bold mx-3 mb-0">OR</p>
            </div>
            <GoogleAuth />
            <div className="text-center">
              <Link to="/register">or Sign-up</Link>
            </div>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );
}

export default React.memo(LoginGuiNew);
