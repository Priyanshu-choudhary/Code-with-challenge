import React, { useState, useEffect, useRef } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import CircularProgress from '@mui/material/CircularProgress';
import Tinymce from '../TinyMCE/TinyMCE';

const ProblemForm = ({ initialData = {}, onJsonGenerated,eventTriggered,Triggered }) => {
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
    codeTemplates: {},
    ...initialData
  });

  const [newTag, setNewTag] = useState('');
  const [newLanguage, setNewLanguage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [newAnswer, setNewAnswer] = useState('');
  const descriptionRef = useRef(problemDetails.description);

  useEffect(() => {
    descriptionRef.current = problemDetails.description;
  }, [problemDetails.description]);

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

  const handleSubmit = (e) => {

    setSubmitting(true);
    const updatedDetails = { ...problemDetails, description: descriptionRef.current };
    onJsonGenerated(updatedDetails);
    setSubmitting(false);
  };
  useEffect(() => {
    if (eventTriggered) {
        handleSubmit();
        Triggered(false);
    }
  }, [eventTriggered]);
  return (
    <Box
      component="form"
      sx={{ '& > :not(style)': { m: 1 }, display: 'flex', flexDirection: 'column' }}
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit}
    >
      <Tinymce
        initialValue={descriptionRef.current}
        setDescription={setDescription}
      />

      {Object.keys(problemDetails).map((key) => (
        key !== 'tags' && key !== 'answer' && (
          <TextField
            key={key}
            id={key}
            label={key.charAt(0).toUpperCase() + key.slice(1)}
            variant="outlined"
            multiline={key === 'description' || key === 'example'}
            fullWidth
            value={problemDetails[key]}
            onChange={handleInputChange}
          />
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
              label="Boiler Code"
              variant="outlined"
              multiline
              fullWidth
              value={problemDetails.codeTemplates[language].templateCode}
              onChange={(e) => handleCodeTemplateChange(language, 'templateCode', e.target.value)}
            />
            <TextField
              label="Checker Code"
              variant="outlined"
              multiline
              fullWidth
              value={problemDetails.codeTemplates[language].boilerCode}
              onChange={(e) => handleCodeTemplateChange(language, 'boilerCode', e.target.value)}
            />
            <TextField
              label="Solution"
              variant="outlined"
              multiline
              fullWidth
              value={problemDetails.solution[language]?.solution || ''}
              onChange={(e) => handleSolutionChange(language, e.target.value)}
            />
          </div>
        ))}
      </div>

     
    </Box>
  );    
};

export default ProblemForm;

