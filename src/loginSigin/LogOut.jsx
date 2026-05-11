import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../Context/UserContext';

function LogOut() {
  const { logout } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    logout();
    navigate('/', { replace: true });
  }, []);

  return null; // redirects immediately, no UI needed
}

export default LogOut;
