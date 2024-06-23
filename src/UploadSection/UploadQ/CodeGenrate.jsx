import React, { useContext } from 'react';
import './EditorComponent.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FormContext } from '../../Context/FormContext';
import { Editor } from '@monaco-editor/react';

const CodeGenrate = ({ step, uploadUrl }) => {
  const { formData, updateFormData } = useContext(FormContext);

  const handleInputChangeCode = (value) => {
    updateFormData({ code: value });
  };

  const handleInputChangeTemplateCode = (value) => {
    updateFormData({ templateCode: value });
  };

  return (
    <>
      
      <div className="editor" style={{ marginTop: '20px' }}>
        <h2>Write your checker code:</h2>
        <div style={{ height: '250px', marginBottom: '20px' }}>
          <Editor
            value={formData.code}
            language="java"
            onChange={handleInputChangeCode}
            theme="vs-dark"
            options={{
              minimap: { enabled: false },
              scrollbar: {
                vertical: 'hidden',
                horizontal: 'hidden',
              },
            }}
          />
        </div>
        <h2>Write your Boiler code:</h2>
        <div style={{ height: '250px' }}>
          <Editor
            value={formData.templateCode}
            language="java"
            onChange={handleInputChangeTemplateCode}
            theme="vs-dark"
            options={{
              minimap: { enabled: false },
              scrollbar: {
                vertical: 'hidden',
                horizontal: 'hidden',
              },
            }}
          />
        </div>
      </div>
    </>
  );
};

export default CodeGenrate;
