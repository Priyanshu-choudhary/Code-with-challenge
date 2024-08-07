import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import axios from 'axios';
import Dashboard from '../dashBoard/Dashboard';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Tinymce from '../TinyMCE/TinyMCE';
import CloudUploadIcon from '@mui/icons-material/CloudUpload'; // Example of using an icon

export default function CourseForm({ uploadUrl2 }) {
  const [uploadUrl, setuploadUrl] = useState("OfficialCources")
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    totalQuestions: '',
  });

  const [alert, setAlert] = useState({ show: false, message: '', severity: '' });
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [permission, setPermission] = useState('');
  const [imageDataUrl, setImageDataUrl] = useState(null);
  const [languages, setLanguages] = useState({
    java: false,
    python: false,
    c: false,
    cpp: false,
    javascript: false,
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

  const setDescription = (content) => {
    setFormData((prevData) => ({
      ...prevData,
      description: content,
    }));
  };

  useEffect(() => {
    setImageUrl(imageDataUrl);
  }, [imageDataUrl]);

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

    console.log(postData);
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

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageDataUrl(reader.result);
        // console.log(reader.result); // Log base64 string to the console
      };
      reader.readAsDataURL(file);
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
          id="totalQuestions"
          label="Total Number of Questions"
          fullWidth
          value={formData.totalQuestions}
          onChange={handleChange}
          margin="normal"
        />

        <p style={{ marginTop: 40, marginBottom: 10 }}>Add description:</p>
        <Tinymce setDescription={setDescription} />
        <br />
        <div style={{ padding: 5, marginBottom: '15px', borderWidth: 2, borderRadius: 10 }}>
          <p style={{ margin: 5, color: "#636161" }}>Select course languages:</p>
          {Object.keys(languages).map((lang) => (
            <FormControlLabel
              key={lang}
              control={<Checkbox checked={languages[lang]} onChange={() => handleLanguageChange(lang)} />}
              label={lang.charAt(0).toUpperCase() + lang.slice(1)} // Capitalize first letter
            />
          ))}
        </div>
        <br />
        <div>
          {/* Custom Choose button */}
          <div style={{borderWidth:3,marginTop:10, marginBottom:10,}}>
            <p style={{ margin: 5, color: "#636161" }}> Select Course Template Image</p>
          <label htmlFor="file-upload" style={{padding:30,display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
            <CloudUploadIcon style={{ marginRight: '5px' }} /> Upload Image
          </label>
          <input
            id="file-upload"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            style={{ display: 'none' }}
          />
          </div>
          {imageDataUrl && (
            <div>
              <p style={{ color: 'green' }}>Image successfully uploaded</p>
              <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                <img src={imageDataUrl} alt="Selected" style={{ width: '400px', height: '300px' }} />
              </div>
            </div>
          )}
        </div>
        <hr />
        

        <div style={{ marginBottom: '15px', borderWidth: 2, borderRadius: 10 }}>
          <RadioGroup
            aria-label="permission"
            name="permission"
            value={permission}
            onChange={handlePermissionChange}
          >
            <p style={{ display: "flex", margin: 5 }}>Tip: <span style={{ color: "#F9A4A4" }}>Set your course private until it is fully uploaded (you can modify it anytime).</span></p>
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
