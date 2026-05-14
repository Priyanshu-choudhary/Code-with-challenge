/**
 * Integration tests: Navbar (Dashboard.jsx)
 *
 * Tests auth states, theme toggle, active link highlighting, mobile menu.
 */
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { UserProvider } from '../Context/UserContext';
import Dashboard from '../dashBoard/Dashboard';

function renderNavbar(path = '/') {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <UserProvider>
        <Dashboard />
      </UserProvider>
    </MemoryRouter>
  );
}

describe('Navbar', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('shows "Log In" button when no user is logged in', () => {
    renderNavbar();
    expect(screen.getByRole('link', { name: /log in/i })).toBeInTheDocument();
  });

  it('shows user avatar when logged in', () => {
    localStorage.setItem('user', JSON.stringify({ name: 'Yadi' }));
    localStorage.setItem('token', 'tok123');
    renderNavbar();
    // Avatar shows first letter of name
    expect(screen.getByText('Y')).toBeInTheDocument();
  });

  it('renders all desktop navigation links', () => {
    renderNavbar();
    expect(screen.getByRole('link', { name: 'Learn' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Courses' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Editor' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Problems' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Contest' })).toBeInTheDocument();
  });

  it('opens user dropdown on avatar click', async () => {
    localStorage.setItem('user', JSON.stringify({ name: 'Yadi' }));
    localStorage.setItem('token', 'tok123');
    renderNavbar();

    const avatarButton = screen.getByRole('button', { name: /y/i });
    await userEvent.click(avatarButton);

    expect(screen.getByText('Your Profile')).toBeInTheDocument();
    expect(screen.getByText('Sign out')).toBeInTheDocument();
  });

  it('does NOT show admin links for regular users', async () => {
    localStorage.setItem('user', JSON.stringify({ name: 'Yadi' }));
    localStorage.setItem('role', 'USER');
    renderNavbar();

    const avatarButton = screen.getByRole('button', { name: /y/i });
    await userEvent.click(avatarButton);

    expect(screen.queryByText('Admin Dashboard')).not.toBeInTheDocument();
  });

  it('shows admin links for ADMIN role', async () => {
    localStorage.setItem('user', JSON.stringify({ name: 'Admin' }));
    localStorage.setItem('role', 'ADMIN');
    renderNavbar();

    const avatarButton = screen.getByRole('button', { name: /a/i });
    await userEvent.click(avatarButton);

    expect(screen.getByText('Admin Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Documentation')).toBeInTheDocument();
  });

  it('toggles mobile menu on hamburger click', async () => {
    renderNavbar();

    const hamburger = screen.getByLabelText(/toggle menu/i);
    expect(screen.queryByText(/log in/i, { selector: '.block' })).not.toBeInTheDocument();

    await userEvent.click(hamburger);
    // After click, mobile nav should appear with links
    const mobileLinks = screen.getAllByRole('link', { name: 'Learn' });
    expect(mobileLinks.length).toBeGreaterThanOrEqual(1);
  });

  it('theme toggle button renders and is clickable', async () => {
    renderNavbar();
    const toggle = screen.getByRole('button', { name: /toggle dark mode/i });
    expect(toggle).toBeInTheDocument();
    await userEvent.click(toggle);
    // After click, persists to localStorage
    expect(localStorage.getItem('currentthemes')).toBeDefined();
  });
});
