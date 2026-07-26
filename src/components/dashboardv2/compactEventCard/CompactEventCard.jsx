import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";

/**
 * Status tag colour config — shared with EventCard
 */
const statusConfig = {
  upcoming: {
    label: "Upcoming",
    bg: "#E8F5E9",
    color: "#2E7D32",
    border: "#A5D6A7",
  },
  closing: {
    label: "Closing soon",
    bg: "#FFF3E0",
    color: "#E65100",
    border: "#FFCC80",
  },
  closed: {
    label: "Closed",
    bg: "#FFEBEE",
    color: "#C62828",
    border: "#EF9A9A",
  },
};

/**
 * Parse a dateTime string like "Sun, 7 Apr • 4:00 PM" into { day, month }
 */
const parseDateBlock = (dateTime = "") => {
  // Try to extract the day number and month name
  const match = dateTime.match(/(\d{1,2})\s+(\w{3})/);
  if (match) return { day: match[1], month: match[2] };
  return { day: "--", month: "---" };
};

/**
 * CompactEventCard — concise card used in the "Explore More" section.
 *
 * Layout: Date block (day / month) on left  |  Title + tag on right
 *
 * @param {string}   id       – Event ID
 * @param {string}   title    – Event title
 * @param {string}   dateTime – e.g. "Sun, 7 Apr • 4:00 PM"
 * @param {string}   status   – "upcoming" | "closing" | "closed"
 * @param {function} onClick  – Callback when card is tapped
 */
const CompactEventCard = ({
  id,
  title = "Event Title",
  dateTime = "24 Jun",
  status = "upcoming",
  onClick = () => {},
}) => {
  const { day, month } = parseDateBlock(dateTime);
  const tag = statusConfig[status] || statusConfig.upcoming;

  return (
    <Box
      onClick={() => onClick(id)}
      sx={{
        display: "flex",
        gap: "12px",
        borderRadius: "12px",
        p: "12px",
        boxShadow: "inset 0px 0px 15px 0px #4167F221",
        border: "1px solid #E5E7EB",
        alignItems: "center",
        bgcolor: "#FFFFFF",
        cursor: "pointer",
        transition: "background-color 0.15s ease, box-shadow 0.15s ease",
        "&:hover": {
          bgcolor: "#F9FAFB",
          boxShadow: "0 2px 12px rgba(0, 0, 0, 0.1)",
        },
        "&:active": {
          bgcolor: "#F3F4F6",
        },
      }}
    >
      {/* Date block */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          minWidth: "52px",
        }}
      >
        <Typography
          sx={{
            fontSize: "20px",
            color: "#4167F2",
            fontWeight: 700,
            lineHeight: 1.1,
          }}
        >
          {day}
        </Typography>
        <Typography
          sx={{
            fontSize: "14px",
            fontWeight: 600,
            color: "#4167F2",
            lineHeight: 1.2,
            textTransform: "capitalize",
          }}
        >
          {month}
        </Typography>
      </Box>

      {/* Divider */}
      <Box
        sx={{
          width: "1px",
          height: "44px",
          bgcolor: "#D9D9D9",
          flexShrink: 0,
        }}
      />

      {/* Title + Tag */}
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Typography
          sx={{
            fontSize: "14px",
            fontWeight: 500,
            lineHeight: "20px",
            color: "#1A1A2E",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {title}
        </Typography>
        <Chip
          label={tag.label}
          size="small"
          sx={{
            mt: "8px",
            height: "24px",
            fontSize: "12px",
            borderRadius: "100px",
            bgcolor: "#30C85D36",
            color: "#006748",
            border: `1px solid ${tag.border}`,
            fontWeight: 600,
            "& .MuiChip-label": {
              px: "8px",
            },
          }}
          variant="outlined"
        />
      </Box>
    </Box>
  );
};

export default CompactEventCard;
