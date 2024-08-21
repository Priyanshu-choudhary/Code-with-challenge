import React from 'react'
import Dashboard from '../dashBoard/Dashboard'
import "/src/Document/Document.css";
import { List } from '@mui/material';
import Documentation from '/src/Document/Documentation.jsx';


function DocumentPage() {
  return (
    <div>
        <Dashboard/>
        <div className = "doc-page">
        <div  className = "doc-nav" >
        <ul>
          <h2>Content</h2>
          <li><a href="#introduction">Introduction</a></li>
          <li><a href="#getting-started">Getting Started</a></li>
          <li><a href="#courses-section">Courses Section</a></li>
          <li><a href="#online-editor">Online Code Editor</a></li>
          <li><a href="#dashboard">Personalized Dashboard</a></li>
          <li><a href="#contests-section">Contests Section</a></li>
          <li><a href="#user-interaction">User Interaction</a></li>
          <li><a href="#contribution-guide">Contribution Guide</a></li>
          <li><a href="#api-documentation">API Documentation</a></li>
          <li><a href="#deployment-guide">Deployment Guide</a></li>
          <li><a href="#faq">FAQ/Troubleshooting</a></li>
          <li><a href="#appendices">Appendices</a></li>
          <li><a href="#version-control">Version Control</a></li>
        </ul>
            This is the Nav
        </div>
        <div className = "doc-body">
          <Documentation/>



        </div>
        </div>
    </div>
  )
}

export default DocumentPage
