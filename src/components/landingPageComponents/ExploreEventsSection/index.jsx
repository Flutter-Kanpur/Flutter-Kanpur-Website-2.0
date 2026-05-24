'use client'
import { Box, Grid, Typography } from '@mui/material'
import React from 'react'
import EventsCard from './Cards'
import { eventsData } from '@/constants/events';
import { useRouter } from 'next/navigation';


const ExploreEventsSection = () => {

    const router = useRouter();

    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                <Typography sx={{ fontSize: 24, fontWeight: 600, color: "#000" }}>
                    Explore events
                </Typography>
                <Typography onClick={() => router.push('/eventsPage')} sx={{ fontSize: 18, lineHeight: '25px', fontWeight: 400, color: "#4167F2", cursor: "pointer" }}>
                    See all events
                </Typography>
            </Box>
            <Grid container spacing={2} rowSpacing={8} sx={{ display: "flex", }}>
                {eventsData.map((item) => (
                    <Grid
                        item
                        xs={12}
                        sm={6}
                        md={4}
                        key={item.id} // always prefer a stable unique id

                    >
                        <EventsCard event={item} />
                    </Grid>
                ))}
            </Grid>

        </Box>
    )
}

export default ExploreEventsSection
