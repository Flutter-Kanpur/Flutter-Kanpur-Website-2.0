"use client";

import React from "react";
import { Card, CardContent, Box, Typography, Button } from "@mui/material";
import ExploreEventImage from "@/../public/assets/landing-page-assets/explore-event-card-image.svg";
import Image from "next/image";
import { useRouter } from "next/navigation";
import PrimaryButton from "@/components/buttons/PrimaryButton/PrimaryButton";
import rightArrow from "@/../public/assets/explore-page-assets/right-arrow.svg";

const PRODUCT_SANS = "'Product Sans', system-ui, -apple-system, sans-serif";

const EventTag = ({ label, bgColor, textColor }) => (
  <Box
    sx={{
      bgcolor: bgColor,
      color: textColor,
      px: "16px",
      py: "6px",
      borderRadius: "100px",
      fontSize: 12,
      fontWeight: 500,
      fontFamily: PRODUCT_SANS,
      width: "fit-content",
    }}
  >
    {label}
  </Box>
);

const EventsCard = ({ onClick = () => {}, event }) => {
  const router = useRouter();

  const {
    image = ExploreEventImage,
    time = "4:00 PM – 7:00 PM",
    type = "Workshop",
    title = "Flutter State Management Workshop",
    description = "A hands-on workshop covering all Provider, Bloc, and Riverpod....",
  } = event || {};

  const commonTextStyle = {
    fontFamily: PRODUCT_SANS,
    m: 0,
  };

  return (
    <Box
      onClick={onClick}
      sx={{
        position: "relative",
        width: "100%",
        maxWidth: 280,
        cursor: "pointer",
      }}
    >
      <Card
        sx={{
          width: "100%",
          background: "#ffffff",
          borderRadius: "24px",
          overflow: "hidden",
          boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.08)",
          display: "flex",
          flexDirection: "column",
          border: "1px solid #F1F1F1",
        }}
      >
        {/* IMAGE */}

        <Box
          sx={{
            p: "16px 16px 0 16px",
            width: "100%",
            height: "100%",
          }}
        >
          <Image
            src={image}
            alt={title}
            style={{
              width: "100%",
              objectFit: "contain",
              height: "100%",
              borderRadius: "18px",
            }}
          />
        </Box>

        {/* CONTENT */}

        <CardContent
          sx={{
            padding: "18px 20px 20px 20px",
            display: "flex",
            flexDirection: "column",
            gap: "14px",
          }}
        >
          {/* TAGS */}

          <Box
            sx={{
              display: "flex",
              gap: "8px",
              flexWrap: "wrap",
            }}
          >
            <EventTag label={time} bgColor="#FFF9F0" textColor="#ED8A19" />

            <EventTag label={type} bgColor="#E8F9F1" textColor="#10B981" />
          </Box>

          {/* TITLE */}

          <Typography
            sx={{
              ...commonTextStyle,
              fontSize: 18,
              fontWeight: 600,
              color: "#000000",
              lineHeight: "26px",
            }}
          >
            {title}
          </Typography>

          {/* DESCRIPTION */}

          <Typography
            sx={{
              ...commonTextStyle,
              fontSize: 14,
              color: "#8A8A8A",
              lineHeight: "24px",
              display: "-webkit-box",
              overflow: "hidden",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 2,
            }}
          >
            {description}
          </Typography>

          {/* BUTTON */}

          <PrimaryButton
            onClick={(e) => {
              e.stopPropagation();
              router.push(`/eventsDetail/${event?.id}`);
            }}
            fullWidth
            endIcon={
              <Image
                src={rightArrow}
                alt="Right arrow"
                width={18}
                height={18}
              />
            }
            sx={{
              bgcolor: "#0A0A0A",
              color: "#FFFFFF",
              borderRadius: "100px",
              py: "10px",
              px: "28px",
              textTransform: "none",
              fontFamily: PRODUCT_SANS,
              fontSize: "16px",
              fontWeight: 400,
              mt: "8px",
              "&:hover": {
                bgcolor: "#333333",
              },
              boxShadow: "none",
              width: "100%",
              minWidth: 0,
              maxWidth: "100%",
            }}
          >
            View Details
          </PrimaryButton>
        </CardContent>
      </Card>
    </Box>
  );
};

export default EventsCard;
