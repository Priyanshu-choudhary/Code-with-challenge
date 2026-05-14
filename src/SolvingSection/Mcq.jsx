import React, { useState, useEffect } from 'react';

export default function Mcq({ title, options, onOptionSelect, reset, problem }) {
  const [value, setValue] = useState('');

  const handleChange = (optionValue) => {
    setValue(optionValue);
  };

  useEffect(() => {
    onOptionSelect(value);
  }, [value]);

  useEffect(() => {
    if (reset) {
      setValue('');
    }
  }, [problem]);

  return (
    <div style={{ padding: '20px 0' }}>
      {title && (
        <p style={{ fontSize: 13, fontWeight: 600, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.05em', margin: '0 0 16px' }}>
          Choose one answer
        </p>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {options.filter((o) => o.label).map((option, index) => {
          const selected = value === option.value;
          return (
            <label
              key={index}
              onClick={() => handleChange(option.value)}
              style={{
                display: 'flex', alignItems: 'flex-start', gap: 12,
                padding: '12px 16px', borderRadius: 10, cursor: 'pointer',
                border: `1px solid ${selected ? '#2563eb' : '#e5e7eb'}`,
                background: selected ? '#eff6ff' : '#fff',
                transition: 'border-color 0.15s, background 0.15s',
              }}
              onMouseEnter={(e) => { if (!selected) { e.currentTarget.style.borderColor = '#bfdbfe'; e.currentTarget.style.background = '#f9fafb'; } }}
              onMouseLeave={(e) => { if (!selected) { e.currentTarget.style.borderColor = '#e5e7eb'; e.currentTarget.style.background = '#fff'; } }}
            >
              {/* Custom radio */}
              <div style={{
                width: 18, height: 18, borderRadius: '50%', flexShrink: 0, marginTop: 1,
                border: `2px solid ${selected ? '#2563eb' : '#d1d5db'}`,
                background: selected ? '#2563eb' : '#fff',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'all 0.15s',
              }}>
                {selected && (
                  <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#fff' }} />
                )}
              </div>

              {/* Option label */}
              <div>
                <span style={{ fontSize: 12, fontWeight: 600, color: '#9ca3af', marginRight: 6 }}>
                  {String.fromCharCode(65 + index)}.
                </span>
                <span style={{ fontSize: 14, color: selected ? '#1d4ed8' : '#374151', fontWeight: selected ? 500 : 400 }}>
                  {option.label}
                </span>
              </div>
            </label>
          );
        })}
      </div>
    </div>
  );
}
