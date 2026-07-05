"use client";

import { Box, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";
import AgendaSection from "./AgendaSection";
import SpeakerSection from "./SpeakerSection";
import LocationSection from "./LocationSection";

const PRODUCT_SANS = "'Product Sans', system-ui, -apple-system, sans-serif";

// 👉 DEFAULT STATIC DATA (used now, replaced later by API)
const defaultData = {
  subtitle:
    "Master Provider, Riverpod & Bloc with Real-World Architecture Patterns",
  title: "Flutter State Management Masterclass 2026",
  bannerImage: "/assets/landing-page-assets/event-banner.png",
  eligibility:
    "Undergraduate students | Engineering students | ECE | CSE | Commerce students",
  tags: [
    { label: "Upcoming", bg: "#FDF7E9", color: "#DF8713" },
    { label: "Workshop", bg: "#CDFEE4", color: "#25E299" },
  ],
  about: [
    "Join us for a hands-on masterclass focused on understanding and implementing state management in Flutter applications. This session will help you choose the right architecture for scalable apps and avoid common mistakes developers make while managing app state.",
    "Whether you are building small apps or production-level applications, this workshop will provide clarity and practical implementation examples.",
  ],
};

const LeftPart = ({ data = defaultData }) => {
  const { subtitle, title, tags, bannerImage, eligibility, about } = data;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "72px",
        width: "100%",
      }}
    >
      {/* HEADER */}
      <Box sx={{ display: "flex", flexDirection: "column", gap: "24px" }}>
        <Typography
          sx={{
            fontSize: "20px",
            fontWeight: 400,
            color: "#6D6D6D",
            fontFamily: PRODUCT_SANS,
          }}
        >
          {subtitle}
        </Typography>

        <Typography
          sx={{
            fontSize: { xs: "40px", md: "48px" },
            lineHeight: "105%",
            fontWeight: 700,
            color: "#000",
            letterSpacing: "-1px",
            maxWidth: "700px",
            fontFamily: PRODUCT_SANS,
          }}
        >
          {title}
        </Typography>

        {/* TAGS */}
        <Box sx={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
          {tags.map((tag, i) => (
            <Box
              key={i}
              sx={{
                px: "18px",
                py: "8px",
                borderRadius: "100px",
                bgcolor: tag.bg,
                color: tag.color,
                fontSize: "16px",
                fontFamily: PRODUCT_SANS,
              }}
            >
              {tag.label}
            </Box>
          ))}
        </Box>
      </Box>

      {/* BANNER */}
      <Box
        sx={{
          width: "795px",
          height: "390px",
          borderRadius: "32px",
          overflow: "hidden",
        }}
      >
        <Image
          src={bannerImage}
          alt="event-banner"
          width={795}
          height={390}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </Box>

      {/* ELIGIBILITY */}
      <Box>
        <Typography
          sx={{
            fontSize: "24px",
            fontWeight: 700,
            mb: "16px",
            color: "#000",
            fontFamily: PRODUCT_SANS,
          }}
        >
          Eligibility
        </Typography>

        <Typography
          sx={{
            fontSize: "16px",
            lineHeight: 1.9,
            color: "#000",
            fontFamily: PRODUCT_SANS,
          }}
        >
          {eligibility}
        </Typography>
      </Box>

      {/* ABOUT */}
      <Box sx={{ display: "flex", flexDirection: "column", gap: "14px" }}>
        <Typography
          sx={{
            fontSize: "24px",
            fontWeight: 700,
            color: "#000",
            fontFamily: PRODUCT_SANS,
          }}
        >
          All that you need to know about
        </Typography>

        {about.map((para, i) => (
          <Typography
            key={i}
            sx={{
              fontSize: "16px",
              lineHeight: "22px",
              color: "#000",
              fontFamily: PRODUCT_SANS,
            }}
          >
            {para}
          </Typography>
        ))}
      </Box>

      <AgendaSection />
      <LocationSection />
      <SpeakerSection />
    </Box>
  );
};

export default LeftPart;
