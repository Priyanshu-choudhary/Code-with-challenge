import React from 'react';

// Define content for each section
const sectionContent = {
  'introduction': (
    <>
      <h2>1. Introduction</h2>
      <h3>Overview</h3>
      <p>
        Welcome to Code For Challenge, a platform designed for aspiring programmers to learn, practice, and compete.
        Key features include programming courses with MCQs and coding questions, a multi-language online editor,
        personalized progress tracking, and hackathons.
      </p>
      <img src="./DocNAv.png" alt="Features" />
      <h3>Purpose</h3>
      <p>
        This documentation aims to guide users, contributors, and developers through the features and functionalities of the website.
      </p>
    </>
  ),
  'getting-started': (
    <>
      <h2>2. Getting Started</h2>
      <h3>Account Creation</h3>
      <p>Steps to create an account and set up your profile.</p>
      <h3>Navigating the Website</h3>
      <p>Overview of the main sections: Courses, Online Editor, Dashboard, and Contests.</p>
      <h3>System Requirements</h3>
      <p>Browser compatibility and internet connection requirements.</p>
    </>
  ),
  'courses-section': (
    <>
      <h2>3. Courses Section</h2>
      <p>Description of the available courses, covering various programming languages and concepts.</p>
      <h3>MCQs and Coding Questions</h3>
      <p>Explanation of the structure of courses, with a mix of multiple-choice questions and coding challenges.</p>
      <h3>Course Progress</h3>
      <p>How progress is tracked, completion criteria, and earning badges or certificates.</p>
    </>
  ),
  'online-editor': (
    <>
      <h2>4. Online Code Editor</h2>
      <h3>Supported Languages</h3>
      <p>List of programming languages supported by the online editor.</p>
      <h3>How to Use the Editor</h3>
      <p>Instructions for writing, running, and debugging code within the editor.</p>
      <h3>Features</h3>
      <p>Syntax highlighting, auto-completion, error detection, and version control integration.</p>
      <h3>Running Code</h3>
      <p>How to execute code snippets and view output in real-time.</p>
      <h3>Saving and Sharing</h3>
      <p>Options for saving code and sharing it with peers or mentors.</p>
    </>
  ),
  'dashboard': (
    <>
      <h2>5. Personalized Dashboard</h2>
      <p>Personalized dashboard for tracking course progress, completed challenges, and upcoming tasks.</p>
      <h3>Progress Tracking</h3>
      <p>Detailed insights into your learning journey, including courses completed, ongoing tasks, and performance metrics.</p>
      <h3>Achievements and Badges</h3>
      <p>How achievements are unlocked and displayed on the dashboard.</p>
      <h3>Profile Customization</h3>
      <p>Customizing your dashboard and profile settings.</p>
    </>
  ),
  'contests-section': (
    <>
      <h2>6. Contests Section</h2>
      <h3>Overview</h3>
      <p>Information on various contests and hackathons hosted on the platform.</p>
      <h3>How to Participate</h3>
      <p>Steps to join a contest, submission guidelines, and rules.</p>
      <h3>Contest Formats</h3>
      <p>Different types of contests: individual, team-based, coding marathons, etc.</p>
      <h3>Leaderboard</h3>
      <p>How the leaderboard works, scoring criteria, and rewards.</p>
      <h3>Past Contests</h3>
      <p>Access to past contest problems and solutions for practice.</p>
    </>
  ),
  'user-interaction': (
    <>
      <h2>7. User Interaction</h2>
      <h3>Forums and Community</h3>
      <p>How to engage with the community, ask questions, and participate in discussions.</p>
      <h3>Mentorship Program</h3>
      <p>Information on how to connect with mentors for guidance and support.</p>
      <h3>Feedback and Support</h3>
      <p>How to report issues, provide feedback, or contact support.</p>
    </>
  ),
  'contribution-guide': (
    <>
      <h2>8. Contribution Guide</h2>
      <h3>For Developers</h3>
      <p>How to contribute to the development of the platform, including coding standards and Git workflow.</p>
      <h3>For Content Creators</h3>
      <p>Guidelines for submitting new courses, questions, or challenges.</p>
      <h3>Code of Conduct</h3>
      <p>Community guidelines and expectations for all users.</p>
    </>
  ),
  'api-documentation': (
    <>
      <h2>9. API Documentation</h2>
      <h3>Overview</h3>
      <p>API endpoints for interacting with the platform programmatically.</p>
      <h3>Authentication</h3>
      <p>How to authenticate API requests using tokens or API keys.</p>
      <h3>Endpoints</h3>
      <p>Detailed documentation of available endpoints for courses, contests, user profiles, etc.</p>
      <h3>Examples</h3>
      <p>Sample API requests and responses.</p>
    </>
  ),
  'deployment-guide': (
    <>
      <h2>10. Deployment Guide</h2>
      <h3>Environment Setup</h3>
      <p>Steps to set up the development and production environments.</p>
      <h3>Deployment Steps</h3>
      <p>How to deploy the application to a server or cloud platform.</p>
      <h3>Monitoring and Maintenance</h3>
      <p>Monitoring tools and maintenance practices for ensuring platform stability.</p>
    </>
  ),
  'faq': (
    <>
      <h2>11. FAQ/Troubleshooting</h2>
      <h3>Frequently Asked Questions</h3>
      <p>Answers to common questions about the platform.</p>
      <h3>Troubleshooting</h3>
      <p>Common issues and their solutions.</p>
    </>
  ),
  'appendices': (
    <>
      <h2>12. Appendices</h2>
      <h3>Glossary</h3>
      <p>Definitions of common terms and jargon used on the platform.</p>
      <h3>Additional Resources</h3>
      <p>Links to external resources, books, or tutorials.</p>
    </>
  ),
  'version-control': (
    <>
      <h2>13. Version Control</h2>
      <p>Information on how the documentation is versioned alongside the platform updates.</p>
    </>
  ),
};

export default sectionContent;
