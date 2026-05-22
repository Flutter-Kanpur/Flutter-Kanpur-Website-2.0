'use client';

import React from 'react';
import { Box, Typography, IconButton, SvgIcon } from '@mui/material';

const CustomBackIcon = (props) => (
  <SvgIcon {...props} viewBox="0 0 20 20">
    <path d="M17.8123 9.99987C17.8123 10.2485 17.7135 10.487 17.5377 10.6628C17.3619 10.8386 17.1234 10.9374 16.8748 10.9374H5.39039L9.41539 14.9616C9.59151 15.1377 9.69143 15.3766 9.69143 15.6256C9.69143 15.8747 9.59151 16.1136 9.41539 16.2897C9.23927 16.4658 9.0004 16.5648 8.75133 16.5648C8.50225 16.5648 8.26338 16.4658 8.08726 16.2897L2.46226 10.6647C2.37584 10.5776 2.30552 10.4741 2.2582 10.3602C2.21088 10.2462 2.18652 10.124 2.18652 10.0006C2.18652 9.87726 2.21088 9.75509 2.2582 9.64113C2.30552 9.52718 2.37486 9.42368 2.46226 9.33659L8.08824 3.71159C8.17447 3.62438 8.278 3.55521 8.39194 3.50801C8.50588 3.46081 8.628 3.43652 8.75133 3.43652C8.87465 3.43652 8.99677 3.46081 9.11071 3.50801C9.22465 3.55521 9.32818 3.62438 9.41539 3.71159C9.50259 3.79879 9.57177 3.90232 9.61897 4.01626C9.66616 4.1302 9.69045 4.25232 9.69045 4.37565C9.69045 4.49898 9.66616 4.6211 9.61897 4.73504C9.57177 4.84898 9.50259 4.95251 9.41539 5.03971L5.39039 9.06237H16.8748C17.1234 9.06237 17.3619 9.16114 17.5377 9.33696C17.7135 9.51277 17.8123 9.75123 17.8123 9.99987Z" fill="currentColor" />
  </SvgIcon>
);

const GradientHeader = ({
  title,
  onBack,
  variant = "gradient",
  sx = {}
}) => {
  const isPlain = variant === "plain";


  return (
    <Box
      sx={{
        width: '100%',
        height: isPlain ? '64px' : '180px',
        background: isPlain
          ? '#FFFFFF'

          : 'linear-gradient(180deg, rgba(35, 115, 226, 0.4) 0%, rgba(255, 255, 255, 0) 100%)',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        pt: isPlain ? '16px' : '52px',
        pb: 0,
        mb: isPlain ? 0 : '-80px',
        mt: isPlain ? 6 : 0,
        position: 'relative',
        zIndex: 10,
        pointerEvents: 'none',
        color: '#1F1F1F',
        ...sx
      }}
    >
      {onBack && (
        <IconButton
          onClick={onBack}
          sx={{
            position: 'absolute',
            left: 16,
            top: isPlain ? '14px' : '50px',
            color: '#1F1F1F',
            bgcolor: 'transparent',
            padding: '8px',
            pointerEvents: 'auto',
            '&:hover': { bgcolor: 'rgba(0, 0, 0, 0.04)' }
          }}
        >
          <CustomBackIcon sx={{ fontSize: '20px' }} />
        </IconButton>
      )}

      <Typography
        variant="h6"
        sx={{
          fontWeight: 600,
          fontFamily: 'var(--font-product-sans), "Product Sans"',
          fontSize: '19px',
          lineHeight: '32px',
          marginLeft: 3
        }}
      >
        {title}
      </Typography>
    </Box>
  );
};

export default GradientHeader;