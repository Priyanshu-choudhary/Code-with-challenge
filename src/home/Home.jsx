import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Dashboard from '../dashBoard/Dashboard';
import Footer2 from './Footer2';
import { UserContext } from '../Context/UserContext';

const icons = {
  problems: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
    </svg>
  ),
  learn: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
    </svg>
  ),
  courses: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/>
    </svg>
  ),
  editor: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>
    </svg>
  ),
  contest: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2z"/>
    </svg>
  ),
  leaderboard: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>
    </svg>
  ),
};

const FEATURES = [
  { icon: 'problems',    title: 'Practice Problems',  desc: 'Hundreds of problems across all difficulty levels, organised by topic.',               href: '/ProblemSet',      color: '#2563eb' },
  { icon: 'learn',       title: 'Tutorials',          desc: 'Step-by-step articles on DSA, languages, frameworks, and more.',                       href: '/Tutorials',       color: '#0891b2' },
  { icon: 'courses',     title: 'Courses',            desc: 'Structured learning paths built to take you from beginner to advanced.',                href: '/learn',           color: '#7c3aed' },
  { icon: 'editor',      title: 'Online Editor',      desc: 'Multi-language code editor with execution — right in your browser.',                    href: '/EditorComponent', color: '#059669' },
  { icon: 'contest',     title: 'Contests',           desc: 'Weekly hackathons and timed coding competitions with rankings.',                        href: '/contest',         color: '#d97706' },
  { icon: 'leaderboard', title: 'Leaderboard',        desc: 'Track your global ranking and compare your progress with other learners.',              href: '/leaderboard',     color: '#dc2626' },
];

const STATS = [
  { value: '200+', label: 'Daily learners' },
  { value: '1 K+', label: 'New users monthly' },
  { value: '1',    label: 'Weekly hackathon' },
  { value: '100%', label: 'Free to use' },
];

function FeatureCard({ icon, title, desc, href, color }) {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(href)}
      style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 12, padding: 24, cursor: 'pointer', transition: 'border-color 0.15s' }}
      onMouseEnter={(e) => { e.currentTarget.style.borderColor = color; }}
      onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#e5e7eb'; }}
    >
      <div style={{ width: 40, height: 40, borderRadius: 8, background: `${color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', color, marginBottom: 14 }}>
        {icons[icon]}
      </div>
      <h3 style={{ fontSize: 15, fontWeight: 600, color: '#111827', margin: '0 0 6px' }}>{title}</h3>
      <p style={{ fontSize: 13, color: '#6b7280', lineHeight: 1.65, margin: '0 0 14px' }}>{desc}</p>
      <span style={{ fontSize: 13, color, fontWeight: 500 }}>Explore &rarr;</span>
    </div>
  );
}

export default function Home() {
  const { user } = useContext(UserContext);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#fff' }}>
      <Dashboard />

      {/* Hero */}
      <section style={{ background: '#f9fafb', borderBottom: '1px solid #e5e7eb', padding: '72px 24px 64px', textAlign: 'center' }}>
        <div style={{ maxWidth: 660, margin: '0 auto' }}>
          <div style={{ display: 'inline-block', background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: 999, padding: '4px 14px', fontSize: 12, fontWeight: 500, color: '#2563eb', marginBottom: 24 }}>
            Practice &middot; Learn &middot; Compete
          </div>
          <h1 style={{ fontSize: 'clamp(30px, 5vw, 50px)', fontWeight: 700, color: '#111827', letterSpacing: '-1px', lineHeight: 1.15, margin: '0 0 20px' }}>
            Get better at coding<br />every single day
          </h1>
          <p style={{ fontSize: 17, color: '#6b7280', lineHeight: 1.7, margin: '0 0 36px' }}>
            Problems, courses, contests, and a live editor — structured learning from beginner to expert, completely free.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to={user ? '/ProblemSet' : '/register'}
              style={{ padding: '12px 28px', borderRadius: 8, fontSize: 15, fontWeight: 600, color: '#fff', background: '#2563eb', textDecoration: 'none' }}>
              {user ? 'Solve problems' : 'Get started free'}
            </Link>
            <Link to="/Tutorials"
              style={{ padding: '12px 28px', borderRadius: 8, fontSize: 15, fontWeight: 500, color: '#374151', background: '#fff', border: '1px solid #e5e7eb', textDecoration: 'none' }}>
              Browse tutorials
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section style={{ borderBottom: '1px solid #e5e7eb', padding: '28px 24px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', flexWrap: 'wrap', gap: 0, justifyContent: 'center' }}>
          {STATS.map((s, i) => (
            <div key={s.label} style={{ textAlign: 'center', padding: '8px 40px', borderRight: i < STATS.length - 1 ? '1px solid #e5e7eb' : 'none' }}>
              <div style={{ fontSize: 26, fontWeight: 700, color: '#111827', lineHeight: 1 }}>{s.value}</div>
              <div style={{ fontSize: 12, color: '#6b7280', marginTop: 4 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section style={{ flex: 1, padding: '64px 24px', width: '100%', maxWidth: 1200, margin: '0 auto', boxSizing: 'border-box' }}>
        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#111827', textAlign: 'center', margin: '0 0 8px' }}>Everything you need to level up</h2>
        <p style={{ fontSize: 14, color: '#6b7280', textAlign: 'center', margin: '0 0 40px' }}>One platform, six ways to grow as a developer.</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
          {FEATURES.map((f) => <FeatureCard key={f.title} {...f} />)}
        </div>
      </section>

      {/* CTA (guests only) */}
      {!user && (
        <section style={{ background: '#eff6ff', borderTop: '1px solid #bfdbfe', padding: '48px 24px', textAlign: 'center' }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: '#1e3a8a', margin: '0 0 10px' }}>Ready to start practicing?</h2>
          <p style={{ fontSize: 14, color: '#3b82f6', margin: '0 0 24px' }}>Create a free account and begin your coding journey today.</p>
          <Link to="/register" style={{ padding: '11px 28px', borderRadius: 8, fontSize: 15, fontWeight: 600, color: '#fff', background: '#2563eb', textDecoration: 'none', display: 'inline-block' }}>
            Create free account
          </Link>
        </section>
      )}

      <Footer2 />
    </div>
  );
}
