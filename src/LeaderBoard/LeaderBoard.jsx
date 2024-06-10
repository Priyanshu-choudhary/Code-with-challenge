import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Dashboard from '../dashBoard/Dashboard';
import Avatar from '@mui/material/Avatar';
import MyCard from './MyCard';

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
    { field: 'postCount', headerName: 'Question ', width: 150 },
];
export default function LeaderBoard() {
    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [selectedIndex, setSelectedIndex] = useState(null);

    useEffect(() => {
        fetch('https://testcfc.onrender.com/Public/getUser')
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

    return (
        <div style={{ backgroundColor: 'white', color: '#546397' }}>
            <Dashboard />
            <p style={{ fontSize: '40px', fontFamily: 'revert-layer', marginLeft: '50px', fontWeight: 'bold' }}>LeaderBoard</p>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div style={{ height: "80vh", width: '50%', backgroundColor: 'white' }}>
                    {loading ? (
                        <p>Loading...</p>
                    ) : (
                        <DataGrid 
                            rows={rows} 
                            columns={columns} 
                            onRowClick={handleRowClick} // Add this line
                        />
                    )}
                </div>
                <div style={{ padding: '20px' }}>
                    <div className='card'>
                        <MyCard userId={selectedUserId} index={selectedIndex}/> {/* Pass selectedUserId and selectedIndex as props */}
                    </div>
                </div>
            </div>
        </div>
    );
}
