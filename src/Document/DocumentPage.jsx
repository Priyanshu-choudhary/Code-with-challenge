import React, { useState } from 'react';
import Dashboard from '../dashBoard/Dashboard';
import "/src/Document/Document.css";
import Documentation from '/src/Document/Documentation.jsx';

function DocumentPage() {
  const [currentSection, setCurrentSection] = useState('introduction');

  const handleSectionChange = (sectionId) => {
    console.log('Changing section to:', sectionId); // Debugging
    setCurrentSection(sectionId);
  };

  return (
    <div>
      <Dashboard />
      <div className="doc-page">
        <div className="doc-nav">
          <ul className='mt-1'>
            <h2>Content</h2>
            <li className='mt-2 hover:bg-sky-100 rounded-sm'><a href="#introduction" onClick={() => handleSectionChange('introduction')}>Introduction</a></li>
            <li className='mt-2 hover:bg-sky-100 rounded-sm'><a href="#getting-started" onClick={() => handleSectionChange('getting-started')}>Getting Started</a></li>
            <li className='mt-2 hover:bg-sky-100 rounded-sm'><a href="#courses-section" onClick={() => handleSectionChange('courses-section')}>Courses Section</a></li>
            <li className='mt-2 hover:bg-sky-100 rounded-sm'><a href="#online-editor" onClick={() => handleSectionChange('online-editor')}>Online Code Editor</a></li>
            <li className='mt-2 hover:bg-sky-100 rounded-sm'><a href="#dashboard" onClick={() => handleSectionChange('dashboard')}>Personalized Dashboard</a></li>
            <li className='mt-2 hover:bg-sky-100 rounded-sm'><a href="#contests-section" onClick={() => handleSectionChange('contests-section')}>Contests Section</a></li>
            <li className='mt-2 hover:bg-sky-100 rounded-sm'><a href="#user-interaction" onClick={() => handleSectionChange('user-interaction')}>User Interaction</a></li>
            <li className='mt-2 hover:bg-sky-100 rounded-sm'><a href="#contribution-guide" onClick={() => handleSectionChange('contribution-guide')}>Contribution Guide</a></li>
            <li className='mt-2 hover:bg-sky-100 rounded-sm'><a href="#api-documentation" onClick={() => handleSectionChange('api-documentation')}>API Documentation</a></li>
            <li className='mt-2 hover:bg-sky-100 rounded-sm'><a href="#deployment-guide" onClick={() => handleSectionChange('deployment-guide')}>Deployment Guide</a></li>
            <li className='mt-2 hover:bg-sky-100 rounded-sm'><a href="#faq" onClick={() => handleSectionChange('faq')}>FAQ/Troubleshooting</a></li>
            <li className='mt-2 hover:bg-sky-100 rounded-sm'><a href="#appendices" onClick={() => handleSectionChange('appendices')}>Appendices</a></li>
            <li className='mt-2 hover:bg-sky-100 rounded-sm'><a href="#version-control" onClick={() => handleSectionChange('version-control')}>Version Control</a></li>
            {/* Add more links as needed */}
          </ul>
        </div>
        <div className="doc-body">
          <Documentation
            currentSection={currentSection}
            onSectionChange={handleSectionChange}
          />
        </div>
      </div>
    </div>
  );
}

export default DocumentPage;
