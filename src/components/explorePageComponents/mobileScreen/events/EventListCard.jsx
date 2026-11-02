"use client";

import { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import ButtonBase from "@mui/material/ButtonBase";
import IconButton from "@mui/material/IconButton";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import RevampButton from "@/components/buttons/revampbutton/RevampButton";
import StatusBadge from "@/components/FormComponents/StatusBadge";
import { colors } from "@/theme/colors";

const fontFamily = 'var(--font-product-sans), "Product Sans", sans-serif';
const LINK_BLUE = "#276FD4"; 
const SEE_MORE_MIN_LENGTH = 40;

/**
 * EventListCard  */
const EventListCard = ({ event, onViewDetails }) => {
  const [saved, setSaved] = useState(Boolean(event.saved));
  const [expanded, setExpanded] = useState(false);
  const canExpand = event.description.length > SEE_MORE_MIN_LENGTH;

  return (
    <Box
      sx={{
        boxSizing: "border-box",
        p: "16px",
        border: `1px solid ${colors.neutral[100]}`,
        borderRadius: "24px",
        backgroundColor: "#FFFFFF",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <StatusBadge
          tone={event.status === "live" ? "live" : "upcoming"}
          label={event.status === "live" ? "Live" : "Upcoming"}
          dot={event.status === "live"}
        />
        <IconButton
          onClick={() => setSaved((v) => !v)}
          aria-label={saved ? "Remove bookmark" : "Bookmark event"}
          sx={{ p: 0, color: colors.primary[500] }}
        >
          {saved ? <BookmarkIcon sx={{ fontSize: 24 }} /> : <BookmarkBorderIcon sx={{ fontSize: 24 }} />}
        </IconButton>
      </Box>

      <Typography
        sx={{
          mt: "14px",
          fontFamily,
          fontSize: "18px",
          fontWeight: 500,
          lineHeight: "30px",
          color: colors.neutral[950],
        }}
      >
        {event.title}
      </Typography>

      <Typography
        sx={{
          mt: "5px",
          fontFamily,
          fontSize: "14px",
          fontWeight: 500,
          lineHeight: "20px",
          color: colors.success[600],
        }}
      >
        {event.date} • {event.time} • {event.location}
      </Typography>

      <Typography
        sx={{
          mt: "11px",
          fontFamily,
          fontSize: "16px",
          lineHeight: "20px",
          color: colors.neutral[400],
          ...(expanded
            ? {}
            : { overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }),
        }}
      >
        {event.description}
      </Typography>

      {canExpand && (
        <ButtonBase
          disableRipple
          onClick={() => setExpanded((v) => !v)}
          sx={{
            display: "block",
            fontFamily,
            fontSize: "16px",
            fontWeight: 500,
            lineHeight: "20px",
            color: LINK_BLUE,
          }}
        >
          {expanded ? "see less" : "see more"}
        </ButtonBase>
      )}

      <RevampButton
        text="View Details"
        onClick={onViewDetails}
        width="auto"
        sx={{ mt: "8px", height: "36px", px: "24px", py: 0, fontSize: "14px" }}
      />
    </Box>
  );
};

export default EventListCard;
