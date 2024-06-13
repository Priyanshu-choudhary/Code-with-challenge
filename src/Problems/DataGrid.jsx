import React, { useState, useEffect, useCallback } from 'react';
import { alpha, styled } from '@mui/material/styles';
import { Avatar, CircularProgress, Grid, Button } from '@mui/material';
import { DataGrid, gridClasses } from '@mui/x-data-grid';
import Dashboard from '../dashBoard/Dashboard';
import { useNavigate } from 'react-router-dom';
import Tags from '../UploadSection/Tags';
import axios from 'axios';

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
    const [isLoading, setIsLoading] = useState(true);
    const [problems, setProblems] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [tagsVisible, setTagsVisible] = useState(false);
    const navigate = useNavigate();
    const [tags, setTags] = useState([]);

    const handleTagsChange = useCallback((selectedTags) => {
        setTags(selectedTags);
    }, []);

    const handleRowClick = (params) => {
        const selectedProblem = problems.find(p => p.id === params.row.id);
        if (selectedProblem) {
            navigate(`/question/${selectedProblem.id}`, { state: selectedProblem });
        }
    };

    const fetchProblems = async (selectedTags = []) => {
        setIsLoading(true);
        setProblems([]);

        try {
            const basicAuth = 'Basic ' + btoa(`${"YadiChoudhary"}:${"YadiChoudhary"}`);
            let API_URL = '';
            if (tags[0] != null) {
                API_URL = "https://testcfc.onrender.com/Posts/filter";
            } else {
                API_URL = "https://testcfc.onrender.com/Posts";
                // API_URL = "http://localhost:9090/Posts";
            }
            if (selectedTags.length > 0) {
                const tagsQuery = selectedTags.join(',');
                API_URL += `?tags=${tagsQuery}&exactMatch=true`;
            }
            const response = await fetch(API_URL, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': basicAuth
                }
            });
            const data = await response.json();
            if (Array.isArray(data)) {
                setProblems(data);
            } else {
                console.error("Fetched data is not an array:", data);
                setProblems([]);
            }
            setIsLoading(false);
        } catch (error) {
            console.error("Error fetching problems:", error);
            setProblems([]);
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchProblems(tags);
    }, [tags]);

    useEffect(() => {
        fetchProblems();
    }, []);

    const handleDelete = async (id) => {
        const confirmed = window.confirm('Are you sure you want to delete this problem?');
        if (confirmed) {
            try {
                const basicAuth = 'Basic ' + btoa(`${"YadiChoudhary"}:${"YadiChoudhary"}`);
                const response = await axios.delete(`https://testcfc.onrender.com/Posts/id/${id}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': basicAuth
                    }
                });
                console.log('Problem deleted:', response.data);
                fetchProblems(); // Refresh the data after deletion
            } catch (error) {
                console.error('Error deleting problem:', error);
                alert('Failed to delete problem.');
            }
        }
    };

    const filteredRows = problems.filter(problem =>
        problem.title.toLowerCase().includes(searchValue.toLowerCase())
    );

    const rows = filteredRows.map((problem, index) => ({
        index: index + 1,
        name: problem.title,
        id: problem.id,
        col1: problem.title,
        col2: problem.category,
        col3: problem.difficulty,
        ...problem,
    }));

    const columns = [
        { field: 'index', headerName: 'Index', width: 90 },
        { field: 'id', headerName: 'Question ID', width: 130 },
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
        {
            field: 'actions',
            headerName: 'Actions',
            width: 150,
            renderCell: (params) => (
                <Button
                    variant="outlined"
                    color="secondary"
                    onClick={(e) => {
                        e.stopPropagation(); // Prevents the row click event
                        handleDelete(params.row.id);
                    }}
                >
                    Delete
                </Button>
            ),
        },
    ];

    return (
        <>
            <Dashboard />
            <div >
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <input
                            style={{ borderWidth: "2px", width: "100%", borderColor: "black", height: "48px" }}
                            type="text"
                            value={searchValue}
                            onChange={(e) => setSearchValue(e.target.value)}
                            placeholder="Search by name"
                        />
                    </Grid>
                    <Grid item xs={4}>
                        {tagsVisible && (
                            <Tags onTagsChange={handleTagsChange} />
                        )}
                    </Grid>
                    <Grid item xs={2}>
                        <Button
                            variant="outlined"
                            onClick={() => setTagsVisible(!tagsVisible)}
                            style={{ height: "48px" }}
                        >
                            {tagsVisible ? 'Hide Tags' : 'Search by Tags'}
                        </Button>
                    </Grid>
                </Grid>
                {isLoading ? (
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                        <CircularProgress />
                    </div>
                ) : (
                    <StripedDataGrid
                        rows={rows}
                        columns={columns}
                        getRowClassName={(params) =>
                            params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'
                        }
                        onRowClick={handleRowClick}
                    />
                )}
            </div>
        </>
    );
}
