'use client';
import React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import HomeRounded from '@mui/icons-material/HomeRounded';
import Groups from '@mui/icons-material/Groups';
import Explore from '@mui/icons-material/Explore';
import PersonOutline from '@mui/icons-material/PersonOutline';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

const PRIMARY = '#4F46E5';
const INACTIVE = '#9CA3AF';

const tabs = [
    { label: 'Home', value: '/', icon: <HomeRounded /> },
    { label: 'Community', value: '/communityPage', icon: <Groups /> },
    { label: 'Explore', value: '/explore', icon: <Explore /> },
    { label: 'Profile', value: '/profile', icon: <PersonOutline /> },
];

/**
 * BottomNavBar — Fixed bottom navigation with 4 tabs using Next.js routing.
 */
const BottomNavBar = () => {
    const pathname = usePathname();

    // Determine active tab from URL
    const activeTab = tabs.find((t) => t.value === pathname)?.value || '/';

    return (
        <Box
            sx={{
                position: 'fixed',
                bottom: 0,
                left: 0,
                right: 0,
                zIndex: 1200,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >
            <Box
                sx={{
                    width: '100%',
                    maxWidth: '480px',
                    backgroundColor: '#FFFFFF',
                    borderTop: '1px solid #F3F4F6',
                    boxShadow: '0 -2px 10px rgba(0,0,0,0.04)',
                }}
            >
                <BottomNavigation
                    value={activeTab}
                    showLabels
                    sx={{
                        height: 64,
                        backgroundColor: 'transparent',
                        '& .MuiBottomNavigationAction-root': {
                            minWidth: 'auto',
                            py: '8px',
                            color: INACTIVE,
                            '&.Mui-selected': {
                                color: PRIMARY,
                            },
                        },
                        '& .MuiBottomNavigationAction-label': {
                            fontSize: '11px',
                            fontWeight: 500,
                            mt: '2px',
                            '&.Mui-selected': {
                                fontSize: '11px',
                                fontWeight: 600,
                            },
                        },
                    }}
                >
                    {tabs.map((tab) => (
                        <BottomNavigationAction
                            key={tab.value}
                            label={tab.label}
                            value={tab.value}
                            icon={tab.icon}
                            component={Link}
                            href={tab.value}
                        />
                    ))}
                </BottomNavigation>

                {/* iOS-style home indicator */}
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        pb: '8px',
                        pt: '2px',
                    }}
                >
                    <Box
                        sx={{
                            width: 134,
                            height: 5,
                            borderRadius: '100px',
                            backgroundColor: '#1C1C1E',
                        }}
                    />
                </Box>
            </Box>
        </Box>
    );
};

export default BottomNavBar;
