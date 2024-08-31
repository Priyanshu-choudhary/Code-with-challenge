import React, { useState } from 'react';
import { Button, TextField, Box, Typography, IconButton } from '@mui/material';
import { Add, Remove } from '@mui/icons-material';

const NestedForm = () => {
  const [data, setdata] = useState('')
  const [formData, setFormData] = useState({
    name: '',
    children: [
      {
        name: '',
       children:[
        {
          name: '', 
          link: '',
          status: '', 
          problem: [{
            id: '',
            title: '',
            description: '',
            difficulty: '',
            videoUrl: '',
            lastModified: '',
            avgtime: '',
            timecomplixity: '',
            constrain: '',
            answer:[],
            type:'',
            sequence:'',
            input:'',
            optionA:'',
            optionB:'',
            optionC:'',
            optionD:'',
            tags:[],
            solution: {}, // Object to store solution code for different languages
            codeTemplates: {}, // Object to store code templates for different languages
          },
          ],
        }
       ]
      },
    ],
  });

  const handleChange = (event, index, key, language = null) => {
    const { name, value } = event.target;
    const newChildren = [...formData.children];
    if (language) {
      newChildren[index].solution[language][key] = value;
    } else {
      newChildren[index][key] = value;
    }
    setFormData({ ...formData, children: newChildren });
  };

  const addChild = () => {
    setFormData({
      ...formData,
      children: [
        ...formData.children,
        {
          id: '',
          title: '',
          description: '',
          example: '',
          difficulty: '',
          solution: {
            java: { solution: '' },
            python: { solution: '' },
            cpp: { solution: '' },
          },
        },
      ],
    });
  };

  const removeChild = (index) => {
    const newChildren = [...formData.children];
    newChildren.splice(index, 1);
    setFormData({ ...formData, children: newChildren });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Generated JSON:', JSON.stringify(formData, null, 2));
    setdata(JSON.stringify(formData, null, 2));
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ padding: 2 }}>
      <Typography variant="h5" gutterBottom>
        Nested Form Example
      </Typography>
      <TextField
        fullWidth
        label="Problem Name"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        margin="normal"
      />
      {formData.children.map((child, index) => (
        <Box key={index} sx={{ marginBottom: 2 }}>
          <TextField
            fullWidth
            label="Problem ID"
            value={child.id}
            onChange={(e) => handleChange(e, index, 'id')}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Title"
            value={child.title}
            onChange={(e) => handleChange(e, index, 'title')}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Description"
            value={child.description}
            onChange={(e) => handleChange(e, index, 'description')}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Example"
            value={child.example}
            onChange={(e) => handleChange(e, index, 'example')}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Difficulty"
            value={child.difficulty}
            onChange={(e) => handleChange(e, index, 'difficulty')}
            margin="normal"
          />
          <Typography variant="subtitle1" gutterBottom>
            Solutions:
          </Typography>
          <TextField
            fullWidth
            label="Java Solution"
            value={child.solution.java.solution}
            onChange={(e) => handleChange(e, index, 'solution', 'java')}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Python Solution"
            value={child.solution.python.solution}
            onChange={(e) => handleChange(e, index, 'solution', 'python')}
            margin="normal"
          />
          <TextField
            fullWidth
            label="C++ Solution"
            value={child.solution.cpp.solution}
            onChange={(e) => handleChange(e, index, 'solution', 'cpp')}
            margin="normal"
          />
          <IconButton
            aria-label="remove problem"
            onClick={() => removeChild(index)}
            disabled={formData.children.length === 1}
          >
            <Remove />
          </IconButton>
        </Box>
      ))}
      <Button
        variant="outlined"
        color="primary"
        onClick={addChild}
        startIcon={<Add />}
        sx={{ marginBottom: 2 }}
      >
        Add Problem
      </Button>
      <Button type="submit" variant="contained" color="primary">
        Submit
      </Button>
      <pre>{data}</pre>
    </Box>
  );
};

export default NestedForm;
