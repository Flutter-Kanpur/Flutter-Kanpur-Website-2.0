import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

/* ────────────────────────────────────────────────────────
 * Helpers
 * ──────────────────────────────────────────────────────── */

/**
 * Returns a greeting based on the current hour.
 *   05–11  → Good Morning!
 *   12–16  → Good Afternoon!
 *   17–04  → Good Evening!
 */
const getGreeting = (hour) => {
    if (hour >= 5 && hour < 12) return 'Good Morning!';
    if (hour >= 12 && hour < 17) return 'Good Afternoon!';
    return 'Good Evening!';
};

/**
 * Formats a Date object as "Month DD, YYYY"
 * e.g. "February 18, 2026"
 */
const formatDate = (date) =>
    date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

/* ────────────────────────────────────────────────────────
 * NavHeader Component
 * ──────────────────────────────────────────────────────── */

/**
 * NavHeader — Top header bar with date and time-based greeting.
 */
const NavHeader = () => {
    const [dateString, setDateString] = useState('');
    const [greeting, setGreeting] = useState('');

    // Only compute date/greeting on the client to avoid hydration mismatch
    useEffect(() => {
        const update = () => {
            const now = new Date();
            setDateString(formatDate(now));
            setGreeting(getGreeting(now.getHours()));
        };
        update();
        const timer = setInterval(update, 60_000);
        return () => clearInterval(timer);
    }, []);

    return (
        <Box sx={{ width: '100%' }}>
            <Typography
                variant="body2"
                sx={{
                    color: 'rgba(255,255,255,0.85)',
                    fontSize: '13px',
                    fontWeight: 500,
                    letterSpacing: '0.2px',
                    lineHeight: 1.4,
                }}
            >
                {dateString}
            </Typography>
            <Typography
                variant="h5"
                sx={{
                    color: '#FFFFFF',
                    fontWeight: 700,
                    fontSize: '22px',
                    lineHeight: 1.3,
                    mt: '2px',
                }}
            >
                {greeting}
            </Typography>
        </Box>
    );
};

export default NavHeader;
