import React from 'react';
import Box from '@mui/material/Box';
import NavHeader from '../navHeader/NavHeader';
import SearchBar from '../searchBar/SearchBar';
import UpdateCard from '../updateCard/UpdateCard';
import CardContainer from '../cardContainer/CardContainer';

/**
 * Dashboard - Mobile dashboard wrapper with gradient background
 *
 * @param {Array}          events        - Event objects to pass to CardContainer
 * @param {Array}          announcements - Announcement objects for the Announcements filter
 * @param {boolean}        loading       - Whether events are still loading
 * @param {function}       onSearchClick - Callback when search bar is tapped
 * @param {React.ReactNode} children     - Extra sections rendered below
 */
const Dashboard = ({ events = [], announcements = [], loading = false, onSearchClick, children }) => {
    return (
        <Box
            sx={{
                width: '100%',
                maxWidth: '480px',
                minHeight: '100vh',
                mx: 'auto',
                position: 'relative',
                p: '24px 16px 80px',
                display: 'flex',
                flexDirection: 'column',
                gap: '20px',
                boxSizing: 'border-box',
                overflowX: 'hidden',
                '&::before': {
                    content: '""',
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100vh',
                    background: 'linear-gradient(180deg, #2373E2 0%, #FFFFFF 35%)',
                    zIndex: -1,
                    pointerEvents: 'none',
                },
            }}
        >
            <NavHeader />
            <SearchBar onSearchClick={onSearchClick} />
            <UpdateCard />
            <CardContainer events={events} announcements={announcements} loading={loading} />
            {children}
        </Box>
    );
};

export default Dashboard;
