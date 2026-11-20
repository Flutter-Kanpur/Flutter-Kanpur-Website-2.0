"use client";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import RevampButton from "@/components/buttons/revampbutton/RevampButton";
import { colors } from "@/theme/colors";

const fontFamily = 'var(--font-product-sans), "Product Sans", sans-serif';

/** CtaCard — light-blue call-to-action card (title, text, black pill button). */
const CtaCard = ({ title, description, buttonLabel, onClick, sx }) => (
  <Box
    sx={{
      boxSizing: "border-box",
      pt: "22px",
      pb: "20px",
      px: "24px",
      borderRadius: "20px",
      backgroundColor: colors.primary[50],
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      textAlign: "center",
      ...sx,
    }}
  >
    <Typography
      sx={{
        fontFamily,
        fontSize: "16px",
        fontWeight: 500,
        lineHeight: "24px",
        color: colors.neutral[950],
      }}
    >
      {title}
    </Typography>
    <Typography
      sx={{
        mt: "4px",
        fontFamily,
        fontSize: "16px",
        lineHeight: "24px",
        color: colors.neutral[500],
      }}
    >
      {description}
    </Typography>
    <RevampButton
      text={buttonLabel}
      onClick={onClick}
      width="auto"
      sx={{ mt: "7px", height: "36px", px: "26px", py: 0, fontSize: "14px" }}
    />
  </Box>
);

export default CtaCard;
