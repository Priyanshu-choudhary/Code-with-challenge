import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:9090';

const RegisterForm = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
    setError,
  } = useForm();

  const password = watch('password', '');

  const onSubmit = async (data) => {
    try {
      const response = await fetch(`${API_URL}/Public/Create-User`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: data.username,        // backend expects "name" not "username"
          email: data.email,
          password: data.password,
          roles: ['ROLE_USER'],       // required by backend
          // confirmPassword is intentionally NOT sent
        }),
      });

      if (response.status === 409) {
        setError('username', { message: 'Username already taken. Please choose another.' });
        return;
      }
      if (!response.ok) {
        throw new Error('Registration failed. Please try again.');
      }

      // Success → go to login with a success banner
      navigate('/login', {
        state: { message: 'Account created! Please sign in.' },
        replace: true,
      });
    } catch (err) {
      setError('root', { message: err.message });
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

  const labelStyle = {
    display: 'block',
    color: '#94a3b8',
    fontSize: '13px',
    marginBottom: '6px',
    fontWeight: 500,
  };

  return (
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
      <div style={{ textAlign: 'center', marginBottom: '28px' }}>
        <h1 style={{ color: '#f1f5f9', fontSize: '24px', fontWeight: 700, marginBottom: '8px' }}>
          Create account
        </h1>
        <p style={{ color: '#64748b', fontSize: '14px' }}>Join Code for Challenge</p>
      </div>

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
        <div style={{ marginBottom: '14px' }}>
          <label style={labelStyle}>Username</label>
          <input
            {...register('username', {
              required: 'Username is required',
              pattern: {
                value: /^[a-zA-Z][a-zA-Z0-9_]{2,19}$/,
                message: 'Must start with a letter, 3–20 chars, letters/numbers/underscore only',
              },
            })}
            placeholder="e.g. yadi_coder"
            autoComplete="username"
            style={inputStyle(errors.username)}
          />
          {errors.username && (
            <p style={{ color: '#f87171', fontSize: '12px', marginTop: '4px' }}>
              {errors.username.message}
            </p>
          )}
        </div>

        {/* Email */}
        <div style={{ marginBottom: '14px' }}>
          <label style={labelStyle}>Email</label>
          <input
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email address',
              },
            })}
            type="email"
            placeholder="you@example.com"
            autoComplete="email"
            style={inputStyle(errors.email)}
          />
          {errors.email && (
            <p style={{ color: '#f87171', fontSize: '12px', marginTop: '4px' }}>
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Password */}
        <div style={{ marginBottom: '14px' }}>
          <label style={labelStyle}>Password</label>
          <input
            {...register('password', {
              required: 'Password is required',
              minLength: { value: 6, message: 'At least 6 characters required' },
              pattern: { value: /^\S+$/, message: 'Password cannot contain spaces' },
            })}
            type="password"
            placeholder="Min. 6 characters"
            autoComplete="new-password"
            style={inputStyle(errors.password)}
          />
          {errors.password && (
            <p style={{ color: '#f87171', fontSize: '12px', marginTop: '4px' }}>
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Confirm Password */}
        <div style={{ marginBottom: '24px' }}>
          <label style={labelStyle}>Confirm Password</label>
          <input
            {...register('confirmPassword', {
              required: 'Please confirm your password',
              validate: (v) => v === password || 'Passwords do not match',
            })}
            type="password"
            placeholder="Repeat your password"
            autoComplete="new-password"
            style={inputStyle(errors.confirmPassword)}
          />
          {errors.confirmPassword && (
            <p style={{ color: '#f87171', fontSize: '12px', marginTop: '4px' }}>
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        {/* Submit */}
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
              Creating account...
            </>
          ) : (
            'Create Account'
          )}
        </button>
      </form>

      <p
        style={{
          textAlign: 'center',
          color: '#64748b',
          fontSize: '13px',
          marginTop: '20px',
        }}
      >
        Already have an account?{' '}
        <Link
          to="/login"
          style={{ color: '#5D12A8', fontWeight: 600, textDecoration: 'none' }}
        >
          Sign in
        </Link>
      </p>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
};

export default RegisterForm;
