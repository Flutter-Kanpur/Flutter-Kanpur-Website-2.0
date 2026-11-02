"use client";

import { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import RevampButton from "@/components/buttons/revampbutton/RevampButton";
import StatusBadge from "@/components/FormComponents/StatusBadge";
import { colors } from "@/theme/colors";

const fontFamily = 'var(--font-product-sans), "Product Sans", sans-serif';

/**
 * OpenCallCard — compact card for the mobile Open Calls list
 */
const OpenCallCard = ({ call, onViewDetails }) => {
  const [saved, setSaved] = useState(Boolean(call.saved));
  const isOpen = call.status === "open";

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
          tone={isOpen ? "open" : "closing"}
          label={isOpen ? "Open" : "Closes soon"}
          dot={isOpen}
        />
        <IconButton
          onClick={() => setSaved((v) => !v)}
          aria-label={saved ? "Remove bookmark" : "Bookmark open call"}
          sx={{ p: 0, color: colors.primary[500] }}
        >
          {saved ? (
            <BookmarkIcon sx={{ fontSize: 24 }} />
          ) : (
            <BookmarkBorderIcon sx={{ fontSize: 24 }} />
          )}
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
        {call.title}
      </Typography>

      <Typography
        sx={{
          mt: "8px",
          fontFamily,
          fontSize: "16px",
          lineHeight: "24px",
          color: colors.neutral[500],
        }}
      >
        {call.description}
      </Typography>

      <Typography
        sx={{
          mt: "11px",
          fontFamily,
          fontSize: "14px",
          fontWeight: 500,
          lineHeight: "20px",
          color: colors.success[600],
        }}
      >
        {call.audience}
      </Typography>

      <Box sx={{ mt: "14px", borderTop: `1px dashed ${colors.neutral[100]}` }} />

      <Box
        sx={{
          mt: "12px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box>
          <Typography
            sx={{
              fontFamily,
              fontSize: "14px",
              lineHeight: "20px",
              color: colors.neutral[500],
            }}
          >
            Apply by
          </Typography>
          <Typography
            sx={{
              fontFamily,
              fontSize: "16px",
              lineHeight: "24px",
              color: colors.neutral[950],
            }}
          >
            {call.applyBy}
          </Typography>
        </Box>
        <RevampButton
          text="View Details"
          onClick={onViewDetails}
          width="auto"
          sx={{ height: "36px", px: "24px", py: 0, fontSize: "14px" }}
        />
      </Box>
    </Box>
  );
};

export default OpenCallCard;
