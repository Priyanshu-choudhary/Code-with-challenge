import React, { useContext, useEffect } from 'react';
import { UserContext } from '../Context/UserContext';

const CloseIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);

const FONT_SIZES = [
  { label: 'Small',  value: '12px' },
  { label: 'Medium', value: '14px' },
  { label: 'Large',  value: '17px' },
];

export default function SettingsPanel({ open, onClose }) {
  const { setFontSize, fontSize } = useContext(UserContext);

  // Close on Escape
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    if (open) document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [open, onClose]);

  return (
    <>
      {/* Backdrop */}
      {open && (
        <div
          onClick={onClose}
          style={{
            position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.25)',
            zIndex: 300, transition: 'opacity 0.2s',
          }}
        />
      )}

      {/* Slide panel */}
      <div style={{
        position: 'fixed', top: 0, right: 0, bottom: 0,
        width: 280,
        background: '#fff',
        borderLeft: '1px solid #e5e7eb',
        boxShadow: '-4px 0 24px rgba(0,0,0,0.1)',
        zIndex: 400,
        display: 'flex', flexDirection: 'column',
        transform: open ? 'translateX(0)' : 'translateX(100%)',
        transition: 'transform 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
      }}>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 20px', borderBottom: '1px solid #f3f4f6' }}>
          <h2 style={{ fontSize: 15, fontWeight: 700, color: '#111827', margin: 0 }}>Settings</h2>
          <button
            onClick={onClose}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6b7280', padding: 4, borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <CloseIcon />
          </button>
        </div>

        {/* Body */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '20px' }}>

          {/* Font size */}
          <div style={{ marginBottom: 28 }}>
            <p style={{ fontSize: 11, fontWeight: 600, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.05em', margin: '0 0 12px' }}>
              Editor Font Size
            </p>
            <div style={{ display: 'flex', gap: 8 }}>
              {FONT_SIZES.map((f) => (
                <button
                  key={f.value}
                  onClick={() => setFontSize(f.value)}
                  style={{
                    flex: 1, padding: '8px 0', borderRadius: 8, fontSize: 13, fontWeight: 500,
                    cursor: 'pointer',
                    background: fontSize === f.value ? '#2563eb' : '#f9fafb',
                    color: fontSize === f.value ? '#fff' : '#374151',
                    border: fontSize === f.value ? '1px solid #2563eb' : '1px solid #e5e7eb',
                    transition: 'all 0.15s',
                  }}
                >
                  {f.label}
                </button>
              ))}
            </div>
            <p style={{ fontSize: 11, color: '#9ca3af', marginTop: 8, marginBottom: 0 }}>
              Current: {fontSize}
            </p>
          </div>

          {/* Keyboard shortcuts */}
          <div>
            <p style={{ fontSize: 11, fontWeight: 600, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.05em', margin: '0 0 12px' }}>
              Keyboard Shortcuts
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {[
                ['Run code',    'Ctrl + Enter'],
                ['Format code', 'Shift + Alt + F'],
                ['Comment',     'Ctrl + /'],
                ['Undo',        'Ctrl + Z'],
                ['Find',        'Ctrl + F'],
              ].map(([action, shortcut]) => (
                <div key={action} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: 13, color: '#374151' }}>{action}</span>
                  <kbd style={{ fontSize: 11, padding: '3px 8px', borderRadius: 5, background: '#f3f4f6', border: '1px solid #e5e7eb', color: '#6b7280', fontFamily: 'monospace' }}>
                    {shortcut}
                  </kbd>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
