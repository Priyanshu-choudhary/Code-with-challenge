import * as React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import CircularProgress from '@mui/material/CircularProgress';
import axios from 'axios';
import './EditorComponent.css';
import Dashboard from '../dashBoard/Dashboard';
import Grid from '@mui/material/Grid';
import Tinymce from '../TinyMCE/TinyMCE';

export default function McqForm({ uploadUrl }) {
  const [formData, setFormData] = useState({
    title: '',
    sequence:'',
    description: '',
    example: '',
    optionA: '',
    optionB: '',
    optionC: '',
    optionD: '',
  });

  const [alert, setAlert] = useState({ show: false, message: '', severity: '' });
  const [selectedAnswers, setSelectedAnswers] = useState([]); // State to manage selected answers
  const [loading, setLoading] = useState(false); // State to manage loading status

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setSelectedAnswers((prevSelected) =>
      checked ? [...prevSelected, value] : prevSelected.filter((answer) => answer !== value)
    );
  };

  const handleSubmit = async () => {
    setLoading(true); // Set loading to true when the form is submitted

    const postData = {
      ...formData,
      answer: selectedAnswers,
      type: 'MCQ',
    };

    try {
      console.log(postData);
      const response = await axios.post(
        `https://hytechlabs.online:9090/Posts/Course/${uploadUrl}/username/OfficialCources`,
        postData,
        {

        }
      );
      setAlert({ show: true, message: `Question uploaded successfully! to ${uploadUrl}`, severity: 'success' });
    } catch (error) {
      setAlert({ show: true, message: `Failed to upload question to ${uploadUrl}`, severity: 'error' });
    } finally {
      setLoading(false); // Set loading to false after the API call is complete
    }
  };

  const setDescription = (content) => {
    setFormData((prevData) => ({
      ...prevData,
      description: content,
    }));
  };


  return (
    <>

      <Dashboard />

      <Box className="mcq-form-container">

        {alert.show && <Alert severity={alert.severity}>{alert.message}</Alert>}
        <TextField
          id="title"
          label="Title"
          fullWidth
          value={formData.title}
          onChange={handleChange}
          margin="normal"
        />

        <TextField
          id="sequence"
          label="sequence"
          fullWidth
          value={formData.sequence}
          onChange={handleChange}
          margin="normal"
        />

        <p style={{ marginTop: 20, marginBottom: 10 }}>Description</p>
        <Tinymce setDescription={setDescription} /> {/* Replace TextField with Tinymce */}

        {/* <TextField
          id="example"
          label="Example"
          multiline
          rows={4}
          fullWidth
          value={formData.example}
          onChange={handleChange}
          margin="normal"
        /> */}

        <FormControl component="fieldset" fullWidth>
          <FormGroup>
            <Grid container alignItems="center">
              <Grid item>
                <FormControlLabel
                  control={
                    <Checkbox
                      value="optionA"
                      checked={selectedAnswers.includes('optionA')}
                      onChange={handleCheckboxChange}
                    />
                  }
                  label={
                    <TextField
                      id="optionA"
                      label="Option A"
                      fullWidth
                      value={formData.optionA}
                      onChange={handleChange}
                      margin="normal"
                    />
                  }
                />
              </Grid>
            </Grid>
            <Grid container alignItems="center">
              <Grid item>
                <FormControlLabel
                  control={
                    <Checkbox
                      value="optionB"
                      checked={selectedAnswers.includes('optionB')}
                      onChange={handleCheckboxChange}
                    />
                  }
                  label={
                    <TextField
                      id="optionB"
                      label="Option B"
                      fullWidth
                      value={formData.optionB}
                      onChange={handleChange}
                      margin="normal"
                    />
                  }
                />
              </Grid>
            </Grid>
            <Grid container alignItems="center">
              <Grid item>
                <FormControlLabel
                  control={
                    <Checkbox
                      value="optionC"
                      checked={selectedAnswers.includes('optionC')}
                      onChange={handleCheckboxChange}
                    />
                  }
                  label={
                    <TextField
                      id="optionC"
                      label="Option C"
                      fullWidth
                      value={formData.optionC}
                      onChange={handleChange}
                      margin="normal"
                    />
                  }
                />
              </Grid>
            </Grid>
            <Grid container alignItems="center">
              <Grid item>
                <FormControlLabel
                  control={
                    <Checkbox
                      value="optionD"
                      checked={selectedAnswers.includes('optionD')}
                      onChange={handleCheckboxChange}
                    />
                  }
                  label={
                    <TextField
                      id="optionD"
                      label="Option D"
                      fullWidth
                      value={formData.optionD}
                      onChange={handleChange}
                      margin="normal"
                    />
                  }
                />
              </Grid>
            </Grid>
          </FormGroup>
        </FormControl>

        <Button
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
