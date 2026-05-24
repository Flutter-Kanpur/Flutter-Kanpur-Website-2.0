'use client';

import { Box, Typography, Button } from '@mui/material';
import Image from 'next/image';
import React from 'react';

const MobileAppDownload = () => {
    return (
        <Box
            sx={{
                background: "#010A10",
                padding: "80px 20px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center"
            }}>
            {/* Desktop Version */}
            <Box sx={{
                width: "100%",
                maxWidth: "1200px",
                display: { xs: "none", lg: "flex" },
                flexDirection: "row",
                gap: "60px",
                alignItems: "center"
            }}>
                {/* Left Section - App Download Information */}
                <Box sx={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    gap: "40px"
                }}>
                    {/* Heading */}
                    <Box>
                        <Typography
                            sx={{
                                fontSize: { xs: "32px", md: "48px" },
                                fontWeight: "700",
                                color: "#FFFFFF",
                                fontFamily: "Encode Sans, sans-serif",
                                lineHeight: "1.2",
                                marginBottom: "16px"
                            }}
                        >
                            Download Our Mobile App
                        </Typography>

                        <Typography
                            sx={{
                                fontSize: "18px",
                                color: "#E5E8EC",
                                fontFamily: "Encode Sans, sans-serif",
                                lineHeight: "1.5"
                            }}
                        >
                            For the best experience, access all features in our official app.
                        </Typography>
                    </Box>

                    {/* Download Options */}
                    <Box sx={{
                        display: "flex",
                        flexDirection: { xs: "column", md: "row" },
                        gap: "30px",
                        alignItems: "center"
                    }}>
                        {/* QR Code Section */}
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                gap: "16px"
                            }}>
                            <Box
                                sx={{
                                    width: "120px",
                                    height: "120px",
                                    background: "#FFFFFF",
                                    borderRadius: "12px",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center"
                                }}>
                                <Image src="/assets/flutter_kanpur_QR.png" alt='QR' height={100} width={100} />
                            </Box>

                            <Button
                                variant="outlined"
                                sx={{
                                    border: "1px solid #37ABFF",
                                    color: "#FFFFFF",
                                    borderRadius: "8px",
                                    padding: "8px 16px",
                                    fontSize: "14px",
                                    fontWeight: "500",
                                    textTransform: "none",
                                    '&:hover': {
                                        border: "1px solid #37ABFF",
                                        background: "rgba(55, 171, 255, 0.1)"
                                    }
                                }}
                            >
                                Scan to install
                            </Button>
                        </Box>

                        {/* OR Separator */}
                        <Box sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            gap: "16px"
                        }}>
                            <Box sx={{
                                width: "1px",
                                height: "60px",
                                background: "rgba(255,255,255,0.2)"
                            }} />
                            <Typography
                                sx={{
                                    fontSize: "14px",
                                    color: "#FFFFFF",
                                    fontFamily: "Encode Sans, sans-serif",
                                    fontWeight: "500"
                                }}
                            >
                                OR
                            </Typography>
                            <Box sx={{
                                width: "1px",
                                height: "60px",
                                background: "rgba(255,255,255,0.2)"
                            }} />
                        </Box>

                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                gap: "16px"
                            }}>
                            <Box
                                sx={{
                                    width: "120px",
                                    height: "120px",
                                    background: "#FFFFFF",
                                    borderRadius: "12px",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center"
                                }}>
                                <Image src="/assets/playstore.png" alt='QR' height={100} width={100} />
                            </Box>

                            <Button
                                variant="outlined"
                                sx={{
                                    border: "1px solid #37ABFF",
                                    color: "#FFFFFF",
                                    borderRadius: "8px",
                                    padding: "8px 16px",
                                    fontSize: "14px",
                                    fontWeight: "500",
                                    textTransform: "none",
                                    '&:hover': {
                                        border: "1px solid #37ABFF",
                                        background: "rgba(55, 171, 255, 0.1)"
                                    }
                                }}
                            >
                                Search by name
                            </Button>
                        </Box>
                    </Box>

                    <Typography
                        sx={{
                            fontSize: "16px",
                            color: "#A6A6A6",
                            fontFamily: "Encode Sans, sans-serif",
                            lineHeight: "1.5"
                        }}
                    >
                        Our mobile app is faster, smoother, and packed with exclusive features just for you.
                    </Typography>
                </Box>

                <Box
                    sx={{
                        flex: 1,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center"
                    }}>
                    <Box
                        sx={{
                            position: "relative",
                            transform: "rotateY(-15deg) rotateX(5deg)"
                        }}>
                        <img
                            src="/assets/phone_mockup.png"
                            alt="Mobile App Mockup"
                            style={{
                                width: "500px",
                                // height: "",
                                aspectRatio: "0.7",
                                maxWidth: "100%"
                            }}
                        />
                    </Box>
                </Box>
            </Box>

            <Box
                sx={{
                    width: "100%",
                    maxWidth: "1200px",
                    display: { xs: "flex", lg: "none" },
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "40px"
                }}>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center"
                    }}>
                    <Box
                        sx={{
                            position: "relative",
                            transform: "rotateY(-15deg) rotateX(5deg)"
                        }}>
                        <img
                            src="/assets/phone_mockup.png"
                            alt="Mobile App Mockup"
                            style={{
                                width: "500px",
                                // height: "",
                                aspectRatio: "0.7",
                                maxWidth: "100%"
                            }}
                        />
                    </Box>
                </Box>

                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: "30px",
                        textAlign: "center"
                    }}>
                    <Box>
                        <Typography
                            sx={{
                                fontSize: { xs: "28px", sm: "32px" },
                                fontWeight: "700",
                                color: "#FFFFFF",
                                fontFamily: "Encode Sans, sans-serif",
                                lineHeight: "1.2",
                                marginBottom: "16px"
                            }}
                        >
                            Download Our Mobile App
                        </Typography>

                        <Typography
                            sx={{
                                fontSize: "16px",
                                color: "#E5E8EC",
                                fontFamily: "Encode Sans, sans-serif",
                                lineHeight: "1.5",
                                maxWidth: "500px"
                            }}
                        >
                            Experience the full power of Flutter Kanpur on your mobile device. Get instant access to job opportunities, community updates, and exclusive features.
                        </Typography>
                    </Box>

                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: { xs: "column", sm: "row" },
                            gap: "30px",
                            alignItems: "center"
                        }}>
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                gap: "16px"
                            }}>
                            <Box
                                sx={{
                                    width: "120px",
                                    height: "120px",
                                    background: "#FFFFFF",
                                    borderRadius: "12px",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center"
                                }}>
                                <Image src="/assets/flutter_kanpur_QR.png" alt='QR' height={100} width={100} />
                            </Box>

                            <Button
                                variant="outlined"
                                sx={{
                                    border: "1px solid #37ABFF",
                                    color: "#FFFFFF",
                                    borderRadius: "8px",
                                    padding: "8px 16px",
                                    fontSize: "14px",
                                    fontWeight: "500",
                                    textTransform: "none",
                                    '&:hover': {
                                        border: "1px solid #37ABFF",
                                        background: "rgba(55, 171, 255, 0.1)"
                                    }
                                }}
                            >
                                Scan to install
                            </Button>
                        </Box>

                        {/* OR Separator */}
                        <Box sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            gap: "16px"
                        }}>
                            <Box sx={{
                                width: "1px",
                                height: "60px",
                                background: "rgba(255,255,255,0.2)"
                            }} />
                            <Typography
                                sx={{
                                    fontSize: "14px",
                                    color: "#FFFFFF",
                                    fontFamily: "Encode Sans, sans-serif",
                                    fontWeight: "500"
                                }}
                            >
                                OR
                            </Typography>
                            <Box
                                sx={{
                                    width: "1px",
                                    height: "60px",
                                    background: "rgba(255,255,255,0.2)"
                                }} />
                        </Box>

                        {/* Google Play Section */}
                        <Box sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            gap: "16px"
                        }}>
                            <Box sx={{
                                width: "120px",
                                height: "120px",
                                background: "#FFFFFF",
                                borderRadius: "12px",
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                justifyContent: "center",
                                gap: "8px"
                            }}>
                                {/* Google Play Logo */}
                                <Box sx={{
                                    width: "40px",
                                    height: "40px",
                                    background: "linear-gradient(45deg, #4285F4, #34A853, #FBBC05, #EA4335)",
                                    borderRadius: "8px",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center"
                                }}>
                                    <Box sx={{
                                        width: "0",
                                        height: "0",
                                        borderLeft: "8px solid #FFFFFF",
                                        borderTop: "6px solid transparent",
                                        borderBottom: "6px solid transparent"
                                    }} />
                                </Box>

                                <Typography
                                    sx={{
                                        fontSize: "12px",
                                        color: "#000000",
                                        fontFamily: "Encode Sans, sans-serif",
                                        fontWeight: "600"
                                    }}
                                >
                                    Google Play
                                </Typography>
                            </Box>

                            <Button
                                variant="outlined"
                                sx={{
                                    border: "1px solid #37ABFF",
                                    color: "#FFFFFF",
                                    borderRadius: "8px",
                                    padding: "8px 16px",
                                    fontSize: "14px",
                                    fontWeight: "500",
                                    textTransform: "none",
                                    '&:hover': {
                                        border: "1px solid #37ABFF",
                                        background: "rgba(55, 171, 255, 0.1)"
                                    }
                                }}
                            >
                                Search by name
                            </Button>
                        </Box>
                    </Box>

                    {/* Bottom Text */}
                    <Typography
                        sx={{
                            fontSize: "14px",
                            color: "#A6A6A6",
                            fontFamily: "Encode Sans, sans-serif",
                            lineHeight: "1.5",
                            maxWidth: "400px"
                        }}
                    >
                        Our mobile app is faster, smoother, and packed with exclusive features just for you.
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
};

export default MobileAppDownload; 