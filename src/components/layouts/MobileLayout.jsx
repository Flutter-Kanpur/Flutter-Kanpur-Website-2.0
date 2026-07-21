"use client";

import { Box } from "@mui/material";

export default function MobileLayout({ children }) {
  return (
    <Box
      sx={{
        // maxWidth: 425,
        mx: "auto",
        minHeight: "100vh",
        display: { xs: "block", sm: "none" },
        backgroundColor: "#fff"
      }}
    >
      {children}
    </Box>
  );
}