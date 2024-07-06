import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import signUp from '../SignUpApiCreateUser';

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const QueryParamsExample = () => {
  const query = useQuery();
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true); // Initial loading state

  // Convert query parameters to a JavaScript object
  const queryParams = Object.fromEntries(query.entries());

  useEffect(() => {
    const { name, password, email } = queryParams;

    const registerUser = async () => {
      try {
        const response = await signUp(name, password, email);
        if (response.ok) {
          setMessage('Registration successful! Redirecting to login...');
          setTimeout(() => navigate('/login'), 2000); // Redirect after 2 seconds
        } else if (response.status === 409) {
          setMessage('User already exists. Please choose a different username.');
        } else {
          console.error('Error registering:', response.statusText);
          setMessage('An error occurred during registration. Please try again.');
        }
      } catch (error) {
        console.error('Error registering:', error);
        setMessage('An error occurred during registration. Please try again.');
      } finally {
        setLoading(false); // Set loading state to false after API call completes
      }
    };

    if (name && password && email) {
      registerUser();
    } else {
      setMessage('Missing required query parameters.');
      setLoading(false); // Set loading state to false if parameters are missing
    }
  }, [queryParams, navigate]);

  return (
    <div>
      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <CircularProgress />
        </div>
      ) : (
        <div>
          <h2>Registration Status</h2>
          <p>{message}</p>
        </div>
      )}
    </div>
  );
};

export default QueryParamsExample;
