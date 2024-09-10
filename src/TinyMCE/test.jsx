import React, { useState, useEffect, memo } from 'react';
import { Editor as TinyMCE } from '@tinymce/tinymce-react';
import { Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, Modal, TextareaAutosize, Button, Box, CircularProgress } from '@mui/material';
import axios from 'axios';
import HtmlRenderer from '../Leetcode/HtmlRenderer';
import beautify from 'js-beautify';
import MonacoEditor from '@monaco-editor/react';
import ErrorBoundary from '../ERROR/ErrorBoundary';

// Memoized TinyMCE component
const MemoizedTinyMCE = memo(function TinyMCEComponent({ content, handleTinyMceChange, openCustomDialog }) {
  return (
    <TinyMCE
      apiKey="b0jhzd6koxrs4kg17tsddbbfge2vxtw19f3tetxllvoshkc2"
      value={content}
      onEditorChange={handleTinyMceChange}
      init={{
        height: 500,
        menubar: true,
        plugins: [
          'advlist', 'autolink', 'lists', 'fontfamily', 'fontsize', 'link', 'image', 'charmap', 'preview',
          'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
          'insertdatetime', 'media', 'table', 'help', 'wordcount'
        ],
        toolbar: 'undo redo | blocks | fontfamily | fontsize | ' +
          'bold italic backcolor | alignleft aligncenter ' +
          'alignright alignjustify | bullist numlist outdent indent | customInsertImage | code |' +
          'removeformat | customPlaceholder | help',
        content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:16px }',
        setup: (editor) => {
          // Add a custom button for image upload
          editor.ui.registry.addButton('customInsertImage', {
            text: 'Insert Image',
            onAction: () => handleImageUpload(editor)
          });

          // Add a custom button to open a dialog
          editor.ui.registry.addButton('customPlaceholder', {
            text: 'Insert Custom Data',
            onAction: () => {
              openCustomDialog(editor);
            },
          });
        },
      }}
    />
  );
});

// Memoized MonacoEditor component
const MemoizedMonacoEditor = memo(function MonacoEditorComponent({ content, handleMonacoChange }) {
  return (
    <MonacoEditor
      height="150vh"
      language="html"
      theme="vs-dark"
      value={content}
      onChange={handleMonacoChange}
      options={{
        minimap: { enabled: false },
        scrollbar: {
          vertical: 'hidden',
          horizontal: 'hidden',
        },
      }}
    />
  );
});

function EditorComponent({ setDescription, initialValue }) {
  const [editorType, setEditorType] = useState('textbox');
  const [content, setContent] = useState(initialValue || "<p>Write your Description here.</p>");
  const [formattedContent, setFormattedContent] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentEditor, setCurrentEditor] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // Loading state for image upload

  const handleImageUpload = (editor) => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    input.onchange = async () => {
      const file = input.files[0];
      if (!file) return;

      const formData = new FormData();
      formData.append('file', file);

      try {
        setIsLoading(true); // Start loading
        const response = await axios.post('https://hytechlabs.online:9090/Files/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });

        if (response.data && response.data.location) {
          editor.insertContent(`<img src="${response.data.location}" alt="Uploaded Image" />`);
        } else {
          alert('Failed to upload image: Invalid response from server.');
        }
      } catch (error) {
        alert('Failed to upload image: ' + error.message);
      } finally {
        setIsLoading(false); // Stop loading
      }
    };
  };

  // Function to beautify the HTML content
  const formatHtml = (html) => {
    return beautify.html(html, {
      indent_size: 2,
      wrap_line_length: 80,
      preserve_newlines: true,
      max_preserve_newlines: 2,
    });
  };

  // Automatically beautify content when the editor type changes
  const beautifyContent = () => {
    const beautified = formatHtml(content);
    setContent(beautified);
    setFormattedContent(beautified);
  };

  useEffect(() => {
    beautifyContent();
  }, [editorType]);

  const handleMonacoChange = (value) => {
    setContent(value);
    setDescription(value);
  };

  const handleTinyMceChange = (content) => {
    setContent(content);
    setDescription(content);
  };

  const handleRadioChange = (event) => {
    setEditorType(event.target.value);
  };

  const openCustomDialog = (editor) => {
    setCurrentEditor(editor);
    setIsModalOpen(true);
  };

  const handleModalSave = (customData) => {
    if (currentEditor) {
      let encodedData = encodeURIComponent(customData);
      encodedData = btoa(encodedData);
      const placeholderContent = `<div data-placeholder="InPageEditor">${encodedData}</div>`;
      currentEditor.insertContent(placeholderContent);
    }
  };

  const renderEditor = () => {
    switch (editorType) {
      case 'tinymce':
        return <MemoizedTinyMCE content={content} handleTinyMceChange={handleTinyMceChange} openCustomDialog={openCustomDialog} />;
      case 'textbox':
        return <MemoizedMonacoEditor content={content} handleMonacoChange={handleMonacoChange} />;
      default:
        return null;
    }
  };

  return (
    <div>
      <FormControl component="fieldset">
        <FormLabel component="legend">Select Editor </FormLabel>
        <RadioGroup
          row
          aria-label="editor"
          name="editor"
          value={editorType}
          onChange={handleRadioChange}
        >
          <FormControlLabel value="tinymce" control={<Radio />} label="TinyMCE" />
          <FormControlLabel value="textbox" control={<Radio />} label="TextBox" />
        </RadioGroup>
      </FormControl>

      <ErrorBoundary>
        {renderEditor()}
        {isLoading && <CircularProgress style={{ position: 'fixed', top: '50%', left: '50%' }} />}
      </ErrorBoundary>

      <HtmlRenderer htmlContent={formattedContent || content} />
      <CustomDataModal open={isModalOpen} onClose={() => setIsModalOpen(false)} onSave={handleModalSave} />
    </div>
  );
}

export default EditorComponent;
