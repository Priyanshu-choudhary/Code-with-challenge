import React, { useState } from 'react';
import { Popover, IconButton, Typography, Button, CircularProgress } from '@mui/material';
import { Notifications as BellIcon } from '@mui/icons-material';
import axios from 'axios';

function NotificationButton() {
    const [anchorEl, setAnchorEl] = useState(null);
    const [healthData, setHealthData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const fetchHealthCheck = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get('http://localhost:9090/Public/HealthCheck');
            setHealthData(response.data);
        } catch (err) {
            setError('Failed to fetch health data');
        } finally {
            setLoading(false);
        }
    };

    const open = Boolean(anchorEl);
    const id = open ? 'notification-popover' : undefined;

    return (
        <div>
            <IconButton
                type="button"
                className="relative ml-auto flex-shrink-0 rounded-full bg-gray-200 p-1 text-gray-400 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                aria-describedby={id}
                onClick={handleClick}
            >
                <span className="sr-only">View notifications</span>
                <BellIcon className="h-6 w-6 text-gray-400  hover:text-white" aria-hidden="true" />
            </IconButton>

            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
                disablePortal={true}
            >
                <div style={{ padding: '16px', width: '300px' }}>
                    <Typography variant="h6">Server Health Status</Typography>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={fetchHealthCheck}
                        style={{ margin: '16px 0' }}
                    >
                        Fetch Health Data
                    </Button>

                    {loading && (
                        <div style={{ textAlign: 'center', marginTop: '16px' }}>
                            <CircularProgress />
                        </div>
                    )}

                    {error && (
                        <Typography color="error" variant="body2" style={{ marginTop: '16px' }}>
                            {error}
                        </Typography>
                    )}

                    {healthData && !loading && (
                        <div>
                            <Typography variant="body1"><strong>Disk Free Space:</strong> {healthData.disk_free_space}</Typography>
                            <Typography variant="body1"><strong>Heap Memory Used:</strong> {healthData.heap_memory_used}</Typography>
                            <Typography variant="body1"><strong>Database Status:</strong> {healthData.database_status}</Typography>
                            <Typography variant="body1"><strong>Disk Total Space:</strong> {healthData.disk_total_space}</Typography>
                            <Typography variant="body1"><strong>Server Status:</strong> {healthData.server_status}</Typography>
                            <Typography variant="body1"><strong>Non-Heap Memory Used:</strong> {healthData.non_heap_memory_used}</Typography>
                            <Typography variant="body1"><strong>Heap Memory Max:</strong> {healthData.heap_memory_max}</Typography>
                            <Typography variant="body1"><strong>CPU Load:</strong> {healthData.cpu_load}</Typography>
                        </div>
                    )}
                </div>
            </Popover>
        </div>
    );
}

export default NotificationButton;

