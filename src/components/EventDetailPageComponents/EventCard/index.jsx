"use client";
import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import EventsCard from "@/components/landingPageComponents/ExploreEventsSection/Cards";
import { eventsData } from "@/constants/events";
import { useRouter } from "next/navigation";

const EventCard = () => {
  const router = useRouter();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        width: "100%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography sx={{ fontSize: 24, fontWeight: 600, color: "#000" }}>
          You may also like
        </Typography>
        <Typography
          onClick={() => router.push("/eventsPage")}
          sx={{
            fontSize: 18,
            lineHeight: "25px",
            fontWeight: 400,
            color: "#4167F2",
            cursor: "pointer",
          }}
        >
          See all events
        </Typography>
      </Box>
      <Grid container spacing={2} rowSpacing={8} sx={{ display: "flex" }}>
        {eventsData.slice(0, 4).map((item, index) => (
          <Grid
            size={{ xs: 12, sm: 6, md: 3 }}
            key={item.id ?? index}
          >
            <EventsCard event={item} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default EventCard;
