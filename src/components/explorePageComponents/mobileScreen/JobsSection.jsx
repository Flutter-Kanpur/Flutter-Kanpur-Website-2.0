"use client";

import Box from "@mui/material/Box";
import { useRouter } from "next/navigation";
import SectionHeader from "@/components/communityScreen/SectionHeader";
import JobCard from "./jobs/JobCard";
import { suggestedJobs } from "@/data/exploreScreenData";

/**
 * JobsSection — "Suggested jobs" on the Explore landing screen.
 */
const JobsSection = ({ onViewAll }) => {
  const router = useRouter();

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "14px" }}>
      <SectionHeader
        title="Suggested jobs"
        actionLabel="View all"
        onAction={onViewAll}
      />
      <Box sx={{ display: "flex", flexDirection: "column", gap: "13px" }}>
        {suggestedJobs.map((job) => (
          <JobCard
            key={job.id}
            job={job}
            onClick={() => router.push(`/explore/jobs/${job.id}`)}
          />
        ))}
      </Box>
    </Box>
  );
};

export default JobsSection;
