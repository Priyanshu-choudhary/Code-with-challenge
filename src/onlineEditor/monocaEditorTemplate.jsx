import React from 'react';
import Editor from '@monaco-editor/react';

const MonacoEditorComponent = ({ value, language, onChange, theme = 'vs-dark', options = {} }) => {
    const handleEditorChange = (value, event) => {
        if (onChange) {
            onChange(value, event);
        }
    };

    return (
        <Editor
            height="300px"
            defaultLanguage={language}
            defaultValue={value}
            onChange={handleEditorChange}
            theme={theme}
            options={options}
        />
    );
};

export default MonacoEditorComponent;
