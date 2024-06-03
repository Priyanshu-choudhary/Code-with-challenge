import React, { useState, useRef } from 'react';
import Editor from '@monaco-editor/react';
import "./editor.css"
import Button from 'react-bootstrap/Button';
import Dashboard from '../dashBoard/Dashboard';



function MyEditor({ myfun }) {
  console.log("editor rerender");
  const [Language, setLanguage] = useState("java");
  const editorRef = useRef(null);


  const handleEditorDidMount = (editor, monaco) => {
    editorRef.current = editor;
  };

  // const handleEditorChange = (value, event) => {
  //   console.log('Code:', value);
  // };
  const downloadFile = (file) => {
    const code = editorRef.current.getValue();
    const blobCode = createFileFromString(code, "mycode.java");
    const url = URL.createObjectURL(blobCode);
    const a = document.createElement('a');
    a.href = url;
    a.download = blobCode.name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const createFileFromString = (str, fileName) => {
    const blob = new Blob([str], { type: 'text/plain' });
    return new File([blob], fileName, { type: 'text/plain' });
  };


  const printFileContent = (code) => {
    const reader = new FileReader();
    reader.onload = () => {
      console.log('File content:', reader.result);
    };
    reader.readAsText(code);
  };



  const uploadFile = async (formData) => {
    try {
      const response = await fetch('YOUR_SERVER_ENDPOINT', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to upload file');
      }
      const result = await response.json();
      console.log('File uploaded successfully', result);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };


  const getCode = () => {
    // scrollToBottom
    myfun();
    if (editorRef.current) {
      const code = editorRef.current.getValue();
      const blobCode = createFileFromString(code, "mycode.java");
      printFileContent(blobCode);
     downloadFile(blobCode);
      // console.log( code);
      //to print blob file   
    }
  };




  const options = {
    autoIndent: 'full',
    contextmenu: true,
    fontFamily: 'monospace',
    fontSize: 14,
    lineHeight: 24,
    hideCursorInOverviewRuler: true,
    matchBrackets: 'always',
    suggestOnTriggerCharacters: true,
    minimap: {
      enabled: true,
    },
    scrollbar: {
      horizontalSliderSize: 4,
      verticalSliderSize: 18,
    },
    selectOnLineNumbers: true,
    roundedSelection: false,
    readOnly: false,
    cursorStyle: 'line',
    automaticLayout: true,
  };


  return (


    <>
    <Dashboard/>
      <Editor className='editor'
        height="430px"
        width="auto"
        defaultLanguage={Language}
        theme='vs-dark'
        defaultValue='//Example code
import java.util.*;
public class MyClass {
    public static void main(String[] args) {
        //Write your code here...
    }
}
'
        onMount={handleEditorDidMount}
        //  onChange={handleEditorChange}
        options={options}

      />
      <Button style={{ marginTop: "4px" }} variant="secondary" onClick={getCode}>Run</Button>{' '}
      <Button style={{ marginTop: "4px" }} variant="secondary">Submit</Button>{' '}
      <Button style={{ marginTop: "4px" }} variant="primary"onClick={getCode}>Download</Button>{' '}


    </>
  )
}



export default  React.memo(MyEditor)
