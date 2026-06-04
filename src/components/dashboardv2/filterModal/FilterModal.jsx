import React, { useState, useEffect } from 'react';
import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { IoClose } from 'react-icons/io5';

/**
 * FILTER_SECTIONS — defines every section in the modal.
 * multiSelect: true  → user can pick multiple chips
 * multiSelect: false → only one chip active per section
 */
const FILTER_SECTIONS = [
    {
        key: 'status',
        title: 'Status-based',
        multiSelect: false,
        options: ['Flutter', 'Live', 'Today', 'Past'],
    },
    {
        key: 'mode',
        title: 'Mode / Format',
        multiSelect: false,
        options: ['Online', 'Offline'],
    },
    {
        key: 'timeRange',
        title: 'Time-based',
        multiSelect: false,
        options: ['This Week', 'This Month'],
    },
    {
        key: 'access',
        title: 'Access',
        multiSelect: false,
        options: ['Free', 'Open to All'],
    },
    {
        key: 'tags',
        title: 'Interest / Type',
        multiSelect: true,
        options: ['Flutter', 'UI / UX', 'Advanced', 'Beginner Friendly', 'Design'],
    },
];

/** Empty filter state */
const EMPTY_FILTERS = {
    status: null,
    mode: null,
    timeRange: null,
    access: null,
    tags: [],
};

/**
 * FilterModal — slides up from the bottom with filter options (MUI Drawer).
 *
 * @param {boolean}  isOpen    – controls visibility
 * @param {object}   filters   – current filter selections
 * @param {function} onApply   – called with final selections
 * @param {function} onClose   – called to dismiss without applying
 */
const FilterModal = ({ isOpen, filters, onApply, onClose }) => {
    // Local draft so user can change freely before applying
    const [draft, setDraft] = useState({ ...EMPTY_FILTERS, ...filters });

    // Sync draft when parent filters change (e.g. external reset)
    useEffect(() => {
        if (isOpen) setDraft({ ...EMPTY_FILTERS, ...filters });
    }, [isOpen]);

    /* ── Handlers ── */

    const toggleSingle = (sectionKey, value) => {
        setDraft((prev) => ({
            ...prev,
            [sectionKey]: prev[sectionKey] === value ? null : value,
        }));
    };

    const toggleMulti = (sectionKey, value) => {
        setDraft((prev) => {
            const arr = prev[sectionKey] || [];
            return {
                ...prev,
                [sectionKey]: arr.includes(value)
                    ? arr.filter((v) => v !== value)
                    : [...arr, value],
            };
        });
    };

    const clearAll = () => setDraft({ ...EMPTY_FILTERS });

    const handleApply = () => {
        onApply?.(draft);
        onClose?.();
    };

    const isChipActive = (sectionKey, value) => {
        const val = draft[sectionKey];
        if (Array.isArray(val)) return val.includes(value);
        return val === value;
    };

    /** Count of active selections (for badge, etc.) */
    const activeCount = Object.entries(draft).reduce((count, [, val]) => {
        if (Array.isArray(val)) return count + val.length;
        return val ? count + 1 : count;
    }, 0);

    return (
        <Drawer
            anchor="bottom"
            open={isOpen}
            onClose={onClose}
            PaperProps={{
                sx: {
                    maxWidth: '480px',
                    mx: 'auto',
                    borderRadius: '24px 24px 0 0',
                    p: '12px 20px 28px',
                    maxHeight: '75vh',
                    boxSizing: 'border-box',
                },
            }}
            ModalProps={{
                keepMounted: true,
            }}
        >
            {/* Drag handle */}
            <Box sx={{ display: 'flex', justifyContent: 'center', mb: '8px' }}>
                <Box
                    sx={{
                        width: '40px',
                        height: '4px',
                        borderRadius: '4px',
                        bgcolor: '#D1D5DB',
                    }}
                />
            </Box>

            {/* Header */}
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    mb: '20px',
                }}
            >
                <Typography variant="h6" sx={{ m: 0, color: 'text.primary' }}>
                    Filters
                </Typography>

                <IconButton
                    onClick={onClose}
                    size="small"
                    sx={{
                        color: '#6B7280',
                        fontSize: '22px',
                    }}
                >
                    <IoClose />
                </IconButton>
            </Box>

            {/* Filter sections */}
            {FILTER_SECTIONS.map((section) => (
                <Box key={section.key} sx={{ mb: '20px' }}>
                    {/* Section title */}
                    <Typography
                        sx={{
                            m: '0 0 10px 0',
                            fontSize: '14px',
                            fontWeight: 600,
                            color: '#374151',
                        }}
                    >
                        {section.title}
                    </Typography>

                    {/* Chips */}
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                        {section.options.map((option) => {
                            const active = isChipActive(section.key, option);
                            return (
                                <Chip
                                    key={option}
                                    label={option}
                                    onClick={() =>
                                        section.multiSelect
                                            ? toggleMulti(section.key, option)
                                            : toggleSingle(section.key, option)
                                    }
                                    variant="outlined"
                                    sx={{
                                        borderRadius: '50px',
                                        border: `1.5px solid ${active ? '#4F46E5' : '#D1D5DB'}`,
                                        bgcolor: active ? '#EEF2FF' : '#FFFFFF',
                                        color: active ? '#4F46E5' : '#374151',
                                        fontSize: '13px',
                                        fontWeight: 500,
                                        cursor: 'pointer',
                                        transition: 'all 0.15s ease',
                                        whiteSpace: 'nowrap',
                                        '&:hover': {
                                            bgcolor: active ? '#EEF2FF' : '#F9FAFB',
                                        },
                                    }}
                                />
                            );
                        })}
                    </Box>
                </Box>
            ))}

            {/* Footer: Clear All + Apply */}
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    mt: '8px',
                    gap: '12px',
                }}
            >
                <Button
                    variant="text"
                    onClick={clearAll}
                    disabled={activeCount === 0}
                    sx={{
                        fontSize: '14px',
                        fontWeight: 600,
                        color: activeCount > 0 ? 'primary.main' : '#9CA3AF',
                        p: '10px 0',
                        '&:hover': {
                            bgcolor: 'transparent',
                        },
                        '&.Mui-disabled': {
                            color: '#9CA3AF',
                        },
                    }}
                >
                    Clear All
                </Button>

                <Button
                    variant="contained"
                    disableElevation
                    onClick={handleApply}
                    sx={{
                        flex: 1,
                        maxWidth: '200px',
                        py: '14px',
                        px: '24px',
                        borderRadius: '50px',
                        bgcolor: 'secondary.main',
                        color: '#FFFFFF',
                        fontSize: '15px',
                        fontWeight: 600,
                        transition: 'background-color 0.2s ease',
                        '&:hover': {
                            bgcolor: '#2D2D44',
                        },
                    }}
                >
                    Apply Filters{activeCount > 0 ? ` (${activeCount})` : ''}
                </Button>
            </Box>
        </Drawer>
    );
};

export { EMPTY_FILTERS };
export default FilterModal;
