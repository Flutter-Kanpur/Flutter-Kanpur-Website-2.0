"use client";

import WrapperComponent from "@/components/WrapperComponent";
import { Box, Typography } from "@mui/material";
import { keyframes } from "@mui/system";

export default function LoadingScreen() {
  return (
    <Box
      sx={{
        maxWidth: "100vw",
        mx: "auto",
        minHeight: "100vh",
        position: "relative",
        backgroundColor: "#3F66F3",
        overflow: "hidden",
      }}
    >
      {/* Center mascot */}
      <Box
        sx={{
          minHeight: "100dvh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          component="img"
          src="/assets/auth-assets/bird.png"
          alt="Loading Mascot"
          sx={{
            width: {
              xs: "70%", // small phones
              sm: "60%", // big phones
              md: 220, // tablet
              lg: 260, // laptop
            },
            maxWidth: 260,
            height: "auto",
            objectFit: "contain",
            userSelect: "none",
          }}
        />
      </Box>

      {/* Bottom text */}
      <Typography
        sx={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: "max(24px, env(safe-area-inset-bottom))",
          textAlign: "center",
          color: "#fff",
          fontWeight: 500,
          fontSize: {
            xs: 14,
            sm: 15,
            md: 16,
            lg: 18,
          },
        }}
      >
        Loading...
      </Typography>
    </Box>
  );
}
