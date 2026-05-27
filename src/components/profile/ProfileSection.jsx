import React from 'react';
import { Box, Typography, Paper } from '@mui/material';

const ProfileSection = ({ title, children }) => {
    return (
        <Box mb={4}>
            <Typography
                variant="subtitle2"
                sx={{ mb: 1.5, fontWeight: 500, color: "#6b6b6b", px: 0.5 }}
            >
                {title}
            </Typography>

            <Paper
                elevation={0}
                sx={{
                    borderRadius: 4,
                    backgroundColor: "#F6F6F6",
                    overflow: "hidden",
                }}
            >
                {children}
            </Paper>
        </Box>
    );
};

export default ProfileSection;
