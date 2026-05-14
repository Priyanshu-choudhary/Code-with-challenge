import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Dashboard from '../dashBoard/Dashboard';
import TutorialsLinks from './TutorialsLinks';
import Footer2 from '../home/Footer2';
import { UserContext } from '../Context/UserContext';

export default function TutorialMain() {
  const navigate = useNavigate();
  const { role } = useContext(UserContext);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#f9fafb' }}>
      <Dashboard />

      {/* Page hero */}
      <div style={{ background: '#fff', borderBottom: '1px solid #e5e7eb', padding: '40px 24px 36px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 20 }}>
          <div>
            <div style={{ display: 'inline-block', background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: 999, padding: '3px 12px', fontSize: 12, fontWeight: 500, color: '#2563eb', marginBottom: 12 }}>
              Free learning resources
            </div>
            <h1 style={{ fontSize: 26, fontWeight: 700, color: '#111827', margin: '0 0 8px', letterSpacing: '-0.5px' }}>
              Learn with CFC
            </h1>
            <p style={{ fontSize: 15, color: '#6b7280', margin: '0 0 20px', maxWidth: 520, lineHeight: 1.6 }}>
              From absolute beginner to advanced — structured tutorials and articles for every stage of your coding journey.
            </p>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              <button
                onClick={() => navigate('/ProblemSet')}
                style={{ padding: '9px 20px', borderRadius: 8, fontSize: 14, fontWeight: 600, color: '#fff', background: '#2563eb', border: 'none', cursor: 'pointer' }}
              >
                Practice problems
              </button>
              {role === 'ADMIN' && (
                <button
                  onClick={() => navigate('/LectureForm', { state: { uploadUrl: 'OfficialCources' } })}
                  style={{ padding: '9px 20px', borderRadius: 8, fontSize: 14, fontWeight: 500, color: '#374151', background: '#fff', border: '1px solid #e5e7eb', cursor: 'pointer' }}
                >
                  + Create tutorial
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Category grid */}
      <div style={{ flex: 1, maxWidth: 1100, margin: '0 auto', width: '100%', padding: '28px 24px', boxSizing: 'border-box' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
          <h2 style={{ fontSize: 16, fontWeight: 600, color: '#111827', margin: 0 }}>Browse topics</h2>
        </div>
        <TutorialsLinks />
      </div>

      <Footer2 />
    </div>
  );
}
