import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import axios from 'axios';
import './EditorComponent.css';
import Dashboard from '../dashBoard/Dashboard';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';

export default function CourseForm({ uploadUrl }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    totalQuestions: '',
  });

  const [alert, setAlert] = useState({ show: false, message: '', severity: '' });
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [permission, setPermission] = useState('');
  const [languages, setLanguages] = useState({
    java: false,
    python: false,
    c: false,
    cpp: false,
  });

  const handleChange = (e) => {
    const { id, value } = e.target;

    if (id === 'title' && value.includes('/')) {
      setAlert({ show: true, message: 'Title cannot contain / character', severity: 'error' });
      return;
    }

    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleImageUrlChange = (e) => {
    setImageUrl(e.target.value);
  };

  const handlePermissionChange = (e) => {
    setPermission(e.target.value);
  };

  const handleLanguageChange = (language) => {
    setLanguages((prevLanguages) => ({
      ...prevLanguages,
      [language]: !prevLanguages[language],
    }));
  };

  const handleSubmit = async () => {
    setLoading(true);

    const selectedLanguages = Object.keys(languages).filter((lang) => languages[lang]);

    const postData = {
      title: formData.title,
      description: formData.description,
      totalQuestions: formData.totalQuestions,
      permission: permission,
      image: imageUrl,
      language: selectedLanguages,
    };
// console.log(postData);
    try {
      const response = await axios.post(
        'https://hytechlabs.online:9090/Course',
        postData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
          auth: {
            username: uploadUrl,
            password: uploadUrl,
          },
        }
      );

      console.log('Response:', response.data);
      setAlert({ show: true, message: `Course uploaded successfully! to ${uploadUrl}`, severity: 'success' });
    } catch (error) {
      if (error.response) {
        console.error('Error response data:', error.response.data);
        console.error('Error response status:', error.response.status);
        console.error('Error response headers:', error.response.headers);
      } else if (error.request) {
        console.error('Error request data:', error.request);
      } else {
        console.error('Error message:', error.message);
      }

      setAlert({ show: true, message: `Failed to upload course to ${uploadUrl}`, severity: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Dashboard />
      <Box className="course-form-container">
        {alert.show && <Alert severity={alert.severity}>{alert.message}</Alert>}
        <TextField
          id="title"
          label="Course Title"
          fullWidth
          value={formData.title}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          id="description"
          label="Description"
          multiline
          rows={15}
          fullWidth
          value={formData.description}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          id="totalQuestions"
          label="Total Number of Questions"
          fullWidth
          value={formData.totalQuestions}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          id="imageUrl"
          label="Image URL"
          fullWidth
          value={imageUrl}
          onChange={handleImageUrlChange}
          margin="normal"
        />
        <div style={{padding:10, marginBottom: '15px', borderWidth: 2, borderRadius: 10 }}>
          {Object.keys(languages).map((lang) => (
          
           <FormControlLabel
              key={lang}
              control={<Checkbox checked={languages[lang]} onChange={() => handleLanguageChange(lang)} />}
              label={lang.charAt(0).toUpperCase() + lang.slice(1)} // Capitalize first letter
            />
          ))}
        </div>
        <div style={{ marginBottom: '15px', borderWidth: 2, borderRadius: 10 }}>
        <RadioGroup
            aria-label="permission"
            name="permission"
            value={permission}
            onChange={handlePermissionChange}
          >
            <div style={{ margin: 10 }}>
              <FormControlLabel value="public" control={<Radio />} label="Public" />
              <FormControlLabel value="private" control={<Radio />} label="Private" />
            </div>
          </RadioGroup>
        </div>
        <Button
          style={{ width: "100%" }}
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
