// BasicDetail.js
import React, { useContext } from 'react';
import './EditorComponent.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FormContext } from '../../Context/FormContext';

const BasicDetail = ({ step, uploadUrl }) => {
  const { formData, updateFormData } = useContext(FormContext);

  const handleChange = (e) => {
    updateFormData({ [e.target.name]: e.target.value });
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
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Add Your Question Description......."
              className="editor-textarea"
            />
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

          
        </div>
      </div>
    </>
  );
};

export default BasicDetail;
