import { Box, Typography } from '@mui/material';
import React from 'react';

const GradientBorderContainer = ({
    children,
    style = {},
    width = '300px',
    height = '40px',
    padding = '20px',
    gap = '12px',
    borderRadius = '8px',
    backgroundColor = '#010A10',
    gradientColors = ['#D9D9D9', '#010A10'],
    gradientDirection = '90deg'
}) => {
    return (
        <Box
            sx={{
                position: 'relative',
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                gap: gap,
                padding: padding,
                borderRadius: borderRadius,
                backgroundColor: backgroundColor,
                minWidth: width,
                minHeight: height,
                '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    borderRadius: borderRadius,
                    padding: '1px',
                    background: `linear-gradient(${gradientDirection}, ${gradientColors[0]}, ${gradientColors[1]})`,
                    WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                    WebkitMaskComposite: 'xor',
                    maskComposite: 'exclude',
                    pointerEvents: 'none'
                },
                ...style
            }}
        >
            {children}
        </Box>
    );
};

export default GradientBorderContainer; 