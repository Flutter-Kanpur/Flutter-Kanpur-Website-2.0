"use client";

import { Box, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";
import AgendaSection from "./AgendaSection";
import SpeakerSection from "./SpeakerSection";
import LocationSection from "./LocationSection";

const PRODUCT_SANS = "'Product Sans', system-ui, -apple-system, sans-serif";

const DEFAULT_BANNER = "/assets/landing-page-assets/event-banner.png";

// 👉 DEFAULT STATIC DATA (used when isStatic or as fallback)
const defaultData = {
  subtitle:
    "Master Provider, Riverpod & Bloc with Real-World Architecture Patterns",
  title: "Flutter State Management Masterclass 2026",
  bannerImage: DEFAULT_BANNER,
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

const LeftPart = ({ event, isStatic = false, data = defaultData }) => {
  let subtitle = data.subtitle;
  let title = data.title;
  let tags = data.tags || [];
  let bannerImage = data.bannerImage || DEFAULT_BANNER;
  let eligibility = data.eligibility || null;
  let about = data.about || [];
  let locationLines = null;
  let speakers = null;

  if (!isStatic && event) {
    subtitle = event.short_description || "";
    title = event.title || "";

    // Status chip derived from isClosed
    const isClosed = Boolean(event.isClosed);

    const statusChip = isClosed
      ? { label: "Closed", bg: "#FEE2E2", color: "#DC2626" }
      : { label: "Upcoming", bg: "#FDF7E9", color: "#DF8713" };

    tags = [statusChip];
    if (event.event_type) {
      tags.push({
        label: event.event_type,
        bg: "#CDFEE4",
        color: "#25E299",
      });
    }

    bannerImage = event.banner_url || DEFAULT_BANNER;
    eligibility = null; // No eligibility column in events table

    const rawAbout = event.description || event.short_description || "";
    about = rawAbout
      .split(/\n\s*\n/)
      .map((p) => p.trim())
      .filter(Boolean);

    // Location lines
    const isOnline = event.location_type === "online";
    locationLines = isOnline
      ? [
          "This is an online event.",
          "Meeting link will be shared via registered email.",
        ]
      : [event.location_text || "Venue details will be shared soon."];

    // Speakers mapping
    if (Array.isArray(event.speakers) && event.speakers.length > 0) {
      speakers = event.speakers.map((s, index) => ({
        id: index + 1,
        name: s.name || "",
        company: s.intro || "",
        image: s.image_url || "/assets/landing-page-assets/speaker.png",
      }));
    } else if (event.speaker_name) {
      speakers = [
        {
          id: 1,
          name: event.speaker_name,
          company: event.speaker_intro || "",
          image:
            event.speaker_image_url || "/assets/landing-page-assets/speaker.png",
        },
      ];
    } else {
      speakers = [];
    }
  }

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
        {subtitle ? (
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
        ) : null}

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
        {tags && tags.length > 0 ? (
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
        ) : null}
      </Box>

      {/* BANNER */}
      <Box
        sx={{
          width: "100%",
          maxWidth: "795px",
          height: "390px",
          borderRadius: "32px",
          overflow: "hidden",
        }}
      >
        <Image
          src={bannerImage}
          alt={title || "event-banner"}
          width={795}
          height={390}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </Box>

      {/* ELIGIBILITY (Hidden when missing) */}
      {eligibility ? (
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
      ) : null}

      {/* ABOUT */}
      {about && about.length > 0 ? (
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
      ) : null}

      {/* Hide AgendaSection for live events */}
      {isStatic ? <AgendaSection /> : null}

      <LocationSection lines={locationLines} />
      <SpeakerSection speakers={speakers} />
    </Box>
  );
};

export default LeftPart;
