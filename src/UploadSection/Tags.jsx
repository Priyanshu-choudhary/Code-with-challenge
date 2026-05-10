import React, { useState, useEffect } from "react";
import { Checkbox, FormControl, FormGroup, FormControlLabel, FormLabel } from "@mui/material";

const Tags = ({ setSelectedCompaniesTags, setSelectTags }) => {
  const tags = [
    "Basic", "String", "Arrays", "Linked Lists", "Stacks", "Queues", 
    "Hash Tables", "Trees", "Graphs", "Heaps", "Sorting Algorithms", 
    "Searching Algorithms", "Dynamic Programming", "Greedy Algorithms", 
    "Recursion", "Backtracking", "Divide and Conquer", "Bit Manipulation", 
    "Trie", "Graph Algorithms", "Number Theory", "Geometry", "Network Flow", 
    "Segment Trees", "Fenwick Trees", "Matrix Operations", "Randomized Algorithms", 
    "Approximation Algorithms", "Computational Geometry", "String Matching", 
    "Game Theory", "Parallel Algorithms", "Computational Complexity", 
    "Advanced Data Structures", "Amortized Analysis", "Suffix Arrays", 
    "Interval Trees", "B-Trees", "Suffix Trees", "Dynamic Connectivity", 
    "Flow Networks", "K-Nearest Neighbors", "PageRank", "String Algorithms", 
    "Data Compression", "Cryptography", "Numerical Methods", "Monte Carlo Methods", 
    "Machine Learning Algorithms", "Artificial Intelligence"
  ];
  
  const companies = [
    "Google", "Amazon", "Microsoft", "Apple", "Facebook", "IBM", "Intel", 
    "Oracle", "Netflix", "Adobe", "Salesforce", "Alibaba", "Tencent", 
    "SAP", "Spotify", "Twitter", "Uber", "LinkedIn", "PayPal", "Snapchat", 
    "Zoom", "Stripe", "Slack", "Dropbox", "Reddit", "Square", "GitHub", 
    "Twitch", "Shopify", "NVIDIA", "Samsung"
  ];

  // States to keep track of selected tags and companies as arrays
  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedCompanies, setSelectedCompanies] = useState([]);

  // Handler to toggle checkbox for tags
  const handleTagChange = (event) => {
    const { name, checked } = event.target;
    if (checked) {
      // Add tag if checked
      setSelectedTags([...selectedTags, name]);
    } else {
      // Remove tag if unchecked
      setSelectedTags(selectedTags.filter((tag) => tag !== name));
    }
  };

  // Handler to toggle checkbox for companies
  const handleCompanyChange = (event) => {
    const { name, checked } = event.target;
    if (checked) {
      // Add company if checked
      setSelectedCompanies([...selectedCompanies, name]);
    } else {
      // Remove company if unchecked
      setSelectedCompanies(selectedCompanies.filter((company) => company !== name));
    }
  };

  // Update parent components with selected tags and companies
  useEffect(() => {
    setSelectedCompaniesTags(selectedCompanies);
    setSelectTags(selectedTags);
  }, [selectedTags, selectedCompanies, setSelectedCompaniesTags, setSelectTags]);

  return (
    <div style={{ display: "flex", justifyContent: "space-around" }}>
      {/* Tags Section */}
      <div>
        <FormControl component="fieldset" variant="standard" style={{ marginBottom: "20px" }}>
          <FormLabel className="p-3" component="legend">
            <p className="font-bold">Select Tags</p>
          </FormLabel>
          <FormGroup>
            {tags.map((tag) => (
              <FormControlLabel
                className="pl-6"
                key={tag}
                control={
                  <Checkbox
                    checked={selectedTags.includes(tag)}
                    onChange={handleTagChange}
                    name={tag}
                    size="sm"
                  />
                }
                label={tag}
              />
            ))}
          </FormGroup>
        </FormControl>

        {/* Companies Section */}
        <FormControl className="p-3" component="fieldset" variant="standard">
          <FormLabel component="legend">
            <p className="font-bold pb-3">Select Companies</p>
          </FormLabel>
          <FormGroup>
            {companies.map((company) => (
              <FormControlLabel
                className="pl-6"
                key={company}
                control={
                  <Checkbox
                    checked={selectedCompanies.includes(company)}
                    onChange={handleCompanyChange}
                    name={company}
                    size="sm"
                  />
                }
                label={company}
              />
            ))}
          </FormGroup>
        </FormControl>
      </div>
    </div>
  );
};

export default Tags;

