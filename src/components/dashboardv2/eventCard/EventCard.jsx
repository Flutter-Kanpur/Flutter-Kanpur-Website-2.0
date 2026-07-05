'use client';
import React, { useState } from 'react';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import { IoArrowForward, IoLocationOutline, IoCalendarOutline } from 'react-icons/io5';

/**
 * EventCard - A reusable event card template
 *
 * @param {string} status - "upcoming" | "closing" | "closed"
 * @param {string} posterImage - Path to poster image
 * @param {string} title - Event title
 * @param {string} dateTime - Date and time string (e.g. "Sun, 7 Apr • 4:00 PM")
 * @param {string} location - Event location
 * @param {string} description - Event description text
 * @param {function} onViewDetails - Callback for "View details" button
 * @param {number} descriptionMaxLength - Character limit before truncation (default 120)
 */
const EventCard = ({
    status = 'upcoming',
    posterImage = './we.png',
    title = 'From Figma to Flutter: Practical Workflow',
    dateTime = 'Sun, 7 Apr • 4:00 PM',
    location = 'Kanpur',
    description = 'This session focuses on building the Flutter applications that scale in real-world scenario. Learn practical tips and techniques from industry experts.',
    onViewDetails = () => { },

    descriptionMaxLength = 120,
}) => {
    const [showFullDescription, setShowFullDescription] = useState(false);

    // --- Status tag config ---
    const statusConfig = {
        upcoming: {
            label: 'Upcoming',
            bg: '#E8F5E9',
            color: '#2E7D32',
            border: '#A5D6A7',
        },
        closing: {
            label: 'Registration closes soon',
            bg: '#FFF3E0',
            color: '#E65100',
            border: '#FFCC80',
        },
        closed: {
            label: 'Closed',
            bg: '#FFEBEE',
            color: '#C62828',
            border: '#EF9A9A',
        },
    };

    const currentStatus = statusConfig[status] || statusConfig.upcoming;

    const isTruncated = description.length > descriptionMaxLength;
    const displayedDescription =
        showFullDescription || !isTruncated
            ? description
            : description.slice(0, descriptionMaxLength) + '....';

    return (
        <Card
            elevation={0}
            sx={{
                width: '100%',
                maxWidth: '100%',
                minWidth: 0,
                borderRadius: '24px',
                overflow: 'hidden',
                bgcolor: '#FFFFFF',
                boxShadow: '0 4px 24px rgba(0, 0, 0, 0.08), 0 1px 4px rgba(0, 0, 0, 0.04)',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                boxSizing: 'border-box',
                pt: '10px',
            }}
        >
            {/* Poster with status tag */}
            <Box sx={{ width: '100%', minWidth: 0, flexShrink: 0, display: 'flex', justifyContent: 'center' }}>
                <Box sx={{ position: 'relative', width: '90%', height: '220px', borderRadius: '16px', overflow: 'hidden' }}>
                    <Chip
                        label={currentStatus.label}
                        sx={{
                            position: 'absolute',
                            top: '14px',
                            left: '14px',
                            zIndex: 1,
                            bgcolor: currentStatus.bg,
                            color: currentStatus.color,
                            border: `1.5px solid ${currentStatus.border}`,
                            borderRadius: '50px',
                            px: '10px',
                            fontSize: '13px',
                            fontWeight: 600,
                            letterSpacing: '0.2px',
                            height: 'auto',
                            '& .MuiChip-label': {
                                px: '8px',
                                py: '6px',
                            },
                        }}
                        variant="outlined"
                    />
                    <Box
                        component="img"
                        src={posterImage}
                        alt={title}
                        sx={{
                            width: '100%',
                            height: '100%',
                            minWidth: 0,
                            objectFit: 'cover',
                            objectPosition: 'center',
                            display: 'block',
                            verticalAlign: 'top',
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            zIndex: 0,
                        }}
                    />
                </Box>
            </Box>

            {/* Content */}
            <Box sx={{ p: '20px 22px 22px', display: 'flex', flexDirection: 'column', gap: '10px', flex: 1 }}>
                {/* Title */}
                <Typography variant="h6" sx={{ color: 'text.primary', m: 0 }}>
                    {title}
                </Typography>

                {/* Date & Location */}
                <Typography
                    component="p"
                    sx={{
                        fontSize: '14px',
                        fontWeight: 500,
                        color: 'success.main',
                        m: 0,
                        lineHeight: 1.4,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                        flexWrap: 'wrap',
                    }}
                >
                    <IoCalendarOutline style={{ fontSize: '15px', flexShrink: 0 }} />
                    {dateTime}
                    <Box component="span" sx={{ mx: '2px', opacity: 0.6 }}>•</Box>
                    <IoLocationOutline style={{ fontSize: '15px', flexShrink: 0 }} />
                    {location}
                </Typography>

                {/* Description with see more */}
                <Typography variant="body1" sx={{ color: 'text.secondary', m: 0 }}>
                    {displayedDescription}
                    {isTruncated && (
                        <Button
                            variant="text"
                            size="small"
                            onClick={() => setShowFullDescription(!showFullDescription)}
                            sx={{
                                color: '#4285F4',
                                fontWeight: 600,
                                p: 0,
                                fontSize: '14px',
                                display: 'inline',
                                ml: '2px',
                                minWidth: 'auto',
                                verticalAlign: 'baseline',
                                '&:hover': {
                                    bgcolor: 'transparent',
                                },
                            }}
                        >
                            {showFullDescription ? 'see less' : 'see more'}
                        </Button>
                    )}
                </Typography>

                {/* View details button */}
                <Button
                    variant="contained"
                    disableElevation
                    onClick={onViewDetails}
                    endIcon={<IoArrowForward style={{ fontSize: '17px' }} />}
                    sx={{
                        width: '100%',
                        py: '14px',
                        px: '24px',
                        mt: '8px',
                        borderRadius: '50px',
                        bgcolor: 'secondary.main',
                        color: '#FFFFFF',
                        fontSize: '15px',
                        fontWeight: 600,
                        letterSpacing: '0.3px',
                        transition: 'background-color 0.25s ease, transform 0.15s ease',
                        '&:hover': {
                            bgcolor: '#2D2D44',
                            transform: 'translateY(-1px)',
                        },
                    }}
                >
                    View details
                </Button>
            </Box>
        </Card>
    );
};

export default EventCard;
