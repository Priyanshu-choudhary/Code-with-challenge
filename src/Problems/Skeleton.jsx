import React from 'react';
import './Skeleton.css'; // Import the CSS file for styles

const Skeleton = () => (
  <div className="skeleton-container">
    <div className='flex gap-10'>
    <div className="skeleton-header"></div>
    <div className="skeleton-text short"></div>
    <div className="skeleton-text short"></div>
    <div className="skeleton-text short"></div>
    </div>
    <div className="skeleton-button"></div>
  </div>
);

export default Skeleton;
