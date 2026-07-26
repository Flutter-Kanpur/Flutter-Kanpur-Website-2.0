"use client";

import React, { useState } from "react";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";
import { IoArrowForward } from "react-icons/io5";

/**
 * EventCard
 *
 * Dynamic props ready for Supabase integration.
 * UI matched to provided design screenshot.
 */
const EventCard = ({
  status = "upcoming",
  posterImage = "assets/landing-page-assets/Launch.png",
  title = "From Figma to Flutter: Practical Workflow",
  dateTime = "Sun, 7 Apr • 4:00 PM",
  location = "Kanpur",
  description = "This session focuses on building the Flutter applications that scale in real-world scenario. Learn practical tips and techniques from industry experts.",
  onViewDetails = () => {},
  descriptionMaxLength = 95,
}) => {
  const [showFullDescription, setShowFullDescription] = useState(false);

  const statusConfig = {
    upcoming: {
      label: "Upcoming",
      bg: "#08A66C",
      color: "#FFFFFF",
    },
    closing: {
      label: "Closing Soon",
      bg: "#F59E0B",
      color: "#FFFFFF",
    },
    closed: {
      label: "Closed",
      bg: "#DC2626",
      color: "#FFFFFF",
    },
  };

  const currentStatus = statusConfig[status] || statusConfig.upcoming;

  const isTruncated = description.length > descriptionMaxLength;

  const displayedDescription =
    showFullDescription || !isTruncated
      ? description
      : `${description.slice(0, descriptionMaxLength)}...`;

  return (
    <Card
      elevation={0}
      sx={{
        width: "100%",
        borderRadius: "34px",
        overflow: "hidden",
        background: "#F8F9FC",
        border: "1.5px solid #DADCE0",
        p: "18px",
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Poster */}
      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: {
            xs: 190,
            sm: 230,
          },
          borderRadius: "24px",
          overflow: "hidden",
          background: "#EEF2FF",
        }}
      >
        <Chip
          label={currentStatus.label}
          sx={{
            position: "absolute",
            top: 14,
            left: 14,
            zIndex: 2,
            bgcolor: currentStatus.bg,
            color: currentStatus.color,
            border: "none",
            fontWeight: 500,
            fontSize: "14px",
            borderRadius: "999px",
            height: "36px",
            "& .MuiChip-label": {
              px: 2,
            },
          }}
        />

        <Box
          component="img"
          src={posterImage}
          alt={title}
          sx={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
          }}
        />
      </Box>

      {/* Content */}
      <Box
        sx={{
          pt: "18px",
          display: "flex",
          flexDirection: "column",
          gap: "14px",
        }}
      >
        {/* Title */}
        <Typography
          sx={{
            fontSize: {
              xs: "18px",
              sm: "24px",
            },
            fontWeight: 400,
            color: "#000000",
            lineHeight: 1.45,
            letterSpacing: "-0.4px",
          }}
        >
          {title}
        </Typography>

        {/* Date + Location */}
        <Typography
          sx={{
            fontSize: "14px",
            fontWeight: 500,
            color: "#276FD4",
            lineHeight: 1.5,
          }}
        >
          {dateTime} • {location}
        </Typography>

        {/* Description */}
        <Typography
          sx={{
            fontSize: "16px",
            fontWeight: 400,
            color: "#8F8F8F",
            lineHeight: 1.8,
          }}
        >
          {displayedDescription}

          {isTruncated && (
            <Button
              disableRipple
              onClick={() => setShowFullDescription(!showFullDescription)}
              sx={{
                p: 0,
                minWidth: "auto",
                ml: 0.5,
                color: "#276FD4",
                fontSize: "16px",
                fontWeight: 600,
                textTransform: "none",
                verticalAlign: "baseline",
                "&:hover": {
                  bgcolor: "transparent",
                },
              }}
            >
              {showFullDescription ? "see less" : "see more"}
            </Button>
          )}
        </Typography>

        {/* CTA Button */}
        <Button
          disableElevation
          onClick={onViewDetails}
          endIcon={
            <IoArrowForward
              style={{
                fontSize: 18,
                color: "##F4F4F4",
              }}
            />
          }
          sx={{
            mt: 1,
            height: "58px",
            width: "100%",
            borderRadius: "999px",
            background: "linear-gradient(180deg, #111111 0%, #000000 100%)",
            color: "#FFFFFF",
            fontSize: "16px",
            fontWeight: 400,
            textTransform: "none",
            boxShadow:
              "inset 0 2px 8px rgba(255,255,255,0.12), 0 8px 18px rgba(0,0,0,0.18)",
            "&:hover": {
              background: "linear-gradient(180deg, #1B1B1B 0%, #000000 100%)",
            },
          }}
        >
          View details
        </Button>
      </Box>
    </Card>
  );
};

export default EventCard;
