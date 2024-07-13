import React, { useContext } from 'react';
import './EditorComponent.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FormContext } from '../../Context/FormContext';
import { Editor } from '@monaco-editor/react';

const CodeGenrate = ({ step, uploadUrl }) => {
  const { formData, updateFormData } = useContext(FormContext);

  const handleLanguageChange = (event) => {
    updateFormData({ selectedLanguage: event.target.value });
  };

  const handleInputChangeCode = (value) => {
    updateFormData({
      codeTemplates: {
        ...formData.codeTemplates,
        [formData.selectedLanguage]: {
          ...formData.codeTemplates[formData.selectedLanguage],
          boilerCode: value,
        },
      },
    });
  };

  const handleInputChangeTemplateCode = (value) => {
    updateFormData({
      codeTemplates: {
        ...formData.codeTemplates,
        [formData.selectedLanguage]: {
          ...formData.codeTemplates[formData.selectedLanguage],
          templateCode: value,
        },
      },
    });
  };

  const languages = ['java', 'python', 'c', 'cpp'];

  return (
    <>
      <div className="editor" style={{ marginTop: '20px' }}>
        <div style={{borderWidth:2,padding:5,borderRadius:10}}>
          <p >Select Language:</p>
          
          <div style={{padding:5}}>
          <select onChange={handleLanguageChange} value={formData.selectedLanguage}>
            {languages.map((lang) => (
              <option key={lang} value={lang}>
                {lang.toUpperCase()}
              </option>
            ))}
          </select>
          </div>
          
        </div>
        <br />
        <div style={{borderWidth:2,padding:5,borderRadius:10}}>
        <p>Write your checker code:</p>
        <div style={{ height: '250px', marginBottom: '20px' }}>
          <Editor
            value={formData.codeTemplates[formData.selectedLanguage]?.boilerCode || ''}
            language={formData.selectedLanguage}
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
        </div>
        <br />
        <div style={{borderWidth:2,padding:5,borderRadius:10}}>
        <p>Write your Boiler code:</p>
        <div style={{ height: '250px' }}>
          <Editor
            value={formData.codeTemplates[formData.selectedLanguage]?.templateCode || ''}
            language={formData.selectedLanguage}
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
      </div>
    </>
  );
};

export default CodeGenrate;
