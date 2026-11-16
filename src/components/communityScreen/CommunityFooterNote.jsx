"use client";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";

const CommunityFooterNote = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        gap: "16px",
        pt: "48px",
        pb: "8px",
      }}
    >
      <Typography
        sx={{
          fontFamily: 'var(--font-product-sans), "Product Sans", sans-serif',
          fontSize: "45px",
          fontWeight: 700,
          lineHeight: "52px",
          color: "#DADADA",
        }}
      >
        Built for the <br/> flutter <br/> community!
      </Typography>

      <Box sx={{ display: "flex", alignItems: "center", gap: "6px" }}>
        <Typography
          sx={{
            fontFamily: 'var(--font-product-sans), "Product Sans", sans-serif',
            fontSize: "14px",
            fontWeight: 400,
            color: "#000000",
            lineHeight:"20px",
          }}
        >
          Crafted with
        </Typography>
        <FavoriteRoundedIcon sx={{ fontSize: 14, color: "#CC3333" }} />
        <Typography
          sx={{
            fontFamily: 'var(--font-product-sans), "Product Sans", sans-serif',
            fontSize: "14px",
            fontWeight: 400,
            color: "#000000",
            lineHeight:"20px",
          }}
        >
          by the Flutter Kanpur Community
        </Typography>
      </Box>
    </Box>
  );
};

export default CommunityFooterNote;
