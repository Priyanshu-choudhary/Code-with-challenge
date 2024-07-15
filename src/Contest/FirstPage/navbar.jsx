import React, { useEffect, useState, useContext } from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import FavoriteIcon from '@mui/icons-material/Favorite';
import UpcomingIcon from '@mui/icons-material/Upcoming';
import QuizIcon from '@mui/icons-material/Quiz';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CardMembershipIcon from '@mui/icons-material/CardMembership';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
export default function NavBar({ setnavbar }) {
    const [value, setValue] = React.useState(0);

    useEffect(() => {
        setnavbar(value);
    }, [value])

    return (
        <div  >
            <Box sx={{ width: "auto" }} style={{borderRadius:10,padding: 10}}>
                <BottomNavigation
                    showLabels
                    value={value}
                    onChange={(event, newValue) => {
                        setValue(newValue);
                    }}
                >

                    <BottomNavigationAction label="Upcoming" icon={<UpcomingIcon />} />
                    <BottomNavigationAction label="Recents" icon={<EmojiEventsIcon />} />
                    <BottomNavigationAction label="Favorites" icon={<FavoriteIcon />} />
                    <BottomNavigationAction label="Tests" icon={<AppRegistrationIcon />} />
                    <BottomNavigationAction label="Quiz" icon={<QuizIcon />} />
                    <BottomNavigationAction label="Hackathon" icon={<AccessTimeIcon />} />
                    <BottomNavigationAction label="Certificate" icon={<CardMembershipIcon />} />

                </BottomNavigation>
            </Box>
        </div>
    );
}
