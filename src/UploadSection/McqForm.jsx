import * as React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import Radio from '@mui/material/Radio';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import RadioGroup from '@mui/material/RadioGroup';
import axios from 'axios';
import './EditorComponent.css';
import Dashboard from '../dashBoard/Dashboard';
import Grid from '@mui/material/Grid';
import UnauthorizedPage from '../PageNotFound/UnauthorizedPage';

export default function McqForm({ uploadUrl }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    example: '',
    optionA: '',
    optionB: '',
    optionC: '',
    optionD: '',
  });

  const [alert, setAlert] = useState({ show: false, message: '', severity: '' });
  const [selectedAnswer, setSelectedAnswer] = useState('');

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleRadioChange = (e) => {
    setSelectedAnswer(e.target.value);
  };

  const handleSubmit = async () => {
    const postData = {
      ...formData,
      answer: selectedAnswer,
      type: 'MCQ',
    };

    try {
      const response = await axios.post(
        'https://testcfc.onrender.com/Posts',
        postData,
        {
          auth: {
            username: uploadUrl,
            password: uploadUrl,
          },
        }
      );
      setAlert({ show: true, message: `Question uploaded successfully! to ${uploadUrl}`, severity: 'success' });
    } catch (error) {
      setAlert({ show: true, message: `Failed to upload question to ${uploadUrl}`, severity: 'error' });
    }
  };

  return (
    <>
      <Dashboard />
      { role=="ADMIN"? 
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
          id="description"
          label="Description"
          multiline
          rows={4}
          fullWidth
          value={formData.description}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          id="example"
          label="Example"
          multiline
          rows={4}
          fullWidth
          value={formData.example}
          onChange={handleChange}
          margin="normal"
        />
        <FormControl component="fieldset" fullWidth>
          <RadioGroup
            aria-label="correct-answer"
            name="correct-answer"
            value={selectedAnswer}
            onChange={handleRadioChange}
          >
            <Grid container alignItems="center">
              <Grid item>
                <Radio
                  value="optionA"
                  checked={selectedAnswer === 'optionA'}
                  onChange={handleRadioChange}
                />
              </Grid>
              <Grid item xs>
                <TextField
                  id="optionA"
                  label="Option A"
                  fullWidth
                  value={formData.optionA}
                  onChange={handleChange}
                  margin="normal"
                />
              </Grid>
            </Grid>
            <Grid container alignItems="center">
              <Grid item>
                <Radio
                  value="optionB"
                  checked={selectedAnswer === 'optionB'}
                  onChange={handleRadioChange}
                />
              </Grid>
              <Grid item xs>
                <TextField
                  id="optionB"
                  label="Option B"
                  fullWidth
                  value={formData.optionB}
                  onChange={handleChange}
                  margin="normal"
                />
              </Grid>
            </Grid>
            <Grid container alignItems="center">
              <Grid item>
                <Radio
                  value="optionC"
                  checked={selectedAnswer === 'optionC'}
                  onChange={handleRadioChange}
                />
              </Grid>
              <Grid item xs>
                <TextField
                  id="optionC"
                  label="Option C"
                  fullWidth
                  value={formData.optionC}
                  onChange={handleChange}
                  margin="normal"
                />
              </Grid>
            </Grid>
            <Grid container alignItems="center">
              <Grid item>
                <Radio
                  value="optionD"
                  checked={selectedAnswer === 'optionD'}
                  onChange={handleRadioChange}
                />
              </Grid>
              <Grid item xs>
                <TextField
                  id="optionD"
                  label="Option D"
                  fullWidth
                  value={formData.optionD}
                  onChange={handleChange}
                  margin="normal"
                />
              </Grid>
            </Grid>
          </RadioGroup>
        </FormControl>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          className="submit-button"
        >
          Submit
        </Button>
      </Box>
      :<UnauthorizedPage/>}
    </>
  );
}
