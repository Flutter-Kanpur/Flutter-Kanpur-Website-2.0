import React, { useState, useMemo } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Skeleton from '@mui/material/Skeleton';
import EventCard from '../eventCard/EventCard';
import AnnouncementCard from '../announcementCard/AnnouncementCard';
import FilterBar from '../filterBar/FilterBar';
import FilterModal, { EMPTY_FILTERS } from '../filterModal/FilterModal';

/**
 * SkeletonCard — MUI Skeleton placeholder that mirrors the EventCard layout
 */
const SkeletonCard = () => (
    <Card
        elevation={0}
        sx={{
            flex: '0 0 100%',
            scrollSnapAlign: 'start',
            width: '100%',
            borderRadius: '24px',
            overflow: 'hidden',
            bgcolor: '#FFFFFF',
            boxShadow: '0 4px 24px rgba(0,0,0,0.08), 0 1px 4px rgba(0,0,0,0.04)',
            pt: '10px',
            display: 'flex',
            flexDirection: 'column',
            boxSizing: 'border-box',
        }}
    >
        {/* Poster skeleton */}
        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
            <Skeleton
                variant="rectangular"
                width="90%"
                height={220}
                sx={{ borderRadius: '16px' }}
                animation="wave"
            />
        </Box>

        {/* Content skeleton */}
        <Box sx={{ p: '20px 22px 22px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {/* Title */}
            <Skeleton variant="text" width="75%" height={24} animation="wave" />
            <Skeleton variant="text" width="50%" height={24} animation="wave" />

            {/* Date / location */}
            <Skeleton variant="text" width="60%" height={18} animation="wave" sx={{ mt: '4px' }} />

            {/* Description lines */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '8px', mt: '4px' }}>
                <Skeleton variant="text" width="100%" height={16} animation="wave" />
                <Skeleton variant="text" width="100%" height={16} animation="wave" />
                <Skeleton variant="text" width="65%" height={16} animation="wave" />
            </Box>

            {/* Buttons wrapper skeleton */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '20px', mt: '8px' }}>
                <Skeleton
                    variant="rectangular"
                    width="100%"
                    height={48}
                    sx={{ borderRadius: '50px', flex: 1 }}
                    animation="wave"
                />
                <Skeleton
                    variant="circular"
                    width={48}
                    height={48}
                    animation="wave"
                />
            </Box>
        </Box>
    </Card>
);

/* ────────────────────────────────────────────────────────
 * filterEvents — applies quick filter + modal filters
 * ──────────────────────────────────────────────────────── */
const filterEvents = (events, quickFilter, modalFilters) => {
    let result = events;

    // 1. Quick filter (category-level)
    if (quickFilter === 'forYou') {
        result = result.filter((e) => e.isPersonalized === true);
    } else if (quickFilter === 'announcements') {
        result = result.filter((e) => e.category === 'announcement');
    } else if (quickFilter === 'upcoming') {
        result = result.filter((e) => e.status === 'upcoming');
    }

    // 2. Modal filters (detailed)
    if (modalFilters.status) {
        result = result.filter(
            (e) => e.eventStatus?.toLowerCase() === modalFilters.status.toLowerCase()
        );
    }
    if (modalFilters.mode) {
        result = result.filter(
            (e) => e.mode?.toLowerCase() === modalFilters.mode.toLowerCase()
        );
    }
    if (modalFilters.timeRange) {
        result = result.filter(
            (e) => e.timeRange?.toLowerCase() === modalFilters.timeRange.toLowerCase()
        );
    }
    if (modalFilters.access) {
        result = result.filter(
            (e) => e.access?.toLowerCase() === modalFilters.access.toLowerCase()
        );
    }
    if (modalFilters.tags?.length > 0) {
        result = result.filter((e) =>
            modalFilters.tags.every((tag) =>
                e.tags?.map((t) => t.toLowerCase()).includes(tag.toLowerCase())
            )
        );
    }

    return result;
};

/** Check if any modal filter is active */
const hasActiveModalFilters = (filters) =>
    Object.entries(filters).some(([, val]) =>
        Array.isArray(val) ? val.length > 0 : val !== null
    );

/**
 * CardContainer — scrollable container that maps EventCards.
 * Shows skeleton placeholders when loading or when there are no events.
 *
 * @param {Array}    events        – Array of event objects (each spread into EventCard)
 * @param {Array}    announcements – Array of announcement objects for Announcements filter
 * @param {boolean}  loading       – Force skeleton state
 * @param {number}   skeletonCount – Number of skeleton cards to show (default 2)
 * @param {function} onSeeAll      – Callback for "See all" tap
 */
