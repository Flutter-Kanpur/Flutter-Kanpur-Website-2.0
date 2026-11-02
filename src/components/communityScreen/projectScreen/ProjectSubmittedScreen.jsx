"use client";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import Image from "next/image";

const font = 'var(--font-product-sans), "Product Sans", sans-serif';

const DEFAULT_MESSAGE = (
  <>
    Thanks for sharing your project. Our team will
    <br />
    review it and notify you once it’s approved.
  </>
);

/**
 * "Submitted" confirmation screen.
 * With no props it renders the original "Project submitted" screen, so the
 * community flow is unchanged. Other flows (e.g. Open call applications)
 * reuse it by passing their own copy / link:
 */
const ProjectSubmittedScreen = ({
  title = "Project submitted",
  message = DEFAULT_MESSAGE,
  status,
  buttonLabel = "View my projects",
  href = "/explore/projects",
  startIcon,
  buttonWidth = 212,
  spacing = {},
}) => {
  const gap = { titleMt: 2, messageMt: 17, statusMt: 25, buttonMt: 28, ...spacing };

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "480px",
        minHeight: "100vh",
        mx: "auto",
        px: "24px",
        pt: "179px",
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        backgroundColor: "#fff",
      }}
    >
      <Image
        src="/assets/community-page-assets/completed.svg"
        width={260}
        height={251}
        alt={title}
        priority
      />

      <Typography
        sx={{
          mt: `${gap.titleMt}px`,
          fontFamily: font,
          fontSize: "24px",
          fontWeight: 700,
          lineHeight: "32px",
          color: "#000000",
        }}
      >
        {title}
      </Typography>

      <Typography
        sx={{
          mt: `${gap.messageMt}px`,
          fontFamily: font,
          fontSize: "16px",
          lineHeight: "24px",
          color: "#6D6D6D",
        }}
      >
        {message}
      </Typography>

      {status && (
        <Typography
          sx={{
            mt: `${gap.statusMt}px`,
            fontFamily: font,
            fontSize: "16px",
            fontStyle: "italic",
            lineHeight: "20px",
            color: "#D1D1D1",
          }}
        >
          {status}
        </Typography>
      )}

      <Box
        component={Link}
        href={href}
        sx={{
          mt: `${gap.buttonMt}px`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "8px",
          width: `${buttonWidth}px`,
          height: "46px",
          borderRadius: "999px",
          border: "1px solid #D3D3D3",
          boxShadow: "inset 0 0 6px rgba(0,0,0,0.06)",
          boxSizing: "border-box",
          color: "#000000",
          fontFamily: font,
          fontSize: "16px",
          fontWeight: 500,
          textDecoration: "none",
        }}
      >
        {startIcon}
        {buttonLabel}
      </Box>
    </Box>
  );
};

export default ProjectSubmittedScreen;
