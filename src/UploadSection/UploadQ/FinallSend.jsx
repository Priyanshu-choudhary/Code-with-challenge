// FinalSend.jsx
import React, { useContext, useState, useCallback, useEffect } from 'react';
import axios from 'axios';
import './EditorComponent.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form } from 'react-bootstrap';
import { UserContext } from '../../Context/UserContext';
import Spinner from 'react-bootstrap/Spinner';
import Tags from '../Tags';
import { FormContext } from '../../Context/FormContext';

const FinalSend = ({ step, uploadUrl }) => {
    const { formData, updateFormData } = useContext(FormContext);
    const { user, password, role,URL,setURL } = useContext(UserContext);
    const [iSubmit, setISubmit] = useState(false);
    const [newUrl, setnewUrl] = useState('https://hytechlabs.online:9090/Posts')
    const [auth, setauth] = useState(URL)
    
    const handleTagsChange = useCallback((tags) => {
        updateFormData({ tags });
    }, [updateFormData]);

    const handleInputChange = (e) => {
        updateFormData({ [e.target.name]: e.target.value });
    };
    const checkUrl=()=>{
       
    }

    useEffect(() => {
        if (URL != 'ProblemSet') {
            setnewUrl(`https://hytechlabs.online:9090/Posts/Course/${URL}/username/OfficialCources`);
            setauth("OfficialCources");
           
        } else {
            setnewUrl('https://hytechlabs.online:9090/Posts/username/ProblemSet');
        }
    }, [    URL]); // Add URL to the dependency array to run this effect whenever URL changes
    
    const handleSubmit = async (event) => {
        setISubmit(true);
        console.log(JSON.stringify(formData));
        event.preventDefault();
        try {
           
            const response = await axios.post(
                newUrl,
                {
                    ...formData,
                    boilerCode: formData.code,
                },
                {
                    headers: {
                        // Authorization: `Basic ${btoa(`${auth}:${auth}`)}`, // Encode credentials
                        'Content-Type': 'application/json',
                    },
                }
            );
            console.log('Post created:', response.data);
            setISubmit(false);
            alert('Question Uploaded To ' + Url);
        } catch (error) {
            console.error('Error creating post:', error);
            setISubmit(false);
            alert('Failed to Upload To ' + Url);
        } finally {
            setISubmit(false);
        }
    };
    

    return (
        <>
            <div className="editor-container">
                <div className="sidebar">
                    <div className="sidebar-item" onClick={handleSubmit}>
                        
                        Save {iSubmit && <Spinner animation="border" size="sm" />}
                    </div>
                    <hr />
                    <Form>
                        <h5>Difficulty: </h5>
                        <Form.Check
                            type="radio"
                            label="Easy"
                            name="difficulty"
                            value="Easy"
                            checked={formData.difficulty === 'Easy'}
                            onChange={handleInputChange}
                        />
                        <Form.Check
                            type="radio"
                            label="Medium"
                            name="difficulty"
                            value="Medium"
                            checked={formData.difficulty === 'Medium'}
                            onChange={handleInputChange}
                        />
                        <Form.Check
                            type="radio"
                            label="Hard"
                            name="difficulty"
                            value="Hard"
                            checked={formData.difficulty === 'Hard'}
                            onChange={handleInputChange}
                        />
                        <hr />
                    </Form>
                </div>
                <div className="editor-content">
                    <div className="editor">
                        <h2>Constrain:</h2>
                        <textarea
                            name="constrain"
                            value={formData.constrain}
                            onChange={handleInputChange}
                            placeholder="Constrain......."
                            className="editor-textarea"
                        />
                    </div>

                    <div className="editor">
                        <h2>Time Complexity:</h2>
                        <textarea
                            name="TC"
                            value={formData.TC}
                            onChange={handleInputChange}
                            placeholder="......."
                            className="editor-textarea"
                        />
                    </div>

                    <div className="editor">
                        <h2>Time to solve:</h2>
                        <textarea
                            name="time"
                            value={formData.time}
                            onChange={handleInputChange}
                            placeholder="time......."
                            className="editor-textarea"
                        />
                    </div>

                    <div style={{ borderWidth: "2px" }}>
                        {/* <Tags onTagsChange={handleTagsChange} /> */}
                    </div>
                </div>
            </div>
        </>
    );
};

export default FinalSend;
