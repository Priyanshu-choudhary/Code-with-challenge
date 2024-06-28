import React, { useState, useEffect, useContext } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import CircularProgress from '@mui/material/CircularProgress';
import { useParams, useNavigate } from 'react-router-dom';
import { UserContext } from '../Context/UserContext';
import Dashboard from '../dashBoard/Dashboard';

const ProblemEditForm = () => {
  const { problemId } = useParams();
  const navigate = useNavigate();
  const { user, password, role } = useContext(UserContext);
  
  const [problemDetails, setProblemDetails] = useState({
    title: '',
    description: '',
    example: '',
    difficulty: '',
    solution: '',
    constrain: '',
    timecomplixity: '',
    avgtime: '',
    boilerCode: '',
    type: '',
    optionA: '',
    optionB: '',
    optionC: '',
    optionD: '',
    tags: []  // Initialize tags as an empty array
  });

  const [newTag, setNewTag] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProblemDetails = async () => {
      try {
        const response = await fetch(`http://ec2-52-62-60-176.ap-southeast-2.compute.amazonaws.com:9090/Posts/id/${problemId}`, {
          headers: {
            'Authorization': 'Basic ' + btoa('OfficialCources:OfficialCources')
          }
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        // Ensure that tags are always an array
        data.tags = data.tags || [];
        setProblemDetails(data);
      } catch (error) {
        console.error("Error fetching problem details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProblemDetails();
  }, [problemId]);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setProblemDetails(prevState => ({ ...prevState, [id]: value }));
  };

  const handleTagChange = (e) => {
    setNewTag(e.target.value);
  };

  const handleAddTag = () => {
    if (newTag.trim() !== '') {
      setProblemDetails(prevState => ({
        ...prevState,
        tags: [...prevState.tags, newTag.trim()]
      }));
      setNewTag('');
    }
  };

  const handleDeleteTag = (tagToDelete) => {
    setProblemDetails(prevState => ({
      ...prevState,
      tags: prevState.tags.filter(tag => tag !== tagToDelete)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(JSON.stringify(problemDetails));
      const response = await fetch(`/Posts/id/${problemId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Basic ' + btoa('OfficialCources:OfficialCources')
        },
        body: JSON.stringify(problemDetails)
      });

      if (response.ok) {
        alert('Problem updated successfully!');
        navigate('/learn');
      } else {
        alert('Failed to update problem.');
      }
    } catch (error) {
      console.error("Error updating problem:", error);
      alert('An error occurred while updating the problem.');
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
    <Dashboard/>
    <Box
      component="form"
      sx={{ '& > :not(style)': { m: 1 }, display: 'flex', flexDirection: 'column' }}
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit}
    >

      {Object.keys(problemDetails).map((key) => (
        key !== 'tags' && (
          <TextField
            key={key}
            id={key}
            label={key.charAt(0).toUpperCase() + key.slice(1)}
            variant="outlined"
            value={problemDetails[key]}
            onChange={handleInputChange}
          />
        )
      ))}

      <div>
        <TextField
          id="newTag"
          label="Add Tag"
          variant="outlined"
          value={newTag}
          onChange={handleTagChange}
          sx={{ marginRight: 1 }}
        />
        <Button variant="contained" color="primary" onClick={handleAddTag}>
          Add Tag
        </Button>
      </div>
      
      <Box sx={{ display: 'flex', flexWrap: 'wrap', mt: 2 }}>
        {problemDetails.tags.map((tag, index) => (
          <Chip
            key={index}
            label={tag}
            onDelete={() => handleDeleteTag(tag)}
            sx={{ margin: 0.5 }}
          />
        ))}
      </Box>

      <Button variant="contained" color="primary" type="submit">
        Save
      </Button>
    </Box>
    </>
  );
};

export default ProblemEditForm;
