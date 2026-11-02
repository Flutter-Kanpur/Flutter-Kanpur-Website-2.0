"use client";

import Box from "@mui/material/Box";
import { useRouter } from "next/navigation";
import GradientHeader from "@/components/header/GradientHeader";

/**
 * MobileScreenShell — standard mobile sub-screen frame:
 */
const MobileScreenShell = ({ title, onBack, contentSx, children }) => {
  const router = useRouter();

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "480px",
        minHeight: "100vh",
        mx: "auto",
        pb: "100px",
        boxSizing: "border-box",
        overflowX: "hidden",
        backgroundColor: "#fff",
      }}
    >
      <GradientHeader title={title} onBack={onBack ?? (() => router.back())} />
      <Box
        sx={{
          position: "relative",
          zIndex: 11,
          px: "24px",
          pt: "12px",
          ...contentSx,
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default MobileScreenShell;
