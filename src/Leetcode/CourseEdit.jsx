import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import axios from 'axios';
import Dashboard from '../dashBoard/Dashboard';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Tinymce from '../TinyMCE/TinyMCE';
import CloudUploadIcon from '@mui/icons-material/CloudUpload'; // Example of using an icon
import { useNavigate, useLocation } from 'react-router-dom';

export default function CourseEdit({ course }) {
    const location = useLocation();
    const { courseDetail } = location.state || {};
    const [formData, setFormData] = useState({
        title: courseDetail.title,
        description: courseDetail.description,
        totalQuestions: courseDetail.totalQuestions,
    });

    const [alert, setAlert] = useState({ show: false, message: '', severity: '' });
    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState(courseDetail.image);
    const [permission, setPermission] = useState(courseDetail.permission);

    const initialLanguages = {
        java: courseDetail.language.includes('java'),
        python: courseDetail.language.includes('python'),
        c: courseDetail.language.includes('c'),
        cpp: courseDetail.language.includes('cpp'),
        javascript: courseDetail.language.includes('javascript'),
    };

    const [languages, setLanguages] = useState(initialLanguages);

    useEffect(() => {
        setLanguages({
            java: courseDetail.language.includes('java'),
            python: courseDetail.language.includes('python'),
            c: courseDetail.language.includes('c'),
            cpp: courseDetail.language.includes('cpp'),
            javascript: courseDetail.language.includes('javascript'),
        });
    }, [courseDetail.language]);

    const handleChange = (e) => {
        const { id, value } = e.target;

        if (id === 'title' && value.includes('/')) {
            setAlert({ show: true, message: 'Title cannot contain / character', severity: 'error' });
            return;
        }

        setFormData((prevData) => ({
            ...prevData,
            [id]: value,
        }));
    };

    const setDescription = (content) => {
        setFormData((prevData) => ({
            ...prevData,
            description: content,
        }));
    };

    const handlePermissionChange = (e) => {
        setPermission(e.target.value);
    };

    const handleLanguageChange = (language) => {
        setLanguages((prevLanguages) => ({
            ...prevLanguages,
            [language]: !prevLanguages[language],
        }));
    };

    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        if (file) {
            const formData = new FormData();
            formData.append('file', file);

            try {
                const response = await axios.post('https://hytechlabs.online:9090/Files/upload', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });

                const uploadedImageUrl = response.data.fileUrl; // Adjust according to your server's response structure
                setImageUrl(uploadedImageUrl);
                setAlert({ show: true, message: 'Image uploaded successfully!', severity: 'success' });
            } catch (error) {
                console.error('Error uploading image:', error);
                setAlert({ show: true, message: 'Error uploading image!', severity: 'error' });
            }
        }
    };

    const handleSubmit = async () => {
        setLoading(true);

        const selectedLanguages = Object.keys(languages).filter((lang) => languages[lang]);

        const postData = {
            title: formData.title,
            description: formData.description,
            totalQuestions: formData.totalQuestions,
            permission: permission,
            image: imageUrl,
            language: selectedLanguages,
        };

        console.log(postData);
        try {
            const response = await axios.put(
                `https://hytechlabs.online:9090/Course/id/${courseDetail.id}`,
                postData,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    auth: {
                        username: "OfficialCources",
                        password: "OfficialCources",
                    },
                }
            );

            console.log('Response:', response.data);
            setAlert({ show: true, message: `Course edited successfully!`, severity: 'success' });
        } catch (error) {
            if (error.response) {
                console.error('Error response data:', error.response.data);
                console.error('Error response status:', error.response.status);
                console.error('Error response headers:', error.response.headers);
            } else if (error.request) {
                console.error('Error request data:', error.request);
            } else {
                console.error('Error message:', error.message);
            }

            setAlert({ show: true, message: `Failed to edit course`, severity: 'error' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Dashboard />
            <Box className="course-form-container">
                {alert.show && <Alert severity={alert.severity}>{alert.message}</Alert>}
                <TextField
                    id="title"
                    label="Course Title"
                    fullWidth
                    value={formData.title}
                    onChange={handleChange}
                    margin="normal"
                />
                <TextField
                    id="totalQuestions"
                    label="Total Number of Questions"
                    fullWidth
                    value={formData.totalQuestions}
                    onChange={handleChange}
                    margin="normal"
                />

                <p style={{ marginTop: 40, marginBottom: 10 }}>Add description:</p>
                <Tinymce initialValue={courseDetail.description} setDescription={setDescription} />
                <br />
                <div style={{ padding: 5, marginBottom: '15px', borderWidth: 2, borderRadius: 10 }}>
                    <p style={{ margin: 5, color: "#636161" }}>Select course languages:</p>
                    {Object.keys(languages).map((lang) => (
                        <FormControlLabel
                            key={lang}
                            control={<Checkbox checked={languages[lang]} onChange={() => handleLanguageChange(lang)} />}
                            label={lang.charAt(0).toUpperCase() + lang.slice(1)} // Capitalize first letter
                        />
                    ))}
                </div>
                <br />
                <div>
                    {/* Custom Choose button */}
                    <div style={{ borderWidth: 3, marginTop: 10, marginBottom: 10 }}>
                        <p style={{ margin: 5, color: "#636161" }}>Select Course Template Image</p>
                        <label htmlFor="file-upload" style={{ padding: 30, display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                            <CloudUploadIcon style={{ marginRight: '5px' }} /> {imageUrl ? "Change Image" : "Upload Image"}
                        </label>
                        <input
                            id="file-upload"
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            style={{ display: 'none' }}
                        />
                    </div>
                    {imageUrl && (
                        <div>
                            <p style={{ color: 'green' }}>Image successfully uploaded</p>
                            <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                <img src={imageUrl} alt="Selected" style={{ width: '400px', height: '300px' }} />
                            </div>
                        </div>
                    )}
                </div>
                <hr />

                <div style={{ marginBottom: '15px', borderWidth: 2, borderRadius: 10 }}>
                    <RadioGroup
                        aria-label="permission"
                        name="permission"
                        value={permission}
                        onChange={handlePermissionChange}
                    >
                        <p style={{ display: "flex", margin: 5 }}>Tip: <span style={{ color: "#F9A4A4" }}>Set your course private until it is fully uploaded (you can modify it anytime).</span></p>
                        <div style={{ margin: 10 }}>
                            <FormControlLabel value="public" control={<Radio />} label="Public" />
                            <FormControlLabel value="private" control={<Radio />} label="Private" />
                        </div>
                    </RadioGroup>
                </div>

                <Button
                    style={{ width: "100%" }}
                    variant="contained"
                    color="primary"
                    onClick={handleSubmit}
                    disabled={loading}
                >
                    {loading ? <CircularProgress size={24} /> : 'Submit'}
                </Button>
            </Box>
        </>
    );
}
