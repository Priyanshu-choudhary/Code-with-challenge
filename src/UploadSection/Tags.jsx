import React, { useState, useEffect } from 'react';
import Checkbox from '@mui/material/Checkbox';

// List of items to be displayed as tags with checkboxes
const items = ['DSA', 'Basic', 'Hard', 'Medium', 'Easy', 'Array', 'String', 'Shorting', 'Yadi', 'Best75', 'Beginners', 'HashMap', 'HashTable', 'Backtracking', 'TwoPointer', 'Greedy', 'Matrix'];

export default function Tags({ onTagsChange }) {
  // State to track selected items
  const [selectedItems, setSelectedItems] = useState([]);

  // Handle checkbox changes
  const handleCheckboxChange = (item) => {
    setSelectedItems((prevSelectedItems) => {
      if (prevSelectedItems.includes(item)) {
        // Remove the item if it's already selected
        return prevSelectedItems.filter((selectedItem) => selectedItem !== item);
      } else {
        // Add the item if it's not selected
        return [...prevSelectedItems, item];
      }
    });
  };

  // Effect to call onTagsChange when selectedItems changes
  useEffect(() => {
    const tags = selectedItems.map(item => item.toLowerCase());
    if (onTagsChange) {
      onTagsChange(tags);
    }
  }, [selectedItems, onTagsChange]); // Dependency array includes selectedItems and onTagsChange

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
