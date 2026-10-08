"use client";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import ButtonBase from "@mui/material/ButtonBase";

/**
 * SectionHeader
 */
const SectionHeader = ({ title, actionLabel, onAction }) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Typography
        sx={{
          fontFamily: 'var(--font-product-sans), "Product Sans", sans-serif',
          fontSize: "16px",
          fontWeight: 500,
          color: "#000000",
          lineHeight:"24px",
        }}
      >
        {title}
      </Typography>

      {actionLabel && (
        <ButtonBase
          onClick={onAction}
          sx={{
            fontFamily: 'var(--font-product-sans), "Product Sans", sans-serif',
            fontSize: "16px",
            fontWeight: 500,
            color: "#4167F2",
            lineHeight:"24px",
          }}
        >
          {actionLabel}
        </ButtonBase>
      )}
    </Box>
  );
};

export default SectionHeader;
