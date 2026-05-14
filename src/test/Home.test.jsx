/**
 * Integration tests: Home page
 *
 * Tests hero section render, feature cards, CTA behaviour for logged-in vs guest.
 */
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { UserProvider } from '../Context/UserContext';
import Home from '../home/Home';

// Stub heavy child components that aren't under test
vi.mock('../home/newsLetter', () => ({ default: () => <div data-testid="newsletter" /> }));
vi.mock('../home/UserCount',  () => ({ default: () => <div data-testid="user-count" /> }));
vi.mock('../home/Footer2',    () => ({ default: () => <footer data-testid="footer" /> }));
vi.mock('../dashBoard/Dashboard', () => ({ default: () => <nav data-testid="navbar" /> }));

function renderHome() {
  return render(
    <MemoryRouter>
      <UserProvider>
        <Home />
      </UserProvider>
    </MemoryRouter>
  );
}

describe('Home page', () => {
  beforeEach(() => localStorage.clear());

  it('renders the navbar', () => {
    renderHome();
    expect(screen.getByTestId('navbar')).toBeInTheDocument();
  });

  it('renders all 6 feature cards', () => {
    renderHome();
    const featureNames = ['Learn', 'Practice', 'Courses', 'Online Editor', 'Contest', 'Leaderboard'];
    featureNames.forEach((name) => {
      expect(screen.getByText(name)).toBeInTheDocument();
    });
  });

  it('shows "Get Started Free" CTA for guest users', () => {
    renderHome();
    expect(screen.getByRole('link', { name: /get started free/i })).toBeInTheDocument();
  });

  it('shows "Solve Problems" CTA for logged-in users', () => {
    localStorage.setItem('user',  JSON.stringify({ name: 'Yadi' }));
    localStorage.setItem('token', 'tok');
    renderHome();
    expect(screen.getByRole('link', { name: /solve problems/i })).toBeInTheDocument();
    expect(screen.queryByRole('link', { name: /get started free/i })).not.toBeInTheDocument();
  });

  it('renders the UserCount and Newsletter sections', () => {
    renderHome();
    expect(screen.getByTestId('user-count')).toBeInTheDocument();
    expect(screen.getByTestId('newsletter')).toBeInTheDocument();
  });

  it('renders footer', () => {
    renderHome();
    expect(screen.getByTestId('footer')).toBeInTheDocument();
  });

  it('feature cards have correct href links', () => {
    renderHome();
    expect(screen.getByRole('link', { name: /get started free/i })).toHaveAttribute('href', '/login');
  });
});