const CardContainer = ({
    events = [],
    announcements = [],
    loading = false,
    skeletonCount = 2,
    onSeeAll = () => { },
}) => {
    /* ── Filter state ── */
    const [quickFilter, setQuickFilter] = useState(null);
    const [modalFilters, setModalFilters] = useState({ ...EMPTY_FILTERS });
    const [isModalOpen, setIsModalOpen] = useState(false);

    /* ── Derived data ── */
    const filteredEvents = useMemo(
        () => filterEvents(events, quickFilter, modalFilters),
        [events, quickFilter, modalFilters]
    );

    const showSkeleton = loading;
    const isEmpty = !loading && events.length === 0;

    return (
        <Box sx={{ width: '100%' }}>
            {/* ── Header row ── */}
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    mb: '12px',
                }}
            >
                <Typography variant="h6" sx={{ m: 0, color: 'text.primary' }}>
                    What's new
                </Typography>

                <Button
                    variant="text"
                    onClick={onSeeAll}
                    sx={{
                        fontSize: '14px',
                        fontWeight: 600,
                        color: 'text.secondary',
                        p: 0,
                        minWidth: 'auto',
                        '&:hover': {
                            bgcolor: 'transparent',
                        },
                    }}
                >
                    See all
                    <Box component="span" sx={{ fontSize: '16px', lineHeight: 1, ml: '4px' }}>›</Box>
                </Button>
            </Box>

            {/* ── Filter bar ── */}
            <FilterBar
                activeFilter={quickFilter}
                hasModalFilters={hasActiveModalFilters(modalFilters)}
                onQuickFilter={setQuickFilter}
                onOpenModal={() => setIsModalOpen(true)}
            />

            {/* ── Empty state (no events at all) ── */}
            {isEmpty ? (
                <Box
                    sx={{
                        textAlign: 'center',
                        py: '48px',
                        px: '20px',
                    }}
                >
                    <Typography
                        variant="h6"
                        sx={{
                            fontWeight: 700,
                            color: 'text.primary',
                            mb: '8px',
                            fontSize: '18px',
                        }}
                    >
                        No upcoming events right now
                    </Typography>
                    <Typography
                        sx={{
                            color: 'text.secondary',
                            fontSize: '14px',
                            lineHeight: 1.5,
                            mb: '24px',
                        }}
                    >
                        Check back soon for upcoming meetups and sessions.
                    </Typography>
                    <Button
                        variant="contained"
                        sx={{
                            bgcolor: '#1A1A1A',
                            color: '#FFFFFF',
                            borderRadius: '50px',
                            px: '28px',
                            py: '12px',
                            fontSize: '14px',
                            fontWeight: 600,
                            textTransform: 'none',
                            boxShadow: 'none',
                            '&:hover': {
                                bgcolor: '#333333',
                                boxShadow: 'none',
                            },
                        }}
                    >
                        Browse past events
                    </Button>
                </Box>
            ) : (
                /* ── Vertical card list ── */
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '20px',
                        p: '12px 0',
                    }}
                >
                    {showSkeleton
                        ? Array.from({ length: skeletonCount }).map((_, i) => (
                            <SkeletonCard key={`skeleton-${i}`} />
                        ))
                        : quickFilter === 'announcements'
                            ? (
                                announcements.length > 0
                                    ? announcements.map((item, index) => (
                                        <Box key={`announcement-${index}`}>
                                            <AnnouncementCard
                                                category={item.category}
                                                title={item.title}
                                                description={item.description}
                                            />
                                        </Box>
                                    ))
                                    : (
                                        <Box
                                            sx={{
                                                textAlign: 'center',
                                                py: '48px',
                                                px: '20px',
                                                color: 'text.disabled',
                                                fontSize: '15px',
                                            }}
                                        >
                                            No announcements available
                                        </Box>
                                    )
                            )
                            : filteredEvents.length > 0
                                ? filteredEvents.map((event, index) => (
                                    <Box key={event.id ?? index}>
                                        <EventCard {...event} />
                                    </Box>
                                ))
                                : (
                                    <Box
                                        sx={{
                                            textAlign: 'center',
                                            py: '48px',
                                            px: '20px',
                                            color: 'text.disabled',
                                            fontSize: '15px',
                                        }}
                                    >
                                        No events match your filters
                                    </Box>
                                )}
                </Box>
            )}

            {/* ── Filter modal ── */}
            <FilterModal
                isOpen={isModalOpen}
                filters={modalFilters}
                onApply={setModalFilters}
                onClose={() => setIsModalOpen(false)}
            />
        </Box>
    );
};

export default CardContainer;
