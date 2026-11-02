"use client";

import Box from "@mui/material/Box";
import { colors } from "@/theme/colors";

const fontFamily =
  'var(--font-product-sans), "Product Sans", sans-serif';

/**
 * Tag — small pill / chip )
 */
const Tag = ({ label, variant = "tag", startIcon, endIcon, onClick, sx }) => {
  const isFilter = variant === "filter";

  return (
    <Box
      component={onClick ? "button" : "span"}
      type={onClick ? "button" : undefined}
      onClick={onClick}
      sx={{
        display: "inline-flex",
        alignItems: "center",
        gap: "6px",
        flexShrink: 0,
        height: isFilter ? "34px" : "32px",
        px: isFilter ? "14px" : "16px",
        boxSizing: "border-box",
        border: isFilter ? "1px solid #D1D1D1" : "none",
        borderRadius: isFilter ? "8px" : "999px",
        backgroundColor: isFilter ? "#FFFFFF" : colors.neutral[50],
        fontFamily,
        fontSize: "14px",
        fontWeight: 400,
        lineHeight: "20px",
        color: "#1F1F1F",
        whiteSpace: "nowrap",
        cursor: onClick ? "pointer" : "default",
        ...sx,
      }}
    >
      {startIcon}
      {label}
      {endIcon}
    </Box>
  );
};

export default Tag;