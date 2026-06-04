'use client';

import { Box, Typography, Button } from '@mui/material';
import React, { useState } from 'react';
import ContactUs from './ContactUs';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
// import ApplyNowButton from '../buttons/ApplyNowButton';

const BlogAndContact = ({ blogs }) => {



    const blogPosts = [
        {
            title: "Mastering Flutter UI: Expert Tips & Tricks",
            description: "Want to build sleek, responsive Flutter apps? This guide dives into best practices, advanced widgets, and expert techniques to take your UI game to the next level.",
            author: "Sarah Fatima",
            authorImage: "/assets/author1.jpg" // You can add actual images later
        },
        {
            title: "Why Flutter is the Future of Cross-Platform Dev",
            description: "Explore why Flutter stands out in the cross-platform race, offering faster development, beautiful UI, and native performance — all with a single codebase.",
            author: "John Developer",
            authorImage: "/assets/author2.jpg" // You can add actual images later
        }
    ];

    const blogData = blogs?.length ? blogs : blogPosts;
    const router = useRouter();

    // (blogData, "blogData");

    return (
        <Box sx={{
            // background: "#010A10",
            padding: "80px 20px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
        }}>
            <Box sx={{
                width: "100%",
                maxWidth: "1200px",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start"
            }}>
                {/* Header Section */}
                <Box sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "left",

                }}>
                    {/* Left Button */}
                    <Button
                        onClick={() => window.location.href = '/blog2'}
                        variant="outlined"
                        sx={{
                            border: "1px solid rgba(255,255,255,0.2)",
                            color: "#FFFFFF",
                            borderRadius: "8px",
                            width: "130px",
                            padding: "8px 16px",
                            fontSize: "14px",
                            fontWeight: "500",
                            textTransform: "none",
                            '&:hover': {
                                border: "1px solid rgba(255,255,255,0.4)",
                                background: "rgba(255,255,255,0.05)"
                            }
                        }}
                    >
                        Explore more
                    </Button>

                    {/* Center Heading */}
                    <Typography
                        sx={{
                            marginTop: "20px",
                            fontSize: { xs: "24px", md: "32px" },
                            fontWeight: "700",
                            color: "#FFFFFF",
                            textAlign: "center",
                            fontFamily: "Encode Sans, sans-serif"
                        }}
                    >
                        Learn, Share & Inspire
                    </Typography>

                    {/* Right Button */}
                    <Button
                        variant="outlined"
                        sx={{
                            visibility: 'hidden',
                            border: "1px solid rgba(255,255,255,0.2)",
                            color: "#FFFFFF",
                            borderRadius: "8px",
                            padding: "8px 16px",
                            fontSize: "14px",
                            fontWeight: "500",
                            textTransform: "none",
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                            '&:hover': {
                                border: "1px solid rgba(255,255,255,0.4)",
                                background: "rgba(255,255,255,0.05)"
                            }
                        }}
                    >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke="currentColor" strokeWidth="2" fill="none" />
                            <polyline points="14,2 14,8 20,8" stroke="currentColor" strokeWidth="2" fill="none" />
                            <line x1="16" y1="13" x2="8" y2="13" stroke="currentColor" strokeWidth="2" />
                            <line x1="16" y1="17" x2="8" y2="17" stroke="currentColor" strokeWidth="2" />
                            <polyline points="10,9 9,9 8,9" stroke="currentColor" strokeWidth="2" />
                        </svg>
                        Post a Blog
                    </Button>
                </Box>

                {/* Blog Posts Section */}
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: { xs: "column", md: "row" },
                        gap: "30px",
                        width: "100%",
                        marginBottom: "40px"
                    }}>
                    {blogData.map((post, index) => (
                        <Box key={index} sx={{
                            flex: 1,
                            background: "#0C1217",
                            borderRadius: "12px",
                            padding: "30px",
                            border: "1px solid rgba(255,255,255,0.1)",
                            position: "relative",
                            overflow: "hidden",
                            '&::before': {
                                content: '""',
                                position: 'absolute',
                                bottom: 0,
                                left: 0,
                                width: '100px',
                                height: '100px',
                                // background: 'radial-gradient(circle, rgba(55, 171, 255, 0.2) 0%, transparent 70%)',
                                borderRadius: '50%',
                                zIndex: 0
                            }
                        }}>
                            <Box sx={{ position: "relative", zIndex: 1 }}>
                                <Typography
                                    sx={{
                                        fontSize: "20px",
                                        fontWeight: "700",
                                        color: "#FFFFFF",
                                        marginBottom: "16px",
                                        fontFamily: "Encode Sans, sans-serif"
                                    }}
                                >
                                    {post.title}
                                </Typography>

                                <Typography
                                    sx={{
                                        fontSize: "14px",
                                        fontWeight: "400",
                                        color: "#E5E8EC",
                                        lineHeight: "1.6",
                                        marginBottom: "30px",
                                        fontFamily: "Encode Sans, sans-serif"
                                    }}
                                >
                                    {post.description}
                                </Typography>

                                {/* Author Profile */}
                                <Box sx={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    gap: "8px"
                                }}>
                                    <div>
                                        <ApplyNowButton
                                            text="View Full Blog"
                                            width="100%"
                                            textTransform='none'
                                            height="48px"
                                            fontSize="14px"
                                            disabled={false}
                                            onClick={() => router.push(`/blogscreen?url=${encodeURIComponent(post?.blogURL)}`)}
                                        />
                                    </div>
                                    <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "10px" }}>
                                        <Typography
                                            sx={{
                                                fontSize: "12px",
                                                color: "#A6A6A6",
                                                fontFamily: "Encode Sans, sans-serif"
                                            }}
                                        >
                                            {post.author}
                                        </Typography>
                                        <Box
                                            sx={{
                                                width: "50px",
                                                height: "50px",
                                                borderRadius: "50%",
                                                background: "linear-gradient(135deg, #37ABFF, #7AFFFF)",
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                fontSize: "12px",
                                                color: "#FFFFFF",
                                                fontWeight: "600"
                                            }}>
                                            <Image src={post?.imageURL} alt='image' height={50} width={50} style={{ borderRadius: "50%" }} />
                                        </Box>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                    ))}
                </Box>
            </Box>
        </Box >
    );
};

export default BlogAndContact; 