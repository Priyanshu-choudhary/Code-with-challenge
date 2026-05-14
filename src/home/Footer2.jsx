import React from 'react';
import { Link } from 'react-router-dom';

const COLUMNS = [
  {
    heading: 'Platform',
    links: [
      { label: 'Problems',    to: '/ProblemSet' },
      { label: 'Courses',     to: '/learn' },
      { label: 'Tutorials',   to: '/Tutorials' },
      { label: 'Editor',      to: '/EditorComponent' },
      { label: 'Contest',     to: '/contest' },
      { label: 'Leaderboard', to: '/leaderboard' },
    ],
  },
  {
    heading: 'Company',
    links: [
      { label: 'About us',  to: '/AboutUs' },
      { label: 'Blog',      to: '/Tutorials' },
      { label: 'Contact',   to: '/AboutUs' },
    ],
  },
  {
    heading: 'Account',
    links: [
      { label: 'Log in',   to: '/login' },
      { label: 'Sign up',  to: '/register' },
      { label: 'Profile',  to: '/yourProfile' },
    ],
  },
];

export default function Footer2() {
  return (
    <footer style={{ background: '#f9fafb', borderTop: '1px solid #e5e7eb', marginTop: 'auto' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '48px 24px 32px' }}>

        {/* Top row */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 48, justifyContent: 'space-between', marginBottom: 48 }}>

          {/* Brand */}
          <div style={{ minWidth: 200, maxWidth: 280 }}>
            <span style={{ fontSize: 18, fontWeight: 700, color: '#2563eb', letterSpacing: '-0.5px' }}>CFC</span>
            <p style={{ fontSize: 13, color: '#6b7280', marginTop: 10, lineHeight: 1.7 }}>
              Code for Challenge — a platform to learn, practice, and compete in programming challenges.
            </p>
          </div>

          {/* Link columns */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 48 }}>
            {COLUMNS.map((col) => (
              <div key={col.heading} style={{ minWidth: 120 }}>
                <p style={{ fontSize: 12, fontWeight: 600, color: '#374151', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 12 }}>
                  {col.heading}
                </p>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        to={link.to}
                        style={{ fontSize: 13, color: '#6b7280', textDecoration: 'none' }}
                        onMouseEnter={(e) => { e.currentTarget.style.color = '#2563eb'; }}
                        onMouseLeave={(e) => { e.currentTarget.style.color = '#6b7280'; }}
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ borderTop: '1px solid #e5e7eb', paddingTop: 24, display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
          <p style={{ fontSize: 12, color: '#9ca3af', margin: 0 }}>
            &copy; {new Date().getFullYear()} Code for Challenge. All rights reserved.
          </p>
          <div style={{ display: 'flex', gap: 20 }}>
            <a href="https://github.com/Priyanshu-choudhary" target="_blank" rel="noreferrer" style={{ fontSize: 13, color: '#9ca3af', textDecoration: 'none' }}
               onMouseEnter={(e) => { e.currentTarget.style.color = '#2563eb'; }}
               onMouseLeave={(e) => { e.currentTarget.style.color = '#9ca3af'; }}>
              GitHub
            </a>
            <Link to="/AboutUs" style={{ fontSize: 13, color: '#9ca3af', textDecoration: 'none' }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = '#2563eb'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = '#9ca3af'; }}>
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
