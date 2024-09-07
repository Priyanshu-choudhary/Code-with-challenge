import React, { useState, useRef, useEffect, memo } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Editor as TinyMCE } from '@tinymce/tinymce-react';
import { Radio, RadioGroup, FormControlLabel, FormControl, FormLabel } from '@mui/material';
import axios from 'axios';
import HtmlRenderer from '../Leetcode/HtmlRenderer';
import beautify from 'js-beautify';
import MonacoEditor from '@monaco-editor/react';

// Memoized CKEditor component
const MemoizedCKEditor = memo(function CKEditorComponent({ content, handleCKEditorChange }) {
  return (
    <CKEditor
      editor={ClassicEditor}
      data={content}
      onChange={handleCKEditorChange}
      config={{
        toolbar: [
          'heading', '|',
          'bold', 'italic', 'link', 'bulletedList', 'numberedList', 'blockQuote', '|',
          'insertTable', 'tableColumn', 'tableRow', 'mergeTableCells', '|',
          'undo', 'redo', '|',
          'fontFamily', 'fontSize', 'fontColor', 'fontBackgroundColor', 'mediaEmbed', 'imageUpload'
        ],
        fontFamily: {
          options: [
            'default',
            'Arial, Helvetica, sans-serif',
            'Courier New, Courier, monospace',
            'Georgia, serif',
            'Lucida Sans Unicode, Lucida Grande, sans-serif',
            'Tahoma, Geneva, sans-serif',
            'Times New Roman, Times, serif',
            'Trebuchet MS, Helvetica, sans-serif',
            'Verdana, Geneva, sans-serif'
          ]
        },
        fontSize: {
          options: [
            'tiny',
            'small',
            'default',
            'big',
            'huge'
          ]
        },
        fontColor: {
          columns: 5,
          documentColors: 10
        },
        fontBackgroundColor: {
          columns: 5,
          documentColors: 10
        },
        image: {
          toolbar: [
            'imageStyle:full', 'imageStyle:side', '|',
            'imageTextAlternative'
          ]
        },
        extraPlugins: [MyCustomUploadAdapterPlugin],
        contentsCss: ['./customStyles.css'],
      }}
    />
  );
});

// Memoized TinyMCE component
const MemoizedTinyMCE = memo(function TinyMCEComponent({ content, handleTinyMceChange }) {
  return (
    <TinyMCE
      apiKey="your-api-key"
      value={content}
      onEditorChange={handleTinyMceChange}
      init={{
        height: 500,
        menubar: true,
        plugins: [
          'advlist autolink lists link image charmap print preview anchor',
          'searchreplace visualblocks code fullscreen',
          'insertdatetime media table paste code help wordcount',
          'emoticons textcolor colorpicker textpattern',
          'importcss autosave save directionality visualchars link media codesample nonbreaking quickbars'
        ],
        toolbar: 'blocks fontfamily fontsize | bold italic underline | code | customPlaceholder',
        setup: (editor) => {
          // Add a custom button to insert the placeholder
          editor.ui.registry.addButton('customPlaceholder', {
            text: 'Insert Editor',
            onAction: () => {
              editor.insertContent(`<div data-placeholder="InPageEditor">//Your initial content here</div>`);
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

  const handleMonacoChange = (value) => {
    setContent(value);
    setDescription(value);
  };

  const handleCKEditorChange = (event, editor) => {
    const data = editor.getData();
    setContent(data);
    setDescription(data);
  };

  const handleTinyMceChange = (content) => {
    setContent(content);
    setDescription(content);
  };

  const handleRadioChange = (event) => {
    setEditorType(event.target.value);
  };

  useEffect(() => {
    beautifyContent();
  }, [editorType]);

  // Render the editor based on the selected type
  const renderEditor = () => {
    switch (editorType) {
      case 'ckeditor':
        return <MemoizedCKEditor content={content} handleCKEditorChange={handleCKEditorChange} />;
      case 'tinymce':
        return <MemoizedTinyMCE content={content} handleTinyMceChange={handleTinyMceChange} />;
      case 'textbox':
        return <MemoizedMonacoEditor content={content} handleMonacoChange={handleMonacoChange} />;
      default:
        return null;
    }
  };

  return (
    <div>
      <FormControl component="fieldset">
        <FormLabel component="legend">Select Editor</FormLabel>
        <RadioGroup
          row
          aria-label="editor"
          name="editor"
          value={editorType}
          onChange={handleRadioChange}
        >
          <FormControlLabel value="ckeditor" control={<Radio />} label="CKEditor" />
          <FormControlLabel value="tinymce" control={<Radio />} label="TinyMCE" />
          <FormControlLabel value="textbox" control={<Radio />} label="Direct Html" />
        </RadioGroup>
      </FormControl>
      <div>
        {renderEditor()}
      </div>
      <div style={{ maxWidth: "50%", marginTop: '20px' }}>
        <div className='flex'>
          <div style={{ width: 1, backgroundColor: "black" }}></div>
          <h2 className='font-bold bg-slate-300 text-center w-full'>Preview</h2>
        </div>
        <p style={{ borderWidth: 1 }} className={`text-lg p-3`}>
          <HtmlRenderer htmlContent={formattedContent || content} />
        </p>
      </div>
    </div>
  );
}

// Custom upload adapter for CKEditor
function MyCustomUploadAdapterPlugin(editor) {
  editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
    return new MyUploadAdapter(loader);
  };
}

class MyUploadAdapter {
  constructor(loader) {
    this.loader = loader;
  }

  async upload() {
    const file = await this.loader.file;
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('https://hytechlabs.online:9090/Files/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      console.log('Upload response:', response.data);

      return {
        default: response.data.fileUrl
      };
    } catch (error) {
      console.error('Error uploading image:', error.response ? error.response.data : error.message);
      throw new Error('Error uploading image!');
    }
  }

  abort() {
    // Abort handling
  }
}

export default memo(EditorComponent);
