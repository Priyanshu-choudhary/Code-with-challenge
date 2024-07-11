import React, { useState, useEffect, useContext, useRef } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import CircularProgress from '@mui/material/CircularProgress';
import { useParams, useNavigate } from 'react-router-dom';
import { UserContext } from '../Context/UserContext';
import Dashboard from '../dashBoard/Dashboard';
import Tinymce from '../TinyMCE/TinyMCE';

const ProblemEditForm = () => {
  const { problemId } = useParams();
  const navigate = useNavigate();
  const { user, password, role } = useContext(UserContext);

  const [problemDetails, setProblemDetails] = useState({
    title: '',
    sequence: '',
    description: '',
    answer: [],
    example: '',
    difficulty: '',
    solution: {},
    constrain: '',
    timecomplixity: '',
    avgtime: '',
    boilerCode: '',
    type: '',
    optionA: '',
    optionB: '',
    optionC: '',
    optionD: '',
    videoUrl: '',
    tags: [],
    codeTemplates: {}
  });

  const [newTag, setNewTag] = useState('');
  const [newLanguage, setNewLanguage] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [newAnswer, setNewAnswer] = useState('');
  const descriptionRef = useRef(problemDetails.description);

  useEffect(() => {
    const fetchProblemDetails = async () => {
      try {
        const response = await fetch(`https://hytechlabs.online:9090/Posts/id/${problemId}`, {
          headers: {
            'Authorization': 'Basic ' + btoa('OfficialCources:OfficialCources')
          }
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        data.tags = data.tags || [];
        data.codeTemplates = data.codeTemplates || {};
        data.solution = data.solution || {};
        setProblemDetails(data);
        descriptionRef.current = data.description;
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

  const setDescription = (content) => {
    descriptionRef.current = content;
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

  const handleAddLanguage = () => {
    if (newLanguage.trim() !== '') {
      setProblemDetails(prevState => ({
        ...prevState,
        codeTemplates: {
          ...prevState.codeTemplates,
          [newLanguage]: { templateCode: '', boilerCode: '' }
        },
        solution: {
          ...prevState.solution,
          [newLanguage]: { solution: '' }
        }
      }));
      setNewLanguage('');
    }
  };

  const handleCodeTemplateChange = (lang, field, value) => {
    setProblemDetails(prevState => ({
      ...prevState,
      codeTemplates: {
        ...prevState.codeTemplates,
        [lang]: {
          ...prevState.codeTemplates[lang],
          [field]: value
        }
      }
    }));
  };

  const handleSolutionChange = (lang, value) => {
    setProblemDetails(prevState => ({
      ...prevState,
      solution: {
        [lang]: { solution: value }
      }
    }));
  };

  const handleAddAnswer = () => {
    if (newAnswer.trim() !== '') {
      setProblemDetails(prevState => ({
        ...prevState,
        answer: [...prevState.answer, newAnswer.trim()]
      }));
      setNewAnswer('');
    }
  };

  const handleDeleteAnswer = (answerToDelete) => {
    setProblemDetails(prevState => ({
      ...prevState,
      answer: prevState.answer.filter(answer => answer !== answerToDelete)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const updatedDetails = { ...problemDetails, description: descriptionRef.current };
      const response = await fetch(`https://hytechlabs.online:9090/Posts/username/OfficialCources/id/${problemId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedDetails)
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
    } finally {
      setSubmitting(false);
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
      <Dashboard />
      <Box
        component="form"
        sx={{ '& > :not(style)': { m: 1 }, display: 'flex', flexDirection: 'column' }}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        {Object.keys(problemDetails).map((key) => (
          key !== 'tags' && key !== 'answer' && (
            key === 'solution' || key === 'boilerCode' || key === 'codeTemplates' || key === 'templateCode' || key === 'example' ?
              <div key={key}>
                {key !== 'codeTemplates' && key !== 'solution' && <TextField
                  key={key}
                  id={key}
                  label={key.charAt(0).toUpperCase() + key.slice(1)}
                  variant="outlined"
                  multiline
                  fullWidth
                  rows={6}
                  value={problemDetails[key]}
                  onChange={handleInputChange}
                />}
              </div>
              :
              <div key={key}>
                {key !== 'description' && key !== 'id' && key !== 'testcase' && <TextField
                  key={key}
                  id={key}
                  fullWidth
                  multiline
                  label={key.charAt(0).toUpperCase() + key.slice(1)}
                  variant="outlined"
                  value={problemDetails[key]}
                  onChange={handleInputChange}
                />}
              </div>
          )
        ))}

        <TextField
          id="videoUrl"
          label="Solution Video URL"
          variant="outlined"
          value={problemDetails.videoUrl}
          onChange={handleInputChange}
        />

        <div>
          <TextField
            id="newTag"
            label="Add Tag"
            variant="outlined"
            value={newTag}
            onChange={handleTagChange}
          />
          <Button onClick={handleAddTag}>Add Tag</Button>
        </div>

        <div>
          {problemDetails.tags.map((tag, index) => (
            <Chip key={index} label={tag} onDelete={() => handleDeleteTag(tag)} />
          ))}
        </div>

        <div>
          <TextField
            id="newAnswer"
            label="Add Answer"
            variant="outlined"
            value={newAnswer}
            onChange={(e) => setNewAnswer(e.target.value)}
          />
          <Button onClick={handleAddAnswer}>Add Answer</Button>
        </div>

        <div>
          {problemDetails.answer.map((answer, index) => (
            <Chip key={index} label={answer} onDelete={() => handleDeleteAnswer(answer)} />
          ))}
        </div>

        <div>
          <TextField
            id="newLanguage"
            label="Add Language"
            variant="outlined"
            value={newLanguage}
            onChange={(e) => setNewLanguage(e.target.value)}
          />
          <Button onClick={handleAddLanguage}>Add Language</Button>
        </div>

        <div>
          {Object.keys(problemDetails.codeTemplates).map((language) => (
            <div key={language}>
              <h3 style={{ margin: "15px" }}>{language}</h3>
              <TextField
                label="Template Code"
                variant="outlined"
                multiline
                fullWidth
                rows={4}
                value={problemDetails.codeTemplates[language].templateCode}
                onChange={(e) => handleCodeTemplateChange(language, 'templateCode', e.target.value)}
              />
              <TextField
                label="Boiler Code"
                variant="outlined"
                multiline
                rows={4}
                fullWidth
                value={problemDetails.codeTemplates[language].boilerCode}
                onChange={(e) => handleCodeTemplateChange(language, 'boilerCode', e.target.value)}
              />
              <TextField
                label="Solution"
                variant="outlined"
                multiline
                rows={4}
                fullWidth
                value={problemDetails.solution[language]?.solution || ''}
                onChange={(e) => handleSolutionChange(language, e.target.value)}
              />
            </div>
          ))}
        </div>

        <Tinymce
          initialValue={descriptionRef.current}
          setDescription={setDescription}
        />

        <Button type="submit" variant="contained" color="primary" disabled={submitting}>
          {submitting ? <CircularProgress size={24} /> : 'Submit'}
        </Button>
      </Box>
    </>
  );
};

export default ProblemEditForm;
