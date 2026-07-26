import { Box, useMediaQuery } from '@mui/material'
import React from 'react'
import Image from "next/image";
import LoginBg from "@/../public/assets/login-page-assets/loginBg.svg";


const WrapperComponent = ({ children, style }) => {
    const query = useMediaQuery('(max-width:600px)');

    return (
        <Box sx={{ height: "100dvh", width: "100%", paddingX: 4, paddingY: 2, ...style }}>
            <Box sx={{ display: !query ? "flex" : 'none', width: "100%", }}>
                <Image src={LoginBg} alt="Login Background" style={{ position: 'relative', height: "95dvh", width: "100%" }} />
            </Box>
            {children}
        </Box>
    )
}

export default WrapperComponent
