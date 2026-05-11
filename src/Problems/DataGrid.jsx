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
import BoxLoader from '../Loader/BoxLoader';


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

const PAGE_SIZE = 50;

export default function StripedGrid() {
    const [isLoading, setIsLoading] = useState(true);
    const [problems, setProblems] = useState([]);
    const [rowCount, setRowCount] = useState(0);
    const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: PAGE_SIZE });
    const [searchValue, setSearchValue] = useState('');
    const [tagsVisible, setTagsVisible] = useState(false);
    const [tags, setTags] = useState([]);
    const navigate = useNavigate();
    const { bg, bc, ibg, dark, light, user, password, role } = useContext(UserContext);
    const [titleBreadCumb, settitleBreadCumb] = useState('');
    const [currentPage, setcurrentPage] = useState("Problem Set");
    const [navHistory, setNavHistory] = useState([]);
    const [description, setDescription] = useState('');

    const handleTagsChange = useCallback((selectedTags) => {
        setTags(selectedTags);
        setPaginationModel(m => ({ ...m, page: 0 }));
    }, []);

    const handleRowClick = (params) => {
        const selectedProblem = problems.find(p => p.id === params.row.id);
        settitleBreadCumb(selectedProblem);
        if (selectedProblem) {
            navigate(`/question/${selectedProblem.id}`, {
                state: {
                    problems,
                    currentIndex: params.row.index - 1,
                    navHistory,
                    currentPage,
                    CourseDescription: description,
                    totalProblems: rowCount
                }
            });
        }
    };

    const fetchProblems = async (selectedTags = [], pageModel = paginationModel) => {
        setIsLoading(true);
        try {
            let data, total;
            if (selectedTags.length > 0) {
                const tagsQuery = selectedTags.map(tag => `tags=${encodeURIComponent(tag)}`).join('&');
                const url = `${import.meta.env.VITE_API_URL}/Posts/filter?${tagsQuery}&exactMatch=true&username=ProblemSet`;
                const res = await fetch(url);
                if (res.status === 204) { setProblems([]); setRowCount(0); setIsLoading(false); return; }
                if (!res.ok) { setProblems([]); setIsLoading(false); return; }
                data = await res.json();
                total = Array.isArray(data) ? data.length : 0;
            } else {
                const url = `${import.meta.env.VITE_API_URL}/Posts/username/ProblemSet/posts?page=${pageModel.page}&size=${pageModel.pageSize}`;
                const res = await fetch(url);
                if (res.status === 204) { setProblems([]); setRowCount(0); setIsLoading(false); return; }
                if (!res.ok) { setProblems([]); setIsLoading(false); return; }
                const pageData = await res.json();
                data = pageData.content ?? [];
                total = pageData.totalElements ?? 0;
            }
            setProblems(Array.isArray(data) ? data : []);
            setRowCount(typeof total === 'number' ? total : 0);
        } catch (error) {
            console.error("Error fetching problems:", error);
            setProblems([]);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchProblems(tags, paginationModel);
    }, [tags, paginationModel.page, paginationModel.pageSize]);

    const handleDelete = async (id) => {
        const confirmed = window.confirm('Are you sure you want to delete this problem?');
        if (confirmed) {
            try {
                const basicAuth = 'Bearer ' + localStorage.getItem('token');
                const response = await axios.delete(`${import.meta.env.VITE_API_URL}/Posts/id/${id}`, {
                    headers: {
                        'Content-Type': 'application/json',

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

    const pageOffset = tags.length > 0 ? 0 : paginationModel.page * paginationModel.pageSize;
    const rows = filteredRows.map((problem, index) => ({
        index: pageOffset + index + 1,
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
                    <BoxLoader />
                ) : (
                    <ThemeProvider theme={darkTheme}>
                        <StripedDataGrid
                            style={{ backgroundColor: light, color: ibg }}
                            rows={rows}
                            columns={columns}
                            rowCount={rowCount}
                            paginationMode={tags.length > 0 ? 'client' : 'server'}
                            paginationModel={paginationModel}
                            onPaginationModelChange={setPaginationModel}
                            pageSizeOptions={[25, 50, 100]}
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

