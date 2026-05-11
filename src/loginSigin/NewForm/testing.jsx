import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../Context/UserContext';
import Dashboard from '../../dashBoard/Dashboard';
import RegisterForm from './RegisterForm';

function RegisterPage() {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  // If already logged in, redirect away from register page
  useEffect(() => {
    if (user) {
      navigate('/yourProfile', { replace: true });
    }
  }, [user, navigate]);

  return (
    <div style={{ background: '#0f1117', minHeight: '100vh' }}>
      <Dashboard />
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: 'calc(100vh - 64px)',
          padding: '24px',
        }}
      >
        <RegisterForm />
      </div>
    </div>
  );
}

export default RegisterPage;
