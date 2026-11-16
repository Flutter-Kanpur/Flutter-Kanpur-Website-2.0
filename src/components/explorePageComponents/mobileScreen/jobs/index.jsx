"use client";

import { useMemo, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/navigation";
import MobileScreenShell from "@/components/FormComponents/MobileScreenShell";
import SearchInput from "@/components/FormComponents/SearchInput";
import FilterChipRow from "@/components/FormComponents/FilterChipRow";
import EmptyState from "@/components/FormComponents/EmptyState";
import LoadMoreButton from "@/components/FormComponents/LoadMoreButton";
import JobCard from "./JobCard";
import { colors } from "@/theme/colors";
import { jobs, jobFilterChips, jobsEmptyContent } from "@/data/jobsData";

const fontFamily = 'var(--font-product-sans), "Product Sans", sans-serif';
const PAGE_SIZE = 3;

const searchText = (job) =>
  [
    job.title,
    job.description,
    job.company.name,
    job.company.location,
    ...job.tags,
    ...job.skills,
  ]
    .join(" ")
    .toLowerCase();

/**
 * JobsListScreen — Mobile "Suggested Jobs" (route: /explore/jobs)
 * States: list · search results · no jobs.
 */
const JobsListScreen = () => {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [activeChip, setActiveChip] = useState(null);
  const [visible, setVisible] = useState(PAGE_SIZE);

  const trimmed = query.trim();

  const results = useMemo(() => {
    const words = trimmed.toLowerCase().split(/\s+/).filter(Boolean);
    return jobs.filter((job) => {
      const matchesChip = !activeChip || job.categories.includes(activeChip);
      const text = searchText(job);
      return matchesChip && words.every((word) => text.includes(word));
    });
  }, [trimmed, activeChip]);

  const handleQuery = (value) => {
    setQuery(value);
    setVisible(PAGE_SIZE);
  };

  const handleChip = (chip) => {
    setActiveChip((prev) => (prev === chip ? null : chip));
    setVisible(PAGE_SIZE);
  };

  const renderBody = () => {
    if (jobs.length === 0) {
      return <EmptyState {...jobsEmptyContent.noJobs} mt="143px" />;
    }

    return (
      <>
        {trimmed && (
          <Typography
            sx={{
              fontFamily,
              fontSize: "16px",
              lineHeight: "24px",
              color: colors.neutral[500],
            }}
          >
            Results for “{trimmed}”
          </Typography>
        )}

        {results.length === 0 ? (
          <EmptyState
            {...jobsEmptyContent.noResults}
            mt={trimmed ? "127px" : "143px"}
          />
        ) : (
          <Box
            sx={{
              mt: trimmed ? "20px" : "7px",
              ml: "-1px",
              display: "flex",
              flexDirection: "column",
              gap: "12px",
            }}
          >
            {results.slice(0, visible).map((job) => (
              <JobCard
                key={job.id}
                job={job}
                onClick={() => router.push(`/explore/jobs/${job.id}`)}
              />
            ))}

            {visible < results.length && (
              <LoadMoreButton
                onClick={() => setVisible((v) => v + PAGE_SIZE)}
                sx={{ mt: "2px", ml: "1px" }}
              />
            )}
          </Box>
        )}
      </>
    );
  };

  return (
    <MobileScreenShell title="Suggested Jobs" contentSx={{ pt: "19px" }}>
      <SearchInput
        value={query}
        onChange={handleQuery}
        placeholder="Search for jobs..."
      />

      <FilterChipRow
        chips={jobFilterChips}
        active={activeChip}
        onToggle={handleChip}
        sx={{ mt: "18px", mr: "-24px" }}
      />

      <Box sx={{ mt: "14px" }}>{renderBody()}</Box>
    </MobileScreenShell>
  );
};

export default JobsListScreen;
