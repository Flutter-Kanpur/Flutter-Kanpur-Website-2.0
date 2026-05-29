import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import { IoSearchOutline, IoMicOutline } from 'react-icons/io5';

/**
 * SearchBar — Presentational "fake" search bar on the Dashboard.
 * Tapping anywhere on it triggers onSearchClick to navigate to SearchScreen.
 *
 * @param {function} onSearchClick – Callback when user taps the bar
 */
const SearchBar = ({ onSearchClick = () => { } }) => {
    return (
        <Box
            onClick={onSearchClick}
            sx={{
                display: 'flex',
                alignItems: 'center',
                bgcolor: '#FAFBFF',
                borderRadius: '50px',
                px: '20px',
                py: '6px',
                boxShadow:
                    '0 4px 18px rgba(79, 70, 229, 0.08), inset 0 1px 2px rgba(255,255,255,0.9)',
                cursor: 'pointer',
                border: '1px solid rgba(79, 70, 229, 0.10)',
                transition: 'box-shadow 0.2s ease',
                '&:hover': {
                    boxShadow:
                        '0 6px 24px rgba(79, 70, 229, 0.12), inset 0 1px 2px rgba(255,255,255,0.9)',
                },
            }}
        >
            <IoSearchOutline
                style={{
                    fontSize: '20px',
                    color: '#9CA3AF',
                    flexShrink: 0,
                    marginRight: '12px',
                }}
            />

            <Typography
                sx={{
                    flex: 1,
                    fontSize: '15px',
                    color: '#9CA3AF',
                    fontWeight: 400,
                    py: '10px',
                    userSelect: 'none',
                }}
            >
                Search for events...
            </Typography>

            <Box
                sx={{
                    height: '24px',
                    width: '1px',
                    bgcolor: '#E5E7EB',
                    mx: '12px',
                    flexShrink: 0,
                }}
            />

            <IoMicOutline
                style={{
                    fontSize: '20px',
                    color: '#9CA3AF',
                    flexShrink: 0,
                }}
            />
        </Box>
    );
};

export default SearchBar;
