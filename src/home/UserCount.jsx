import React from 'react';

const TrophyIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="8 21 12 17 16 21"/>
    <line x1="12" y1="17" x2="12" y2="11"/>
    <path d="M7 4H4a2 2 0 0 0-2 2v2a4 4 0 0 0 4 4"/>
    <path d="M17 4h3a2 2 0 0 1 2 2v2a4 4 0 0 1-4 4"/>
    <rect x="7" y="2" width="10" height="9" rx="2"/>
  </svg>
);

const UsersIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
    <circle cx="9" cy="7" r="4"/>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
);

const TrendUpIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
    <polyline points="17 6 23 6 23 12"/>
  </svg>
);

const STATS = [
  { id: 1, value: '1',     label: 'Hackathon',      sub: 'every 7 days',    Icon: TrophyIcon,  color: '#f59e0b', bg: '#fffbeb' },
  { id: 2, value: '200+',  label: 'Daily Students', sub: 'active learners', Icon: UsersIcon,   color: '#2563eb', bg: '#eff6ff' },
  { id: 3, value: '1,000', label: 'New Users',       sub: 'each month',      Icon: TrendUpIcon, color: '#059669', bg: '#f0fdf4' },
];

export default function UserCount() {
  return (
    <div style={{ padding: '60px 24px', background: '#f9fafb' }}>
      <div style={{ maxWidth: 860, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <h2 style={{ fontSize: 'clamp(20px, 3vw, 28px)', fontWeight: 700, color: '#111827', margin: 0 }}>
            Trusted by thousands of developers
          </h2>
          <p style={{ fontSize: 15, color: '#6b7280', marginTop: 8, marginBottom: 0 }}>
            Growing every day with learners from across the country
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16 }}>
          {STATS.map((stat) => (
            <StatCard key={stat.id} stat={stat} />
          ))}
        </div>
      </div>
    </div>
  );
}

function StatCard({ stat }) {
  const [hovered, setHovered] = React.useState(false);
  const { Icon, color, bg, value, label, sub } = stat;

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: '#fff',
        border: `1px solid ${hovered ? color + '55' : '#e5e7eb'}`,
        borderRadius: 14,
        padding: '28px 20px',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 8,
        transition: 'border-color 0.2s, box-shadow 0.2s',
        boxShadow: hovered ? `0 4px 20px ${color}22` : 'none',
        cursor: 'default',
      }}
    >
      <div style={{ width: 52, height: 52, borderRadius: '50%', background: bg, color, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 4 }}>
        <Icon />
      </div>
      <span style={{ fontSize: 38, fontWeight: 800, color: '#111827', letterSpacing: '-1px', lineHeight: 1 }}>
        {value}
      </span>
      <span style={{ fontSize: 14, fontWeight: 600, color: '#374151' }}>{label}</span>
      <span style={{ fontSize: 12, color: '#9ca3af' }}>{sub}</span>
    </div>
  );
}
