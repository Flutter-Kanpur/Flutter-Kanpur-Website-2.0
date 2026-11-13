'use client';

import Home from '@/components/Home';
import DashboardClient from './dashboard/DashboardClient';
import { useMediaQuery } from '@mui/material';
import { events as fallbackEvents, announcements as fallbackAnnouncements } from '@/data/dashboardData';
import { useEvents } from '@/hooks/useEvents';
import { useAnnouncements } from '@/hooks/useAnnouncements';

/**
 * Format a start_at / end_at pair into a readable time label.
 * Uses a fixed locale ('en-IN') and timeZone ('Asia/Kolkata') so the output
 * is identical on server and client, avoiding hydration mismatches.
 */
function formatTimeRange(startAt, endAt) {
  if (!startAt) return '';
  try {
    const timeOpts = {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
      timeZone: 'Asia/Kolkata',
    };
    const formatTime = (d) =>
      new Date(d)
        .toLocaleTimeString('en-IN', timeOpts)
        .replace(/\u202f/g, ' ')
        .toUpperCase();

    const start = formatTime(startAt);
    if (!endAt) return start;

    const dayOpts = {
      timeZone: 'Asia/Kolkata',
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
    };
    const isSameDay =
      new Date(startAt).toLocaleDateString('en-IN', dayOpts) ===
      new Date(endAt).toLocaleDateString('en-IN', dayOpts);

    if (isSameDay) {
      const end = formatTime(endAt);
      return `${start} – ${end}`;
    }

    const startDate = new Date(startAt).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      timeZone: 'Asia/Kolkata',
    });
    return `${startDate} · ${start}`;
  } catch {
    return '';
  }
}

/**
 * Derive the EventCard status chip value from start_at / end_at.
 *
 * "closed"   – the event has ended (end_at in the past, or start_at in the
 *              past when end_at is absent)
 * "upcoming" – start_at is in the future (or absent)
 * "closing"  – started but not yet ended (in progress)
 *
 * These match the keys that EventCard.statusConfig already accepts.
 */
function deriveStatus(startAt, endAt) {
  const now = Date.now();
  const start = startAt ? new Date(startAt).getTime() : null;
  const end = endAt ? new Date(endAt).getTime() : null;

  // Use end_at when available; fall back to start_at as the closing boundary
  const closingBoundary = end ?? start;

  if (closingBoundary !== null && closingBoundary < now) return 'closed';
  if (start !== null && start > now) return 'upcoming';
  if (start !== null && start <= now) return 'closing';
  return 'upcoming'; // no date info at all — safe default
}

/**
 * Map a Supabase `events` row to the shape that EventCard / CardContainer expect.
 */
function mapEvent(row) {
  return {
    id: row.id,
    title: row.title ?? '',
    description: row.short_description || row.description || '',
    posterImage: row.banner_url || '/assets/landing-page-assets/Launch.png',
    dateTime: formatTimeRange(row.start_at, row.end_at),
    time: formatTimeRange(row.start_at, row.end_at),
    location: row.location_text ?? '',
    // Derived from start_at / end_at — matches EventCard statusConfig keys
    status: deriveStatus(row.start_at, row.end_at),
    // Fields used by CardContainer filters
    mode: row.location_type ?? '',
    access: row.is_paid ? 'Paid' : 'Free',
    // CardContainer quick-filter: show in "upcoming" tab
    isPersonalized: false,
    eventStatus: 'Open',
    timeRange: '',
    tags: [],
    category: 'event',
  };
}

const Page = () => {
  const isMobile = useMediaQuery('(max-width:480px)');

  const { events: rawEvents, loading: eventsLoading, error: eventsError } = useEvents({ limit: 4 });
  const { announcements: rawAnnouncements, loading: announcementsLoading, error: announcementsError } = useAnnouncements();

  // On error or empty, fall back to hardcoded data
  const useHardcodedEvents = eventsError || (!eventsLoading && rawEvents.length === 0);
  const useHardcodedAnnouncements = announcementsError || (!announcementsLoading && rawAnnouncements.length === 0);

  const events = useHardcodedEvents
    ? fallbackEvents
    : rawEvents.map(mapEvent);

  const announcements = useHardcodedAnnouncements
    ? fallbackAnnouncements
    : rawAnnouncements;

  const loading = eventsLoading || announcementsLoading;

  return isMobile ? (
    <DashboardClient
      events={events}
      announcements={announcements}
      loading={loading}
    />
  ) : (
    <Home />
  );
};

export default Page;
