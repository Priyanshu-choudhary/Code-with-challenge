/**
 * Integration tests: UserContext
 *
 * Tests the auth state management, theme switching, and localStorage integration.
 */
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React, { useContext } from 'react';
import { UserProvider, UserContext } from '../Context/UserContext';

// ─── Test consumer ────────────────────────────────────────────────────────────
function AuthDisplay() {
  const { user, token, role, logout, currentthemes, setcurrentthemes } = useContext(UserContext);
  return (
    <div>
      <span data-testid="user">{user ? JSON.stringify(user) : 'null'}</span>
      <span data-testid="token">{token || 'null'}</span>
      <span data-testid="role">{role || 'null'}</span>
      <span data-testid="theme">{String(currentthemes)}</span>
      <button onClick={logout}>logout</button>
      <button onClick={() => setcurrentthemes(false)}>light</button>
    </div>
  );
}

function renderWithProvider() {
  return render(
    <UserProvider>
      <AuthDisplay />
    </UserProvider>
  );
}

describe('UserContext', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
  });

  it('renders with null user/token/role by default', () => {
    renderWithProvider();
    expect(screen.getByTestId('user').textContent).toBe('null');
    expect(screen.getByTestId('token').textContent).toBe('null');
    expect(screen.getByTestId('role').textContent).toBe('null');
  });

  it('hydrates user and token from localStorage on mount', () => {
    localStorage.setItem('user',  JSON.stringify({ name: 'Yadi' }));
    localStorage.setItem('token', 'jwt-token-abc');
    localStorage.setItem('role',  'USER');

    renderWithProvider();

    expect(screen.getByTestId('user').textContent).toContain('Yadi');
    expect(screen.getByTestId('token').textContent).toBe('jwt-token-abc');
    expect(screen.getByTestId('role').textContent).toBe('USER');
  });

  it('clears auth state on logout', async () => {
    localStorage.setItem('user',  JSON.stringify({ name: 'Yadi' }));
    localStorage.setItem('token', 'jwt-token-abc');
    localStorage.setItem('role',  'USER');

    renderWithProvider();

    await userEvent.click(screen.getByRole('button', { name: /logout/i }));

    expect(screen.getByTestId('user').textContent).toBe('null');
    expect(screen.getByTestId('token').textContent).toBe('null');
    expect(localStorage.getItem('token')).toBeNull();
  });

  it('hydrates roles from JSON-encoded roles array', () => {
    localStorage.setItem('roles', JSON.stringify(['ADMIN', 'USER']));
    renderWithProvider();
    expect(screen.getByTestId('role').textContent).toBe('ADMIN');
  });

  it('toggles theme to light mode', async () => {
    renderWithProvider();
    // Default is dark (true)
    expect(screen.getByTestId('theme').textContent).toBe('true');

    await userEvent.click(screen.getByRole('button', { name: /light/i }));
    expect(screen.getByTestId('theme').textContent).toBe('false');
  });
});
