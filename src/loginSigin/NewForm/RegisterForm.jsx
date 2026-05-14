import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:9090';

const inputBase = {
  width: '100%', padding: '10px 12px', fontSize: 14, color: '#111827',
  background: '#fff', border: '1px solid #e5e7eb', borderRadius: 8,
  outline: 'none', boxSizing: 'border-box',
};

function Field({ label, error, children }) {
  return (
    <div style={{ marginBottom: 14 }}>
      <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: '#374151', marginBottom: 6 }}>{label}</label>
      {children}
      {error && <p style={{ fontSize: 12, color: '#dc2626', margin: '4px 0 0' }}>{error}</p>}
    </div>
  );
}

const RegisterForm = () => {
  const navigate = useNavigate();
  const [showPw,    setShowPw]    = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const { register, handleSubmit, watch, formState: { errors, isSubmitting }, setError } = useForm();
  const password = watch('password', '');

  const onSubmit = async (data) => {
    try {
      const response = await fetch(`${API_URL}/Public/Create-User`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: data.username, email: data.email, password: data.password, roles: ['ROLE_USER'] }),
      });
      if (response.status === 409) { setError('username', { message: 'Username already taken.' }); return; }
      if (!response.ok) throw new Error('Registration failed. Please try again.');
      navigate('/login', { state: { message: 'Account created! Please sign in.' }, replace: true });
    } catch (err) {
      setError('root', { message: err.message });
    }
  };

  const eyeOn  = <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>;
  const eyeOff = <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></svg>;

  return (
    <div style={{ minHeight: '100vh', background: '#f9fafb', display: 'flex', flexDirection: 'column' }}>

      {/* Top bar */}
      <div style={{ background: '#fff', borderBottom: '1px solid #e5e7eb', padding: '0 24px', height: 56, display: 'flex', alignItems: 'center' }}>
        <Link to="/" style={{ textDecoration: 'none' }}>
          <span style={{ fontSize: 18, fontWeight: 700, color: '#2563eb', letterSpacing: '-0.5px' }}>CFC</span>
        </Link>
      </div>

      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '32px 24px' }}>
        <div style={{ width: '100%', maxWidth: 420 }}>

          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: 28 }}>
            <h1 style={{ fontSize: 24, fontWeight: 700, color: '#111827', margin: '0 0 6px' }}>Create your account</h1>
            <p style={{ fontSize: 14, color: '#6b7280', margin: 0 }}>Join thousands of learners on CFC</p>
          </div>

          {/* Card */}
          <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 14, padding: '32px' }}>

            {errors.root && (
              <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 8, padding: '10px 14px', fontSize: 13, color: '#991b1b', marginBottom: 20 }}>
                {errors.root.message}
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)}>
              <Field label="Username" error={errors.username?.message}>
                <input
                  {...register('username', {
                    required: 'Username is required',
                    pattern: { value: /^[a-zA-Z][a-zA-Z0-9_]{2,19}$/, message: 'Must start with a letter, 3–20 chars, letters/numbers/underscore only' },
                  })}
                  placeholder="e.g. yadi_coder"
                  autoComplete="username"
                  style={{ ...inputBase, borderColor: errors.username ? '#fca5a5' : '#e5e7eb' }}
                  onFocus={(e) => { e.target.style.borderColor = '#2563eb'; e.target.style.boxShadow = '0 0 0 3px #dbeafe'; }}
                  onBlur={(e)  => { e.target.style.borderColor = errors.username ? '#fca5a5' : '#e5e7eb'; e.target.style.boxShadow = 'none'; }}
                />
              </Field>

              <Field label="Email" error={errors.email?.message}>
                <input
                  {...register('email', {
                    required: 'Email is required',
                    pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: 'Invalid email address' },
                  })}
                  type="email"
                  placeholder="you@example.com"
                  autoComplete="email"
                  style={{ ...inputBase, borderColor: errors.email ? '#fca5a5' : '#e5e7eb' }}
                  onFocus={(e) => { e.target.style.borderColor = '#2563eb'; e.target.style.boxShadow = '0 0 0 3px #dbeafe'; }}
                  onBlur={(e)  => { e.target.style.borderColor = errors.email ? '#fca5a5' : '#e5e7eb'; e.target.style.boxShadow = 'none'; }}
                />
              </Field>

              <Field label="Password" error={errors.password?.message}>
                <div style={{ position: 'relative' }}>
                  <input
                    {...register('password', {
                      required: 'Password is required',
                      minLength: { value: 6, message: 'At least 6 characters' },
                      pattern: { value: /^\S+$/, message: 'No spaces allowed' },
                    })}
                    type={showPw ? 'text' : 'password'}
                    placeholder="Min. 6 characters"
                    autoComplete="new-password"
                    style={{ ...inputBase, paddingRight: 40, borderColor: errors.password ? '#fca5a5' : '#e5e7eb' }}
                    onFocus={(e) => { e.target.style.borderColor = '#2563eb'; e.target.style.boxShadow = '0 0 0 3px #dbeafe'; }}
                    onBlur={(e)  => { e.target.style.borderColor = errors.password ? '#fca5a5' : '#e5e7eb'; e.target.style.boxShadow = 'none'; }}
                  />
                  <button type="button" onClick={() => setShowPw((v) => !v)}
                    style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#9ca3af', padding: 4 }}>
                    {showPw ? eyeOff : eyeOn}
                  </button>
                </div>
              </Field>

              <Field label="Confirm password" error={errors.confirmPassword?.message}>
                <div style={{ position: 'relative' }}>
                  <input
                    {...register('confirmPassword', {
                      required: 'Please confirm your password',
                      validate: (v) => v === password || 'Passwords do not match',
                    })}
                    type={showConfirm ? 'text' : 'password'}
                    placeholder="Repeat your password"
                    autoComplete="new-password"
                    style={{ ...inputBase, paddingRight: 40, marginBottom: 8, borderColor: errors.confirmPassword ? '#fca5a5' : '#e5e7eb' }}
                    onFocus={(e) => { e.target.style.borderColor = '#2563eb'; e.target.style.boxShadow = '0 0 0 3px #dbeafe'; }}
                    onBlur={(e)  => { e.target.style.borderColor = errors.confirmPassword ? '#fca5a5' : '#e5e7eb'; e.target.style.boxShadow = 'none'; }}
                  />
                  <button type="button" onClick={() => setShowConfirm((v) => !v)}
                    style={{ position: 'absolute', right: 10, top: 10, background: 'none', border: 'none', cursor: 'pointer', color: '#9ca3af', padding: 4 }}>
                    {showConfirm ? eyeOff : eyeOn}
                  </button>
                </div>
              </Field>

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
                {isSubmitting && <span style={{ width: 16, height: 16, border: '2px solid #fff', borderTopColor: 'transparent', borderRadius: '50%', display: 'inline-block', animation: 'spin 0.7s linear infinite' }} />}
                {isSubmitting ? 'Creating account...' : 'Create account'}
              </button>
            </form>
          </div>

          <p style={{ textAlign: 'center', fontSize: 14, color: '#6b7280', marginTop: 20 }}>
            Already have an account?{' '}
            <Link to="/login" style={{ color: '#2563eb', fontWeight: 600, textDecoration: 'none' }}>Sign in</Link>
          </p>
        </div>
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
};

export default RegisterForm;
