import { Box, Typography } from '@mui/material'
import React from 'react'
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import NorthEastIcon from '@mui/icons-material/NorthEast';
import PaddingContainer from '../../PaddingContainer';
import Image from 'next/image';
import HeroImage from "@/../public/assets/landing-page-assets/heroImage.svg"

const PRODUCT_SANS = 'var(--font-product-sans), "Product Sans", sans-serif';

const HeroSection = () => {
    return (
        <Box sx={{
            width: '100%',
            background: 'linear-gradient(180deg, #FAFAFA 13%, #9CC8FE 100%)',
            pt: { xs: 8, md: 10 },
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            overflow: 'hidden',
        }}>
            <Box
                sx={{
                    position: 'relative',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                    maxWidth: 900,
                    mx: 'auto',
                    px: 2,
                    mb: { xs: 6, md: 8 },
                }}
            >
                <Typography
                    variant="h1"
                    sx={{
                        fontFamily: PRODUCT_SANS,
                        fontSize: { xs: '40px', sm: '56px', md: '72px' },
                        fontWeight: 700,
                        color: '#000',
                        lineHeight: 1.1,
                        mb: 3,
                    }}
                >
                    A community for people who build with{' '}
                    <Box component="span" sx={{ color: '#4285F4' }}>
                        Flutter
                    </Box>
                </Typography>

                <Typography
                    sx={{
                        fontFamily: PRODUCT_SANS,
                        fontSize: { xs: '16px', md: '20px' },
                        fontWeight: 400,
                        color: '#5F6368',
                        maxWidth: 700,
                        mb: 5,
                        lineHeight: 1.5,
                    }}
                >
                    Flutter Kanpur is a developer-first community focused on learning, building, and growing together through events, collaboration, and real-world practice.
                </Typography>

                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: { xs: 'column', sm: 'row' },
                        gap: 2,
                        alignItems: 'center',
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1,
                            background: '#1D1D1D',
                            color: '#FFF',
                            px: 4,
                            py: 1.8,
                            borderRadius: '100px',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease',
                            '&:hover': {
                                opacity: 0.9,
                                transform: 'translateY(-2px)',
                            },
                        }}
                    >
                        <Typography
                            sx={{
                                fontFamily: PRODUCT_SANS,
                                fontSize: '18px',
                                fontWeight: 400,
                            }}
                        >
                            Join community
                        </Typography>
                        <VisibilityOutlinedIcon sx={{ fontSize: 20 }} />
                    </Box>

                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1,
                            background: '#FFF',
                            color: '#000',
                            border: '1px solid #E2E2E2',
                            px: 4,
                            py: 1.8,
                            borderRadius: '100px',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease',
                            '&:hover': {
                                background: '#F8F9FA',
                                transform: 'translateY(-2px)',
                            },
                        }}
                    >
                        <Typography
                            sx={{
                                fontFamily: PRODUCT_SANS,
                                fontSize: '18px',
                                fontWeight: 400,
                            }}
                        >
                            View events
                        </Typography>
                        <NorthEastIcon sx={{ fontSize: 20 }} />
                    </Box>
                </Box>
            </Box>

            <Box
                sx={{
                    width: '100%',
                    maxWidth: 1200,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'flex-end',
                    lineHeight: 0
                }}
            >
                <Image
                    src={HeroImage}
                    alt="Hero Image"
                    style={{
                        width: '100%',
                        height: 'auto',
                        display: 'block',
                    }}
                />
            </Box>
        </Box>
    )
}

export default HeroSection

