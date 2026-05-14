import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { UserContext } from '../../Context/UserContext';
import login from './LoginApi';

function LoginGuiNew() {
  const navigate = useNavigate();
  const location = useLocation();
  const { authReady, token, setUser, setRole, setToken, setprofileImage } = useContext(UserContext);
  const [showPassword, setShowPassword] = useState(false);

  const successMessage = location.state?.message;

  const { register, handleSubmit, formState: { errors, isSubmitting }, setError } = useForm();

  useEffect(() => {
    if (authReady && token) navigate('/yourProfile', { replace: true });
  }, [authReady, token, navigate]);

  const onSubmit = async ({ username, password }) => {
    try {
      const { token, roles, user: fullUser } = await login(username, password);
      setToken(token);
      setUser(fullUser);
      setRole(Array.isArray(roles) ? (roles[0] || null) : roles);
      if (fullUser.profileImg) setprofileImage(fullUser.profileImg);
      navigate('/yourProfile', { replace: true });
    } catch (err) {
      setError('root', { message: err.message || 'Login failed. Please try again.' });
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f9fafb', display: 'flex', flexDirection: 'column' }}>

      {/* Simple top bar */}
      <div style={{ background: '#fff', borderBottom: '1px solid #e5e7eb', padding: '0 24px', height: 56, display: 'flex', alignItems: 'center' }}>
        <Link to="/" style={{ textDecoration: 'none' }}>
          <span style={{ fontSize: 18, fontWeight: 700, color: '#2563eb', letterSpacing: '-0.5px' }}>CFC</span>
        </Link>
      </div>

      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '32px 24px' }}>
        <div style={{ width: '100%', maxWidth: 400 }}>

          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: 32 }}>
            <h1 style={{ fontSize: 24, fontWeight: 700, color: '#111827', margin: '0 0 6px' }}>Welcome back</h1>
            <p style={{ fontSize: 14, color: '#6b7280', margin: 0 }}>Sign in to your CFC account</p>
          </div>

          {/* Card */}
          <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 14, padding: '32px' }}>

            {successMessage && (
              <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 8, padding: '10px 14px', fontSize: 13, color: '#166534', marginBottom: 20 }}>
                {successMessage}
              </div>
            )}

            {errors.root && (
              <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 8, padding: '10px 14px', fontSize: 13, color: '#991b1b', marginBottom: 20 }}>
                {errors.root.message}
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)}>
              {/* Username */}
              <div style={{ marginBottom: 16 }}>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: '#374151', marginBottom: 6 }}>Username</label>
                <input
                  {...register('username', { required: 'Username is required' })}
                  placeholder="Enter your username"
                  autoComplete="username"
                  style={{
                    width: '100%', padding: '10px 12px', fontSize: 14, color: '#111827',
                    background: '#fff', border: `1px solid ${errors.username ? '#fca5a5' : '#e5e7eb'}`,
                    borderRadius: 8, outline: 'none', boxSizing: 'border-box',
                  }}
                  onFocus={(e) => { e.target.style.borderColor = '#2563eb'; e.target.style.boxShadow = '0 0 0 3px #dbeafe'; }}
                  onBlur={(e) => { e.target.style.borderColor = errors.username ? '#fca5a5' : '#e5e7eb'; e.target.style.boxShadow = 'none'; }}
                />
                {errors.username && <p style={{ fontSize: 12, color: '#dc2626', margin: '4px 0 0' }}>{errors.username.message}</p>}
              </div>

              {/* Password */}
              <div style={{ marginBottom: 24 }}>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: '#374151', marginBottom: 6 }}>Password</label>
                <div style={{ position: 'relative' }}>
                  <input
                    {...register('password', { required: 'Password is required' })}
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    style={{
                      width: '100%', padding: '10px 40px 10px 12px', fontSize: 14, color: '#111827',
                      background: '#fff', border: `1px solid ${errors.password ? '#fca5a5' : '#e5e7eb'}`,
                      borderRadius: 8, outline: 'none', boxSizing: 'border-box',
                    }}
                    onFocus={(e) => { e.target.style.borderColor = '#2563eb'; e.target.style.boxShadow = '0 0 0 3px #dbeafe'; }}
                    onBlur={(e) => { e.target.style.borderColor = errors.password ? '#fca5a5' : '#e5e7eb'; e.target.style.boxShadow = 'none'; }}
                  />
                  <button type="button" onClick={() => setShowPassword((v) => !v)}
                    style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#9ca3af', padding: 4 }}>
                    {showPassword
                      ? <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                      : <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                    }
                  </button>
                </div>
                {errors.password && <p style={{ fontSize: 12, color: '#dc2626', margin: '4px 0 0' }}>{errors.password.message}</p>}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                style={{
                  width: '100%', padding: '11px', borderRadius: 8, fontSize: 15, fontWeight: 600,
                  color: '#fff', background: isSubmitting ? '#93c5fd' : '#2563eb',
                  border: 'none', cursor: isSubmitting ? 'not-allowed' : 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                  transition: 'background 0.15s',
                }}
              >
                {isSubmitting && (
                  <span style={{ width: 16, height: 16, border: '2px solid #fff', borderTopColor: 'transparent', borderRadius: '50%', display: 'inline-block', animation: 'spin 0.7s linear infinite' }} />
                )}
                {isSubmitting ? 'Signing in...' : 'Sign in'}
              </button>
            </form>
          </div>

          <p style={{ textAlign: 'center', fontSize: 14, color: '#6b7280', marginTop: 20 }}>
            Don't have an account?{' '}
            <Link to="/register" style={{ color: '#2563eb', fontWeight: 600, textDecoration: 'none' }}>Sign up</Link>
          </p>
        </div>
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

export default React.memo(LoginGuiNew);
