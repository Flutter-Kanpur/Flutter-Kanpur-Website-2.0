'use client';
import { Box, Typography } from '@mui/material';
import React, { useState } from 'react';
import styles from '../buttons/shimmerButton/shimmer.module.css';
import ContactUs from './ContactUs';

const AboutUs = () => {

    const [contactUsData, setcontactUsData] = useState({
        name: "",
        email: "",
        message: "",
        phone: ""
    })

    const sendContactForm = async () => {
        try {
            const subject = encodeURIComponent(`Contact from ${contactUsData.name} - ${contactUsData.phone}`);
            const body = encodeURIComponent(`Message:\n${contactUsData.message}\n\nEmail: ${contactUsData.email}`);
            // open Gmail compose with prefilled details
            window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=Flutterkanpur@gmail.com&su=${subject}&body=${body}`, '_blank');
            setcontactUsData({
                name: "",
                email: "",
                message: "",
                phone: ""
            });
            alert('Thank you for reaching out! We will get back to you soon.');
        } catch (error) {
            console.error('Error sending contact form:', error);
            alert('An error occurred. Please try again later.');
        }
    };

    return (
        <Box sx={{
            width: "100%",
            // background: "#010A10",
            padding: "80px 20px",
            gap: "60px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            // maxWidth: 1200
        }}>
            <Box sx={{ maxWidth: 1250, width: "100%" }}>
                <ContactUs onClick={sendContactForm} contactUsData={contactUsData} setcontactUsData={setcontactUsData} />
            </Box>
        </Box>
    );
};

export default AboutUs; 