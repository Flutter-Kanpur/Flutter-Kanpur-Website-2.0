"use client";

import Box from "@mui/material/Box";
import GradientHeader from "@/components/header/GradientHeader";
import CommunityHeader from "./CommunityHeader";
import StartDiscussionCard from "./StartDiscussionCard";
import FeaturedDiscussions from "./FeaturedDiscussions";
import ContributeSection from "./ContributeSection";
import CommunityStatsSection from "./CommunityStatsSection";
import TeamSection from "./TeamSection";
import CommunityFooterNote from "./CommunityFooterNote";


/**
 * CommunityScreen — Mobile "Community"
 */
const CommunityScreen = () => {


  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "480px",
        minHeight: "100vh",
        mx: "auto",
        position: "relative",
        px: "16px",
        pb: "80px",
        boxSizing: "border-box",
        overflowX: "hidden",
        backgroundColor: "#fff",
      }}
    >
      <GradientHeader
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 0,
          mb: 0,
        }}
      />

      {/* Page content */}
      <Box
        sx={{
          position: "relative",
          zIndex: 1,
          pt: "20px",
          display: "flex",
          flexDirection: "column",
          gap: "28px",
        }}
      >
        <CommunityHeader />
        <StartDiscussionCard />
        <FeaturedDiscussions  />
        <ContributeSection />
        <CommunityStatsSection />
        <TeamSection />
        <CommunityFooterNote />
      </Box>
    </Box>
  );
};

export default CommunityScreen;
