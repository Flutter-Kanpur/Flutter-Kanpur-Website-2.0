'use client'
import { Box, Grid, Typography, Skeleton } from '@mui/material'
import React from 'react'
import SpeakerCard from './SpeakerCard'
import DummySpeakerImage from '@/../public/assets/landing-page-assets/dummy-speaker-image.svg'
import { useSpeakers } from '@/hooks/useSpeakers'

// Hardcoded fallback data (matches the original inline array)
const FALLBACK_SPEAKER_DATA = [
  { name: 'John Samuel', company: 'Microsoft', image: DummySpeakerImage },
  { name: 'John Samuel', company: 'Microsoft', image: DummySpeakerImage },
  { name: 'John Samuel', company: 'Microsoft', image: DummySpeakerImage },
  { name: 'John Samuel', company: 'Microsoft', image: DummySpeakerImage },
  { name: 'John Samuel', company: 'Microsoft', image: DummySpeakerImage },
]

const PastSpeakerSection = () => {
  const { speakers, loading, error } = useSpeakers()

  // On error or empty result, fall back to hardcoded data
  const useHardcoded = error || (!loading && speakers.length === 0)
  const displayData = useHardcoded ? FALLBACK_SPEAKER_DATA : speakers

  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: 1200,
        mx: 'auto',
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Typography sx={{ fontSize: 24, fontWeight: 600, color: '#000' }}>
          Past Speakers
        </Typography>
        <Typography
          sx={{
            fontSize: 18,
            lineHeight: '25px',
            fontWeight: 400,
            color: '#4167F2',
          }}
        >
          See past events
        </Typography>
      </Box>

      <Grid container spacing={1} rowSpacing={3} sx={{ display: 'flex' }}>
        {loading
          ? Array.from({ length: 5 }).map((_, index) => (
              <Grid size={{ xs: 12, sm: 6, md: 2.4 }} key={`speaker-skeleton-${index}`}>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
                  <Skeleton
                    variant="rounded"
                    width="100%"
                    sx={{ aspectRatio: '1 / 1.6', borderRadius: '40px' }}
                  />
                  <Skeleton width="70%" />
                  <Skeleton width="50%" />
                </Box>
              </Grid>
            ))
          : displayData.map((item, index) => (
              <Grid size={{ xs: 12, sm: 6, md: 2.4 }} key={`${item.name}-${index}`}>
                <SpeakerCard speakerData={item} />
              </Grid>
            ))}
      </Grid>
    </Box>
  )
}

export default PastSpeakerSection
