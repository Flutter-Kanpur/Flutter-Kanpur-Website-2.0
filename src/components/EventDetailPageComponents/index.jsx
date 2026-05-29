"use client";

import { Box, Grid } from "@mui/material";
import React from "react";
import LeftPart from "./LeftPart";
import DetailCard from "./DetailCard";
import RelatedEventsSection from "./RelatedEventsSection";
import FooterComponent from "@/components/FooterComponent";
import TopNavbar from "../TopNavbar";

const EventDetailPageComponents = () => {
  return (
    <>
      

      <Box
        sx={{
          width: "100%",
          maxWidth: "1250px",
          mx: "auto",
          mt: "100px",
          mb: "80px",
          color: "#ffffff",
        }}
      >
        {/* MAIN GRID */}
        <Grid container spacing={5}>
          <Grid size={{ xs: 12, md: 8 }}>
            <LeftPart />
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <Box sx={{ position: "sticky", top: "120px" }}>
              <DetailCard />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default EventDetailPageComponents;
