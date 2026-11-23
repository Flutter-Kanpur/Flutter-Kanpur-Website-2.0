"use client";

import { useMemo, useState } from "react";
import Box from "@mui/material/Box";
import { useRouter } from "next/navigation";
import MobileScreenShell from "@/components/FormComponents/MobileScreenShell";
import SearchInput from "@/components/FormComponents/SearchInput";
import FilterChipRow from "@/components/FormComponents/FilterChipRow";
import EmptyState from "@/components/FormComponents/EmptyState";
import LoadMoreButton from "@/components/FormComponents/LoadMoreButton";
import OpenCallCard from "./OpenCallCard";
import {
  openCalls,
  openCallFilterChips,
  openCallsEmptyContent,
} from "@/data/exploreScreenData";

const PAGE_SIZE = 2;

/**
 * OpenCallsListScreen — Mobile "Open calls" (route: /explore/open-calls)
 */
const OpenCallsListScreen = () => {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [activeChip, setActiveChip] = useState(null);
  const [visible, setVisible] = useState(PAGE_SIZE);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return openCalls.filter((call) => {
      const matchesChip = !activeChip || call.type === activeChip;
      const matchesQuery =
        !q ||
        call.title.toLowerCase().includes(q) ||
        call.description.toLowerCase().includes(q) ||
        call.audience.toLowerCase().includes(q);
      return matchesChip && matchesQuery;
    });
  }, [query, activeChip]);

  const handleQuery = (value) => {
    setQuery(value);
    setVisible(PAGE_SIZE);
  };

  // "All" clears the filter; any other chip toggles.
  const handleChip = (chip) => {
    setActiveChip((prev) => (chip === "All" || prev === chip ? null : chip));
    setVisible(PAGE_SIZE);
  };

  const renderBody = () => {
    if (openCalls.length === 0) {
      const { noCalls } = openCallsEmptyContent;
      return (
        <EmptyState
          title={noCalls.title}
          description={noCalls.description}
          buttonLabel={noCalls.buttonLabel}
          onAction={() => router.push(noCalls.href)}
          mt="101px"
        />
      );
    }

    if (results.length === 0) {
      return <EmptyState {...openCallsEmptyContent.noResults} mt="101px" />;
    }

    return (
      <Box sx={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        {results.slice(0, visible).map((call) => (
          <OpenCallCard
            key={call.id}
            call={call}
            onViewDetails={() => router.push(`/explore/open-calls/${call.id}`)}
          />
        ))}

        {visible < results.length && (
          <LoadMoreButton onClick={() => setVisible((v) => v + PAGE_SIZE)} />
        )}
      </Box>
    );
  };

  return (
    <MobileScreenShell title="Open calls">
      <SearchInput
        value={query}
        onChange={handleQuery}
        placeholder="Search for calls..."
      />

      <FilterChipRow
        chips={openCallFilterChips}
        active={activeChip}
        onToggle={handleChip}
        sx={{ mt: "15px", mr: "-24px" }}
      />

      <Box sx={{ mt: "20px" }}>{renderBody()}</Box>
    </MobileScreenShell>
  );
};

export default OpenCallsListScreen;
