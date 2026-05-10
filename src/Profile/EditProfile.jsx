import React, { useState, useEffect, useContext } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import CircularProgress from '@mui/material/CircularProgress';
import { UserContext } from '../Context/UserContext';
import axios from 'axios';

const ValidationTextFields = () => {
    const { user, password } = useContext(UserContext);
    const [existingData, setExistingData] = useState({});
    const [formData, setFormData] = useState({
        email: '',
        number: '',
        college: '',
        branch: '',
        year: '',
        skills: '',
        name: user,
        password: password,
        profileImg: '', // URL for the uploaded profile image
    });
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch(`http://localhost:9090/Public/showUser/${user}`);
                const data = await response.json();
                setExistingData(data);
                setFormData(data); // Initialize form data with existing data
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching user data:', error);
                setIsLoading(false);
            }
        };

        fetchUserData();
    }, [user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        if (file) {
            const formData = new FormData();
            formData.append('file', file);

            try {
                const response = await axios.post('http://localhost:9090/Files/upload', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });

                setFormData((prevData) => ({
                    ...prevData,
                    profileImg: response.data.location, // Set the uploaded image URL
                }));
                console.log("Uploaded image URL: ", response.data.location);
                alert('Image uploaded successfully!');
            } catch (error) {
                console.error('Error uploading image:', error.response ? error.response.data : error.message);
                alert('Error uploading image!');
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const updatedData = { ...formData, password };

            const response = await fetch('http://localhost:9090/users', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token'),
                },
                body: JSON.stringify(updatedData),
            });

            if (response.ok) {
                console.log('User updated successfully.');
                alert('Successfully updated!');
                location.reload();
            } else {
                throw new Error('Failed to update user.');
            }
        } catch (error) {
            console.error('Error updating user:', error);
            alert('Unsuccessful update!');
        }
    };

    return (
        isLoading ? (
            <div className="loading-screen">
                <CircularProgress />
            </div>
        ) : (
            <Box
                component="form"
                sx={{
                    '& .MuiTextField-root': { m: 1, width: '25ch' },
                }}
                noValidate
                autoComplete="on"
                onSubmit={handleSubmit}
            >
                <div>
                    <TextField
                        id="standard-required"
                        label="Email"
                        name="email"
                        variant="standard"
                        value={formData.email}
                        onChange={handleChange}
                    />
                    <TextField
                        id="standard-required"
                        label="Phone Number"
                        name="number"
                        type="number"
                        variant="standard"
                        value={formData.number}
                        onChange={handleChange}
                    />
                    <TextField
                        id="standard-required"
                        label="Links"
                        name="links"
                        variant="standard"
                        value={formData.links}
                        onChange={handleChange}
                    />
                    <TextField
                        id="standard-required"
                        label="Branch"
                        name="branch"
                        variant="standard"
                        value={formData.branch}
                        onChange={handleChange}
                    />
                    <TextField
                        id="standard-required"
                        label="Year"
                        name="year"
                        type="number"
                        variant="standard"
                        value={formData.year}
                        onChange={handleChange}
                    />
                    <TextField
                        id="standard-required"
                        label="College"
                        name="college"
                        variant="standard"
                        value={formData.college}
                        onChange={handleChange}
                    />
                    <TextField
                        id="standard-multiline-static"
                        label="Skills"
                        name="skills"
                        multiline
                        rows={3}
                        variant="standard"
                        value={formData.skills}
                        onChange={handleChange}
                    />
                    <Button
                        variant="contained"
                        component="label"
                        style={{ margin: '1em 0' }}
                    >
                        Choose File
                        <input
                            type="file"
                            accept="image/*"
                            hidden
                            onChange={handleFileChange}
                        />
                    </Button>
                    {formData.profileImg &&
                        <div style={{}}>
                            <img src={formData.profileImg} alt="profile_img" style={{ maxWidth: '100%', maxHeight: '100%' }} />
                        </div>
                    }
                    <Button style={{ marginTop: "18%" }} variant="contained" endIcon={<SendIcon />} type="submit">
                        Save
                    </Button>
                </div>
            </Box>
        )
    );
};

export default ValidationTextFields;

