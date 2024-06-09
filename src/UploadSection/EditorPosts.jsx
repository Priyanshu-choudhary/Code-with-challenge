import React, { useState, useContext,useCallback } from 'react';
import axios from 'axios';
import './EditorComponent.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Dashboard from '../dashBoard/Dashboard';
import { Form, } from 'react-bootstrap';
import Alert from '@mui/material/Alert';
import { UserContext } from '../Context/UserContext';
import Spinner from 'react-bootstrap/Spinner';
// import Grid from '@mui/material/Grid'; // Grid version 1
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import Tags from './Tags';

const EditorPosts = () => {
    const [solution, setSolution] = useState('');
    const [description, setDescription] = useState('');
    const [Example, setExample] = useState('');
    const [title, setTitle] = useState('');
    const [answer, setAnswer] = useState('');
    const [difficulty, setdifficulty] = useState('');
    const { user, password } = useContext(UserContext);
    const [iSubmit, setiSubmit] = useState(false);
    const [tags, setTags] = useState([]);
    const [time, settime] = useState('')
    const [TC, setTC] = useState('')
    const [testcase, setTestCase] = useState('')
    const [constrain, setconstrain] = useState('')

    /////////////////////form////////////////////////////
    const handleTagsChange = useCallback((tags) => {
        setTags(tags);
    }, []);
   
    const handleInputChangeTC = (event) => {
        setTC(event.target.value);
    };
    const handleInputChangeTestCase = (event) => {
        setTestCase(event.target.value);
    };
    const handleInputChangeConstrain = (event) => {
        setconstrain(event.target.value);
    };
    const handleInputChangeTime = (event) => {
        settime(event.target.value);
    };
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

        setiSubmit(true);
        event.preventDefault();
        try {
            const response = await axios.post(
                'https://testcfc-1.onrender.com/Posts',
                {
                    title: title, 
                    description: description,
                    example: Example, 
                    difficulty: difficulty,
                    answer: answer,
                    constrain:constrain,
                    timecomplixity:TC,
                    avgtime:time,
                    tags:tags,
                },
                {
                    auth: {
                        username: "YadiChoudhary",
                        password: "YadiChoudhary"
                    }
                }
            );
            console.log('Post created:', response.data);
            setiSubmit(false);
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
            <div className="editor-container" style={{ height: "90vh" }}>
                <div className="sidebar">
                    <div className="sidebar-item" onClick={handleSubmit}>Upload {iSubmit && <Spinner animation="border" size="sm" />}</div>
                    <hr />

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
                    <div className="editor">
                        <h2>Add Answer</h2>
                        <textarea
                            value={answer}
                            onChange={handleInputChangeAnswer}
                            placeholder="Answer......."
                            className="editor-textarea"
                        />
                    </div>
                    <Grid container spacing={2}>
                        <Grid md={4}>
                            <div className="editor">
                                <h2>Add test cases:</h2>
                                <textarea
                                    value={testcase}
                                    onChange={handleInputChangeTestCase}
                                    placeholder="Tesr Cases......."
                                    className="editor-textarea"
                                />
                            </div>
                        </Grid>
                        <Grid md={4}>
                            <div className="editor">
                                <h2>constrain:</h2>
                                <textarea
                                    value={constrain}
                                    onChange={handleInputChangeConstrain}
                                    placeholder="Constrain......."
                                    className="editor-textarea"
                                />
                            </div>
                        </Grid>
                        <Grid md={4}>

                            <div className="editor">
                                <h2>Time Complixity:</h2>
                                <textarea
                                    value={TC}
                                    onChange={handleInputChangeTC}
                                    placeholder="......."
                                    className="editor-textarea"
                                />
                            </div>
                        </Grid>
                        <Grid md={4}>

                            <div className="editor">
                                <h2>Time to solve:</h2>
                                <textarea
                                    value={time}
                                    onChange={handleInputChangeTime}
                                    placeholder="time......."
                                    className="editor-textarea"
                                />
                            </div>
                        </Grid>

                    </Grid>
                    <div style={{borderWidth:"2px"}}>
                        <Tags onTagsChange={handleTagsChange} />
                        <p>Selected tags: {tags.join(', ')}</p>
                    </div>
                </div>

            </div>

        </>
    );
};

export default EditorPosts;
