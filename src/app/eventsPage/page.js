import EventPageComponent from "@/components/EventsPageComponents";
import PaddingContainer from "@/components/PaddingContainer";
import React from "react";
import NavbarSection from "@/components/EventsNavbar/NavbarSection";
import SearchSection from "@/components/EventsNavbar/SearchSection";
import { Box } from "@mui/material";
const ULTRA_WIDE = "@media (min-width:2400px)";
const ULTRA_COLUMNS = 6;

const ultraWideSx = {
  [ULTRA_WIDE]: {
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

const page = () => {
  return (
    <Box sx={ultraWideSx}>
      <PaddingContainer>
        <NavbarSection />
        <SearchSection />
        <EventPageComponent />
      </PaddingContainer>
    </Box>
  );
};

export default page;
