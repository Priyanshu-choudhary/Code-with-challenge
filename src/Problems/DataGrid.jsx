import React, { useState, useEffect } from 'react';
import { alpha, styled } from '@mui/material/styles';
import { Avatar } from '@mui/material';
import { DataGrid, gridClasses } from '@mui/x-data-grid';
import Dashboard from '../dashBoard/Dashboard';
import { useNavigate } from 'react-router-dom';

const ODD_OPACITY = 0.2;

const StripedDataGrid = styled(DataGrid)(({ theme }) => ({
    [`& .${gridClasses.row}.even`]: {
        backgroundColor: theme.palette.grey[200],
        '&:hover': {
            backgroundColor: alpha(theme.palette.primary.main, ODD_OPACITY),
            '@media (hover: none)': {
                backgroundColor: 'transparent',
            },
        },
        '&.Mui-selected': {
            backgroundColor: alpha(
                theme.palette.primary.main,
                ODD_OPACITY + theme.palette.action.selectedOpacity,
            ),
            '&:hover': {
                backgroundColor: alpha(
                    theme.palette.primary.main,
                    ODD_OPACITY +
                    theme.palette.action.selectedOpacity +
                    theme.palette.action.hoverOpacity,
                ),
                // Reset on touch devices, it doesn't add specificity
                '@media (hover: none)': {
                    backgroundColor: alpha(
                        theme.palette.primary.main,
                        ODD_OPACITY + theme.palette.action.selectedOpacity,
                    ),
                },
            },
        },
    },
}));

const stringToColor = (string) => {
    let hash = 0;
    let i;

    for (i = 0; i < string.length; i += 1) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';

    for (i = 0; i < 3; i += 1) {
        const value = (hash >> (i * 8)) & 0xff;
        color += `00${value.toString(16)}`.slice(-2);
    }

    return color;
};

export default function StripedGrid() {
    const [problems, setProblems] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const navigate = useNavigate(); // Obtain the navigate function from React Router

    const fetchProblems = async () => {
        try {
            const basicAuth = 'Basic ' + btoa(`${"YadiChoudhary"}:${"YadiChoudhary"}`);

            const API_URL = "https://testcfc-1.onrender.com/Posts";
            const response = await fetch(API_URL, {
                method: 'GET', // or 'POST' depending on your API
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': basicAuth
                }
            });
            const data = await response.json();
            setProblems(data);
        } catch (error) {
            console.error("Error fetching problems:", error);
        }
    };

    useEffect(() => {
        fetchProblems();
    }, []);

    const filteredRows = problems.filter(problem =>
        problem.title.toLowerCase().includes(searchValue.toLowerCase())
    );

    const rows = filteredRows.map((problem, index) => ({
        index: index + 1,
        name: problem.title,
        id: problem.id, // Add the question ID to the row data
        col1: problem.title,
        col2: problem.category,
        col3: problem.difficulty,
        ...problem, // Include all problem properties to pass them to the QuestionApi component
    }));

    const columns = [
        { field: 'index', headerName: 'Index', width: 90 },
        { field: 'id', headerName: 'Question ID', width: 130 }, // New column for question ID
        {
            field: 'avatar', headerName: 'User', width: 70, renderCell: (params) => {
                const name = params.row.name;
                const initial = name.charAt(0);
                const color = stringToColor(name);

                return (
                    <Avatar style={{ backgroundColor: color }}>
                        {initial}
                    </Avatar>
                );
            }
        },
        { field: 'col1', headerName: 'Question', width: 350 },
        { field: 'col3', headerName: 'Difficulty', width: 150 },
    ];

    const handleRowClick = (params) => {
        const selectedProblem = problems.find(p => p.id === params.row.id);
        if (selectedProblem) {
            navigate(`/question/${selectedProblem.id}`, { state: selectedProblem });
        }
    };

    return (
        <>
            <Dashboard />
            <div style={{ height: "100vh", width: '100%' }}>
                <input
                    style={{ width: "50%" }}
                    type="text"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    placeholder="Search by name"
                />

                <StripedDataGrid
                    rows={rows}
                    columns={columns}
                    getRowClassName={(params) =>
                        params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'
                    }
                    onRowClick={handleRowClick}
                />
            </div>
        </>
    );
}
