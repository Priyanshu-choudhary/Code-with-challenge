import React, { useState, useEffect, useCallback, useContext } from 'react';
import { alpha, styled, createTheme, ThemeProvider } from '@mui/material/styles';
import { Avatar, CircularProgress, Grid, Button } from '@mui/material';
import { DataGrid, gridClasses } from '@mui/x-data-grid';
import Dashboard from '../dashBoard/Dashboard';
import { useNavigate } from 'react-router-dom';
import Tags from '../UploadSection/Tags';
import axios from 'axios';
import { UserContext } from '../Context/UserContext';
import IconBreadcrumbs from '../dashBoard/BreadCrumb';


const ODD_OPACITY = 0.2;

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});
   
const StripedDataGrid = styled(DataGrid)(({ theme }) => ({
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
    const { bg, bc, ibg, dark, light, user, password, role } = useContext(UserContext);
    const [titleBreadCumb, settitleBreadCumb] = useState('');
    const [currentPage, setcurrentPage] = useState("Problem Set");
    const [navHistory, setNavHistory] = useState([]); // Assuming you have this state to track navigation history
    const [description, setDescription] = useState(''); // Assuming you have this state for course description

    const handleTagsChange = useCallback((selectedTags) => {
        setTags(selectedTags);
    }, []);

    const handleRowClick = (params) => {
        const selectedProblem = problems.find(p => p.id === params.row.id);
        settitleBreadCumb(selectedProblem);
        if (selectedProblem) {
            navigate(`/question/${selectedProblem.id}`, {
                state: {
                    problems,
                    currentIndex: params.row.index - 1, // Adjusted for 0-based index
                    navHistory,
                    currentPage,
                    CourseDescription: description,
                    totalProblems: problems.length // Pass the total number of problems
                }
            });
        }
    };

    const fetchProblems = async (selectedTags = []) => {
        setIsLoading(true);

        try {
            const basicAuth = 'Basic ' + btoa('ProblemSet:ProblemSet');
            let API_URL = 'https://testcfc.onrender.com/Posts';

            if (selectedTags.length > 0) {
                const tagsQuery = selectedTags.map(tag => `tags=${encodeURIComponent(tag)}`).join('&');
                API_URL = `https://testcfc.onrender.com/Posts/filter?${tagsQuery}&exactMatch=true`;
            }

            // Check if there is cached data in local storage
            const cachedData = localStorage.getItem('cachedProblems');
            const cachedLastModified = localStorage.getItem('cachedProblemsLastModified');
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': basicAuth
            };

            // Add If-Modified-Since header conditionally
            if (cachedLastModified && cachedLastModified !== 'null') {
                headers['If-Modified-Since'] = cachedLastModified;
            }

            console.log('API_URL:', API_URL); // Log the URL
            console.log('Headers:', headers); // Log the headers

            const response = await fetch(API_URL, {
                method: 'GET',
                headers: headers
            });

            console.log('Response status:', response.status);

            if (response.status == 204) {
                setProblems([]);
            } else if (response.status === 304 && cachedData) {
                // Server indicates data has not been modified
                const parsedCachedData = JSON.parse(cachedData);
                setProblems(parsedCachedData);
            } else if (response.ok) {
                // Data has been modified or first fetch
                const data = await response.json();
                if (Array.isArray(data)) {
                    setProblems(data);
                    // Cache the fetched data and last modified date
                    localStorage.setItem('cachedProblems', JSON.stringify(data));
                    localStorage.setItem('cachedProblemsLastModified', response.headers.get('Last-Modified'));
                } else {
                    console.error("Fetched data is not an array:", data);
                    setProblems([]);
                }
            } else {
                console.error('Error fetching problems:', response.statusText);
                setProblems([]);
            }

            setIsLoading(false);
        } catch (error) {
            console.error("Error fetching problems:", error);
            setIsLoading(false);
        }
    };



    useEffect(() => {
        fetchProblems(tags);
    }, [tags]);

    useEffect(() => {
        fetchProblems();
    }, []);

    useEffect(() => {
        // Attempt to fetch problems
        fetchProblems(tags)
            .catch(error => {
                console.error("Error fetching problems:", error);
            });

        // Use cached data immediately if available
        const cachedData = localStorage.getItem('cachedProblems');
        if (cachedData) {
            setProblems(JSON.parse(cachedData));
            setIsLoading(false);
        }
    }, [tags]);

    const handleDelete = async (id) => {
        const confirmed = window.confirm('Are you sure you want to delete this problem?');
        if (confirmed) {
            try {
                const basicAuth = 'Basic ' + btoa(`${"ProblemSet"}:${"ProblemSet"}`);
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

    let columns = [
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
    ];

    if (role === 'ADMIN') {
        columns.push({
            field: 'actions',
            headerName: 'Actions',
            width: 150,
            renderCell: (params) => (
                <Button
                    style={{ backgroundColor: bc, color: ibg }}
                    onClick={(e) => {
                        e.stopPropagation(); // Prevents the row click event
                        handleDelete(params.row.id);
                    }}
                >
                    Delete
                </Button>
            ),
        });
    }

    return (
        <div style={{ backgroundColor: dark, color: ibg }}>
            <Dashboard />
            <IconBreadcrumbs currentPage={currentPage} title={titleBreadCumb.title} />

            <div>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <input
                            style={{ color: ibg, backgroundColor: light, marginLeft: "100px", borderWidth: "2px", width: "100%", borderColor: bc, height: "48px" }}
                            type="text"
                            value={searchValue}
                            onChange={(e) => setSearchValue(e.target.value)}
                            placeholder="  Search by name"
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
                    <ThemeProvider theme={darkTheme}>
                        <StripedDataGrid
                            style={{ backgroundColor: light, color: ibg }}
                            rows={rows}
                            columns={columns}
                            getRowClassName={(params) =>
                                params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'
                            }
                            onRowClick={handleRowClick}
                        />
                    </ThemeProvider>
                )}
            </div>
        </div>

    );
}
