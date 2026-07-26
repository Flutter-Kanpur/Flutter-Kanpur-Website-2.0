import React from 'react'
import AccordionComponent from './AccordionComponent'
import { Box, Typography } from '@mui/material'

const PRODUCT_SANS = "'Product Sans', system-ui, -apple-system, sans-serif"

const FAQSection = () => {
    const accordianData = [
        {
            title: 'Who can join the Flutter Kanpur community?',
            description: 'Flutter Kanpur is a community-driven group of Flutter developers, designers, and enthusiasts focused on learning, collaboration, and knowledge sharing through events, blogs, and peer interactions.'
        },
        {
            title: 'What is Flutter Kanpur?',
            description: 'Flutter Kanpur is a community-driven group of Flutter developers, designers, and enthusiasts focused on learning, collaboration, and knowledge sharing through events, blogs, and peer interactions.'
        },
        {
            title: 'Is Flutter Kanpur an internship or a paid program?',
            description: 'No, it is a community-driven initiative for learning and growth, not a formal internship or recruitment program.'
        },
        {
            title: 'How can I participate in events and meetups?',
            description: 'You can stay updated through our official social media handles and website for announcements about upcoming events.'
        },
        {
            title: 'Can I contribute as a speaker or blog writer?',
            description: 'Yes, we always welcome contributions from the community members. You can reach out to the core team to share your ideas.'
        },
        {
            title: 'Is the community beginner-friendly?',
            description: 'Absolutely! We have sessions and resources tailored for all skill levels, including beginners just starting their Flutter journey.'
        },
    ]

    return (
        <Box sx={{
            padding: '0px 24px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
        }}>
            <Typography sx={{
                fontFamily: PRODUCT_SANS,
                fontSize: 24,
                fontWeight: 600,
                mb: 6,
                textAlign: 'center',
                color: '#000'
            }}>
                Everything you need to know about the Flutter Kanpur community
            </Typography>

            <Box sx={{ width: '100%', maxWidth: '1000px' }}>
                {accordianData.map((data, index) => (
                    <AccordionComponent key={index} accordianData={data} />
                ))}
            </Box>
        </Box>
    )
}

export default FAQSection