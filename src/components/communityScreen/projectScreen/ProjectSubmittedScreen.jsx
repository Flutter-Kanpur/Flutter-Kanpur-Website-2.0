"use client";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import Image from "next/image";

const font = 'var(--font-product-sans), "Product Sans", sans-serif';

//"Project submitted" screen
const ProjectSubmittedScreen = () => {
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
        alt="Project submitted"
        priority
      />

      <Typography
        sx={{
          mt: "2px",
          fontFamily: font,
          fontSize: "24px",
          fontWeight: 700,
          lineHeight: "32px",
          color: "#000000",
        }}
      >
        Project submitted
      </Typography>

      <Typography
        sx={{
          mt: "17px",
          fontFamily: font,
          fontSize: "16px",
          lineHeight: "24px",
          color: "#6D6D6D",
        }}
      >
        Thanks for sharing your project. Our team will
        <br />
        review it and notify you once it’s approved.
      </Typography>

      <Box
        component={Link}
        href="/explore/projects"
        sx={{
          mt: "28px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "212px",
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
        View my projects
      </Box>
    </Box>
  );
};

export default ProjectSubmittedScreen;