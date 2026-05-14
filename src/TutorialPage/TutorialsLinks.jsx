import React from 'react';
import { useNavigate } from 'react-router-dom';

const CATEGORIES = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
      </svg>
    ),
    title: 'Languages',
    color: '#2563eb',
    links: ['Java', 'C', 'C++', 'Python', 'JavaScript', 'HTML', 'CSS'],
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <line x1="19" y1="5" x2="5" y2="19"/><circle cx="6.5" cy="6.5" r="2.5"/><circle cx="17.5" cy="17.5" r="2.5"/>
      </svg>
    ),
    title: 'Maths',
    color: '#d97706',
    links: ['Basics coding Maths', 'Advance coding Maths'],
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
      </svg>
    ),
    title: 'Skills',
    color: '#7c3aed',
    links: ['Data Structure', 'Algorithm', "OOP's concept", 'DataBase'],
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/>
      </svg>
    ),
    title: 'Frameworks',
    color: '#059669',
    links: ['React', 'Spring Boot', 'Express', 'Bootstrap'],
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>
      </svg>
    ),
    title: 'Databases',
    color: '#0891b2',
    links: ['MySQL', 'PostgreSQL', 'MongoDB'],
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
      </svg>
    ),
    title: 'CSE Subjects',
    color: '#dc2626',
    links: ['DSA', 'Data Analysis', 'Data Management System', 'Cyber Security'],
  },
];

function CategoryCard({ icon, title, color, links, onLinkClick }) {
  const [hovered, setHovered] = React.useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: '#fff',
        border: `1px solid ${hovered ? color : '#e5e7eb'}`,
        borderRadius: 12,
        padding: '20px',
        transition: 'border-color 0.15s',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
        <div style={{ width: 36, height: 36, borderRadius: 8, background: `${color}12`, display: 'flex', alignItems: 'center', justifyContent: 'center', color }}>
          {icon}
        </div>
        <h3 style={{ fontSize: 15, fontWeight: 600, color: '#111827', margin: 0 }}>{title}</h3>
      </div>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 2 }}>
        {links.map((link) => (
          <li key={link}>
            <button
              onClick={() => onLinkClick(link)}
              style={{
                width: '100%', textAlign: 'left', padding: '6px 10px', borderRadius: 6,
                fontSize: 13, color: '#6b7280', background: 'transparent', border: 'none',
                cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, transition: 'background 0.1s, color 0.1s',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = `${color}0f`; e.currentTarget.style.color = color; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#6b7280'; }}
            >
              <span style={{ width: 4, height: 4, borderRadius: '50%', background: color, flexShrink: 0 }} />
              {link}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function TutorialsLinks() {
  const navigate = useNavigate();
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16 }}>
      {CATEGORIES.map((cat) => (
        <CategoryCard
          key={cat.title}
          {...cat}
          onLinkClick={(link) => navigate(`/lecture/${link}`)}
        />
      ))}
    </div>
  );
}
