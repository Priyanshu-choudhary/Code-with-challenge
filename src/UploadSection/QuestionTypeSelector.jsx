import React, { useState, useContext } from 'react';
import { Card, CardContent, Button, Typography, TextField } from '@mui/material';
import McqForm from './McqForm'; // Import the McqForm component
import MyStepper from './Stepper'; // Import the MyStepper component
import Dashboard from '../dashBoard/Dashboard';
import { UserContext } from '../Context/UserContext';
import CourseForm from './newCourse';
import UnauthorizedPage from '../PageNotFound/PleaseLogin';
import Autocomplete from '@mui/material/Autocomplete';

export default function QuestionTypeSelector() {
  const [selectedOption, setSelectedOption] = useState(null);
  const [uploadUrl, setUploadUrl] = useState('');
  const { bc, ibg, bg, light, dark, role } = useContext(UserContext);

  // Predefined options for autocomplete
  const predefinedOptions = [
    'OfficialCources',
    'YadiChoudhary',
    'ProblemSet',
    'Java Basics',
  ];

  const handleOptionSelect = (option) => {
    if (uploadUrl.trim() === '') {
      alert('Please specify the upload URL.');
      return;
    }
    setSelectedOption(option);
  };

  if (selectedOption === 'mcq') {
    return <McqForm uploadUrl={uploadUrl} />;
  } else if (selectedOption === 'coding') {
    return <MyStepper uploadUrl={uploadUrl} />;
  } else if (selectedOption === 'course') {
    return <CourseForm uploadUrl={uploadUrl} />;
  }

  return (
    <>
      <Dashboard />
      {role === 'ADMIN' ? (
        <div
          style={{
            backgroundColor: bg,
            color: ibg,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
          }}
        >
          <Card
            style={{
              padding: '20px',
              textAlign: 'center',
              backgroundColor: light,
              color: ibg,
            }}
          >
            <CardContent>
              <Typography variant="h5" component="div" gutterBottom>
                Choose
              </Typography>
              <Autocomplete
                freeSolo
                options={predefinedOptions}
                value={uploadUrl}
                onChange={(event, newValue) => {
                  setUploadUrl(newValue);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Upload URL"
                    fullWidth
                    value={uploadUrl}
                    onChange={(e) => setUploadUrl(e.target.value)}
                    style={{
                      backgroundColor: 'white',
                      color: ibg,
                      marginBottom: '20px',
                      padding: '5px',
                      borderRadius: '5px',
                    }}
                  />
                )}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleOptionSelect('mcq')}
                style={{ margin: '10px' }}
              >
                MCQ Question
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => handleOptionSelect('coding')}
                style={{ margin: '10px' }}
              >
                Coding Question
              </Button>
              <Button
                variant="contained"
                color="success"
                onClick={() => handleOptionSelect('course')}
                style={{ margin: '10px' }}
              >
                New Course
              </Button>
            </CardContent>
          </Card>
        </div>
      ) : (
        <UnauthorizedPage />
      )}
    </>
  );
}
