import React from 'react'
import { Box, Typography, Button } from '@mui/material'

const PRODUCT_SANS = "'Product Sans', system-ui, -apple-system, sans-serif"

const ProductText = ({ children, sx, ...props }) => (
    <Typography sx={{ fontFamily: PRODUCT_SANS, ...sx }} {...props}>
        {children}
    </Typography>
)

const OverlappingCircles = ({ colors, dashed = false }) => (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
        {colors.map((color, index) => (
            <Box
                key={index}
                sx={{
                    width: { xs: 40, md: 56 },
                    height: { xs: 40, md: 56 },
                    borderRadius: '50%',
                    backgroundColor: dashed ? '#F5F5F5' : color,
                    border: dashed ? '1px dashed #CCC' : 'none',
                    marginLeft: index === 0 ? 0 : { xs: -1.5, md: -2 },
                    zIndex: index
                }}
            />
        ))}
    </Box>
)

const ReadyToGrowSection = () => {
    const leftColors = ['#7B7BFF', '#28C04E', '#3D6BFF', '#F7E34E', '#D13431']
    const dashedColors = [null, null, null, null]

    return (

        <Box sx={{
            backgroundColor: '#FFF',
            borderRadius: '40px',
            padding: { xs: '60px 20px', md: '100px 40px' },
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            gap: 4,
            width: '100%'
        }}>
            {/* Visual Illustration */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1, md: 2 } }}>
                <OverlappingCircles colors={leftColors} />
                <ProductText sx={{
                    fontSize: { xs: 24, md: 32 },
                    fontWeight: 300,
                    color: '#BBB',
                    mx: 1
                }}>
                    +
                </ProductText>
                <OverlappingCircles colors={dashedColors} dashed />
            </Box>

            {/* Content */}
            <Box sx={{ maxWidth: '800px', display: 'flex', flexDirection: 'column', gap: 2 }}>
                <ProductText variant="h2" sx={{
                    fontSize: 40,
                    fontWeight: 700,
                    color: '#000',
                    lineHeight: 1.1
                }}>
                    Ready to Grow with Flutter Kanpur?
                </ProductText>
                <ProductText sx={{
                    fontSize: 18,
                    color: '#6d6d6d',
                    lineHeight: 1.6,
                    maxWidth: '600px',
                    margin: '0 auto'
                }}>
                    Join events, practice daily, and contribute to the community. Join events, practice daily, and contribute to the community.
                </ProductText>
            </Box>

            {/* CTA */}
            <Button sx={{
                backgroundColor: '#1A1A1A',
                color: '#FFF',
                padding: '16px 48px',
                borderRadius: '100px',
                textTransform: 'none',
                fontSize: '18px',
                fontFamily: PRODUCT_SANS,
                fontWeight: 500,
                mt: 2,
                '&:hover': {
                    backgroundColor: '#333'
                }
            }}>
                Join community
            </Button>
        </Box>
    )
}

export default ReadyToGrowSection