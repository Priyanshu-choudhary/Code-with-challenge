import React, { useState, useContext } from 'react';
import { Card, CardContent, Button, Typography, TextField } from '@mui/material';
import McqForm from './McqForm'; // Import the McqForm component
import MyStepper from './Stepper'; // Import the MyStepper component
import Dashboard from '../dashBoard/Dashboard';
import { UserContext } from '../Context/UserContext';

export default function QuestionTypeSelector() {
  const [selectedOption, setSelectedOption] = useState(null);
  const [uploadUrl, setUploadUrl] = useState('');
  const { bc, ibg, bg, light, dark } = useContext(UserContext);

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
  }

  return (
    <>
      <Dashboard />
      <div style={{ backgroundColor: bg, color: ibg, display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Card style={{ padding: '20px', textAlign: 'center', backgroundColor: light, color: ibg }}>
          <CardContent>
            <Typography variant="h5" component="div" gutterBottom>
              Choose Question Type
            </Typography>
            <TextField
            style={{backgroundColor:"white",color:ibg,marginBottom: '20px',padding:"5px",borderRadius:"5px"}}
              label="Upload URL"
              fullWidth
              value={uploadUrl}
              onChange={(e) => setUploadUrl(e.target.value)}
           
            />
            <Button variant="contained" color="primary" onClick={() => handleOptionSelect('mcq')} style={{ margin: '10px' }}>
              MCQ Question
            </Button>
            <Button variant="contained" color="secondary" onClick={() => handleOptionSelect('coding')} style={{ margin: '10px' }}>
              Coding Question
            </Button>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
