import React, { useState, useEffect, useContext } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import CircularProgress from '@mui/material/CircularProgress';
import { UserContext } from '../Context/UserContext';

const ValidationTextFields = () => {
    const { bg, bc, ibg, dark, light, user, password } = useContext(UserContext);
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
        profileImg: '', // Add profileImg to form data
    });
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchUserData = async () => {
            const basicAuth = 'Basic ' + btoa(`${user}:${password}`);
            try {
                const response = await fetch(`https://hytechlabs.online:9090/Public/showUser/${user}`, {
                    method: 'GET',
                });
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
    }, [user, password]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData((prevData) => ({
                    ...prevData,
                    profileImg: reader.result, // Update profileImg with base64 string
                }));
                
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Merge existing data with form data, excluding user and password
        const updatedData = {
            ...formData,
        };

        try {
            const url = 'https://hytechlabs.online:9090/users';
            updatedData.password = password;
            console.log("user>>>> " + user + " password " + password);
            const headers = new Headers();
            headers.set('Content-Type', 'application/json');
            headers.set('Authorization', 'Basic ' + btoa(user + ":" + password));

            const response = await fetch(url, {
                method: 'PUT',
                headers: headers,
                body: JSON.stringify(updatedData),
            });

            if (response.ok) {
                console.log('User updated successfully:');
                alert("Successfully updated!");
                location.reload();
            }
        } catch (error) {
            console.log('Error updating user:', error);
            alert("Unsuccessful update!");
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
                    <input
                        accept="image/*"
                        type="file"
                        onChange={handleFileChange}
                        style={{ margin: '1em 0' }}
                    />
                    {formData.profileImg &&
                        <div style={{position:"absolute",right:0,top:"50%"}}>
                            <img src={`${formData.profileImg}`} alt="profile_img" />
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
