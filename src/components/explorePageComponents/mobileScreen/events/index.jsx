"use client";

import { useMemo, useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Skeleton from "@mui/material/Skeleton";
import { useRouter, useSearchParams } from "next/navigation";
import MobileScreenShell from "@/components/FormComponents/MobileScreenShell";
import SearchInput from "@/components/FormComponents/SearchInput";
import FilterChipRow from "@/components/FormComponents/FilterChipRow";
import EmptyState from "@/components/FormComponents/EmptyState";
import LoadMoreButton from "@/components/FormComponents/LoadMoreButton";
import EventListCard from "./EventListCard";
import {
  eventFilterChips,
  eventsEmptyContent,
} from "@/data/exploreScreenData";
import {
  useEvents,
  isEventPast,
  formatTimeRange,
  formatEventDate,
} from "@/hooks/useEvents";

const PAGE_SIZE = 5;
const fontFamily = 'var(--font-product-sans), "Product Sans", sans-serif';

/**
 * EventsListScreen — Mobile "Events" (route: /explore/eventsPage)
 * Connected to live Supabase data via useEvents.
 */
const EventsListScreen = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const urlTab = searchParams?.get("tab");
  const defaultTab =
    urlTab === "past" ? "past" : urlTab === "upcoming" ? "upcoming" : "all";

  const [userTab, setUserTab] = useState(null);
  const activeTab = userTab ?? defaultTab;
  const [query, setQuery] = useState("");
  const [activeChip, setActiveChip] = useState(null);
  const [visible, setVisible] = useState(PAGE_SIZE);

  const { events, loading, error, refetch } = useEvents({
    limit: 100,
    status: ["published", "closed", "completed"],
  });

  const formattedEvents = useMemo(() => {
    return (events || []).map((e) => {
      const isPast = isEventPast(e);
      return {
        id: e.id,
        title: e.title || "Untitled Event",
        date: formatEventDate(e.start_at),
        time: formatTimeRange(e.start_at, e.end_at),
        location:
          e.location_text ||
          (e.location_type === "online" ? "Online" : "Kanpur"),
        description: e.short_description || e.description || "",
        status: isPast ? "past" : "upcoming",
        isPast,
        categories: [e.event_type].filter(Boolean),
      };
    });
  }, [events]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return formattedEvents.filter((event) => {
      // Filter by tab
      if (activeTab === "upcoming" && event.isPast) return false;
      if (activeTab === "past" && !event.isPast) return false;

      // Filter by category chip
      const matchesChip =
        !activeChip ||
        event.categories.some(
          (c) => c?.toLowerCase() === activeChip.toLowerCase()
        );

      // Filter by search query
      const matchesQuery =
        !q ||
        event.title.toLowerCase().includes(q) ||
        event.location.toLowerCase().includes(q) ||
        event.description.toLowerCase().includes(q);

      return matchesChip && matchesQuery;
    });
  }, [formattedEvents, activeTab, activeChip, query]);

  const handleQuery = (value) => {
    setQuery(value);
    setVisible(PAGE_SIZE);
  };

  const handleChip = (chip) => {
    setActiveChip((prev) => (prev === chip ? null : chip));
    setVisible(PAGE_SIZE);
  };

  const renderBody = () => {
    if (loading) {
      return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: "13px" }}>
          {Array.from({ length: 3 }).map((_, i) => (
            <Box
              key={`skel-${i}`}
              sx={{
                p: "16px",
                border: "1px solid #E6E6E6",
                borderRadius: "24px",
                backgroundColor: "#FFFFFF",
              }}
            >
              <Skeleton width="30%" height={24} sx={{ borderRadius: "100px" }} />
              <Skeleton width="80%" height={28} sx={{ mt: 1.5 }} />
              <Skeleton width="60%" height={20} sx={{ mt: 0.5 }} />
              <Skeleton width="100%" height={20} sx={{ mt: 1 }} />
            </Box>
          ))}
        </Box>
      );
    }

    if (error) {
      return (
        <Box
          sx={{
            py: 6,
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 1.5,
          }}
        >
          <Typography
            sx={{
              fontFamily,
              fontSize: 18,
              color: "#DC2626",
              fontWeight: 600,
            }}
          >
            Failed to load events
          </Typography>
          <Typography
            sx={{
              fontFamily,
              fontSize: 14,
              color: "#6D6D6D",
              maxWidth: 300,
            }}
          >
            {error.message || "An error occurred while fetching events."}
          </Typography>
          <Button
            variant="outlined"
            onClick={refetch}
            sx={{
              borderRadius: "100px",
              px: 3,
              py: 0.8,
              textTransform: "none",
              fontFamily,
              borderColor: "#1D1D1D",
              color: "#1D1D1D",
            }}
          >
            Retry
          </Button>
        </Box>
      );
    }

    if (formattedEvents.length === 0) {
      const { noEvents } = eventsEmptyContent;
      return (
        <EmptyState
          title={noEvents.title}
          description={noEvents.description}
          buttonLabel={noEvents.buttonLabel}
          onAction={() => router.push(noEvents.href)}
          mt="60px"
        />
      );
    }

    if (results.length === 0) {
      return (
        <EmptyState
          title={
            activeTab === "past"
              ? "No past events found"
              : activeTab === "upcoming"
              ? "No upcoming events scheduled"
              : eventsEmptyContent.noResults.title
          }
          description={
            query
              ? eventsEmptyContent.noResults.description
              : activeTab === "upcoming"
              ? "Check back later for new community events."
              : "Past event recordings will appear here."
          }
          mt="60px"
        />
      );
    }

    return (
      <Box sx={{ display: "flex", flexDirection: "column", gap: "13px" }}>
        {results.slice(0, visible).map((event) => (
          <EventListCard
            key={event.id}
            event={event}
            onViewDetails={() => router.push(`/eventsDetail/${event.id}`)}
          />
        ))}

        {visible < results.length && (
          <LoadMoreButton
            onClick={() => setVisible((v) => v + PAGE_SIZE)}
            sx={{ mt: "6px" }}
          />
        )}
      </Box>
    );
  };

  return (
    <MobileScreenShell title="Events">
      {/* TABS (All / Upcoming / Past) */}
      <Box
        sx={{
          display: "flex",
          gap: "8px",
          alignItems: "center",
          mb: "16px",
          overflowX: "auto",
          pb: "4px",
        }}
      >
        {[
          { label: "All", value: "all" },
          { label: "Upcoming", value: "upcoming" },
          { label: "Past events", value: "past" },
        ].map((tab) => {
          const isActive = activeTab === tab.value;
          return (
            <Button
              key={tab.value}
              onClick={() => {
                setUserTab(tab.value);
                setVisible(PAGE_SIZE);
              }}
              sx={{
                textTransform: "none",
                fontFamily,
                fontSize: "14px",
                fontWeight: 500,
                borderRadius: "100px",
                px: "18px",
                py: "6px",
                minWidth: "fit-content",
                bgcolor: isActive ? "#1D1D1D" : "#F5F5F5",
                color: isActive ? "#FFFFFF" : "#5D5D5D",
                boxShadow: "none",
                "&:hover": {
                  bgcolor: isActive ? "#333333" : "#EAEAEA",
                  boxShadow: "none",
                },
              }}
            >
              {tab.label}
            </Button>
          );
        })}
      </Box>

      <SearchInput
        value={query}
        onChange={handleQuery}
        placeholder="Search for events..."
      />

      <FilterChipRow
        chips={eventFilterChips}
        active={activeChip}
        onToggle={handleChip}
        sx={{ mt: "15px", mr: "-24px" }}
      />

      <Box sx={{ mt: "20px" }}>{renderBody()}</Box>
    </MobileScreenShell>
  );
};

export default EventsListScreen;
