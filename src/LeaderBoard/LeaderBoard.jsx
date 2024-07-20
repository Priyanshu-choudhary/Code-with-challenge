import React, { useEffect, useState, useContext } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Dashboard from '../dashBoard/Dashboard';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import MyCard from './MyCard';
import { UserContext } from '../Context/UserContext';
import { useNavigate } from 'react-router-dom';
import BoxLoader from '../Loader/BoxLoader';

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
    const [selectedProfileImg, setSelectedProfileImg] = useState(null); // State to store selected profile image URL
    const { ibg, bg, light, role } = useContext(UserContext);
    const navigate = useNavigate();

    // Define an array of usernames to exclude
    const excludeUsers = ["OfficialCources", "ProblemSet","Contest"];

    useEffect(() => {
        fetch('https://hytechlabs.online:9090/Public/getAllUser')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log('Fetched data:', data);

                if (Array.isArray(data)) {
                    const filteredData = data.filter(user => !excludeUsers.includes(user.name));

                    filteredData.sort((a, b) => b.rating - a.rating);

                    const formattedData = filteredData.map((user, index) => ({
                        id: user.id,
                        index: index + 1,
                        avatar: user.profileImg || user.name, // Use profileImg if available, otherwise use name
                        name: user.name,
                        postCount: user.postCount,
                        rating: user.rating,
                        profileImg: user.profileImg, // Include profileImg field
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
        if (selectedUserId === null && rows.length > 0) {
            setSelectedUserId(rows[0].id);
            setSelectedIndex(1);
            setSelectedProfileImg(rows[0].profileImg); // Set the profile image URL
        }
    }, [rows, selectedUserId]);

    const handleRowClick = (params) => {
        setSelectedUserId(params.id);
        setSelectedIndex(params.row.index);
        setSelectedProfileImg(params.row.profileImg); // Set the profile image URL
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
                params.value && params.value.startsWith('http') ? (
                    <Avatar alt={params.row.name} src={params.value} />
                ) : (
                    <Avatar {...stringAvatar(params.value)} />
                )
            ),
        },
        { field: 'name', headerName: 'Name', width: 150 },
        { field: 'postCount', headerName: 'Coding Questions', width: 160 },
        { field: 'rating', headerName: 'Rating', width: 150 },
        {
            field: 'delete',
            headerName: '',
            width: 150,
            renderCell: (params) => (
                role === 'ADMIN' ? (
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
            {loading ?<BoxLoader/>:<div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div style={{ width: '67%', backgroundColor: 'white' }}>
                    {loading ? (
                        <p>Loading...</p>
                    ) : (
                        <ThemeProvider theme={darkTheme}>
                            <DataGrid
                                style={{ backgroundColor: light, color: ibg }}
                                rows={rows}
                                columns={columns}
                                getRowClassName={(params) => params.indexRelativeToCurrentPage === 0 ? 'golden-row' : ''}
                                onRowClick={handleRowClick}
                            />
                        </ThemeProvider>
                    )}
                </div>
                <div style={{ padding: '20px' }}>
                    <div className='card'>
                        <MyCard
                            userId={selectedUserId}
                            index={selectedIndex}
                            navigate={navigate}
                            profileImg={selectedProfileImg} // Pass profileImg URL as prop
                        />
                    </div>
                </div>
            </div>}
        </div>
    );
}
