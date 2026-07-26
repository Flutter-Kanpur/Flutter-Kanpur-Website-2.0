import { flutter_kanpur_statistics } from '@/constants/statistics'
import { Box, Typography } from '@mui/material'
import React from 'react'

const StatsComponent = ({ style = {}, typographyStyle = {}, heading, description }) => {
    return (
        <Box sx={{
            alignItems: "center",
            flexDirection: "row",
            display: "flex",
            justifyContent: "space-evenly",

        }}>
            <Box
                sx={{
                    borderRadius: "7px",
                    padding: "1px", // border thickness
                    background: "linear-gradient(to right, #fff, transparent)", // gradient border
                    display: "inline-block",
                    ...style,
                }}
            >
                <Box
                    sx={{
                        borderRadius: "7px",
                        background: "linear-gradient(90deg, #0F1C25 0%, #010A10 100%)", // updated to match Figma gradient
                        display: "flex",
                        height: "50px",
                        minWidth: "275px",
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center",
                        padding: "30px",
                        gap: "50px"
                    }}
                >
                    <Typography sx={{ ...typographyStyle, fontWeight: 300, fontSize: 20, background: "transparent", lineHeight: "24px", color: "#ffffff" }}>
                        {heading}
                    </Typography>
                    <Typography sx={{ ...typographyStyle, fontWeight: 500, fontSize: 18, lineHeight: "24px", color: "#A6A6A6" }}>
                        {description}
                    </Typography>
                </Box>
            </Box>
        </Box>
    )
}

export default StatsComponent