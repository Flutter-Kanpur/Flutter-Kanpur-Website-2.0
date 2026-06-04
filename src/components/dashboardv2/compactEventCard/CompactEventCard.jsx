import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';

/**
 * Status tag colour config — shared with EventCard
 */
const statusConfig = {
    upcoming: { label: 'Upcoming', bg: '#E8F5E9', color: '#2E7D32', border: '#A5D6A7' },
    closing: { label: 'Closing soon', bg: '#FFF3E0', color: '#E65100', border: '#FFCC80' },
    closed: { label: 'Closed', bg: '#FFEBEE', color: '#C62828', border: '#EF9A9A' },
};

/**
 * Parse a dateTime string like "Sun, 7 Apr • 4:00 PM" into { day, month }
 */
const parseDateBlock = (dateTime = '') => {
    // Try to extract the day number and month name
    const match = dateTime.match(/(\d{1,2})\s+(\w{3})/);
    if (match) return { day: match[1], month: match[2] };
    return { day: '--', month: '---' };
};

/**
 * CompactEventCard — concise card used in the "Explore More" section.
 *
 * Layout: Date block (day / month) on left  |  Title + tag on right
 *
 * @param {string}   id       – Event ID
 * @param {string}   title    – Event title
 * @param {string}   dateTime – e.g. "Sun, 7 Apr • 4:00 PM"
 * @param {string}   status   – "upcoming" | "closing" | "closed"
 * @param {function} onClick  – Callback when card is tapped
 */
const CompactEventCard = ({
    id,
    title = 'Event Title',
    dateTime = '',
    status = 'upcoming',
    onClick = () => { },
}) => {
    const { day, month } = parseDateBlock(dateTime);
    const tag = statusConfig[status] || statusConfig.upcoming;

    return (
        <Box
            onClick={() => onClick(id)}
            sx={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                bgcolor: '#FFFFFF',
                borderRadius: '16px',
                p: '14px 16px',
                boxShadow: '0 1px 8px rgba(0, 0, 0, 0.06)',
                cursor: 'pointer',
                transition: 'background-color 0.15s ease, box-shadow 0.15s ease',
                border: '1px solid rgba(0, 0, 0, 0.04)',
                '&:hover': {
                    bgcolor: '#F9FAFB',
                    boxShadow: '0 2px 12px rgba(0, 0, 0, 0.1)',
                },
                '&:active': {
                    bgcolor: '#F3F4F6',
                },
            }}
        >
            {/* Date block */}
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    minWidth: '44px',
                }}
            >
                <Typography
                    sx={{
                        fontSize: '22px',
                        fontWeight: 700,
                        color: '#1A1A2E',
                        lineHeight: 1.1,
                    }}
                >
                    {day}
                </Typography>
                <Typography
                    sx={{
                        fontSize: '13px',
                        fontWeight: 500,
                        color: '#5A5A6E',
                        lineHeight: 1.2,
                        textTransform: 'capitalize',
                    }}
                >
                    {month}
                </Typography>
            </Box>

            {/* Divider */}
            <Box
                sx={{
                    width: '1px',
                    height: '36px',
                    bgcolor: '#E5E7EB',
                    flexShrink: 0,
                }}
            />

            {/* Title + Tag */}
            <Box sx={{ flex: 1, minWidth: 0 }}>
                <Typography
                    sx={{
                        fontSize: '15px',
                        fontWeight: 600,
                        color: '#1A1A2E',
                        lineHeight: 1.35,
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                    }}
                >
                    {title}
                </Typography>
                <Chip
                    label={tag.label}
                    size="small"
                    sx={{
                        mt: '6px',
                        bgcolor: tag.bg,
                        color: tag.color,
                        border: `1px solid ${tag.border}`,
                        fontSize: '11px',
                        fontWeight: 600,
                        height: '22px',
                        '& .MuiChip-label': {
                            px: '8px',
                        },
                    }}
                    variant="outlined"
                />
            </Box>
        </Box>
    );
};

export default CompactEventCard;
