import { Box, Grid, Typography } from '@mui/material'
import React from 'react'
import SpeakerCard from './SpeakerCard'
import DummySpeakerImage from "@/../public/assets/landing-page-assets/dummy-speaker-image.svg";


const PastSpeakerSection = () => {
    const speakerData = [{
        name: "John Samuel",
        company: "Microsoft",
        image: DummySpeakerImage
    },
    {
        name: "John Samuel",
        company: "Microsoft",
        image: DummySpeakerImage
    },
    {
        name: "John Samuel",
        company: "Microsoft",
        image: DummySpeakerImage
    },
    {
        name: "John Samuel",
        company: "Microsoft",
        image: DummySpeakerImage
    },
    {
        name: "John Samuel",
        company: "Microsoft",
        image: DummySpeakerImage
    },
    {
        name: "John Samuel",
        company: "Microsoft",
        image: DummySpeakerImage
    },
    {
        name: "John Samuel",
        company: "Microsoft",
        image: DummySpeakerImage
    },
    {
        name: "John Samuel",
        company: "Microsoft",
        image: DummySpeakerImage
    },
    ]
    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, }}>
            <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                <Typography sx={{ fontSize: 24, fontWeight: 600, color: "#000" }}>
                    Past Speakers
                </Typography>
                <Typography sx={{ fontSize: 18, lineHeight: '25px', fontWeight: 400, color: "#4167F2" }}>
                    See past events
                </Typography>
            </Box>
            <Grid container spacing={3} rowSpacing={3} sx={{ display: "flex" }}>
                {speakerData.map((item, index) => (
                    <Grid
                        item
                        xs={12}
                        sm={6}
                        md={4}
                        key={item.id} // always prefer a stable unique id
                    >
                        <SpeakerCard key={index} speakerData={item} />
                    </Grid>
                ))}
            </Grid>

        </Box>
    )
}

export default PastSpeakerSection