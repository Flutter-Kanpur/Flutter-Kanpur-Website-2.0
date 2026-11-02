"use client";

import { useMemo, useState } from "react";
import Box from "@mui/material/Box";
import { useRouter } from "next/navigation";
import MobileScreenShell from "@/components/FormComponents/MobileScreenShell";
import SearchInput from "@/components/FormComponents/SearchInput";
import FilterChipRow from "@/components/FormComponents/FilterChipRow";
import EmptyState from "@/components/FormComponents/EmptyState";
import LoadMoreButton from "@/components/FormComponents/LoadMoreButton";
import EventListCard from "./EventListCard";
import {
  eventsList,
  eventFilterChips,
  eventsEmptyContent,
} from "@/data/exploreScreenData";

const PAGE_SIZE = 2;

/**
 * EventsListScreen — Mobile "Events" (route: /eventsPage)
 * States: list · no events scheduled · no results.
 */
const EventsListScreen = () => {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [activeChip, setActiveChip] = useState(null);
  const [visible, setVisible] = useState(PAGE_SIZE);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return eventsList.filter((event) => {
      const matchesChip = !activeChip || event.categories.includes(activeChip);
      const matchesQuery =
        !q ||
        event.title.toLowerCase().includes(q) ||
        event.location.toLowerCase().includes(q) ||
        event.description.toLowerCase().includes(q);
      return matchesChip && matchesQuery;
    });
  }, [query, activeChip]);

  const handleQuery = (value) => {
    setQuery(value);
    setVisible(PAGE_SIZE);
  };

  const handleChip = (chip) => {
    setActiveChip((prev) => (prev === chip ? null : chip));
    setVisible(PAGE_SIZE);
  };

  const renderBody = () => {
    if (eventsList.length === 0) {
      const { noEvents } = eventsEmptyContent;
      return (
        <EmptyState
          title={noEvents.title}
          description={noEvents.description}
          buttonLabel={noEvents.buttonLabel}
          onAction={() => router.push(noEvents.href)}
          mt="101px"
        />
      );
    }

    if (results.length === 0) {
      return <EmptyState {...eventsEmptyContent.noResults} mt="101px" />;
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
