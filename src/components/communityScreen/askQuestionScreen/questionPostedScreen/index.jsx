"use client";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { height, width } from "@mui/system";
import Image from "next/image";



const QuestionPostedScreen = () => {
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
       src="/assets/community-page-assets/completed.svg"
       alt="post successful."
      />

      <Typography
        sx={{
          fontFamily: 'var(--font-product-sans), "Product Sans", sans-serif',
          fontSize: "22px",
          fontWeight: 700,
          color: "#000000",
        }}
      >
        Question posted
      </Typography>

      <Typography
        sx={{
          fontFamily: 'var(--font-product-sans), "Product Sans", sans-serif',
          fontSize: "15px",
          color: "#6D6D6D",
          mt: "-10px",
        }}
      >
        Your question is now visible to the community.
      </Typography>

      <Box
        component={Link}
        href="/community/discussion"
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
        <VisibilityOutlinedIcon sx={{ fontSize: 18 }} />
        View discussion
      </Box>

      <Box
        component={Link}
        href="/community/ask"
        sx={{
          fontFamily: 'var(--font-product-sans), "Product Sans", sans-serif',
          fontSize: "14px",
          fontWeight: 500,
          color: "#4167F2",
          textDecoration: "none",
        }}
      >
        Post another question
      </Box>
    </Box>
  );
};

export default QuestionPostedScreen;