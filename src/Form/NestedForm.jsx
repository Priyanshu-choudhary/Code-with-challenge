import React, { useState, useEffect } from 'react';
import { Button, TextField, Box, Typography, IconButton } from '@mui/material';
import { Add, Remove } from '@mui/icons-material';
import ProblemForm from './ProblemForm';

const NestedForm = () => {
    const [data, setData] = useState('');
    const [formData, setFormData] = useState([
        {
            name: '',
            children: [
                {
                    name: '',
                    children: [
                        {
                            name: '',
                            link: '',
                            status: '',
                            problem: [
                                {
                                    // data from ProblemForm
                                },
                            ],
                        },
                    ],
                },
            ],
        },
    ]);

    const handleChange = (event, parentIndex, childIndex, subChildIndex, key, subKey = null) => {
        const { value } = event.target;
        const newFormData = [...formData];
        if (subKey) {
            newFormData[parentIndex].children[childIndex].children[subChildIndex][key][subKey] = value;
        } else {
            newFormData[parentIndex].children[childIndex].children[subChildIndex][key] = value;
        }
        setFormData(newFormData);
    };

    const handleJsonGenerated = (jsonData, parentIndex, childIndex, subChildIndex) => {
        const newFormData = [...formData];
        newFormData[parentIndex].children[childIndex].children[subChildIndex].problem = [jsonData];
        setFormData(newFormData);
    };

    const addParent = () => {
        setFormData([
            ...formData,
            {
                name: '',
                children: [
                    {
                        name: '',
                        children: [
                            {
                                name: '',
                                link: '',
                                status: '',
                                problem: [
                                    {
                                        // data from ProblemForm
                                    },
                                ],
                            },
                        ],
                    },
                ],
            },
        ]);
    };

    const addChild = (parentIndex) => {
        const newFormData = [...formData];
        newFormData[parentIndex].children.push({
            name: '',
            children: [
                {
                    name: '',
                    link: '',
                    status: '',
                    problem: [
                        {
                            // data from ProblemForm
                        },
                    ],
                },
            ],
        });
        setFormData(newFormData);
    };

    const addSubChild = (parentIndex, childIndex) => {
        const newFormData = [...formData];
        newFormData[parentIndex].children[childIndex].children.push({
            name: '',
            link: '',
            status: '',
            problem: [
                {
                    // data from ProblemForm
                },
            ],
        });
        setFormData(newFormData);
    };

    const removeParent = (parentIndex) => {
        const newFormData = [...formData];
        newFormData.splice(parentIndex, 1);
        setFormData(newFormData);
    };

    const removeChild = (parentIndex, childIndex) => {
        const newFormData = [...formData];
        newFormData[parentIndex].children.splice(childIndex, 1);
        setFormData(newFormData);
    };

    const removeSubChild = (parentIndex, childIndex, subChildIndex) => {
        const newFormData = [...formData];
        newFormData[parentIndex].children[childIndex].children.splice(subChildIndex, 1);
        setFormData(newFormData);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(JSON.stringify(formData, null, 2));
    };

    useEffect(() => {}, [data]);

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ padding: 2 }}>
            <Typography variant="h5" gutterBottom>
                Nested Form Example
            </Typography>
            {formData.map((parent, parentIndex) => (
                <Box key={parentIndex} sx={{ marginBottom: 2, paddingLeft: 2 }}>
                    <TextField
                        fullWidth
                        label="Parent Name"
                        value={parent.name}
                        onChange={(e) => {
                            const newFormData = [...formData];
                            newFormData[parentIndex].name = e.target.value;
                            setFormData(newFormData);
                        }}
                        margin="normal"
                    />
                    {parent.children.map((child, childIndex) => (
                        <Box key={childIndex} sx={{ marginBottom: 2, paddingLeft: 2 }}>
                            <TextField
                                fullWidth
                                label="Child Name"
                                value={child.name}
                                onChange={(e) => {
                                    const newFormData = [...formData];
                                    newFormData[parentIndex].children[childIndex].name = e.target.value;
                                    setFormData(newFormData);
                                }}
                                margin="normal"
                            />
                            {child.children.map((subChild, subChildIndex) => (
                                <Box key={subChildIndex} sx={{ marginBottom: 2, paddingLeft: 4 }}>
                                    <TextField
                                        fullWidth
                                        label="Sub-Child Name"
                                        value={subChild.name}
                                        onChange={(e) =>
                                            handleChange(e, parentIndex, childIndex, subChildIndex, 'name')
                                        }
                                        margin="normal"
                                    />
                                    <TextField
                                        fullWidth
                                        label="Link"
                                        value={subChild.link}
                                        onChange={(e) =>
                                            handleChange(e, parentIndex, childIndex, subChildIndex, 'link')
                                        }
                                        margin="normal"
                                    />
                                    <TextField
                                        fullWidth
                                        label="Status"
                                        value={subChild.status}
                                        onChange={(e) =>
                                            handleChange(e, parentIndex, childIndex, subChildIndex, 'status')
                                        }
                                        margin="normal"
                                    />
                                    <div className="ml-8">
                                        <h3>Problem</h3>
                                        <ProblemForm
                                            onJsonGenerated={(jsonData) =>
                                                handleJsonGenerated(jsonData, parentIndex, childIndex, subChildIndex)
                                            }
                                        />
                                    </div>
                                    <IconButton
                                        aria-label="remove sub-child"
                                        onClick={() => removeSubChild(parentIndex, childIndex, subChildIndex)}
                                    >
                                        <Remove />
                                    </IconButton>
                                </Box>
                            ))}
                            <Button
                                variant="outlined"
                                color="primary"
                                onClick={() => addSubChild(parentIndex, childIndex)}
                                startIcon={<Add />}
                                sx={{ marginBottom: 2 }}
                            >
                                Add Sub-Child
                            </Button>
                            <IconButton
                                aria-label="remove child"
                                onClick={() => removeChild(parentIndex, childIndex)}
                            >
                                <Remove />
                            </IconButton>
                        </Box>
                    ))}
                    <Button
                        variant="outlined"
                        color="primary"
                        onClick={() => addChild(parentIndex)}
                        startIcon={<Add />}
                        sx={{ marginBottom: 2 }}
                    >
                        Add Child
                    </Button>
                    <IconButton
                        aria-label="remove parent"
                        onClick={() => removeParent(parentIndex)}
                        disabled={formData.length === 1}
                    >
                        <Remove />
                    </IconButton>
                </Box>
            ))}
            <Button
                variant="outlined"
                color="primary"
                onClick={addParent}
                startIcon={<Add />}
                sx={{ marginBottom: 2 }}
            >
                Add Parent
            </Button>
            <Button type="submit" variant="contained" color="primary">
                Submit
            </Button>
        </Box>
    );
};

export default NestedForm;
