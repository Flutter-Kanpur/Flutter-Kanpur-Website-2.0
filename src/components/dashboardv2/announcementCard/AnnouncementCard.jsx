'use client';
import React from 'react';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';

/**
 * AnnouncementCard — A card for displaying announcement details.
 * Uses available Firestore fields: category, title, description.
 *
 * @param {string} category    – Announcement category tag (e.g. "Announcement", "Featured Events")
 * @param {string} title       – Announcement title
 * @param {string} description – Announcement body text
 */
const AnnouncementCard = ({
    category = 'Announcement',
    title = 'Announcement Title',
    description = 'Announcement description will appear here.',
}) => {
    return (
        <Card
            elevation={0}
            sx={{
                width: '100%',
                borderRadius: '20px',
                overflow: 'hidden',
                bgcolor: '#FFFFFF',
                boxShadow: '0 2px 16px rgba(0, 0, 0, 0.06), 0 1px 4px rgba(0, 0, 0, 0.04)',
                p: '20px',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                boxSizing: 'border-box',
                border: '1px solid rgba(0, 0, 0, 0.04)',
            }}
        >
            {/* Header: category chip + saved badge */}
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                }}
            >
                <Typography
                    variant="subtitle1"
                    sx={{
                        fontWeight: 700,
                        color: '#1A1A2E',
                        fontSize: '16px',
                        lineHeight: 1.35,
                        flex: 1,
                        pr: '12px',
                    }}
                >
                    {title}
                </Typography>

                <Chip
                    label={category}
                    size="small"
                    sx={{
                        bgcolor: '#EEF2FF',
                        color: '#4F46E5',
                        border: '1px solid #C7D2FE',
                        fontSize: '11px',
                        fontWeight: 600,
                        borderRadius: '8px',
                        height: '26px',
                        flexShrink: 0,
                        '& .MuiChip-label': {
                            px: '10px',
                        },
                    }}
                    variant="outlined"
                />
            </Box>

            {/* Description */}
            <Typography
                variant="body2"
                sx={{
                    color: '#6B7280',
                    fontSize: '14px',
                    lineHeight: 1.5,
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                }}
            >
                {description}
            </Typography>
        </Card>
    );
};

export default AnnouncementCard;
