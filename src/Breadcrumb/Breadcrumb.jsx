// src/components/Breadcrumb.js
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Breadcrumb.css'; // We'll add styles for breadcrumbs

const Breadcrumb = () => {
  const location = useLocation();
  const paths = location.pathname.split('/').filter(x => x);

  const breadcrumbs = paths.map((path, index) => {
    const url = `/${paths.slice(0, index + 1).join('/')}`;
    return (
      <span key={index}>
        <Link to={url}>{path}</Link>
        {index < paths.length - 1 && <span className="breadcrumb-separator">{' > '}</span>}
      </span>
    );
  });

  return (
    <nav className="breadcrumb-nav">
      <Link to="/">Home</Link>
      {paths.length > 0 && <span className="breadcrumb-separator">{' > '}</span>}
      {breadcrumbs}
    </nav>
  );
};

export default Breadcrumb;
