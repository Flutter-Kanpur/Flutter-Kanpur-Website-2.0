"use client";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { colors } from "@/theme/colors";

const fontFamily = 'var(--font-product-sans), "Product Sans", sans-serif';

/**
 * DetailSection — black heading + grey body used on detail screens
 */
const DetailSection = ({ heading, children, mt = "24px", gap = "8px", sx }) => (
  <Box sx={{ mt, ...sx }}>
    <Typography
      sx={{
        fontFamily,
        fontSize: "16px",
        lineHeight: "24px",
        color: colors.neutral[950],
      }}
    >
      {heading}
    </Typography>
    {typeof children === "string" ? (
      <Typography
        sx={{
          mt: gap,
          fontFamily,
          fontSize: "16px",
          lineHeight: "24px",
          color: colors.neutral[500],
          whiteSpace: "pre-line",
        }}
      >
        {children}
      </Typography>
    ) : (
      <Box sx={{ mt: gap }}>{children}</Box>
    )}
  </Box>
);

export default DetailSection;
