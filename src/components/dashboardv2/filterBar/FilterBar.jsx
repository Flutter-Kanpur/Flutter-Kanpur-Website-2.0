import React from 'react';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import { IoFilterOutline } from 'react-icons/io5';

/**
 * FILTER_OPTIONS — config for the 4 pill buttons
 * 'filters' opens the modal; the rest are quick-toggle filters.
 */
const FILTER_OPTIONS = [
    { key: 'filters', label: 'Filters', icon: true },
    { key: 'forYou', label: 'For You' },
    { key: 'announcements', label: 'Announcements' },
    { key: 'upcoming', label: 'Upcoming' },
];

/**
 * FilterBar — horizontal scrollable row of pill-shaped filter buttons.
 *
 * @param {string}   activeFilter     – currently active quick filter key (or null)
 * @param {boolean}  hasModalFilters  – true when modal has active selections
 * @param {function} onQuickFilter    – called with filter key on tap
 * @param {function} onOpenModal      – called when "Filters" pill is tapped
 */
const FilterBar = ({
    activeFilter = null,
    hasModalFilters = false,
    onQuickFilter,
    onOpenModal,
}) => {
    const handleClick = (key) => {
        if (key === 'filters') {
            onOpenModal?.();
        } else {
            // Toggle: tap again to deselect
            onQuickFilter?.(activeFilter === key ? null : key);
        }
    };

    const isActive = (key) => {
        if (key === 'filters') return hasModalFilters;
        return activeFilter === key;
    };

    return (
        <Box
            sx={{
                display: 'flex',
                gap: '10px',
                overflowX: 'auto',
                pb: '4px',
                scrollbarWidth: 'none',
                '&::-webkit-scrollbar': { display: 'none' },
            }}
        >
            {FILTER_OPTIONS.map(({ key, label, icon }) => {
                const active = isActive(key);
                return (
                    <Chip
                        key={key}
                        label={label}
                        icon={icon ? <IoFilterOutline style={{ fontSize: '14px' }} /> : undefined}
                        onClick={() => handleClick(key)}
                        variant="outlined"
                        sx={{
                            flexShrink: 0,
                            borderRadius: '50px',
                            border: `1.5px solid ${active ? '#4F46E5' : '#D1D5DB'}`,
                            bgcolor: active ? '#EEF2FF' : '#FFFFFF',
                            color: active ? '#4F46E5' : '#374151',
                            fontSize: '13px',
                            fontWeight: 600,
                            cursor: 'pointer',
                            whiteSpace: 'nowrap',
                            transition: 'all 0.2s ease',
                            '& .MuiChip-icon': {
                                color: active ? '#4F46E5' : '#374151',
                                ml: '8px',
                            },
                            '&:hover': {
                                bgcolor: active ? '#EEF2FF' : '#F9FAFB',
                            },
                        }}
                    />
                );
            })}
        </Box>
    );
};

export default FilterBar;
