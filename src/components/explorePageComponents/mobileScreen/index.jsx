"use client";

import Box from "@mui/material/Box";
import { useRouter } from "next/navigation";
import GradientHeader from "@/components/header/GradientHeader";
import CommunityHeader from "@/components/communityScreen/CommunityHeader";
import HeroBanner from "./HeroBanner";
import BlogsSection from "./BlogsSection";
import ActivitiesSection from "./ActivitiesSection";
import ProjectsSection from "./ProjectsSection";
import CoreTeamSection from "./coreTeam/CoreTeamSection";
import JobsSection from "./JobsSection";
import { promoSlides } from "@/data/exploreScreenData";

/**
 * ExploreScreen — Mobile "Explore"
 * Rendered by app/explore/page.js below the mobile breakpoint.
 */
const ExploreScreen = () => {
  const router = useRouter();

  const slides = promoSlides.map((slide) => ({
    ...slide,
    onCta: () => router.push(slide.ctaHref),
  }));

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "480px",
        minHeight: "100vh",
        mx: "auto",
        position: "relative",
        px: "24px",
        pb: "100px",
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
        <CommunityHeader title="Explore" />

        <Box sx={{ display: "flex", flexDirection: "column", gap: "36px" }}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <HeroBanner slides={slides} />
            <BlogsSection onViewAll={() => router.push("/#")} />
          </Box>
          <ActivitiesSection />
          <ProjectsSection onViewAll={() => router.push("/explore/browse-projects")} />
          <CoreTeamSection onViewAll={() => router.push("/explore/core-team")} />
          <JobsSection onViewAll={() => router.push("/explore/jobs")} />
        </Box>
      </Box>
    </Box>
  );
};

export default ExploreScreen;