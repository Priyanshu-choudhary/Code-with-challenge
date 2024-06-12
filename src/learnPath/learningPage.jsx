import React from 'react';
import Dashboard from '../dashBoard/Dashboard';
import ImgMediaCard from './cards';

function LearningPage() {
  // Create an array to represent the cards
  const basicCards = [
    { title: 'DSA', image: '/DSA.jpeg', description: 'This is a data structures and algorithms (DSA) course with a strong focus on passing coding interviews for software engineering jobs.', progress: 0 },
    { title: 'Web Development', image: '/R.jpeg', description: 'Learn the basics of web development, including HTML, CSS, and JavaScript.', progress: 50 },
  ];

  const intermediateCards = [
    { title: 'Advanced DSA', image: '/AdvanceDSA.png', description: 'Deep dive into advanced data structures and algorithms.', progress: 30 },
    { title: 'React', image: '/react.jpg', description: 'Learn how to build interactive user interfaces with React.', progress: 70 },
  ];

  return (
    <div style={{ maxHeight: "100vh", overflow: "scroll" }}>
      <Dashboard />
      <p style={{ fontSize: '40px', fontFamily: 'revert-layer', marginLeft: '50px', fontWeight: 'bold' }}>
        Learn Skills
      </p>
      <div style={{ borderWidth: '2px', margin: '20px', padding: "10px",backgroundColor:"#E8E8E8" }}>
        <p style={{ fontSize: '20px', fontFamily: 'revert-layer', fontWeight: 'bold', marginBottom: "20px" }}>
          Basic
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
          {basicCards.map((card, index) => (
            <div key={index} style={{ flex: '1 1 45%', minWidth: '300px' }}>
              <ImgMediaCard title={card.title} image={card.image} description={card.description} progress={card.progress} />
            </div>
          ))}
        </div>
      </div>

      <div style={{ borderWidth: '2px', margin: '20px', padding: "10px",backgroundColor:"#E8E8E8" }}>
        <p style={{ fontSize: '20px', fontFamily: 'revert-layer', fontWeight: 'bold', marginBottom: "20px" }}>
          Intermediate
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
          {intermediateCards.map((card, index) => (
            <div key={index} style={{ flex: '1 1 45%', minWidth: '300px' }}>
              <ImgMediaCard title={card.title} image={card.image} description={card.description} progress={card.progress} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default LearningPage;
