"use client";

import Link from "next/link";
import { Box, Typography, Button, Divider } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import Image from "next/image";
import { projectSubmissionsContent } from "@/data/projectSubmissionsData";

export default function Header() {
  const { backLabel, backHref, title, subtitle } = projectSubmissionsContent;

  return (
    <Box>
      {/* Back */}
      <Button
        component={Link}
        href="/explore"
        disableElevation
        disableRipple
        sx={{
          height: "42px",
          minWidth: 0,
          px: "16px",
          py: "8px",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "8px",
          borderRadius: "14px",
          border: "1px solid #E2E2E2",
          
          background: "linear-gradient(180deg, #FFFFFF 0%, #ECECEC 100%)",
          color: "#3D3D3D",
          textTransform: "none",
          fontSize: "15px",
          fontWeight: 500,
          lineHeight: "22px",
          transition: "all 0.2s ease",
          "&:hover": {
            background: "linear-gradient(180deg, #FFFFFF 0%, #E6E6E6 100%)",
            borderColor: "#DADADA",
            
          },
        }}
      >
        <Image
          src="/assets/explore-page-assets/left-arrow.svg"
          alt="Back"
          width={15}
          height={15}
        />
        Back
      </Button>

      {/* Title */}
      <Box sx={{ mt: 2 }}>
        <Typography sx={{ fontSize: 20, fontWeight: 500, color: "#000000" }}>
          {title}
        </Typography>
        <Typography
          sx={{ fontSize: 13.36, color: "#6D6D6D", mt: 0.5, fontWeight: 400 }}
        >
          {subtitle}
        </Typography>
      </Box>

      <Divider sx={{ mt: 2.5, Color: "#888888" }} />
    </Box>
  );
}
