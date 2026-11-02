"use client";

import Box from "@mui/material/Box";
import { colors } from "@/theme/colors";

const fontFamily = 'var(--font-product-sans), "Product Sans", sans-serif';

// Colour sets per tone. `ring` is the soft halo behind the status dot.
const TONES = {
  live: {
    bg: colors.primary[100],
    color: colors.primary[500],
    ring: "rgba(65, 103, 242, 0.28)",
  },
  open: {
    bg: "#D4F3DD",
    color: colors.success[600],
    ring: "rgba(0, 164, 107, 0.22)",
  },
  upcoming: { bg: colors.success[50], color: colors.success[600] },
  closing: { bg: colors.warning[100], color: colors.warning[600] },
};

/**
 * StatusBadge — pill label for event / open-call status.
 */
const StatusBadge = ({ tone = "upcoming", label, dot = false, sx }) => {
  const style = TONES[tone] ?? TONES.upcoming;

  return (
    <Box
      sx={{
        display: "inline-flex",
        alignItems: "center",
        gap: "6px",
        height: "32px",
        px: dot ? "11px" : "16px",
        boxSizing: "border-box",
        borderRadius: "999px",
        backgroundColor: style.bg,
        color: style.color,
        fontFamily,
        fontSize: "15px",
        lineHeight: "20px",
        whiteSpace: "nowrap",
        ...sx,
      }}
    >
      {dot && (
        <Box
          aria-hidden
          sx={{
            width: "20px",
            height: "20px",
            borderRadius: "50%",
            backgroundColor: style.ring,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              width: "10px",
              height: "10px",
              borderRadius: "50%",
              backgroundColor: style.color,
            }}
          />
        </Box>
      )}
      {label}
    </Box>
  );
};

export default StatusBadge;
