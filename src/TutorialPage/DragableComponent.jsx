import React, { useState } from 'react';
import { Rnd } from 'react-rnd';

export default function DraggableResizableText() {
  const [isVisible, setIsVisible] = useState(true);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <>
      <button
        onClick={toggleVisibility}
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          zIndex: 10000,
          padding: '10px 20px',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
      >
        {isVisible ? 'Hide Text' : 'Show Text'}
      </button>

      {isVisible && (
        <Rnd
          default={{
            x: 500,
            y: 100,
            width: 320,
            height: 200,
          }}
          bounds="window"
          style={{
            backgroundColor: 'white',
            border: '1px solid #ccc',
            padding: '10px',
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
          }}
        >
          <div style={{ fontSize: '16px', fontFamily: 'Arial' }}>
            This is a draggable and resizable text component.
          </div>
        </Rnd>
      )}
    </>
  );
}
