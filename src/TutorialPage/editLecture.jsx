import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import axios from 'axios';
import Dashboard from '../dashBoard/Dashboard';
import { useParams } from 'react-router-dom';

export default function EditLecture() {
  const { id } = useParams(); // Assuming the lecture ID is passed as a route parameter
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    sections: [
      { id: '', heading: '', content: '' },
    ],
  });
  const [alert, setAlert] = useState({ show: false, message: '', severity: '' });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch existing lecture data to populate the form
    const fetchLectureData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`https://hytechlabs.online:9090/Lecture/id/${id}`, {
          headers: { 'Content-Type': 'application/json' },
          auth: {
            username: 'testleacture', // Replace with your actual username
            password: 'testleacture'  // Replace with your actual password
          }
        });
        setFormData(response.data); // Assuming the data format matches the form structure
      } catch (error) {
        console.error('Error fetching lecture:', error);
        setAlert({ show: true, message: `Failed to fetch lecture data`, severity: 'error' });
      } finally {
        setLoading(false);
      }
    };

    fetchLectureData();
  }, [id]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSectionChange = (index, e) => {
    const { id, value } = e.target;
    const newSections = formData.sections.map((section, i) => 
      i === index ? { ...section, [id]: value } : section
    );
    setFormData({ ...formData, sections: newSections });
  };

  const handleAddSection = () => {
    setFormData((prevData) => ({
      ...prevData,
      sections: [...prevData.sections, { id: '', heading: '', content: '' }],
    }));
  };

  const handleSubmit = async () => {
    setLoading(true);

    try {
      const response = await axios.put(
        `https://hytechlabs.online:9090/Lecture/id/${id}`,
        formData,
        {
          headers: { 'Content-Type': 'application/json' },
          auth: {
            username: 'testleacture', // Replace with your actual username
            password: 'testleacture'  // Replace with your actual password
          }
        }
      );

      console.log('Response:', response.data);
      setAlert({ show: true, message: `Lecture updated successfully!`, severity: 'success' });
    } catch (error) {
      console.error('Error updating lecture:', error);
      setAlert({ show: true, message: `Failed to update lecture`, severity: 'error' });
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
        />

        <TextField
          id="subtitle"
          label="Lecture Subtitle"
          fullWidth
          value={formData.subtitle}
          onChange={handleChange}
          margin="normal"
        />

        {formData.sections.map((section, index) => (
          <div key={index}>
            <TextField
              id="id"
              label={`Section ID ${index + 1}`}
              fullWidth
              value={section.id}
              onChange={(e) => handleSectionChange(index, e)}
              margin="normal"
            />
            <TextField
              id="heading"
              label={`Section Heading ${index + 1}`}
              fullWidth
              value={section.heading}
              onChange={(e) => handleSectionChange(index, e)}
              margin="normal"
            />
            <TextField
              id="content"
              label={`Section Content ${index + 1}`}
              fullWidth
              value={section.content}
              onChange={(e) => handleSectionChange(index, e)}
              margin="normal"
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
          {loading ? <CircularProgress size={24} /> : 'Update Lecture'}
        </Button>
      </Box>
    </>
  );
}
