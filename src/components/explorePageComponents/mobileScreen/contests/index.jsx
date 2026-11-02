"use client";

import { useMemo, useState } from "react";
import Box from "@mui/material/Box";
import { useRouter } from "next/navigation";
import MobileScreenShell from "@/components/FormComponents/MobileScreenShell";
import SearchInput from "@/components/FormComponents/SearchInput";
import FilterChipRow from "@/components/FormComponents/FilterChipRow";
import EmptyState from "@/components/FormComponents/EmptyState";
import LoadMoreButton from "@/components/FormComponents/LoadMoreButton";
import ContestCard from "./ContestCard";
import {
  contests,
  contestFilterChips,
  contestsEmptyContent,
  contestRoutes,
} from "@/data/exploreScreenData";

const PAGE_SIZE = 2;

/**
 * ContestsListScreen — Mobile "Contests" (route: /explore/contests)
 * States: list · no contests · no results.
 */
const ContestsListScreen = () => {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [activeChip, setActiveChip] = useState(null);
  const [visible, setVisible] = useState(PAGE_SIZE);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return contests.filter((contest) => {
      const matchesChip = !activeChip || contest.categories.includes(activeChip);
      const matchesQuery =
        !q ||
        contest.title.toLowerCase().includes(q) ||
        contest.category.toLowerCase().includes(q) ||
        contest.tags.some((tag) => tag.toLowerCase().includes(q));
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
    if (contests.length === 0) {
      const { noContests } = contestsEmptyContent;
      return (
        <EmptyState
          {...noContests}
          mt="99px"
          onAction={() => router.push(contestRoutes.dailyProblem)}
        />
      );
    }

    if (results.length === 0) {
      return <EmptyState {...contestsEmptyContent.noResults} mt="99px" />;
    }

    return (
      // Cards are 2px wider than the search bar on the left in the design.
      <Box
        sx={{
          ml: "-2px",
          display: "flex",
          flexDirection: "column",
          gap: "12px",
        }}
      >
        {results.slice(0, visible).map((contest) => (
          <ContestCard
            key={contest.id}
            contest={contest}
            onContinue={() => router.push(contestRoutes.detail(contest.id))}
          />
        ))}

        {visible < results.length && (
          <LoadMoreButton
            onClick={() => setVisible((v) => v + PAGE_SIZE)}
            sx={{ mt: "2px", ml: "2px" }}
          />
        )}
      </Box>
    );
  };

  return (
    <MobileScreenShell title="Contests" contentSx={{ pt: "21px" }}>
      <SearchInput
        value={query}
        onChange={handleQuery}
        placeholder="Search for contests..."
      />

      <FilterChipRow
        chips={contestFilterChips}
        active={activeChip}
        onToggle={handleChip}
        sx={{ mt: "15px", mr: "-24px" }}
      />

      <Box sx={{ mt: "22px" }}>{renderBody()}</Box>
    </MobileScreenShell>
  );
};

export default ContestsListScreen;
