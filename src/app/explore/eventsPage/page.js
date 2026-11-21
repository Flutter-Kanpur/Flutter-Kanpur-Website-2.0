"use client";

import EventPageComponent from "@/components/EventsPageComponents";
import PaddingContainer from "@/components/PaddingContainer";
import React, { Suspense, useState } from "react";
import NavbarSection from "@/components/EventsNavbar/NavbarSection";
import SearchSection from "@/components/EventsNavbar/SearchSection";
import { Box, useMediaQuery } from "@mui/material";
import EventsListScreen from "@/components/explorePageComponents/mobileScreen/events";
import { ULTRA_WIDE_MEDIA } from "@/theme/breakpoints";
const ULTRA_COLUMNS = 6;

const ultraWideSx = {
  [ULTRA_WIDE_MEDIA]: {
    "& > div": { maxWidth: "none" },
    "& > div > div:nth-of-type(1) > div": { maxWidth: "none" },
    "& > div > div:nth-of-type(2) > div:first-of-type": {
      display: "grid",
      gridTemplateColumns: `repeat(${ULTRA_COLUMNS}, minmax(0, 1fr))`,
    },
    "& > div > div:nth-of-type(2) > div:first-of-type > div > div": {
      maxWidth: "none",
    },
    "& > div > div:nth-of-type(2) > div:last-of-type": { width: "190px" },
  },
};

const EventsPageInner = () => {
  const isMobile = useMediaQuery("(max-width:480px)");
  const [searchQuery, setSearchQuery] = useState("");

  if (isMobile) return <EventsListScreen />;

  return (
    <Box sx={ultraWideSx}>
      <PaddingContainer>
        <NavbarSection />
        <SearchSection
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />
        <EventPageComponent searchQuery={searchQuery} />
      </PaddingContainer>
    </Box>
  );
};

const EventsPage = () => {
  return (
    <Suspense fallback={null}>
      <EventsPageInner />
    </Suspense>
  );
};

export default EventsPage;
