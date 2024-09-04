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
    author: '', // Added author field as per new structure
    headings: [
      { title: '', subHeadings: [{ title: '', content: '' }] },
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

  const handleHeadingChange = (index, field, value) => {
    const newHeadings = formData.headings.map((heading, i) => 
      i === index ? { ...heading, [field]: value } : heading
    );
    setFormData({ ...formData, headings: newHeadings });
  };

  const handleSubHeadingChange = (headingIndex, subHeadingIndex, field, value) => {
    const newSubHeadings = formData.headings[headingIndex].subHeadings.map((subHeading, i) => 
      i === subHeadingIndex ? { ...subHeading, [field]: value } : subHeading
    );

    const newHeadings = formData.headings.map((heading, i) => 
      i === headingIndex ? { ...heading, subHeadings: newSubHeadings } : heading
    );

    setFormData({ ...formData, headings: newHeadings });
  };

  const handleAddHeading = () => {
    setFormData((prevData) => ({
      ...prevData,
      headings: [
        ...prevData.headings, 
        { title: '', subHeadings: [{ title: '', content: '' }] },
      ],
    }));
  };

  const handleAddSubHeading = (headingIndex) => {
    const newHeadings = formData.headings.map((heading, i) => 
      i === headingIndex 
        ? { ...heading, subHeadings: [...heading.subHeadings, { title: '', content: '' }] }
        : heading
    );

    setFormData({ ...formData, headings: newHeadings });
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
          rows={2} 
        />

        <TextField
          id="author"
          label="Author"
          fullWidth
          value={formData.author}
          onChange={handleChange}
          margin="normal"
          multiline
          rows={2}
        />

        {formData.headings.map((heading, headingIndex) => (
          <div key={headingIndex}>
            <TextField
              id={`heading-${headingIndex}`}
              label={`Heading Title ${headingIndex + 1}`}
              fullWidth
              value={heading.title}
              onChange={(e) => handleHeadingChange(headingIndex, 'title', e.target.value)}
              margin="normal"
              multiline
              rows={2}
            />
            {heading.subHeadings.map((subHeading, subHeadingIndex) => (
              <div key={subHeadingIndex}>
                <TextField
                  id={`subHeading-title-${headingIndex}-${subHeadingIndex}`}
                  label={`Subheading Title ${subHeadingIndex + 1}`}
                  fullWidth
                  value={subHeading.title}
                  onChange={(e) => handleSubHeadingChange(headingIndex, subHeadingIndex, 'title', e.target.value)}
                  margin="normal"
                  multiline
                  rows={2}
                />
                <Tinymce
                  initialValue={subHeading.content}
                  setDescription={(value) => handleSubHeadingChange(headingIndex, subHeadingIndex, 'content', value)}
                />
              </div>
            ))}

            <Button 
              variant="outlined" 
              color="primary" 
              onClick={() => handleAddSubHeading(headingIndex)}
              style={{ marginTop: '10px', marginBottom: '20px' }}
            >
              Add Subheading
            </Button>
          </div>
        ))}

        <Button variant="outlined" color="primary" onClick={handleAddHeading}>
          Add Heading
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
