import React, { useEffect, useState, useContext } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Dashboard from '../dashBoard/Dashboard';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import MyCard from './MyCard';
import { UserContext } from '../Context/UserContext';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});

// Function to generate avatar properties from a string
function stringAvatar(name) {
    const nameParts = name.split(' ');
    const initials = nameParts.length >= 2
        ? `${nameParts[0][0]}${nameParts[1][0]}`
        : `${nameParts[0][0]}`;
    return {
        sx: {
            bgcolor: stringToColor(name),
        },
        children: initials,
    };
}

// Function to generate a color from a string (e.g., a name)
function stringToColor(string) {
    let hash = 0;
    let i;

    for (i = 0; i < string.length; i++) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';

    for (i = 0; i < 3; i++) {
        const value = (hash >> (i * 8)) & 0xff;
        color += `00${value.toString(16)}`.substr(-2);
    }

    return color;
}

export default function LeaderBoard() {
    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [selectedIndex, setSelectedIndex] = useState(null);
    const { ibg, bg, light, role } = useContext(UserContext); // Extract role from UserContext
    const navigate = useNavigate(); // Initialize useNavigate

    useEffect(() => {
        fetch('https://hytechlabs.online:9090/Public/getUser')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log('Fetched data:', data);

                if (Array.isArray(data)) {
                    // Sort users by postCount in descending order
                    data.sort((a, b) => b.postCount - a.postCount);

                    const formattedData = data.map((user, index) => ({
                        id: user.id, // Assuming user.id is the unique ID of the user
                        index: index + 1,
                        avatar: user.name, // Use user.name for the avatar field
                        name: user.name,
                        postCount: user.postCount, // Include the postCount field
                    }));
                    setRows(formattedData);
                } else {
                    console.error('Data is not an array:', data);
                }

                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        // Check if no user is selected and rows array is not empty
        if (selectedUserId === null && rows.length > 0) {
            setSelectedUserId(rows[0].id); // Set the ID of the first user in rows
            setSelectedIndex(1); // Set the index of the first user
        }
    }, [rows, selectedUserId]);

    const handleRowClick = (params) => {
        setSelectedUserId(params.id);
        setSelectedIndex(params.row.index); // Extract the index of the clicked row
        console.log(selectedIndex);
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            fetch(`https://hytechlabs.online:9090/Public/user/id/${id}`, {
                method: 'DELETE',
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    // Remove the deleted user from the state
                    setRows((prevRows) => prevRows.filter((row) => row.id !== id));
                    window.alert('User deleted successfully.');
                })
                .catch(error => {
                    console.error('Error deleting user:', error);
                    window.alert('Failed to delete user.');
                });
        }
    };

    const columns = [
        { field: 'index', headerName: 'Index', width: 100 },
        {
            field: 'avatar',
            headerName: 'Avatar',
            width: 100,
            renderCell: (params) => (
                <Avatar {...stringAvatar(params.value)} />
            ),
        },
        { field: 'name', headerName: 'Name', width: 150 },
        { field: 'postCount', headerName: 'Question', width: 150 },
        {
            field: 'delete',
            headerName: '',
            width: 150,
            renderCell: (params) => (
                role == 'ADMIN' ? (
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => handleDelete(params.row.id)}
                    >
                        Delete
                    </Button>
                ) : null
            ),
        },
    ];

    return (
        <div style={{ backgroundColor: bg, color: ibg }}>
            <Dashboard />
            <p style={{ fontSize: '40px', fontFamily: 'revert-layer', marginLeft: '50px', fontWeight: 'bold' }}>LeaderBoard</p>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div style={{ width: '60%', backgroundColor: 'white' }}>
                    {loading ? (
                        <p>Loading...</p>
                    ) : (
                        <ThemeProvider theme={darkTheme}>
                            <DataGrid
                                style={{ backgroundColor: light, color: ibg }}
                                rows={rows}
                                columns={columns}
                                onRowClick={handleRowClick} // Add this line
                            />
                        </ThemeProvider>
                    )}
                </div>
                <div style={{ padding: '20px' }}>
                    <div className='card'>
                        <MyCard userId={selectedUserId} index={selectedIndex} navigate={navigate} /> {/* Pass selectedUserId, selectedIndex, and navigate as props */}
                    </div>
                </div>
            </div>
        </div>
    );
}
