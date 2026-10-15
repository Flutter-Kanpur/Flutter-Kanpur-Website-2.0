"use client";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import Image from "next/image";
import RefreshRoundedIcon from "@mui/icons-material/RefreshRounded";



const QuestionPostErrorScreen = () => {
  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "480px",
        minHeight: "100vh",
        mx: "auto",
        px: "24px",
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "20px",
        textAlign: "center",
        backgroundColor: "#fff",
      }}
    >
      <Image
        width={260}
        height={260}
        src="/assets/community-page-assets/network_error.svg"
        alt="Network error"
      />

      <Typography
        sx={{
          fontFamily: 'var(--font-product-sans), "Product Sans", sans-serif',
          fontSize: "22px",
          fontWeight: 700,
          color: "#000000",
        }}
      >
        {"Couldn't post your question"}
      </Typography>

      <Typography
        sx={{
          fontFamily: 'var(--font-product-sans), "Product Sans", sans-serif',
          fontSize: "15px",
          color: "#6D6D6D",
          mt: "-10px",
        }}
      >
        {"Please check your internet connection and try again."}
      </Typography>

      {/* Retry → back to the Ask a question form */}
      <Box
        component={Link}
        href="/community/ask"
        sx={{
          mt: "24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "8px",
          width: "100%",
          maxWidth: "260px",
          py: "14px",
          borderRadius: "999px",
          border: "1px solid #E0E0E0",
          color: "#000000",
          fontFamily: 'var(--font-product-sans), "Product Sans", sans-serif',
          fontSize: "15px",
          fontWeight: 500,
          textDecoration: "none",
        }}
      >
        <RefreshRoundedIcon sx={{ fontSize: 18 }} />
        {"Try again"}
      </Box>

      <Box
        component={Link}
        href="/community"
        sx={{
          fontFamily: 'var(--font-product-sans), "Product Sans", sans-serif',
          fontSize: "14px",
          fontWeight: 500,
          color: "#4167F2",
          textDecoration: "none",
        }}
      >
        {"Back to community"}
      </Box>
    </Box>
  );
};

export default QuestionPostErrorScreen;