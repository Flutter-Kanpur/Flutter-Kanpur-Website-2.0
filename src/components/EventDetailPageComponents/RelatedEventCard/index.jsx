"use client";

import React from "react";
import { Box, Card, Typography, Avatar, AvatarGroup } from "@mui/material";

import Image from "next/image";

const PRODUCT_SANS = "'Product Sans', system-ui, -apple-system, sans-serif";

const EventTag = ({ label, bgColor, textColor }) => (
  <Box
    sx={{
      bgcolor: bgColor,
      color: textColor,
      px: "14px",
      py: "6px",
      borderRadius: "100px",
      fontSize: "12px",
      fontWeight: 500,
      fontFamily: PRODUCT_SANS,
    }}
  >
    {label}
  </Box>
);

const RelatedEventCard = ({ event }) => {
  const avatars = [
    { id: 1, color: "#8B5CF6" },
    { id: 2, color: "#10B981" },
    { id: 3, color: "#3B82F6" },
    { id: 4, color: "#FACC15" },
  ];

  return (
    <Card
      sx={{
        minWidth: "280px",
        maxWidth: "280px",
        borderRadius: "28px",
        overflow: "hidden",
        background: "#FFFFFF",
        boxShadow: "0px 8px 24px rgba(0,0,0,0.08)",
        border: "1px solid #F1F1F1",
        flexShrink: 0,
      }}
    >
      {/* IMAGE */}

      <Box
        sx={{
          width: "100%",
          height: "180px",
          position: "relative",
        }}
      >
        <Image
          src={event.image}
          alt={event.title}
          fill
          style={{
            objectFit: "cover",
          }}
        />
      </Box>

      {/* CONTENT */}

      <Box
        sx={{
          p: "20px",
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
          <EventTag label={event.time} bgColor="#FFF8EE" textColor="#ED8A19" />

          <EventTag label={event.type} bgColor="#ECFDF3" textColor="#10B981" />
        </Box>

        {/* TITLE */}

        <Typography
          sx={{
            fontSize: "18px",
            fontWeight: 600,
            lineHeight: "26px",
            color: "#000000",
            fontFamily: PRODUCT_SANS,
          }}
        >
          {event.title}
        </Typography>

        {/* REGISTERED */}

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
          }}
        >
          <Typography
            sx={{
              fontSize: "14px",
              fontWeight: 500,
              color: "#000000",
              fontFamily: PRODUCT_SANS,
            }}
          >
            56+ Registered
          </Typography>

          <AvatarGroup
            max={4}
            sx={{
              "& .MuiAvatar-root": {
                width: 30,
                height: 30,
                border: "2px solid white",
              },
            }}
          >
            {avatars.map((avatar) => (
              <Avatar
                key={avatar.id}
                sx={{
                  bgcolor: avatar.color,
                }}
              />
            ))}
          </AvatarGroup>
        </Box>
      </Box>

      {/* FOOTER */}

      <Box
        sx={{
          bgcolor: "#4669F2",
          px: "20px",
          py: "16px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography
          sx={{
            fontSize: "15px",
            fontWeight: 500,
            color: "#FFFFFF",
            fontFamily: PRODUCT_SANS,
          }}
        >
          {event.location}
        </Typography>

        <Typography
          sx={{
            fontSize: "15px",
            fontWeight: 500,
            color: "#FFFFFF",
            fontFamily: PRODUCT_SANS,
          }}
        >
          {event.date}
        </Typography>
      </Box>
    </Card>
  );
};

export default RelatedEventCard;
