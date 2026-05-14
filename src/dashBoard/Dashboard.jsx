import React, { useContext, useEffect, useState, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { UserContext } from '../Context/UserContext';

const NAV_LINKS = [
  { name: 'Problems', href: '/ProblemSet' },
  { name: 'Learn',    href: '/Tutorials' },
  { name: 'Courses',  href: '/learn' },
  { name: 'Editor',   href: '/EditorComponent' },
  { name: 'Contest',  href: '/contest' },
];

const USER_MENU = [
  { name: 'Your profile',    href: '/yourProfile' },
  { name: 'Leaderboard',     href: '/leaderboard' },
  { name: 'About us',        href: '/AboutUs' },
  { name: 'Admin dashboard', href: '/Doc',      adminOnly: true },
  { name: 'Documentation',   href: '/Document', adminOnly: true },
  { name: 'Sign out',        href: '/logout',   danger: true },
];

function Avatar({ name }) {
  const initial = name ? name[0].toUpperCase() : '?';
  return (
    <span style={{
      width: 34, height: 34, borderRadius: '50%', background: '#2563eb',
      color: '#fff', fontSize: 13, fontWeight: 500, display: 'flex',
      alignItems: 'center', justifyContent: 'center', flexShrink: 0,
    }}>
      {initial}
    </span>
  );
}

const MenuIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
  </svg>
);
const CloseIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);
const ChevronDown = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 12 15 18 9"/>
  </svg>
);

function Dashboard() {
  const location  = useLocation();
  const { user, role } = useContext(UserContext);

  const [menuOpen,     setMenuOpen]     = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const displayName = typeof user === 'string' ? user : (user?.name || '');
  const primaryRole = Array.isArray(role) ? role[0] : role;
  const isAdmin     = primaryRole === 'ADMIN';

  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) setDropdownOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  useEffect(() => setMenuOpen(false), [location.pathname]);

  const isActive = (href) => location.pathname === href;

  return (
    <nav style={{ position: 'sticky', top: 0, zIndex: 50, background: '#ffffff', borderBottom: '1px solid #e5e7eb', width: '100%' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
        <div style={{ height: 60, display: 'flex', alignItems: 'center', gap: 32 }}>

          {/* Logo */}
          <Link to="/" style={{ textDecoration: 'none', flexShrink: 0 }}>
            <span style={{ fontSize: 18, fontWeight: 700, color: '#2563eb', letterSpacing: '-0.5px' }}>CFC</span>
          </Link>

          {/* Desktop links */}
          <div className="cfc-desktop-nav" style={{ display: 'flex', alignItems: 'center', gap: 2, flex: 1 }}>
            {NAV_LINKS.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                style={{
                  padding: '5px 12px', borderRadius: 6, fontSize: 14, fontWeight: 500,
                  color: isActive(item.href) ? '#2563eb' : '#4b5563',
                  background: isActive(item.href) ? '#eff6ff' : 'transparent',
                  textDecoration: 'none',
                }}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Right cluster */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginLeft: 'auto' }}>
            {user ? (
              <div ref={dropdownRef} style={{ position: 'relative' }}>
                <button
                  onClick={() => setDropdownOpen((o) => !o)}
                  style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'transparent', border: 'none', cursor: 'pointer', padding: '4px 8px 4px 4px', borderRadius: 8 }}
                >
                  <Avatar name={displayName} />
                  <span className="cfc-desktop-name" style={{ fontSize: 14, fontWeight: 500, color: '#111827', maxWidth: 120, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {displayName}
                  </span>
                  <span className="cfc-desktop-name" style={{ color: '#9ca3af' }}><ChevronDown /></span>
                </button>

                {dropdownOpen && (
                  <div style={{ position: 'absolute', right: 0, top: 'calc(100% + 8px)', width: 200, background: '#fff', border: '1px solid #e5e7eb', borderRadius: 10, overflow: 'hidden', boxShadow: '0 4px 16px rgba(0,0,0,0.08)', zIndex: 100 }}>
                    <div style={{ padding: '10px 16px', borderBottom: '1px solid #f3f4f6' }}>
                      <p style={{ fontSize: 11, fontWeight: 500, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.05em', margin: 0 }}>Signed in as</p>
                      <p style={{ fontSize: 13, fontWeight: 500, color: '#111827', margin: '2px 0 0', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{displayName}</p>
                    </div>
                    {USER_MENU.filter((item) => !item.adminOnly || isAdmin).map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        onClick={() => setDropdownOpen(false)}
                        style={{ display: 'block', padding: '9px 16px', fontSize: 13, color: item.danger ? '#dc2626' : '#374151', textDecoration: 'none' }}
                        onMouseEnter={(e) => { e.currentTarget.style.background = item.danger ? '#fef2f2' : '#f9fafb'; }}
                        onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div style={{ display: 'flex', gap: 8 }}>
                <Link to="/login"    style={{ padding: '7px 16px', borderRadius: 7, fontSize: 14, fontWeight: 500, color: '#374151', border: '1px solid #e5e7eb', textDecoration: 'none' }}>Log in</Link>
                <Link to="/register" style={{ padding: '7px 16px', borderRadius: 7, fontSize: 14, fontWeight: 500, color: '#fff', background: '#2563eb', textDecoration: 'none' }}>Sign up</Link>
              </div>
            )}

            <button
              className="cfc-mobile-btn"
              onClick={() => setMenuOpen((o) => !o)}
              style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: 4, color: '#6b7280', display: 'none' }}
              aria-label="Toggle menu"
            >
              {menuOpen ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      {menuOpen && (
        <div style={{ borderTop: '1px solid #e5e7eb', background: '#fff', padding: '12px 24px 16px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {NAV_LINKS.map((item) => (
              <Link key={item.name} to={item.href} style={{ padding: '9px 12px', borderRadius: 7, fontSize: 14, fontWeight: 500, color: isActive(item.href) ? '#2563eb' : '#374151', background: isActive(item.href) ? '#eff6ff' : 'transparent', textDecoration: 'none' }}>
                {item.name}
              </Link>
            ))}
            <div style={{ borderTop: '1px solid #f3f4f6', margin: '8px 0' }} />
            {user ? (
              USER_MENU.filter((item) => !item.adminOnly || isAdmin).map((item) => (
                <Link key={item.name} to={item.href} style={{ padding: '9px 12px', borderRadius: 7, fontSize: 14, color: item.danger ? '#dc2626' : '#374151', textDecoration: 'none' }}>
                  {item.name}
                </Link>
              ))
            ) : (
              <>
                <Link to="/login"    style={{ padding: '9px 12px', borderRadius: 7, fontSize: 14, color: '#374151', textDecoration: 'none' }}>Log in</Link>
                <Link to="/register" style={{ padding: '9px 12px', borderRadius: 7, fontSize: 14, fontWeight: 500, color: '#fff', background: '#2563eb', textDecoration: 'none', textAlign: 'center', marginTop: 4 }}>Sign up</Link>
              </>
            )}
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .cfc-desktop-nav  { display: none !important; }
          .cfc-desktop-name { display: none !important; }
          .cfc-mobile-btn   { display: flex !important; }
        }
      `}</style>
    </nav>
  );
}

export default React.memo(Dashboard);
