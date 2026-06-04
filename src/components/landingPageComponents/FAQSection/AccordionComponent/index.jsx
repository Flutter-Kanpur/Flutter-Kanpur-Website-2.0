'use client'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Box } from '@mui/material';
import React, { useState } from 'react';

const PRODUCT_SANS = "'Product Sans', system-ui, -apple-system, sans-serif"

export default function AccordionComponent({ accordianData }) {
    const [expanded, setExpanded] = useState(false);

    const {
        title = 'Who can join the Flutter Kanpur community?',
        description = 'Flutter Kanpur is a community-driven group of Flutter developers, designers, and enthusiasts focused on learning, collaboration, and knowledge sharing through events, blogs, and peer interactions.'
    } = accordianData || {}

    return (
        <Box sx={{ width: '100%', mb: 2 }}>
            <Accordion
                expanded={expanded}
                onChange={() => setExpanded(!expanded)}
                sx={{
                    background: "transparent",
                    boxShadow: 'none',
                    '&:before': { display: 'none' }, // Remove default MUI divider
                }}
            >
                <AccordionSummary
                    expandIcon={expanded ? <KeyboardArrowUpIcon sx={{ color: '#4285F4' }} /> : <KeyboardArrowDownIcon />}
                    sx={{
                        p: 0,
                        minHeight: 'unset',
                        '& .MuiAccordionSummary-content': {
                            margin: '12px 0',
                        }
                    }}
                >
                    <Typography sx={{
                        fontFamily: PRODUCT_SANS,
                        fontSize: 18,
                        fontWeight: 500,    
                        color: '#000'
                    }}>
                        {title}
                    </Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ p: '0 0 16px 0' }}>
                    <Box sx={{
                        display: 'flex',
                        borderLeft: '2px solid #4285F4',
                        pl: 2,
                        ml: 0.5
                    }}>
                        <Typography sx={{
                            fontFamily: PRODUCT_SANS,
                            fontSize: 18,
                            color: '#6d6d6d',
                            lineHeight: 1.5
                        }}>
                            {description}
                        </Typography>
                    </Box>
                </AccordionDetails>
            </Accordion>
        </Box>
    );
}
