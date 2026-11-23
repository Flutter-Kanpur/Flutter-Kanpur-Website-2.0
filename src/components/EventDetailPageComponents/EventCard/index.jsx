"use client";

import { Box, Grid, Typography, Skeleton } from "@mui/material";
import React from "react";
import EventsCard from "@/components/landingPageComponents/ExploreEventsSection/Cards";
import { eventsData } from "@/constants/events";
import { useRouter } from "next/navigation";
import { useEvents } from "@/hooks/useEvents";
import ExploreEventImage from "@/../public/assets/landing-page-assets/explore-event-card-image.svg";

/**
 * Format a start_at / end_at pair into a readable time label.
 * Uses a fixed locale ('en-IN') and timeZone ('Asia/Kolkata').
 */
function formatTimeRange(startAt, endAt) {
  if (!startAt) return "";
  try {
    const timeOpts = {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
      timeZone: "Asia/Kolkata",
    };
    const formatTime = (d) =>
      new Date(d)
        .toLocaleTimeString("en-IN", timeOpts)
        .replace(/\u202f/g, " ")
        .toUpperCase();

    const start = formatTime(startAt);
    if (!endAt) return start;

    const dayOpts = {
      timeZone: "Asia/Kolkata",
      year: "numeric",
      month: "numeric",
      day: "numeric",
    };
    const isSameDay =
      new Date(startAt).toLocaleDateString("en-IN", dayOpts) ===
      new Date(endAt).toLocaleDateString("en-IN", dayOpts);

    if (isSameDay) {
      const end = formatTime(endAt);
      return `${start} – ${end}`;
    }

    const startDate = new Date(startAt).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      timeZone: "Asia/Kolkata",
    });
    return `${startDate} · ${start}`;
  } catch {
    return "";
  }
}

const EventCard = ({ currentEventId, isStatic = false }) => {
  const router = useRouter();
  const { events, loading, error } = useEvents({ limit: 6 });

  // In isStatic mode, keep the static eventsData
  if (isStatic) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          width: "100%",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography sx={{ fontSize: 24, fontWeight: 600, color: "#000" }}>
            You may also like
          </Typography>
          <Typography
            onClick={() => router.push("/explore/eventsPage")}
            sx={{
              fontSize: 18,
              lineHeight: "25px",
              fontWeight: 400,
              color: "#4167F2",
              cursor: "pointer",
            }}
          >
            See all events
          </Typography>
        </Box>
        <Grid
          container
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(5, minmax(0, 1fr))",
            gap: "6px",
            width: "100%",
          }}
        >
          {eventsData.slice(0, 5).map((item, index) => (
            <Box key={item.id ?? index}>
              <EventsCard event={item} />
            </Box>
          ))}
        </Grid>
      </Box>
    );
  }

  // Filter out current event and cap at 5
  const relatedEvents = (events || [])
    .filter((e) => e.id !== currentEventId)
    .slice(0, 5);

  // Hide the whole block when nothing remains or on error
  if (!loading && (error || relatedEvents.length === 0)) {
    return null;
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        width: "100%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography sx={{ fontSize: 24, fontWeight: 600, color: "#000" }}>
          You may also like
        </Typography>
        <Typography
          onClick={() => router.push("/explore/eventsPage")}
          sx={{
            fontSize: 18,
            lineHeight: "25px",
            fontWeight: 400,
            color: "#4167F2",
            cursor: "pointer",
          }}
        >
          See all events
        </Typography>
      </Box>

      <Grid
        container
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(5, minmax(0, 1fr))",
          gap: "6px",
          width: "100%",
        }}
      >
        {loading
          ? Array.from({ length: 5 }).map((_, index) => (
              <Box key={`skeleton-${index}`} sx={{ width: "100%", maxWidth: 280 }}>
                <Skeleton
                  variant="rounded"
                  width="100%"
                  height={200}
                  sx={{ borderRadius: "24px" }}
                />
                <Skeleton width="60%" sx={{ mt: 1 }} />
                <Skeleton width="80%" />
                <Skeleton width="40%" />
              </Box>
            ))
          : relatedEvents.map((item, index) => {
              const mapped = {
                id: item.id,
                slug: item.slug,
                image: item.banner_url || ExploreEventImage,
                time: formatTimeRange(item.start_at, item.end_at),
                type: item.event_type ?? "",
                title: item.title ?? "",
                description:
                  item.short_description || item.description || "",
              };

              return (
                <Box key={item.id ?? index}>
                  <EventsCard event={mapped} />
                </Box>
              );
            })}
      </Grid>
    </Box>
  );
};

export default EventCard;
