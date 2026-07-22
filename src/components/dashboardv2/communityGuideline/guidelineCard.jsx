import React from "react";
import { Box, Typography } from "@mui/material";

export default function GuidelineCard({ title, description }) {
  return (
    <Box
      sx={{
        p: { xs: 2.5, md: 3 },
        bgcolor: "#fff",
        border: "1px solid #E8E8E8",
        borderRadius: "16px",
        boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
        height: "100%",
        transition: "box-shadow 0.2s ease",
        "&:hover": {
          boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
        },
      }}
    >
      <Typography
        sx={{
          fontSize: { xs: 16, md: 18 },
          fontWeight: 600,
          color: "#111",
          mb: 1.25,
        }}
      >
        {title}
      </Typography>
      <Typography
        sx={{
          fontSize: { xs: 16, md: 18 },
          color: "#666",
          lineHeight: 1.65,
        }}
      >
        {description}
      </Typography>
    </Box>
  );
}
