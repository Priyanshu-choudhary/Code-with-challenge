import React, { useContext } from 'react';
import './EditorComponent.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FormContext } from '../../Context/FormContext';
import Tinymce from '../../TinyMCE/TinyMCE'; // Import Tinymce component

const BasicDetail = ({ step, uploadUrl }) => {
  const { formData, updateFormData } = useContext(FormContext);

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
            <h2>Additional Information</h2>
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
            <h2>Description</h2>
            <Tinymce setDescription={setDescription} /> {/* Replace TextField with Tinymce */}
          </div>

          <div className="editor">
            <h2>Add Input Format</h2>
            <textarea
              name="solution"
              value={formData.solution}
              onChange={handleChange}
              placeholder="Start writing your Input format......."
              className="editor-textarea"
            />
          </div>

          <div className="editor">
            <h2>Add Example</h2>
            <textarea
              name="example"
              value={formData.example}
              onChange={handleChange}
              placeholder="Give Example here..."
              className="editor-textarea"
            />
          </div>

          <div className="editor">
            <h2>Solution Video URL</h2>
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
