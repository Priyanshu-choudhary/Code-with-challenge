import React, { useState,useContext } from 'react';
import axios from 'axios';
import './EditorComponent.css'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import Dashboard from '../dashBoard/Dashboard';
import { Form } from 'react-bootstrap';
import "./doneAnimation.css"


import { UserContext } from '../Context/UserContext';

const EditorPosts = () => {
    const [question, setquestion] = useState('');
    const [solution, setSolution] = useState('');
    const [output, setOutput] = useState('');
    const [isDoneUpload, setisDoneUpload] = useState(false);


    const { user, password } = useContext(UserContext);
   /////////////////////form////////////////////////////
   const [selectedMedia, setSelectedMedia] = useState('');
   const [selectedElement, setSelectedElement] = useState('');

    const handleMediaChange = (event) => {
        setSelectedMedia(event.target.value);
    };
    const handleElementChange = (event) => {
        setSelectedElement(event.target.value);
    };
///////////////////////////////////////////////////

    const handleInputChangeQuestion = (event) => {
        setquestion(event.target.value);
    };

    const handleInputChangeOutput = (event) => {
        setOutput(event.target.value);
    };

    const handleInputChangeSolution = (event) => {
        setSolution(event.target.value);
    };
    function showmsg() {
        setisDoneUpload(true);
    }
    function hidesmg() {
        setisDoneUpload(false);
    }
   

    const handleSubmit = async (event) => {
        console.log("username  "+user.name);
        console.log("password  "+user.password);
        event.preventDefault();
        try {
            const response = await axios.post(
                'http://localhost:9090/Posts',
                {
                    title: question, // Provide a title here
                    content: solution,
                    imgUrl: output // Provide an image URL here if necessary
                },
                {
                    auth: {
                        username: user.name,
                        password: user.password
                    }
                }
            );
            console.log('Post created:', response.data);
            showmsg();
            let timer = setInterval(hidesmg, 3000);



           
        } catch (error) {
            console.error('Error creating post:', error);
            // Handle error, like displaying an error message to the user.
        }
    };

    return (
        <>
        <Dashboard/>
        <div className="editor-container">
            <div className="sidebar">
                <div className="sidebar-item">Set Test Cases</div>
                <div className="sidebar-item" onClick={handleSubmit}>Upload </div>
                  <Form>
                    <h5>Visiable to </h5>
                    <Form.Check 
                        type="radio" 
                        label="Only You" 
                        name="media" 
                        value="Image" 
                        checked={selectedMedia === 'Image'} 
                        onChange={handleMediaChange} 
                    />
                    <Form.Check 
                        type="radio" 
                        label="Public" 
                        name="media" 
                        value="AI Image" 
                        checked={selectedMedia === 'AI Image'} 
                        onChange={handleMediaChange} 
                    />
                  
                   
                    <hr />
                    <h5>Add Elements</h5>
                    <Form.Check 
                        type="radio" 
                        label="Divider" 
                        name="element" 
                        value="Divider" 
                        checked={selectedElement === 'Divider'} 
                        onChange={handleElementChange} 
                    />
                    <Form.Check 
                        type="radio" 
                        label="Button" 
                        name="element" 
                        value="Button" 
                        checked={selectedElement === 'Button'} 
                        onChange={handleElementChange} 
                    />
                    <Form.Check 
                        type="radio" 
                        label="Table" 
                        name="element" 
                        value="Table" 
                        checked={selectedElement === 'Table'} 
                        onChange={handleElementChange} 
                    />
                </Form>
                <hr />  
           
{isDoneUpload && <div className='bottom'>
            <svg id="successAnimation" className="animated color" xmlns="http://www.w3.org/2000/svg" width="70" height="70" viewBox="0 0 70 70">
  <path id="successAnimationResult" fill="#D8D8D8" d="M35,60 C21.1928813,60 10,48.8071187 10,35 C10,21.1928813 21.1928813,10 35,10 C48.8071187,10 60,21.1928813 60,35 C60,48.8071187 48.8071187,60 35,60 Z M23.6332378,33.2260427 L22.3667622,34.7739573 L34.1433655,44.40936 L47.776114,27.6305926 L46.223886,26.3694074 L33.8566345,41.59064 L23.6332378,33.2260427 Z"/>
  <circle id="successAnimationCircle" cx="35" cy="35" r="24" stroke="#979797" stroke-width="2" stroke-linecap="round" fill="transparent"/>
  <polyline id="successAnimationCheck" stroke="#979797" stroke-width="2" points="23 34 34 43 47 27" fill="transparent"/>
 
</svg>
<h1 >Done Upload ...</h1>
</div>}





          
            </div>
            <div className="editor">
                <h2>Add Your Question</h2>
                <textarea
                    value={question}
                    onChange={handleInputChangeQuestion}
                    placeholder="Start writing your Question here..."
                    className="editor-textarea"
                />
            </div>
            <div className="editor">
                <h2>Add Solution</h2>
                <textarea
                    value={solution}
                    onChange={handleInputChangeSolution}
                    placeholder="Start writing your Question here..."
                    className="editor-textarea"
                />
            </div>
            <div className="editor">
                <h2>Add Example</h2>
                <textarea
                    value={output}
                    onChange={handleInputChangeOutput}
                    placeholder="Start writing your Question here..."
                    className="editor-textarea"
                />
            </div>
           
        </div>
        </>
    );
};

export default EditorPosts;
