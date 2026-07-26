"use client";

import React from "react";
import { Box, Typography } from "@mui/material";
import RelatedEventCard from "../RelatedEventCard";

const PRODUCT_SANS = "'Product Sans', system-ui, -apple-system, sans-serif";

const relatedEvents = [
  {
    id: 1,
    title: "Flutter State Management Workshop",
    image: "/assets/landing-page-assets/explore-event-card-image.svg",
    time: "4:00 PM – 7:00 PM",
    type: "Workshop",
    location: "Bangalore",
    date: "06 Mar'26",
  },
  {
    id: 2,
    title: "Flutter Networking & APIs",
    image: "/assets/landing-page-assets/explore-event-card-image.svg",
    time: "5:00 PM – 8:00 PM",
    type: "Seminar",
    location: "Delhi",
    date: "10 Apr'26",
  },
  {
    id: 3,
    title: "Advanced Flutter Animations",
    image: "/assets/landing-page-assets/explore-event-card-image.svg",
    time: "2:00 PM – 5:00 PM",
    type: "Hands-on",
    location: "Mumbai",
    date: "14 May'26",
  },
];

const RelatedEventsSection = () => {
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: "32px",
      }}
    >
      <Typography
        sx={{
          fontSize: "32px",
          fontWeight: 700,
          color: "#000000",
          fontFamily: PRODUCT_SANS,
        }}
      >
        Related Events
      </Typography>

      <Box
        sx={{
          display: "flex",
          gap: "24px",
          overflowX: "auto",
          pb: "12px",

          "&::-webkit-scrollbar": {
            display: "none",
          },

          scrollbarWidth: "none",
        }}
      >
        {relatedEvents.map((event) => (
          <RelatedEventCard key={event.id} event={event} />
        ))}
      </Box>
    </Box>
  );
};

export default RelatedEventsSection;
