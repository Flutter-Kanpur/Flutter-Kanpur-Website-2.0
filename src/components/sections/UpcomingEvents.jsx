import { Box, Typography } from '@mui/material';
import React from 'react';
import EventCard from '@/components/containers/EventCard';
import styles from '../buttons/shimmerButton/shimmer.module.css';
// import MissionIcon from "../../../public/assets/missionIcon.svg";
// import VisionIcon from "../../../public/assets/visionIcon.svg";
import Image from 'next/image';


async function UpcomingEvents({ events }) {

    // Check if events is defined and has the expected properties
    if (!events || (!events.upcoming_events && !events.past_events)) {
        // ("Events data is not available or malformed:", events);
        return (
            <Box sx={{
                width: "100%",
                padding: "80px 40px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center"
            }}>
                <Typography variant="h6" color="text.secondary">
                    No events data available
                </Typography>
            </Box>
        );
    }

    let eventsData = (events.upcoming_events && events.upcoming_events.length)
        ? events.upcoming_events
        : (events.past_events || []);

    return (
        <Box sx={{
            width: "100%",
            padding: "80px 40px",
            display: "flex",
            gap: 10,
            flexDirection: "column",
            alignItems: "center"
        }}>
            <Box sx={{
                width: "100%",
                maxWidth: "1300px",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start"
            }}>
                {/* Upcoming Events Label */}
                <Box sx={{
                    background: 'transparent',
                    border: '1px solid #2E3942',
                    borderRadius: '8px',
                    padding: '8px 16px',
                    marginBottom: '16px',
                    fontSize: '14px',
                    fontWeight: '500',
                    color: '#FFFFFF',
                }}>
                    Upcoming Events
                </Box>

                {/* Main Heading */}
                <Typography
                    sx={{
                        fontSize: { xs: "28px", md: "36px" },
                        fontWeight: "700",
                        color: "#FFFFFF",
                        textAlign: "left",
                        marginBottom: "60px",
                        fontFamily: "Encode Sans, sans-serif",
                        lineHeight: "1.2"
                    }}
                >
                    Join workshops, hackathons, and design sprints.
                </Typography>

                {/* Event Cards */}
                <Box sx={{
                    display: "flex",
                    flexDirection: { xs: "column", md: "row" },
                    gap: "30px",
                    width: "100%",
                    justifyContent: "space-between"
                }}>
                    {eventsData.map((event, index) => (
                        <EventCard
                            key={index}
                            tag={event.tag}
                            date={event.date}
                            time={event.time}
                            title={event.title}
                            description={event.description}
                            style={{ flex: 1 }}
                        />
                    ))}
                </Box>
            </Box>
            <Box sx={{
                width: "100%",
                // background: "#010A10",
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
                    {/* About Us Heading */}
                    <Typography
                        sx={{
                            fontSize: { xs: "28px", md: "36px" },
                            fontWeight: "700",
                            color: "#FFFFFF",
                            textAlign: "left",
                            marginBottom: "60px",
                            fontFamily: "Encode Sans, sans-serif",
                            lineHeight: "1.2"
                        }}
                    >
                        Overview
                    </Typography>

                    {/* Mission and Vision Sections */}
                    <Box sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "40px",
                        width: "100%"
                    }}>
                        {/* Mission Section */}
                        <Box sx={{
                            display: "flex",
                            flexDirection: "row",
                            gap: "64px",
                            alignItems: "flex-start"
                        }}>

                            <Image src={MissionIcon} alt='mission-icon' />

                            {/* Mission Content */}
                            <Box sx={{ flex: 1 }}>

                                <Typography
                                    sx={{
                                        fontSize: "16px",
                                        fontWeight: "400",
                                        color: "#FFFFFF",
                                        lineHeight: "1.7",
                                        fontFamily: "Encode Sans, sans-serif"
                                    }}
                                >
                                    Our mission is to empower individuals by providing them with the resources, mentorship, and opportunities they need to excel in the world of Flutter development and design. We strive to create an environment where curiosity is encouraged, skills are nurtured, and every member feels supported in their creative and professional journey.
                                </Typography>
                            </Box>
                        </Box>

                        {/* Vision Section */}
                        <Box sx={{
                            display: "flex",
                            flexDirection: "row",
                            gap: "64px",
                            alignItems: "flex-start"
                        }}>
                            <Image src={VisionIcon} alt='vision-icon' />

                            {/* Vision Content */}
                            <Box sx={{ flex: 1 }}>
                                <Typography
                                    sx={{
                                        fontSize: "16px",
                                        fontWeight: "400",
                                        color: "#FFFFFF",
                                        lineHeight: "1.7",
                                        fontFamily: "Encode Sans, sans-serif"
                                    }}
                                >
                                    We envision Flutter Kanpur as a leading community where innovation meets collaboration. Our goal is to build a thriving ecosystem where developers and designers come together to push the boundaries of what's possible with Flutter. By fostering a culture of creativity, inclusivity, and excellence, we aspire to become a global hub for learning, sharing, and building groundbreaking digital experiences.
                                </Typography>
                            </Box>
                        </Box>
                    </Box>

                    {/* Flutter Kanpur Community Section with Shimmer Background */}
                    <Box sx={{
                        marginTop: "80px",
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                        borderRadius: "7px",
                        padding: "1px", // border thickness
                        // background: "linear-gradient(to right, #fff, transparent)", // gradient border
                        display: "inline-block",
                    }}>
                        <Box
                            // className={styles.shimmerCard}
                            sx={{
                                width: "100%",
                                maxWidth: "1200px",
                                background: "linear-gradient(90deg, #0F1C25 0%, #010A10 100%)",
                                padding: "40px",
                                textAlign: "left",
                                borderRadius: "7px",
                                position: "relative",
                                ":before": {
                                    position: "absolute",
                                    height: "100%",
                                    width: "100%",
                                    content: '""',
                                    top: 0,
                                    left: 0,
                                    background: "#09141C80",
                                    borderRadius: "7px",
                                    zIndex: -1,
                                    // filter: "blur(8px)"
                                },
                                // background: "rgba(9, 20, 28, 0.5)",
                                background: '#09141C80',
                            }}>
                            {/* About Us Label */}
                            <Box
                                sx={{
                                    background: 'transparent',
                                    border: '1px solid #2E3942',
                                    borderRadius: '8px',
                                    padding: '8px 16px',
                                    marginBottom: '20px',
                                    fontSize: '14px',
                                    fontWeight: '500',
                                    color: '#FFFFFF',
                                    fontFamily: 'Encode Sans, sans-serif',
                                    display: 'inline-block'
                                }}>
                                About Us
                            </Box>

                            {/* Main Heading */}
                            <Typography
                                sx={{
                                    fontSize: { xs: "28px", md: "32px" },
                                    fontWeight: "700",
                                    color: "#FFFFFF",
                                    textAlign: "left",
                                    marginBottom: "24px",
                                    fontFamily: "Encode Sans, sans-serif",
                                    lineHeight: "1.2"
                                }}
                            >
                                Flutter Kanpur Community
                            </Typography>

                            {/* Description Paragraphs */}
                            <Typography
                                sx={{
                                    fontSize: "16px",
                                    fontWeight: "400",
                                    color: "#E5E8EC",
                                    lineHeight: "1.7",
                                    fontFamily: "Encode Sans, sans-serif",
                                    marginBottom: "20px"
                                }}
                            >
                                Flutter Kanpur is a vibrant community of developers, designers, and tech enthusiasts driven by creativity and innovation. We collaborate, learn, and grow through workshops, hackathons, and shared knowledge — building a space where ideas turn into reality.
                            </Typography>

                            <Typography
                                sx={{
                                    fontSize: "18px",
                                    fontWeight: "600",
                                    color: "#FFFFFF",
                                    lineHeight: "1.6",
                                    fontFamily: "Encode Sans, sans-serif"
                                }}
                            >
                                Join us and be part of something extraordinary!
                            </Typography>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}

export default UpcomingEvents;