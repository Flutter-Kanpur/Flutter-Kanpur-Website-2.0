"use client";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import RevampButton from "@/components/buttons/revampbutton/RevampButton";
import { colors } from "@/theme/colors";

const fontFamily = 'var(--font-product-sans), "Product Sans", sans-serif';

/**
 * EmptyState — centred title + description + optional action button.
 */
const EmptyState = ({
  title,
  description,
  buttonLabel,
  onAction,
  mt = "89px",
}) => (
  <Box
    sx={{
      mt,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      textAlign: "center",
    }}
  >
    <Typography
      sx={{
        fontFamily,
        fontSize: "18px",
        fontWeight: 600,
        lineHeight: "26px",
        color: colors.neutral[950],
      }}
    >
      {title}
    </Typography>
    {description && (
      <Typography
        sx={{
          mt: "8px",
          maxWidth: "262px",
          fontFamily,
          fontSize: "16px",
          lineHeight: "24px",
          color: colors.neutral[500],
        }}
      >
        {description}
      </Typography>
    )}
    {buttonLabel && (
      <RevampButton
        text={buttonLabel}
        onClick={onAction}
        width="auto"
        sx={{ mt: "8px", height: "38px", px: "16px", py: 0, fontSize: "14px" }}
      />
    )}
  </Box>
);

export default EmptyState;
