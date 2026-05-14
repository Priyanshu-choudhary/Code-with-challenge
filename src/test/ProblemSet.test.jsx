/**
 * Integration tests: ProblemSet page
 *
 * Tests fetching, filtering, search, pagination, and navigation.
 * Uses msw-style fetch mocking.
 */
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { UserProvider } from '../Context/UserContext';
import ProblemSet from '../Problems/ProblemSet';

// ─── Helpers ──────────────────────────────────────────────────────────────────
const makeProblem = (overrides = {}) => ({
  id: `p-${Math.random()}`,
  title: 'Two Sum',
  difficulty: 'Easy',
  accuracy: 78.5,
  tags: ['Arrays', 'Hash Tables'],
  companies: ['Google'],
  status: 'UnAttempt',
  ...overrides,
});

function renderPage() {
  return render(
    <MemoryRouter>
      <UserProvider>
        <ProblemSet />
      </UserProvider>
    </MemoryRouter>
  );
}

// ─── Mock fetch ───────────────────────────────────────────────────────────────
function mockFetch(problems = [], totalPages = 1) {
  global.fetch = vi.fn().mockResolvedValue({
    ok: true,
    json: async () => ({ content: problems, totalPages }),
  });
}

describe('ProblemSet page', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
  });

  it('shows skeleton rows while loading', () => {
    // Never resolves fetch
    global.fetch = vi.fn(() => new Promise(() => {}));
    renderPage();
    // 10 skeleton rows rendered
    const skeletons = document.querySelectorAll('.animate-pulse');
    expect(skeletons.length).toBeGreaterThan(0);
  });

  it('renders problem titles after fetch', async () => {
    const problems = [
      makeProblem({ title: 'Two Sum',      difficulty: 'Easy' }),
      makeProblem({ title: 'Reverse List', difficulty: 'Hard' }),
    ];
    mockFetch(problems);
    renderPage();

    await waitFor(() => {
      expect(screen.getByText('Two Sum')).toBeInTheDocument();
      expect(screen.getByText('Reverse List')).toBeInTheDocument();
    });
  });

  it('shows empty state when no problems match', async () => {
    mockFetch([]);
    renderPage();

    await waitFor(() => {
      expect(screen.getByText(/no problems match/i)).toBeInTheDocument();
    });
  });

  it('filters problems by search query', async () => {
    const problems = [
      makeProblem({ title: 'Two Sum',        tags: ['Arrays'] }),
      makeProblem({ title: 'Binary Search',  tags: ['Searching Algorithms'] }),
    ];
    mockFetch(problems);
    renderPage();

    await waitFor(() => screen.getByText('Two Sum'));

    const input = screen.getByPlaceholderText(/search problems/i);
    await userEvent.type(input, 'binary');

    expect(screen.queryByText('Two Sum')).not.toBeInTheDocument();
    expect(screen.getByText('Binary Search')).toBeInTheDocument();
  });

  it('calls fetch with correct page parameter', async () => {
    const problems = Array.from({ length: 20 }, (_, i) =>
      makeProblem({ title: `Problem ${i}` })
    );
    mockFetch(problems, 5);
    renderPage();

    await waitFor(() => screen.getByText('Problem 0'));

    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining('page=0'),
      expect.any(Object)
    );
  });

  it('passes Authorization header when token is present', async () => {
    localStorage.setItem('token', 'test-jwt-token');
    mockFetch([]);
    renderPage();

    await waitFor(() => {
      const [, options] = global.fetch.mock.calls[0];
      expect(options.headers?.Authorization).toBe('Bearer test-jwt-token');
    });
  });

  it('difficulty badges render with correct text', async () => {
    const problems = [
      makeProblem({ title: 'Easy Q',   difficulty: 'Easy' }),
      makeProblem({ title: 'Medium Q', difficulty: 'Medium' }),
      makeProblem({ title: 'Hard Q',   difficulty: 'Hard' }),
    ];
    mockFetch(problems);
    renderPage();

    await waitFor(() => {
      expect(screen.getByText('Easy')).toBeInTheDocument();
      expect(screen.getByText('Medium')).toBeInTheDocument();
      expect(screen.getByText('Hard')).toBeInTheDocument();
    });
  });
});
