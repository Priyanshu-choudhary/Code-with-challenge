// ToggleButton.jsx
import React from 'react';

const ToggleButton2 = ({ onClick, isOpen }) => (
    <button onClick={onClick} style={{ marginRight: '10px' }}>
        {isOpen ? '-' : '+'}
    </button>
);

export default ToggleButton2;
