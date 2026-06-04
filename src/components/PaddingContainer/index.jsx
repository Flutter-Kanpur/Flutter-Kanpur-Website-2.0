import { Box } from '@mui/material'
import React from 'react'

const PaddingContainer = ({ children, style }) => {
    return (
        <Box sx={{ paddingX: 4, ...style, maxWidth: 1250, mx: 'auto', width: '100%' }}>
            {children}
        </Box>
    )
}

export default PaddingContainer
