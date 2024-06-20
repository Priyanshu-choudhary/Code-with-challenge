import * as React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import axios from 'axios';
import './EditorComponent.css';
import Dashboard from '../dashBoard/Dashboard';

export default function CourseForm({ uploadUrl }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    totalQuestions: '',
    posts:'',
  });

  const [alert, setAlert] = useState({ show: false, message: '', severity: '' });
  const [permission, setPermission] = useState(''); // State to manage radio button value
  const [loading, setLoading] = useState(false); // State to manage loading status

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };
  const handlePermissionChange = (e) => {
    setPermission(e.target.value);
  };

  const handleSubmit = async () => {
    setLoading(true); // Set loading to true when the form is submitted

    const postData = {
      title: formData.title,
      description: formData.description,
      totalQuestions: formData.totalQuestions,
      permission: permission,
    };

    console.log('Form data to be sent:', JSON.stringify(postData));

    try {
      const response = await axios.post(
        'http://localhost:9090/Course',
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
      setLoading(false); // Set loading to false after the API call is complete
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
        <div style={{display:"flex",justifyContent:"center"}}>
          <label>
            <input
              type="radio"
              value="public"
              checked={permission === 'public'}
              onChange={handlePermissionChange}
            />
            Public
          </label>
          <label>
            <input
              type="radio"
              value="private"
              checked={permission === 'private'}
              onChange={handlePermissionChange}
            />
            Private
          </label>
        </div>
        <Button
          style={{width:"100%"}}
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          className="submit-button"
          disabled={loading} // Disable the button when loading
        >
          {loading ? <CircularProgress size={24} /> : 'Submit'} {/* Show spinner when loading */}
        </Button>
      </Box>
    </>
  );
}
