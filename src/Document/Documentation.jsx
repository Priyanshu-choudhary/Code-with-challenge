import React, { useEffect } from 'react';
import "/src/Document/Documentation.css";
import sectionContent from './sectionContent'; // Adjust the path as needed

const Documentation = ({ currentSection, onSectionChange }) => {
  const sections = [
    'introduction',
    'getting-started',
    'courses-section',
    'online-editor',
    'dashboard',
    'contests-section',
    'user-interaction',
    'contribution-guide',
    'api-documentation',
    'deployment-guide',
    'faq',
    'appendices',
    'version-control'
  ];

  const handleNext = () => {
    const currentIndex = sections.indexOf(currentSection);
    if (currentIndex < sections.length - 1) {
      onSectionChange(sections[currentIndex + 1]);
    }
  };

  const handlePrevious = () => {
    const currentIndex = sections.indexOf(currentSection);
    if (currentIndex > 0) {
      onSectionChange(sections[currentIndex - 1]);
    }
  };

  useEffect(() => {
    const element = document.getElementById(currentSection);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }, [currentSection]);

  return (
    <div className="documentation ">
      {sectionContent[currentSection]}
      <div className="doc-navigation-buttons">
        <button onClick={handlePrevious} disabled={sections.indexOf(currentSection) === 0}>
          Previous
        </button>
        <button onClick={handleNext} disabled={sections.indexOf(currentSection) === sections.length - 1}>
          Next
        </button>
      </div>
    </div>
  );
};

export default Documentation;
