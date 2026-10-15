"use client";

import Box from "@mui/material/Box";
import SectionHeader from "./SectionHeader";
import DiscussionCard from "./DiscussionCard";
import { featuredDiscussions } from "@/data/communityScreenData";
import { useRouter } from "next/navigation";

const FeaturedDiscussions = () => {
  
  
  const router = useRouter();
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "14px" }}>
      <SectionHeader
        title="Featured discussions"
        actionLabel="Explore all"
        onAction={() => router.push("/community/discussion")}
      />

      <Box
        sx={{
          display: "flex",
          overflowX: "auto",
          gap: "14px",
          mx: "-16px",
          px: "16px",
          scrollSnapType: "x mandatory",
          "&::-webkit-scrollbar": { display: "none" },
          scrollbarWidth: "none",
        }}
      >
        {featuredDiscussions.map((discussion) => (
          <Box
            key={discussion.id}
            sx={{
              flex: "0 0 88%",
              scrollSnapAlign: "start",
            }}
          >
            <DiscussionCard discussion={discussion} />
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default FeaturedDiscussions;