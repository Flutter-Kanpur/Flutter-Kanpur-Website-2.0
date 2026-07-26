"use client";

import { Box, Typography } from "@mui/material";
import React from "react";

const PRODUCT_SANS = "'Product Sans', system-ui, -apple-system, sans-serif";


const defaultAgendaData = [
  {
    time: "4:00 - 4:30 PM",
    title: "Introduction to State Management Concepts",
  },
  {
    time: "4:00 - 5:30 PM",
    title: "Provider vs Riverpod Deep Dive",
  },
  {
    time: "4:00 - 6:30 PM",
    title: "Bloc + Q&A",
  },
  {
    time: "4:00 - 6:30 PM",
    title: "App Architecture Workshop",
  },
  {
    time: "4:00 - 7:30 PM",
    title: "Live Q&A + Wrap Up",
  },
];

const AgendaSection = ({ agenda = defaultAgendaData }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "20px",
      }}
    >
      {/* TITLE */}
      <Typography
        sx={{
          fontSize: "24px",
          fontWeight: 700,
          color: "#000",
          fontFamily: PRODUCT_SANS,
        }}
      >
        Event Agenda
      </Typography>

      {/* LIST */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "18px",
        }}
      >
        {agenda.map((item, index) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "4px",
            }}
          >
            <Typography
              sx={{
                fontSize: "20px",
                color: "#4167F2",
                fontWeight: 500,
                fontFamily: PRODUCT_SANS,
              }}
            >
              {item.time}
            </Typography>

            <Typography
              sx={{
                fontSize: "16px",
                color: "#000",
                fontWeight: 500,
                fontFamily: PRODUCT_SANS,
              }}
            >
              {item.title}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default AgendaSection;
