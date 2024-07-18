import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import axios from 'axios';
import Dashboard from '/src/dashBoard/Dashboard';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import CloudUploadIcon from '@mui/icons-material/CloudUpload'; // Example of using an icon
import { useNavigate, useLocation } from 'react-router-dom';
import Tinymce from '/src/TinyMCE/TinyMCE';

export default function ContestEdit() {
    const location = useLocation();
    const { contestDetail = {} } = location.state || {}; // Default to an empty object if contestDetail is undefined

    const [formData, setFormData] = useState({
        nameOfContest: contestDetail.nameOfContest || '',
        nameOfOrganization: contestDetail.nameOfOrganization || '',
        date: contestDetail.date || '',
        description: contestDetail.description || '',
        fee: contestDetail.fee || '',
        bannerImage: contestDetail.bannerImage || '',
        logo: contestDetail.logo || '',
        timeDuration: contestDetail.timeDuration || '',
        type: contestDetail.type || 'Online',
        team: contestDetail.team || [],
        eligibility: contestDetail.eligibility || [],
        rounds: contestDetail.rounds || [],
        rewards: contestDetail.rewards || [],
        faq: contestDetail.faq || [],
        faqAnswer: contestDetail.faqAnswer || [],
        rules: contestDetail.rules || [],
        winners: contestDetail.winners || [],
        language: contestDetail.language || []
    });

    const [alert, setAlert] = useState({ show: false, message: '', severity: '' });
    const [loading, setLoading] = useState(false);
    const isEditMode = !!contestDetail.nameOfContest;

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [id]: value,
        }));
    };

    const handleArrayChange = (e, key) => {
        const { value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [key]: value.split(',').map(item => item.trim()),
        }));
    };

    const handleFileChange = (event, key) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData((prevData) => ({
                    ...prevData,
                    [key]: reader.result,
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleLanguageChange = (event) => {
        const { value, checked } = event.target;
        setFormData((prevData) => {
            const updatedLanguages = checked
                ? [...prevData.language, value]
                : prevData.language.filter(lang => lang !== value);
            return {
                ...prevData,
                language: updatedLanguages,
            };
        });
    };

    const handleSubmit = async () => {
        setLoading(true);
        const apiUrl = isEditMode
            ? `https://hytechlabs.online:9090/Contest/id/${contestDetail.id}`
            : 'https://hytechlabs.online:9090/Contest';
        
        const method = isEditMode ? 'put' : 'post';
        
        try {
            console.log("form data " + JSON.stringify(formData));
            const response = await axios({
                method: method,
                url: apiUrl,
                data: formData,
                headers: {
                    'Content-Type': 'application/json',
                },
                auth: {
                    username: "Contest",
                    password: "Contest",
                },
            });

            setAlert({ show: true, message: `Contest ${isEditMode ? 'updated' : 'created'} successfully!`, severity: 'success' });
        } catch (error) {
            setAlert({ show: true, message: `Failed to ${isEditMode ? 'update' : 'create'} contest`, severity: 'error' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Dashboard />
            <Box className="contest-form-container">
                {alert.show && <Alert severity={alert.severity}>{alert.message}</Alert>}
                <TextField
                    id="nameOfContest"
                    label="Name of Contest"
                    fullWidth
                    value={formData.nameOfContest}
                    onChange={handleChange}
                    margin="normal"
                />
                <TextField
                    id="nameOfOrganization"
                    label="Name of Organization"
                    fullWidth
                    value={formData.nameOfOrganization}
                    onChange={handleChange}
                    margin="normal"
                />
                <TextField
                    id="date"
                    label="Date"
                    type="date"
                    fullWidth
                    value={formData.date}
                    onChange={handleChange}
                    margin="normal"
                    InputLabelProps={{ shrink: true }}
                />
                <p style={{ marginTop: 40, marginBottom: 10 }}>Add description:</p>
                <Tinymce initialValue={formData.description} setDescription={(content) => setFormData({ ...formData, description: content })} />
                <TextField
                    id="fee"
                    label="Fee"
                    fullWidth
                    value={formData.fee}
                    onChange={handleChange}
                    margin="normal"
                />
                <TextField
                    id="team"
                    label="Teams (comma-separated)"
                    fullWidth
                    value={formData.team.join(', ')}
                    onChange={(e) => handleArrayChange(e, 'team')}
                    margin="normal"
                />
                <TextField
                    id="eligibility"
                    label="Eligibility (comma-separated)"
                    fullWidth
                    value={formData.eligibility.join(', ')}
                    onChange={(e) => handleArrayChange(e, 'eligibility')}
                    margin="normal"
                />
                <TextField
                    id="rounds"
                    label="Rounds (comma-separated)"
                    fullWidth
                    value={formData.rounds.join(', ')}
                    onChange={(e) => handleArrayChange(e, 'rounds')}
                    margin="normal"
                />
                <TextField
                    id="rewards"
                    label="Rewards (comma-separated)"
                    fullWidth
                    value={formData.rewards.join(', ')}
                    onChange={(e) => handleArrayChange(e, 'rewards')}
                    margin="normal"
                />
                <TextField
                    id="faq"
                    label="FAQ (comma-separated)"
                    fullWidth
                    value={formData.faq.join(', ')}
                    onChange={(e) => handleArrayChange(e, 'faq')}
                    margin="normal"
                />
                <TextField
                    id="faqAnswer"
                    label="FAQ Answers (comma-separated)"
                    fullWidth
                    value={formData.faqAnswer.join(', ')}
                    onChange={(e) => handleArrayChange(e, 'faqAnswer')}
                    margin="normal"
                />
                <TextField
                    id="rules"
                    label="Rules (comma-separated)"
                    fullWidth
                    value={formData.rules.join(', ')}
                    onChange={(e) => handleArrayChange(e, 'rules')}
                    margin="normal"
                />
                <TextField
                    id="winners"
                    label="Winners (comma-separated)"
                    fullWidth
                    value={formData.winners.join(', ')}
                    onChange={(e) => handleArrayChange(e, 'winners')}
                    margin="normal"
                />
                <TextField
                    id="timeDuration"
                    label="Time Duration (in minutes)"
                    fullWidth
                    value={formData.timeDuration}
                    onChange={handleChange}
                    margin="normal"
                    type="number"
                    InputProps={{ inputProps: { min: 0 } }}
                />
                <div >
                    <FormGroup>
                        <p style={{ marginTop: 40, marginBottom: 10 }}>Select Languages:</p>
                        {['java', 'c', 'cpp', 'python'].map(language => (
                            <FormControlLabel
                                key={language}
                                control={
                                    <Checkbox
                                        checked={formData.language.includes(language)}
                                        onChange={handleLanguageChange}
                                        value={language}
                                    />
                                }
                                label={language}
                            />
                        ))}
                    </FormGroup>
                </div>
                <div>
                    <div style={{ marginTop: 10, marginBottom: 10 }}>
                        <p style={{ margin: 5, color: "#636161" }}>Select Contest Banner Image</p>
                        <label htmlFor="banner-upload" style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                            <CloudUploadIcon style={{ marginRight: '5px' }} /> {formData.bannerImage ? "Change Banner Image" : "Upload Banner Image"}
                        </label>
                        <input
                            id="banner-upload"
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleFileChange(e, 'bannerImage')}
                            style={{ display: 'none' }}
                        />
                    </div>
                    {formData.bannerImage && (
                        <div>
                            <p style={{ color: 'green' }}>Banner image successfully uploaded</p>
                            <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                <img src={formData.bannerImage} alt="Banner" style={{ width: '400px', height: '300px' }} />
                            </div>
                        </div>
                    )}
                </div>

                <div>
                    <div style={{ marginTop: 10, marginBottom: 10 }}>
                        <p style={{ margin: 5, color: "#636161" }}>Select Contest Logo</p>
                        <label htmlFor="logo-upload" style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                            <CloudUploadIcon style={{ marginRight: '5px' }} /> {formData.logo ? "Change Logo" : "Upload Logo"}
                        </label>
                        <input
                            id="logo-upload"
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleFileChange(e, 'logo')}
                            style={{ display: 'none' }}
                        />
                    </div>
                    {formData.logo && (
                        <div>
                            <p style={{ color: 'green' }}>Logo successfully uploaded</p>
                            <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                <img src={formData.logo} alt="Logo" style={{ width: '200px', height: '200px' }} />
                            </div>
                        </div>
                    )}
                </div>

                <Button
                    style={{ width: "100%" }}
                    variant="contained"
                    color="primary"
                    onClick={handleSubmit}
                    disabled={loading}
                >
                    {loading ? <CircularProgress size={24} /> : isEditMode ? 'Edit Contest' : 'Create Contest'}
                </Button>
            </Box>
        </>
    );
}
