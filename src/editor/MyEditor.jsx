import React, { useState, useRef } from 'react';
import Editor from '@monaco-editor/react';
import "./editor.css"
import JDoodleExample from '../JDoodle/JDoodleExample';
import OutputSec from '../outputSec/OutputSec';
import Spinner from 'react-bootstrap/Spinner';

function MyEditor({ myfun }) {
  const [language, setLanguage] = useState("java");
  const [iSubmit, setiSubmit] = useState(false);
  const [output, setOutput] = useState('');
  const editorRef = useRef(null);

  const handleEditorDidMount = (editor, monaco) => {
    editorRef.current = editor;
  };

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

  const getCode = async () => {
    myfun();
    if (editorRef.current) {
      const code = editorRef.current.getValue();
      setiSubmit(true);
      const output = await JDoodleExample(code,language);
      setiSubmit(false);
      setOutput(output);
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
      <Editor
        className='editor'
        height="430px"
        width="auto"
        defaultLanguage={language}
        // theme='vs-dark'
        defaultValue={`//Example code
import java.util.*;
public class MyClass {
    public static void main(String[] args) {
        //Write your code here...
        System.out.println("Hello World!");
    }
}`}
        onMount={handleEditorDidMount}
        options={options}
      />
     <button onClick={getCode} class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center">
   <span>Run {iSubmit && <Spinner style={{ marginLeft: "5px" }} animation="border" size="sm" />}</span>
</button>{' '}
<button class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center">
  <span>Submit</span>
</button>{' '}
      <button onClick={downloadFile}class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center">
  <svg class="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z"/></svg>
  <span>Download</span>
</button>{' '}
      

    
    {output && <OutputSec output={output}/>}
    
     
    </>
  );
}

export default React.memo(MyEditor);
