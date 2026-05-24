"use client";

import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import Image from "next/image";

const PRODUCT_SANS = "'Product Sans', system-ui, -apple-system, sans-serif";

// 👉 DEFAULT STATIC DATA (UI unchanged for now)
const defaultSpeakers = [
  {
    id: 1,
    name: "John Samuel",
    company: "Microsoft",
    image: "/assets/landing-page-assets/speaker.png",
  },
  {
    id: 2,
    name: "John Samuel",
    company: "Microsoft",
    image: "/assets/landing-page-assets/speaker.png",
  },
  {
    id: 3,
    name: "John Samuel",
    company: "Microsoft",
    image: "/assets/landing-page-assets/speaker.png",
  },
];

const SpeakerSection = ({ speakers = defaultSpeakers }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "28px",
      }}
    >
      {/* TITLE */}
      <Typography
        sx={{
          fontSize: "22px",
          fontWeight: 700,
          color: "#000",
          fontFamily: PRODUCT_SANS,
        }}
      >
        Speaker
      </Typography>

      {/* GRID */}
      <Grid container spacing={4}>
        {speakers.map((speaker) => (
          <Grid item xs={6} sm={4} md={3} key={speaker.id}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                gap: "14px",
              }}
            >
              {/* IMAGE */}
              <Box
                sx={{
                  width: "104px",
                  height: "97px",
                  borderRadius: "36px",
                  overflow: "hidden",
                }}
              >
                <Image
                  src={speaker.image}
                  alt={speaker.name}
                  width={146}
                  height={146}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </Box>

              {/* INFO */}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "2px",
                }}
              >
                <Typography
                  sx={{
                    fontSize: "18px",
                    lineHeight: "30px",
                    fontWeight: 500,
                    color: "#000",
                    fontFamily: PRODUCT_SANS,
                  }}
                >
                  {speaker.name}
                </Typography>

                <Typography
                  sx={{
                    fontSize: "16px",
                    lineHeight: "28px",
                    fontWeight: 400,
                    color: "#6D6D6D",
                    fontFamily: PRODUCT_SANS,
                  }}
                >
                  {speaker.company}
                </Typography>
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default SpeakerSection;
