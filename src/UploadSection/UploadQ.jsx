import React, { useState, useContext, useCallback } from 'react';
import axios from 'axios';
import './EditorComponent.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Dashboard from '../dashBoard/Dashboard';
import { Form } from 'react-bootstrap';
import { UserContext } from '../Context/UserContext';
import Spinner from 'react-bootstrap/Spinner';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import Tags from './Tags';

const EditorPosts = () => {
    const [solution, setSolution] = useState('');
    const [description, setDescription] = useState('');
    const [example, setExample] = useState('');
    const [title, setTitle] = useState('');
    const [answer, setAnswer] = useState('');
    const [difficulty, setDifficulty] = useState('');
    const { user, password } = useContext(UserContext);
    const [iSubmit, setISubmit] = useState(false);
    const [tags, setTags] = useState([]);
    const [time, setTime] = useState('');
    const [TC, setTC] = useState('');
    const [testcaseKey, setTestCaseKey] = useState('');
    const [testcaseValue, setTestCaseValue] = useState('');
    const [testcases, setTestCases] = useState({});
    const [constrain, setConstrain] = useState('');
    const [code, setcode] = useState((`public class HelloWorld {
        public static void main(String[] args) {
            System.out.println("Made by Yadi!");
        }
    }`));

    const handleTagsChange = useCallback((tags) => {
        setTags(tags);
    }, []);

    const handleInputChangeCode = (event) => {
        setcode(event.target.value);
    };
    
    const handleInputChangeTC = (event) => {
        setTC(event.target.value);
    };

    const handleInputChangeTestCaseKey = (event) => {
        setTestCaseKey(event.target.value);
    };

    const handleInputChangeTestCaseValue = (event) => {
        setTestCaseValue(event.target.value);
    };

    const handleInputChangeConstrain = (event) => {
        setConstrain(event.target.value);
    };

    const handleInputChangeTime = (event) => {
        setTime(event.target.value);
    };

    const handleMediaChange = (event) => {
        setDifficulty(event.target.value);
    };

    const handleInputChangeAnswer = (event) => {
        setAnswer(event.target.value);
    };

    const handleChangeTitle = (event) => {
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

    const handleAddTestCase = () => {
        if (testcaseKey && testcaseValue) {
            setTestCases(prevTestCases => ({
                ...prevTestCases,
                [testcaseKey]: testcaseValue
            }));
            setTestCaseKey('');
            setTestCaseValue('');
        }
    };

    const handleRemoveTestCase = (keyToRemove) => {
        setTestCases(prevTestCases => {
            const { [keyToRemove]: _, ...remainingTestCases } = prevTestCases;
            return remainingTestCases;
        });
    };

    const handleSubmit = async (event) => {
        setISubmit(true);
        event.preventDefault();
        try {
            const response = await axios.post(
                'https://testcfc-1.onrender.com/Posts',
                {
                    title,
                    description,
                    example,
                    difficulty,
                    answer,
                    constrain,
                    timecomplixity: TC,
                    avgtime: time,
                    tags,
                    testcase: testcases,
                    boilerCode: code,
                },
                {
                    auth: {
                        username: user,
                        password: password
                    }
                }
            );
            console.log('Post created:', response.data);
            setISubmit(false);
            alert('Question Uploaded');
        } catch (error) {
            console.error('Error creating post:', error);
            setISubmit(false);
            alert('Failed to Upload.');
        } finally {
            setISubmit(false);
        }
    };

    return (
        <>
            <Dashboard />
            <div className="editor-container" style={{ height: "90vh" }}>
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
                </div>
                <div className="editor-content">
                    <div className="editor">
                        <h2>Additional Information</h2>
                        <input type="text" placeholder="Add title" className="editor-input" onChange={handleChangeTitle} />
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
                            value={example}
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
                    <div className="editor">
                        <h2>Add Boiler Code</h2>
                        <textarea
                            value={code}
                            onChange={handleInputChangeCode}
                            placeholder="code......."
                            className="editor-textarea"
                        />
                    </div>
                    <Grid container spacing={2}>
                        <Grid md={4}>
                            <div className="editor">
                                <h2>Add test cases:</h2>
                                <textarea
                                    value={testcaseKey}
                                    onChange={handleInputChangeTestCaseKey}
                                    placeholder="Test case Input..."
                                    className="editor-textarea"
                                />
                                <textarea
                                    value={testcaseValue}
                                    onChange={handleInputChangeTestCaseValue}
                                    placeholder="Test case Output..."
                                    className="editor-textarea"
                                />
                                <button type="button" onClick={handleAddTestCase} style={{backgroundColor:"lightgray",borderWidth:"1px",borderColor:"black",color:"black"}}>
                                    Add Test Case
                                </button>
                                {/* <button type="button" onClick={() => handleRemoveTestCase(testcaseKey)} style={{backgroundColor:"lightgray",borderWidth:"1px",borderColor:"black",color:"black"}}>
                                    Remove Test Case
                                </button> */}
                                <div>
                                    {Object.entries(testcases).map(([key, value]) => (
                                        <div key={key}>
                                            <strong>{key}:</strong> {value}
                                            <button type="button" onClick={() => handleRemoveTestCase(key)} style={{backgroundColor:"lightgray",borderWidth:"1px",borderColor:"black",color:"black",marginLeft:"10px"}}>
                                                Remove
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </Grid>
                        <Grid md={4}>
                            <div className="editor">
                                <h2>Constrain:</h2>
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
                                <h2>Time Complexity:</h2>
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
                    <div style={{ borderWidth: "2px" }}>
                        <Tags onTagsChange={handleTagsChange} />
                    </div>
                </div>
            </div>
        </>
    );
};

export default EditorPosts;
