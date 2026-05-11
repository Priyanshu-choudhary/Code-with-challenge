import React, { useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { UserContext } from '../../Context/UserContext';
import login from './LoginApi';
import Dashboard from '../../dashBoard/Dashboard';

function LoginGuiNew() {
  const navigate = useNavigate();
  const location = useLocation();
  const { authReady, token, setUser, setRole, setToken, setprofileImage } = useContext(UserContext);

  const successMessage = location.state?.message;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm();

  // If already logged in, redirect away from login page
  useEffect(() => {
    if (authReady && token) {
      navigate('/yourProfile', { replace: true });
    }
  }, [authReady, token, navigate]);

  const onSubmit = async ({ username, password }) => {
    try {
      const { token, roles, user: fullUser } = await login(username, password);

      // Wire everything into context state (not just localStorage)
      setToken(token);
      setUser(fullUser);
      setRole(Array.isArray(roles) ? (roles[0] || null) : roles);
      if (fullUser.profileImg) setprofileImage(fullUser.profileImg);

      navigate('/yourProfile', { replace: true });
    } catch (err) {
      setError('root', { message: err.message || 'Login failed. Please try again.' });
    }
  };

  const inputStyle = (hasError) => ({
    width: '100%',
    padding: '10px 14px',
    background: '#27293a',
    border: `1px solid ${hasError ? '#dc2626' : '#334155'}`,
    borderRadius: '8px',
    color: '#f1f5f9',
    fontSize: '14px',
    outline: 'none',
    boxSizing: 'border-box',
  });

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
        <div
          style={{
            background: '#1f202a',
            border: '1px solid #27293a',
            borderRadius: '16px',
            padding: '40px',
            width: '100%',
            maxWidth: '420px',
          }}
        >
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <h1 style={{ color: '#f1f5f9', fontSize: '24px', fontWeight: 700, marginBottom: '8px' }}>
              Welcome back
            </h1>
            <p style={{ color: '#64748b', fontSize: '14px' }}>Sign in to your CFC account</p>
          </div>

          {/* Success banner (shown after registration redirect) */}
          {successMessage && (
            <div
              style={{
                background: '#0f2d1a',
                border: '1px solid #16a34a',
                borderRadius: '8px',
                padding: '10px 14px',
                color: '#86efac',
                fontSize: '13px',
                marginBottom: '20px',
              }}
            >
              ✅ {successMessage}
            </div>
          )}

          {/* Global error */}
          {errors.root && (
            <div
              style={{
                background: '#1a0808',
                border: '1px solid #dc2626',
                borderRadius: '8px',
                padding: '10px 14px',
                color: '#fca5a5',
                fontSize: '13px',
                marginBottom: '20px',
              }}
            >
              {errors.root.message}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Username */}
            <div style={{ marginBottom: '16px' }}>
              <label
                style={{
                  display: 'block',
                  color: '#94a3b8',
                  fontSize: '13px',
                  marginBottom: '6px',
                  fontWeight: 500,
                }}
              >
                Username
              </label>
              <input
                {...register('username', { required: 'Username is required' })}
                placeholder="Enter your username"
                autoComplete="username"
                style={inputStyle(errors.username)}
              />
              {errors.username && (
                <p style={{ color: '#f87171', fontSize: '12px', marginTop: '4px' }}>
                  {errors.username.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div style={{ marginBottom: '24px' }}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: '6px',
                }}
              >
                <label style={{ color: '#94a3b8', fontSize: '13px', fontWeight: 500 }}>
                  Password
                </label>
              </div>
              <input
                {...register('password', { required: 'Password is required' })}
                type="password"
                placeholder="Enter your password"
                autoComplete="current-password"
                style={inputStyle(errors.password)}
              />
              {errors.password && (
                <p style={{ color: '#f87171', fontSize: '12px', marginTop: '4px' }}>
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={isSubmitting}
              style={{
                width: '100%',
                padding: '12px',
                background: isSubmitting ? '#4c1d95' : '#5D12A8',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '15px',
                fontWeight: 600,
                cursor: isSubmitting ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
              }}
            >
              {isSubmitting ? (
                <>
                  <span
                    style={{
                      width: 16,
                      height: 16,
                      border: '2px solid #fff',
                      borderTopColor: 'transparent',
                      borderRadius: '50%',
                      display: 'inline-block',
                      animation: 'spin 0.7s linear infinite',
                    }}
                  />
                  Signing in...
                </>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          <p
            style={{
              textAlign: 'center',
              color: '#64748b',
              fontSize: '13px',
              marginTop: '24px',
            }}
          >
            Don't have an account?{' '}
            <Link
              to="/register"
              style={{ color: '#5D12A8', fontWeight: 600, textDecoration: 'none' }}
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

export default React.memo(LoginGuiNew);
