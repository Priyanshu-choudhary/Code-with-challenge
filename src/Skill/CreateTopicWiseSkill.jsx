import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';
import Dashboard from '../dashBoard/Dashboard';

const CreateTopicSkillForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    children: [],
    problem: [],
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const createTopicSkill = async (topicSkillData) => {
    try {
      const user = 'yourUsername'; // Replace with actual credentials or secure method
      const password = 'yourPassword';

      const basicAuth = 'Basic ' + btoa(`${user}:${password}`);

      console.log('TopicSkill detail:', JSON.stringify(topicSkillData));

      const response = await fetch('https://hytechlabs.online:9090/TopicWiseSkills', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': basicAuth,
        },
        body: JSON.stringify(topicSkillData),
      });

      const contentType = response.headers.get('content-type');
      let data;

      if (contentType && contentType.includes('application/json')) {
        data = await response.json();
      } else {
        const text = await response.text();
        console.error('Unexpected response format:', text);
        throw new Error('Failed to create topic skill: Unexpected response format');
      }

      if (!response.ok) {
        throw new Error('Failed to create topic skill');
      }

      console.log('Topic skill created:', data);
      return data;
    } catch (error) {
      console.error('Error creating topic skill:', error);
      throw error;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const createdTopicSkill = await createTopicSkill(formData);
      console.log('Created topic skill:', createdTopicSkill);
    } catch (error) {
      console.error('Failed to create topic skill:', error);
    }
  };

  return (
    <div >
        <Dashboard/>
    <Box className='mt-5' component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2, margin: 'auto' }}>
      <TextField
        label="Topic Skill Name"
        variant="outlined"
        name="name"
        value={formData.name}
        onChange={handleInputChange}
        required
      />
      
      <TextField
        label="Children"
        variant="outlined"
        name="children"
        value={formData.children}
        onChange={handleInputChange}
      />

      <TextField
        label="Problem"
        variant="outlined"
        name="problem"
        value={formData.problem}
        onChange={handleInputChange}
      />

      <Button type="submit" variant="contained" color="primary">
        Create Topic Skill
      </Button>
    </Box>
    </div>
  );
};

export default CreateTopicSkillForm;
