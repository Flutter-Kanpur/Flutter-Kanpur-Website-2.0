'use client'

import React, { useMemo, useState, useEffect } from 'react'
import { Box, Grid, Typography, Button, Skeleton } from '@mui/material'
import EventsCard from '../landingPageComponents/ExploreEventsSection/Cards'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEvents, isEventPast, formatTimeRange } from '@/hooks/useEvents'
import ExploreEventImage from '@/../public/assets/landing-page-assets/explore-event-card-image.svg'

const PRODUCT_SANS = "'Product Sans', system-ui, -apple-system, sans-serif"

const EventPageComponent = ({ searchQuery = '' }) => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const urlTab = searchParams?.get('tab')
  const defaultTab =
    urlTab === 'past' ? 'past' : urlTab === 'upcoming' ? 'upcoming' : 'all'

  const [userTab, setUserTab] = useState(null)
  const activeTab = userTab ?? defaultTab

  const { events, loading, error, refetch } = useEvents({
    limit: 100,
    status: ['published', 'closed', 'completed'],
  })

  const filteredEvents = useMemo(() => {
    let list = events || []

    // Filter by tab
    if (activeTab === 'upcoming') {
      list = list.filter((e) => !isEventPast(e))
    } else if (activeTab === 'past') {
      list = list.filter((e) => isEventPast(e))
    }

    // Filter by search query
    if (searchQuery?.trim()) {
      const q = searchQuery.trim().toLowerCase()
      list = list.filter((e) => {
        const title = (e.title || '').toLowerCase()
        const desc = (e.short_description || e.description || '').toLowerCase()
        const loc = (e.location_text || '').toLowerCase()
        const type = (e.event_type || '').toLowerCase()
        return (
          title.includes(q) ||
          desc.includes(q) ||
          loc.includes(q) ||
          type.includes(q)
        )
      })
    }

    return list
  }, [events, activeTab, searchQuery])

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4, mt: '20px' }}>
      {/* TABS (All / Upcoming / Past) */}
      <Box
        sx={{
          display: 'flex',
          gap: '12px',
          alignItems: 'center',
          flexWrap: 'wrap',
        }}
      >
        {[
          { label: 'All events', value: 'all' },
          { label: 'Upcoming', value: 'upcoming' },
          { label: 'Past events', value: 'past' },
        ].map((tab) => {
          const isActive = activeTab === tab.value
          return (
            <Button
              key={tab.value}
              onClick={() => setUserTab(tab.value)}
              sx={{
                textTransform: 'none',
                fontFamily: PRODUCT_SANS,
                fontSize: '15px',
                fontWeight: 500,
                borderRadius: '100px',
                px: '22px',
                py: '8px',
                bgcolor: isActive ? '#1D1D1D' : '#F5F5F5',
                color: isActive ? '#FFFFFF' : '#5D5D5D',
                boxShadow: 'none',
                '&:hover': {
                  bgcolor: isActive ? '#333333' : '#EAEAEA',
                  boxShadow: 'none',
                },
              }}
            >
              {tab.label}
            </Button>
          )
        })}
      </Box>

      {/* CONTENT STATES */}
      {loading ? (
        /* LOADING SKELETON */
        <Grid container spacing={2} rowSpacing={6}>
          {Array.from({ length: 8 }).map((_, index) => (
            <Grid size={{ xs: 12, sm: 6, md: 3 }} key={`skel-${index}`}>
              <Box sx={{ width: '100%', maxWidth: 280 }}>
                <Skeleton
                  variant="rounded"
                  width="100%"
                  height={150}
                  sx={{ borderRadius: '24px' }}
                />
                <Skeleton width="60%" sx={{ mt: 1.5 }} />
                <Skeleton width="90%" />
                <Skeleton width="40%" />
              </Box>
            </Grid>
          ))}
        </Grid>
      ) : error ? (
        /* ERROR STATE */
        <Box
          sx={{
            py: 8,
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 2,
          }}
        >
          <Typography
            sx={{
              fontFamily: PRODUCT_SANS,
              fontSize: 20,
              color: '#DC2626',
              fontWeight: 600,
            }}
          >
            Failed to load events
          </Typography>
          <Typography
            sx={{
              fontFamily: PRODUCT_SANS,
              fontSize: 15,
              color: '#6D6D6D',
              maxWidth: 500,
            }}
          >
            {error.message || 'An unexpected error occurred while loading events.'}
          </Typography>
          <Button
            variant="outlined"
            onClick={refetch}
            sx={{
              borderRadius: '100px',
              px: 3,
              py: 1,
              textTransform: 'none',
              fontFamily: PRODUCT_SANS,
              borderColor: '#1D1D1D',
              color: '#1D1D1D',
              '&:hover': {
                borderColor: '#000',
                bgcolor: '#F5F5F5',
              },
            }}
          >
            Retry
          </Button>
        </Box>
      ) : filteredEvents.length === 0 ? (
        /* EMPTY STATE */
        <Box
          sx={{
            py: 8,
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 1.5,
          }}
        >
          <Typography
            sx={{
              fontFamily: PRODUCT_SANS,
              fontSize: 22,
              fontWeight: 600,
              color: '#000',
            }}
          >
            {activeTab === 'past'
              ? 'No past events yet.'
              : activeTab === 'upcoming'
              ? 'No upcoming events scheduled right now.'
              : 'No events found.'}
          </Typography>
          <Typography
            sx={{
              fontFamily: PRODUCT_SANS,
              fontSize: 16,
              color: '#6D6D6D',
              maxWidth: 500,
            }}
          >
            {searchQuery?.trim()
              ? 'Try searching for a different keyword or topic.'
              : activeTab === 'upcoming'
              ? 'Stay tuned! New community events will be announced soon.'
              : 'Past event recordings and resources will appear here.'}
          </Typography>
        </Box>
      ) : (
        /* EVENTS GRID */
        <Grid container spacing={2} rowSpacing={6}>
          {filteredEvents.map((item, index) => {
            const isPast = isEventPast(item)
            const mapped = {
              id: item.id,
              slug: item.slug,
              image: item.banner_url || ExploreEventImage,
              time: formatTimeRange(item.start_at, item.end_at),
              type: item.event_type || (isPast ? 'Past Event' : 'Workshop'),
              title: item.title ?? '',
              description: item.short_description || item.description || '',
            }

            return (
              <Grid
                size={{ xs: 12, sm: 6, md: 3 }}
                key={item.id ?? index}
              >
                <EventsCard
                  onClick={() => router.push(`/eventsDetail/${item.id}`)}
                  event={mapped}
                />
              </Grid>
            )
          })}
        </Grid>
      )}
    </Box>
  )
}

export default EventPageComponent
