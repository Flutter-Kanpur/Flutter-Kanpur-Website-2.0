'use client'
import { eventsData } from '@/constants/events'
import { Box, Grid, Typography } from '@mui/material'
import React from 'react'
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import EventsCard from '../landingPageComponents/ExploreEventsSection/Cards'
import { useRouter } from 'next/navigation';

const EventPageComponent = () => {
    const router = useRouter();
    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 4, mt: '100px' }}>
            <Typography sx={{ fontSize: 24, fontWeight: 600, color: '#000' }}>
                Search for events
            </Typography>
            <Grid container spacing={2} rowSpacing={8} sx={{ display: "flex", }}>
                {eventsData.map((item, index) => (
                    <Grid
                        size={{ xs: 12, sm: 6, md: 4 }}
                        key={item.id ?? index}
                    >
                        <EventsCard onClick={() => router.push(`/eventsDetail/${item.id ?? index}`)} event={item} />
                    </Grid>
                ))}
            </Grid>
            <Box
                sx={{
                    display: "flex",
                    cursor: "pointer",
                    marginTop: 8,
                    marginBottom: 5,
                    flexDirection: 'row',
                    width: "16%",
                    mx: 'auto',
                    padding: '8px 22px',
                    borderRadius: '100px',
                    alignItems: "center",
                    gap: 1,
                    border: "0.6px solid #d8d8d8"
                }}>
                <Typography sx={{ fontSize: 18, fontWeight: 500, color: '#000', }}>
                    Learn More
                </Typography>
                <ArrowOutwardIcon sx={{ color: '#000'   }} />
            </Box>
        </Box>
    )
}

export default EventPageComponent
