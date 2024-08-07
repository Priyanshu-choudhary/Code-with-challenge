import React, { useState, useContext } from 'react';
import './EditorComponent.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FormContext } from '../../Context/FormContext';
import Tinymce from '../../TinyMCE/TinyMCE';
import Chip from '@mui/material/Chip'; // Import Chip component

const BasicDetail = ({ step, uploadUrl }) => {
  const { formData, updateFormData } = useContext(FormContext);
  const [newAnswer, setNewAnswer] = useState('');

  const handleAddAnswer = () => {
    if (newAnswer.trim() !== '') {
      updateFormData({
        answer: [...(formData.answer || []), newAnswer.trim()]
      });
      setNewAnswer('');
    }
  };

  const handleDeleteAnswer = (answerToDelete) => {
    updateFormData({
      answer: formData.answer.filter(answer => answer !== answerToDelete)
    });
  };

  const handleChange = (e) => {
    updateFormData({ [e.target.name]: e.target.value });
  };

  const setDescription = (content) => {
    updateFormData({ description: content });
  };

  return (
    <>
      <div className="editor-container">
        <div className="editor-content">
          <div className="editor">
            <p>Additional Information</p>
            <input
              type="text"
              name="title"
              value={formData.title}
              placeholder="Add title"
              className="editor-input"
              onChange={handleChange}
            />
          </div>

          <div className="editor">
            <p>Select Sequence No.</p>
            <input
              type="text"
              name="sequence"
              value={formData.sequence}
              placeholder="Sequence no."
              className="editor-input"
              onChange={handleChange}
            />
          </div>

          <div className="editor">
            <p>Description</p>
            <Tinymce setDescription={setDescription} />
          </div>

          <div className="editor">
            <p>Add Input Format</p>
            <textarea
              name="input"
              value={formData.input}
              onChange={handleChange}
              placeholder="Start writing your input format..."
              className="editor-textarea"
            />
          </div>

          <div className="editor">
            <p>Add Answers</p>
            <textarea
              id="newAnswer"
              value={newAnswer}
              onChange={(e) => setNewAnswer(e.target.value)}
              placeholder="Add an answer..."
              className="editor-textarea"
            />
            <button onClick={handleAddAnswer} className="editor-button">Add Answer</button>
            <div className="editor-answers">
              {formData.answer && formData.answer.map((answer, index) => (
                <Chip
                  key={index}
                  label={answer}
                  onDelete={() => handleDeleteAnswer(answer)}
                />
              ))}
            </div>
          </div>

          <div className="editor">
            <p>Add Example</p>
            <textarea
              name="example"
              value={formData.example}
              onChange={handleChange}
              placeholder="Give example here..."
              className="editor-textarea"
            />
          </div>

          <div className="editor">
            <p>Solution Video URL</p>
            <input
              type="text"
              name="videoUrl"
              value={formData.videoUrl}
              placeholder="Add YouTube URL"
              className="editor-input"
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default BasicDetail;
