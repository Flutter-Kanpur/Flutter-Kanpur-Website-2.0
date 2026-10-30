'use client'
import { Box, Grid, Typography, Skeleton } from '@mui/material'
import React from 'react'
import EventsCard from './Cards'
import { eventsData } from '@/constants/events'
import { useRouter } from 'next/navigation'
import { useEvents } from '@/hooks/useEvents'
import ExploreEventImage from '@/../public/assets/landing-page-assets/explore-event-card-image.svg'

/**
 * Format a start_at / end_at pair into a readable time range string.
 * Uses a fixed locale ('en-IN') and timeZone ('Asia/Kolkata') so the output
 * is identical on server and client, avoiding hydration mismatches.
 */
function formatTimeRange(startAt, endAt) {
  const opts = {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
    timeZone: 'Asia/Kolkata',
  }
  try {
    const start = new Date(startAt).toLocaleTimeString('en-IN', opts)
    if (!endAt) return start
    const end = new Date(endAt).toLocaleTimeString('en-IN', opts)
    return `${start} – ${end}`
  } catch {
    return ''
  }
}

const ExploreEventsSection = () => {

  const router = useRouter()
  const { events, loading, error } = useEvents()

  // On error or empty result, fall back to hardcoded data
  const useHardcoded = error || (!loading && events.length === 0)
  const displayData = useHardcoded
    ? eventsData.slice(0, 4)
    : events

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography sx={{ fontSize: 24, fontWeight: 600, color: '#000' }}>
          Explore events
        </Typography>
        <Typography
          onClick={() => router.push('/eventsPage')}
          sx={{ fontSize: 18, lineHeight: '25px', fontWeight: 400, color: '#4167F2', cursor: 'pointer' }}
        >
          See all events
        </Typography>
      </Box>

      <Grid container spacing={2} rowSpacing={3} sx={{ display: 'flex' }}>
        {loading
          ? Array.from({ length: 4 }).map((_, index) => (
              <Grid size={{ xs: 12, sm: 6, md: 3 }} key={`skeleton-${index}`}>
                <Box sx={{ width: '100%', maxWidth: 280 }}>
                  <Skeleton variant="rounded" width="100%" height={200} sx={{ borderRadius: '24px' }} />
                  <Skeleton width="60%" sx={{ mt: 1 }} />
                  <Skeleton width="80%" />
                  <Skeleton width="40%" />
                </Box>
              </Grid>
            ))
          : displayData.map((item, index) => {
              // Map Supabase row → EventsCard event prop shape
              // If item already has .time (hardcoded), pass it through unchanged
              const mapped = useHardcoded
                ? item
                : {
                    id: item.id,
                    slug: item.slug,
                    image: item.banner_url || ExploreEventImage,
                    time: formatTimeRange(item.start_at, item.end_at),
                    type: item.event_type ?? '',
                    title: item.title ?? '',
                    description: item.short_description || item.description || '',
                  }

              return (
                <Grid
                  size={{ xs: 12, sm: 6, md: 3 }}
                  key={item.id ?? index}
                >
                  <EventsCard event={mapped} />
                </Grid>
              )
            })}
      </Grid>
    </Box>
  )
}

export default ExploreEventsSection
