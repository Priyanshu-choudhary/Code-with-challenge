import React from 'react';
import Dashboard from '../../dashBoard/Dashboard';
import Footer2 from '../Footer2';

const CREW = [
  { name: 'Yadi Chaudhary',  role: 'Founder',    email: 'broyadi23@gmail.com',       phone: '+91-7818071134' },
  { name: 'Prince Gupta',    role: 'Co-Founder',  email: 'princegupta0132004@gmail.com', phone: '+91-7618871414' },
  { name: 'Hem Chandra Jha', role: 'Co-Founder',  email: 'hcjha05@gmail.com',         phone: '+91-9818096872' },
  { name: 'Pranjali Jaiswal',role: 'Contributor', email: 'zaisjaiswal86@gmail.com',   phone: '' },
];

const STATS = [
  { value: '1K+',  label: 'Users' },
  { value: '200+', label: 'Problems' },
  { value: '1',    label: 'Weekly contest' },
  { value: '100%', label: 'Free' },
];

function CrewCard({ name, role, email, phone }) {
  const initial = name[0].toUpperCase();
  const colors  = ['#2563eb', '#7c3aed', '#059669', '#d97706'];
  const color   = colors[CREW.findIndex((c) => c.name === name) % colors.length];
  return (
    <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 12, padding: '24px 20px', textAlign: 'center' }}>
      <div style={{ width: 56, height: 56, borderRadius: '50%', background: `${color}15`, color, fontSize: 22, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 14px' }}>
        {initial}
      </div>
      <h3 style={{ fontSize: 15, fontWeight: 700, color: '#111827', margin: '0 0 4px' }}>{name}</h3>
      <p style={{ fontSize: 12, fontWeight: 600, color, margin: '0 0 12px', padding: '2px 10px', background: `${color}12`, borderRadius: 999, display: 'inline-block' }}>{role}</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <a href={`mailto:${email}`} style={{ fontSize: 12, color: '#6b7280', textDecoration: 'none' }}
           onMouseEnter={(e) => { e.currentTarget.style.color = '#2563eb'; }}
           onMouseLeave={(e) => { e.currentTarget.style.color = '#6b7280'; }}>
          {email}
        </a>
        {phone && <p style={{ fontSize: 12, color: '#9ca3af', margin: 0 }}>{phone}</p>}
      </div>
    </div>
  );
}

const AboutUs = () => (
  <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#f9fafb' }}>
    <Dashboard />

    {/* Hero */}
    <div style={{ background: '#fff', borderBottom: '1px solid #e5e7eb', padding: '48px 24px 44px', textAlign: 'center' }}>
      <div style={{ maxWidth: 640, margin: '0 auto' }}>
        <div style={{ display: 'inline-block', background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: 999, padding: '3px 14px', fontSize: 12, fontWeight: 500, color: '#2563eb', marginBottom: 16 }}>
          Our story
        </div>
        <h1 style={{ fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 700, color: '#111827', letterSpacing: '-0.5px', margin: '0 0 16px' }}>
          We are CFCians
        </h1>
        <p style={{ fontSize: 16, color: '#6b7280', lineHeight: 1.7, margin: 0 }}>
          A platform built by students, for students — to prove that great engineers come from everywhere.
        </p>
      </div>
    </div>

    {/* Stats */}
    <div style={{ borderBottom: '1px solid #e5e7eb', background: '#fff', padding: '20px 24px' }}>
      <div style={{ maxWidth: 860, margin: '0 auto', display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        {STATS.map((s, i) => (
          <div key={s.label} style={{ textAlign: 'center', padding: '8px 36px', borderRight: i < STATS.length - 1 ? '1px solid #e5e7eb' : 'none' }}>
            <div style={{ fontSize: 24, fontWeight: 700, color: '#111827' }}>{s.value}</div>
            <div style={{ fontSize: 12, color: '#6b7280', marginTop: 2 }}>{s.label}</div>
          </div>
        ))}
      </div>
    </div>

    <div style={{ flex: 1, maxWidth: 860, margin: '0 auto', width: '100%', padding: '40px 24px', boxSizing: 'border-box' }}>

      {/* Story */}
      <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 12, padding: '32px 36px', marginBottom: 32 }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, color: '#111827', margin: '0 0 20px' }}>How it started</h2>
        <div style={{ fontSize: 15, color: '#4b5563', lineHeight: 1.8, display: 'flex', flexDirection: 'column', gap: 16 }}>
          <p style={{ margin: 0 }}>
            CFC started in a way that few would expect. We weren't the top of our class, nor did we have a prestigious background. We were simply a group of average, driven students from a tier 3 college, navigating through our first-year BTech exams.
          </p>
          <p style={{ margin: 0 }}>
            While others buried themselves in textbooks, we found our minds wandering toward something bigger — something that could change the way people perceive students like us. Tech was the one thing we were truly passionate about, the one skill we knew we had.
          </p>
          <p style={{ margin: 0 }}>
            Without any external guidance, we dove in. We wanted to prove that where you come from doesn't define where you can go. CFC was born from that resolve — a platform to empower every student who has ever felt overlooked.
          </p>
          <p style={{ margin: 0 }}>
            Today, CFC stands for every student who wants to learn, practice, and land a great opportunity. Our vision is clear: promote education, empower the underrepresented, and show that greatness lies in all of us.
          </p>
        </div>
      </div>

      {/* Mission */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 14, marginBottom: 36 }}>
        {[
          { title: 'Mission', text: 'Make quality coding education accessible to every student, regardless of their background.', color: '#2563eb' },
          { title: 'Vision',  text: 'A world where talent — not college tier — determines a developer\'s opportunities.',          color: '#7c3aed' },
          { title: 'Values',  text: 'Openness, persistence, and the belief that consistent practice beats raw talent.',             color: '#059669' },
        ].map((item) => (
          <div key={item.title} style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 12, padding: '20px' }}>
            <div style={{ width: 32, height: 4, borderRadius: 2, background: item.color, marginBottom: 12 }} />
            <h3 style={{ fontSize: 14, fontWeight: 700, color: '#111827', margin: '0 0 8px' }}>{item.title}</h3>
            <p style={{ fontSize: 13, color: '#6b7280', lineHeight: 1.65, margin: 0 }}>{item.text}</p>
          </div>
        ))}
      </div>

      {/* Team */}
      <h2 style={{ fontSize: 18, fontWeight: 700, color: '#111827', margin: '0 0 16px' }}>Meet the team</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 14 }}>
        {CREW.map((member) => (
          <CrewCard key={member.name} {...member} />
        ))}
      </div>
    </div>

    <Footer2 />
  </div>
);

export default AboutUs;
