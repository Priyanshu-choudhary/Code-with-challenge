import React, { useState, useContext } from 'react';
import axios from 'axios';
import './EditorComponent.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Dashboard from '../dashBoard/Dashboard';
import { Form,  } from 'react-bootstrap';
import Alert from '@mui/material/Alert';
import { UserContext } from '../Context/UserContext';

const EditorPosts = () => {
    const [solution, setSolution] = useState('');
    const [description, setDescription] = useState('');
    const [Example, setExample] = useState('');
    const [title, setTitle] = useState('');
    const [answer, setAnswer] = useState('');
    const [difficulty, setdifficulty] = useState('');
    const { user, password } = useContext(UserContext);
    /////////////////////form////////////////////////////



    const handleMediaChange = (event) => {
        setdifficulty(event.target.value);
    };
    const handleInputChangeAnswer = (event) => {
        setAnswer(event.target.value);
    };
    ///////////////////////////////////////////////////
    const handleChangeTitel = (event) => {
        setTitle(event.target.value);
    };

    const handleInputChangeDescription = (event) => {
        setDescription(event.target.value);
    };

    const handleInputChangeExample = (event) => {
        setExample(event.target.value);
    };

    const handleInputChangeSolution = (event) => {
        setSolution(event.target.value);
    };


    const handleSubmit = async (event) => {
        console.log("username  " + user);
        console.log("password  " + password);
        event.preventDefault();
        try {
            const response = await axios.post(
                'https://testcfc-1.onrender.com/Posts',
                {
                    title: title, // Provide a title here
                    description: description,
                    example: Example, // Provide an image URL here if necessary
                    difficulty: difficulty,
                    answer: answer
                },
                {
                    auth: {
                        username: "YadiChoudhary",
                        password: "YadiChoudhary"
                    }
                }
            );
            console.log('Post created:', response.data);
            alert('Question Upload....');

        } catch (error) {
            console.error('Error creating post:', error);
           // alert('Failed to Upload.');
            // Handle error, like displaying an error message to the user.
        }
    };

    return (
        <>
            <Dashboard />
            <div className="editor-container">
                <div className="sidebar">
                    <div className="sidebar-item" onClick={handleSubmit}>Upload </div>
                    <hr />
                    <textarea
                        value={answer}
                        onChange={handleInputChangeAnswer}
                        placeholder="Answer......."
                        className="editor-textarea"
                    />
                    <Form  >
                        <h5 >Difficulty: </h5>
                        <Form.Check
                            type="radio"
                            label="Easy"
                            name="media"
                            value="Easy"
                            checked={difficulty === 'Easy'}
                            onChange={handleMediaChange}
                        />
                        <Form.Check
                            type="radio"
                            label="Medium"
                            name="media"
                            value="Medium"
                            checked={difficulty === 'Medium'}
                            onChange={handleMediaChange}
                        />
                        <Form.Check
                            type="radio"
                            label="Hard"
                            name="media"
                            value="Hard"
                            checked={difficulty === 'Hard'}
                            onChange={handleMediaChange}
                        />

                        <hr />

                    </Form>
                    <hr />

                   </div>
                <div className="editor-content">
                    <div className="editor">
                        <h2>Additional Information</h2>
                        <input type="text" placeholder="Add title" className="editor-input" onChange={handleChangeTitel} />
                    </div>
                    <div className="editor">
                        <h2>Description</h2>
                        <textarea
                            value={description}
                            onChange={handleInputChangeDescription}
                            placeholder="Add Your Question Description......."
                            className="editor-textarea"
                        />
                    </div>
                    <div className="editor">
                        <h2>Solution</h2>
                        <textarea
                            value={solution}
                            onChange={handleInputChangeSolution}
                            placeholder="Start writing your Solution here......."
                            className="editor-textarea"
                        />
                    </div>
                    <div className="editor">
                        <h2>Add Example</h2>
                        <textarea
                            value={Example}
                            onChange={handleInputChangeExample}
                            placeholder="Give Example here..."
                            className="editor-textarea"
                        />
                    </div>

                </div>
            </div>

        </>
    );
};

export default EditorPosts;
