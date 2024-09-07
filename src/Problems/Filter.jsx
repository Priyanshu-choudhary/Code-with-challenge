import React, { useState } from 'react';
import { Checkbox, FormControlLabel, FormGroup, Collapse } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

function Filter() {
  // Arrays for categories
  const Topics = [
    "Arrays",
    "Linked Lists",
    "Stacks",
    "Queues",
    "Hash Tables",
    "Trees",
    "Graphs",
    "Heaps",
    "Sorting Algorithms",
    "Searching Algorithms",
    "Dynamic Programming",
    "Greedy Algorithms",
    "Recursion",
    "Backtracking",
    "Divide and Conquer"
];
const Companies = [
    "Google",
    "Amazon",
    "Microsoft",
    "Apple",
    "Facebook",
    "IBM",
    "Intel",
    "Oracle",
    "Netflix",
    "Adobe",
    "Salesforce",
    "Alibaba",
    "Tencent",
    "SAP",
    "Spotify"
];

  const Difficulty = ["Hard", "Medium", "Easy"];
  const Status = ["Attempt", "UnAttempt", "Done"];

  // State for storing selected filters
  const [selectedFilters, setSelectedFilters] = useState({
    topics: [],
    companies: [],
    difficulty: [],
    status: []
  });
console.log(selectedFilters);

  // State for toggling categories
  const [openCategories, setOpenCategories] = useState({
    topics: false,
    companies: false,
    difficulty: false,
    status: false
  });

  // Function to handle category open/close
  const handleCategoryToggle = (category) => {
    setOpenCategories(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  // Function to handle checkbox change
  const handleCheckboxChange = (category, value) => {
    setSelectedFilters(prev => {
      const categoryFilters = prev[category];
      const newFilters = categoryFilters.includes(value)
        ? categoryFilters.filter(item => item !== value)
        : [...categoryFilters, value];

      return {
        ...prev,
        [category]: newFilters
      };
    });
  };

  return (
    <div className='min-w-64'>
      <div className='m-1 mt-4 mb-4 border-1 border-gray-600 rounded-2xl'>
        <p className='rounded-t-2xl py-2 w-full text-center font-bold text-gray-500 bg-blue-50 hover:bg-gray-100'>
          Filters
        </p>

        {/* Topics Section */}
        <div>
          <p
            onClick={() => handleCategoryToggle('topics')}
            style={{ justifyContent: "space-between", cursor: "pointer" }}
            className='flex pl-3 py-2 w-full hover:bg-gray-100'
          >
            <span>Topics</span>
            {openCategories.topics ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </p>
          <hr />
          <Collapse in={openCategories.topics} className='ml-5 '>
            <FormGroup>
              {Topics.map(topic => (
                <FormControlLabel
                  key={topic}
                  control={
                    <Checkbox
                      checked={selectedFilters.topics.includes(topic)}
                      onChange={() => handleCheckboxChange('topics', topic)}
                      size='sm'
                    />
                  }
                  label={topic}
                />
              ))}
            </FormGroup>
          </Collapse>
        </div>

        {/* Companies Section */}
        <div>
          <p
            onClick={() => handleCategoryToggle('companies')}
            style={{ justifyContent: "space-between", cursor: "pointer" }}
            className='flex pl-3 py-2 w-full hover:bg-gray-100'
          >
            <span>Companies</span>
            {openCategories.companies ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </p>
          <hr />
          <Collapse in={openCategories.companies} className='ml-5 '>
            <FormGroup>
              {Companies.map(company => (
                <FormControlLabel
                  key={company}
                  control={
                    <Checkbox
                      checked={selectedFilters.companies.includes(company)}
                      onChange={() => handleCheckboxChange('companies', company)}
                      size='sm'
                    />
                  }
                  label={company}
                />
              ))}
            </FormGroup>
          </Collapse>
        </div>

        {/* Difficulty Section */}
        <div>
          <p
            onClick={() => handleCategoryToggle('difficulty')}
            style={{ justifyContent: "space-between", cursor: "pointer" }}
            className='flex pl-3 py-2 w-full hover:bg-gray-100'
          >
            <span>Difficulty</span>
            {openCategories.difficulty ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </p>
          <hr />
          <Collapse in={openCategories.difficulty} className='ml-5 '>
            <FormGroup>
              {Difficulty.map(level => (
                <FormControlLabel
                  key={level}
                  control={
                    <Checkbox
                      size='sm'
                      checked={selectedFilters.difficulty.includes(level)}
                      onChange={() => handleCheckboxChange('difficulty', level)}
                    />
                  }
                  label={level}
                />
              ))}
            </FormGroup>
          </Collapse>
        </div>

        {/* Status Section */}
        <div>
          <p
            onClick={() => handleCategoryToggle('status')}
            style={{ justifyContent: "space-between", cursor: "pointer" }}
            className='flex pl-3 py-2 w-full hover:bg-gray-100'
          >
            <span>Status</span>
            {openCategories.status ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </p>
          
          <Collapse in={openCategories.status} className='ml-5 '>
            <FormGroup>
              {Status.map(stat => (
                <FormControlLabel
                  key={stat}
                  control={
                    <Checkbox
                      size='sm'
                      checked={selectedFilters.status.includes(stat)}
                      onChange={() => handleCheckboxChange('status', stat)}
                    />
                  }
                  label={stat}
                />
              ))}
            </FormGroup>
          </Collapse>
        </div>
      </div>
    </div>
  );
}

export default Filter;
