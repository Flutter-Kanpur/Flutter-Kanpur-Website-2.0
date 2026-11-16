"use client";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import Image from "next/image";
import RefreshRoundedIcon from "@mui/icons-material/RefreshRounded";

const font = 'var(--font-product-sans), "Product Sans", sans-serif';

/**
 * Network / submit error screen.
 * With no props it renders the original community screen (same copy and
 * links). Other flows (e.g. Open call applications) reuse it by passing:
 */
const ProjectUploadErrorScreen = ({
  title = "Couldn't post your question",
  message = "Please check your internet connection and try again.",
  retryLabel = "Try again",
  retryHref = "/community/project/upload",
  backLabel = "Back to community",
  backHref = "/community",
}) => {
  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "480px",
        minHeight: "100vh",
        mx: "auto",
        px: "24px",
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "20px",
        textAlign: "center",
        backgroundColor: "#fff",
      }}
    >
      <Image
        width={260}
        height={260}
        src="/assets/community-page-assets/network_error.svg"
        alt="Network error"
      />

      <Typography
        sx={{
          fontFamily: font,
          fontSize: "22px",
          fontWeight: 700,
          color: "#000000",
        }}
      >
        {title}
      </Typography>

      <Typography
        sx={{
          fontFamily: font,
          fontSize: "15px",
          color: "#6D6D6D",
          mt: "-10px",
        }}
      >
        {message}
      </Typography>

      <Box
        component={Link}
        href={retryHref}
        sx={{
          mt: "24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "8px",
          width: "100%",
          maxWidth: "260px",
          py: "14px",
          borderRadius: "999px",
          border: "1px solid #E0E0E0",
          color: "#000000",
          fontFamily: font,
          fontSize: "15px",
          fontWeight: 500,
          textDecoration: "none",
        }}
      >
        <RefreshRoundedIcon sx={{ fontSize: 18 }} />
        {retryLabel}
      </Box>

      <Box
        component={Link}
        href={backHref}
        sx={{
          fontFamily: font,
          fontSize: "14px",
          fontWeight: 500,
          color: "#4167F2",
          textDecoration: "none",
        }}
      >
        {backLabel}
      </Box>
    </Box>
  );
};

export default ProjectUploadErrorScreen;
