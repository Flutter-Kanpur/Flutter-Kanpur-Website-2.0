import React from 'react';
import { Box, Typography } from '@mui/material';
import Image from 'next/image';

const PRODUCT_SANS = "'Product Sans', system-ui, -apple-system, sans-serif";

const TYPOGRAPHY_BASE = {
    fontFamily: PRODUCT_SANS,
    lineHeight: 1.2,
};

const SpeakerCard = ({ speakerData }) => {
    const {
        name = "John Samuel",
        company = "Microsoft",
        image
    } = speakerData || {};
    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
            minWidth: 250,
            cursor: 'pointer',
            transition: 'transform 0.2s ease-in-out',
            '&:hover': {
                transform: 'scale(1.02)'
            }
        }}>
            {/* Image Container */}
            <Box sx={{
                width: '100%',
                aspectRatio: '1 / 1.6',
                borderRadius: '40px',
                overflow: 'hidden',
                backgroundColor: '#F7F7F7',
                position: 'relative',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'flex-end',
                boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.05)'
            }}>
                {image ? (
                    <Image
                        src={image}
                        alt={name}
                        fill
                        placeholder="blur"
                        blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg=="
                        style={{ objectFit: 'cover' }}
                    />
                ) : (
                    <Typography sx={{ ...TYPOGRAPHY_BASE, color: '#bdbdbd', fontSize: '14px' }}>
                        No Image
                    </Typography>
                )}
            </Box>

            {/* Content Area */}
            <Box sx={{ mt: 2, textAlign: 'center' }}>
                <Typography sx={{
                    ...TYPOGRAPHY_BASE,
                    fontSize: '24px',
                    fontWeight: 700,
                    color: '#000000',
                    mb: 0.5
                }}>
                    {name}
                </Typography>
                <Typography sx={{
                    ...TYPOGRAPHY_BASE,
                    fontSize: '18px',
                    fontWeight: 500,
                    color: '#666666'
                }}>
                    {company}
                </Typography>
            </Box>
        </Box>
    );
};

export default SpeakerCard;