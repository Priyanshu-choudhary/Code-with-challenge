import React, { useState, useEffect } from 'react';
import Checkbox from '@mui/material/Checkbox';

const items = ['DSA', 'Basic', 'Hard', 'Medium', 'Easy', 'Array', 'String','Shorting' ,'Yadi', 'Best75', 'Beginners','HashMap','HashTable','Backtracking','TwoPointer','Greedy','Matrix'];

export default function Tags({ onTagsChange }) {
  const [selectedItems, setSelectedItems] = useState([]);

  const handleCheckboxChange = (item) => {
    setSelectedItems((prevSelectedItems) => {
      if (prevSelectedItems.includes(item)) {
        return prevSelectedItems.filter((selectedItem) => selectedItem !== item);
      } else {
        return [...prevSelectedItems, item];
      }
    });
  };

  useEffect(() => {
    const tags = selectedItems.map(item => item.toLowerCase());
    if (onTagsChange) {
      onTagsChange(tags);
    }
  }, [selectedItems, onTagsChange]); // Include onTagsChange in the dependency array

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      {items.map((item, index) => (
        <div key={index} style={{ marginRight: '20px', marginBottom: '10px' }}>
          <Checkbox
            checked={selectedItems.includes(item)}
            onChange={() => handleCheckboxChange(item)}
            inputProps={{ 'aria-label': `${item} checkbox` }}
          />
          {item}
        </div>
      ))}
    </div>
  );
}
