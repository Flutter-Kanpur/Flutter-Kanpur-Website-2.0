import React from 'react';
import { Box, Typography, Card, Divider, Button } from '@mui/material';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import PaymentIcon from '@mui/icons-material/Payment';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';

const PRODUCT_SANS = "'Product Sans', system-ui, -apple-system, sans-serif";

const DetailRow = ({ icon: Icon, children }) => (
    <Box sx={{ display: 'flex', gap: '16px', py: '18px', alignItems: 'flex-start' }}>
        <Box
            sx={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                border: '1.5px solid #4669F2',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                mt: '2px'
            }}
        >
            <Icon sx={{ color: '#4669F2', fontSize: '18px' }} />
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
            {children}
        </Box>
    </Box>
);

const DetailCard = () => {
    return (
        <Card
            sx={{
                width: '100%',
                // bgcolor: '#FFFFFF',
                borderRadius: '32px',
                p: '24px',
                boxShadow: 'none',
                border: '1px solid #E0E0E0',
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            <DetailRow icon={CalendarMonthIcon}>
                <Typography
                    sx={{
                        fontFamily: PRODUCT_SANS,
                        fontSize: '18px',
                        fontWeight:450,
                        color: '#000000',
                    }}
                >
                    Wednesday, Feb 18 · 7:30 AM to 9:00 AM IST
                </Typography>
            </DetailRow>

            <Divider sx={{ borderColor: '#F2F2F2' }} />

            <DetailRow icon={LocationOnOutlinedIcon}>
                <Typography
                    sx={{
                        fontFamily: PRODUCT_SANS,
                        fontSize: '18px',
                        fontWeight: 450,
                        color: '#000000',
                    }}
                >
                    Cubbon Park
                </Typography>
                <Typography
                    sx={{
                        fontFamily: PRODUCT_SANS,
                        fontSize: '18px',
                        fontWeight: 450,
                        color: '#6D6D6D',
                        lineHeight: '1.4',
                    }}
                >
                    XHHW+VP6, Dr Ambedkar Rd, Ambedkar Veedhi, Sampangi Rama Nagar, Bengaluru, Karnataka 560001 · Bangalore
                </Typography>
            </DetailRow>

            <Divider sx={{ borderColor: '#F2F2F2' }} />

            <DetailRow icon={PaymentIcon}>
                <Typography
                    sx={{
                        fontFamily: PRODUCT_SANS,
                        fontSize: '20px',
                        fontWeight: 450,
                        color: '#000000',
                    }}
                >
                    Registration fee : <Box component="span" sx={{ fontWeight: 600 }}>500/-</Box>
                </Typography>
            </DetailRow>

            <Divider sx={{ borderColor: '#F2F2F2' }} />

            <DetailRow icon={GroupOutlinedIcon}>
                <Typography
                    sx={{
                        fontFamily: PRODUCT_SANS,
                        fontSize: '18px',
                        fontWeight: 500,
                        color: '#000000',
                    }}
                >
                    Only 52 slots left
                </Typography>
            </DetailRow>

            <Box sx={{ mt: '12px' }}>
                <Button
                    variant="contained"
                    sx={{
                        bgcolor: '#101010',
                        color: '#FFFFFF',
                        borderRadius: '100px',
                        py: '16px',
                        px: '32px',
                        textTransform: 'none',
                        fontFamily: PRODUCT_SANS,
                        fontSize: '18px',
                        fontWeight: 400,
                        '&:hover': {
                            bgcolor: '#333333',
                        },
                        boxShadow: 'none',
                    }}
                >
                    Register now
                </Button>
            </Box>
        </Card>
    );
};

export default DetailCard;
