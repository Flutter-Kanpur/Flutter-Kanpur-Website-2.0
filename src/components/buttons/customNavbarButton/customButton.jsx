'use client';

import { Button, Typography } from '@mui/material'
import React from 'react'
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';

const CustomButton = ({ style = {}, typographyStyle = {}, text, selected = false, icons = false, light = true, onClick }) => {
    return (
        <Button
            variant="outlined"
            disableElevation
            onClick={onClick}
            sx={{
                ...style,
                minWidth: 69,
                minHeight: 31,
                padding: "5px 17px",
                borderRadius: '3px',
                background: "transparent",
                border: selected
                    ? "0.6px solid"
                    : "1px solid #0F1C25",
                borderImage: selected
                    ? "linear-gradient(90deg, #13FDFD, #FFFFFF) 1"
                    : "none",
                color: "##E5E8EC",
                boxShadow: "none",
                transition: "border 0.3s, color 0.3s"
            }}
        >
            {icons && (
                light ?
                    <LightModeIcon style={{ color: "#E5E8EC", fontSize: 20, marginRight: "8px" }} />
                    :
                    <DarkModeIcon style={{ color: "#E5E8EC", fontSize: 20, marginRight: "8px" }} />
            )}
            <Typography sx={{ ...typographyStyle, fontWeight: 300, textTransform: "none", fontSize: 15, lineHeight: "24px", color: "#E5E8EC" }}>
                {text}
            </Typography>
        </Button>
    )
}

export default CustomButton
