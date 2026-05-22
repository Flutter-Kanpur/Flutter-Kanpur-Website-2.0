import React from 'react';
import { ListItemButton, ListItemIcon, ListItemText, Divider } from '@mui/material';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const ProfileItem = ({ icon, text, onClick, isLast = false, color = "inherit" }) => {
    return (
        <>
            <ListItemButton
                sx={{
                    py: 1.8,
                    px: 2.5,
                    color: color,
                    '&:hover': {
                        backgroundColor: 'rgba(0, 0, 0, 0.02)'
                    }
                }}
                onClick={onClick}
            >
                <ListItemIcon sx={{
                    minWidth: 40,
                    color: color === "inherit" ? "#000" : color,
                }}>
                    {icon}
                </ListItemIcon>
                <ListItemText
                    primary={text}
                    primaryTypographyProps={{
                        fontSize: '0.95rem',
                        fontWeight: 400
                    }}
                />
                <ChevronRightIcon sx={{
                    fontSize: 20,
                    color: color === "red" || color === "#D32F2F" ? color : "rgba(0,0,0,0.3)"
                }} />
            </ListItemButton>
            {!isLast && <Divider sx={{ mx: 2.5, opacity: 0.6 }} />}
        </>
    );
};

export default ProfileItem;
