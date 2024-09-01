import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import axios from 'axios';
import Dashboard from '../dashBoard/Dashboard';
import Tinymce from '../TinyMCE/TinyMCE'; // Importing your TinyMCE component

export default function LectureForm() {
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    sections: [
      { id: '1', heading: '', content: '' },
    ],
  });

  const [alert, setAlert] = useState({ show: false, message: '', severity: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSectionChange = (index, field, value) => {
    const newSections = formData.sections.map((section, i) => 
      i === index ? { ...section, [field]: value } : section
    );
    setFormData({ ...formData, sections: newSections });
  };

  const handleAddSection = () => {
    setFormData((prevData) => ({
      ...prevData,
      sections: [
        ...prevData.sections, 
        { id: (prevData.sections.length + 1).toString(), heading: '', content: '' }
      ],
    }));
  };

  const handleSubmit = async () => {
    setLoading(true);

    try {
      const response = await axios.post(
        'https://hytechlabs.online:9090/Lecture',
        formData,
        {
          headers: { 'Content-Type': 'application/json' },
          auth: {
            username: 'testleacture', 
            password: 'testleacture'  
          }
        }
      );

      console.log('Response:', response.data);
      setAlert({ show: true, message: `Lecture uploaded successfully!`, severity: 'success' });
    } catch (error) {
      console.error('Error:', error);
      setAlert({ show: true, message: `Failed to upload lecture`, severity: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Dashboard />
      <Box className="lecture-form-container">
        {alert.show && <Alert severity={alert.severity}>{alert.message}</Alert>}

        <TextField
          id="title"
          label="Lecture Title"
          fullWidth
          value={formData.title}
          onChange={handleChange}
          margin="normal"
          multiline
          rows={2} // Specify the number of rows for the title
        />

        <TextField
          id="subtitle"
          label="Lecture Subtitle"
          fullWidth
          value={formData.subtitle}
          onChange={handleChange}
          margin="normal"
          multiline
          rows={2} // Specify the number of rows for the subtitle
        />

        {formData.sections.map((section, index) => (
          <div key={index}>
            <TextField
              id="id"
              label={`Section ID ${index + 1}`}
              fullWidth
              value={section.id}
              disabled // Disable input to ensure the ID is auto-generated and cannot be changed
              margin="normal"
              multiline
              rows={1} // Specify the number of rows for the section ID
            />
            <TextField
              id="heading"
              label={`Section Heading ${index + 1}`}
              fullWidth
              value={section.heading}
              onChange={(e) => handleSectionChange(index, 'heading', e.target.value)}
              margin="normal"
              multiline
              rows={2} // Specify the number of rows for the section heading
            />
            <Tinymce
              initialValue={section.content}
              setDescription={(value) => handleSectionChange(index, 'content', value)}
            />
          </div>
        ))}

        <Button variant="contained" color="primary" onClick={handleAddSection}>
          Add Section
        </Button>

        <Button
          style={{ width: "100%", marginTop: "20px" }}
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} /> : 'Submit'}
        </Button>
      </Box>
    </>
  );
}
