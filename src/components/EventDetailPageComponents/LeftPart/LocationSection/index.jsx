"use client";

import { Box, Typography } from "@mui/material";
import React from "react";

const PRODUCT_SANS = "'Product Sans', system-ui, -apple-system, sans-serif";

// 👉 DEFAULT STATIC DATA (UI unchanged)
const defaultLocationData = {
  title: "Location",
  lines: [
    "This is an online event.",
    "Meeting link will be shared via registered email.",
  ],
};

const LocationSection = ({ location, lines }) => {
  const displayLines =
    lines && lines.length > 0
      ? lines
      : location?.lines || defaultLocationData.lines;
  const displayTitle = location?.title || defaultLocationData.title;

  if (!displayLines || displayLines.length === 0) {
    return null;
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "12px",
      }}
    >
      {/* TITLE */}
      <Typography
        sx={{
          fontSize: "24px",
          fontWeight: 700,
          color: "#000",
          fontFamily: PRODUCT_SANS,
        }}
      >
        {displayTitle}
      </Typography>

      {/* CONTENT */}
      {displayLines.map((text, index) => (
        <Typography
          key={index}
          sx={{
            fontSize: "16px",
            color: "#000",
            lineHeight: "22px",
            fontFamily: PRODUCT_SANS,
            fontWeight: 400,
          }}
        >
          {text}
        </Typography>
      ))}
    </Box>
  );
};

export default LocationSection;
