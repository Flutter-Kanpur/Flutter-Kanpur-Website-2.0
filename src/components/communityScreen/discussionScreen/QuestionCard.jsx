"use client";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Link from "next/link";

const QuestionCard = ({ question }) => {
  return (
    <Box
      component={Link}
      href={`/community/discussion/${question.id}`}
      sx={{
        width: "100%",
        borderRadius: "18px",
        border: "1px solid #ECECEC",
        bgcolor: "#FFFFFF",
        p: "16px",
        display: "flex",
        flexDirection: "column",
        gap: "12px",
        boxSizing: "border-box",
        textDecoration: "none",
      }}
    >
      <Typography
        sx={{
          fontFamily: 'var(--font-product-sans), "Product Sans", sans-serif',
          fontSize: "16px",
          fontWeight: 600,
          color: "#4167F2",
          lineHeight: "24px",
        }}
      >
        {question.title}
      </Typography>

      {question.images.length > 0 && (
        <Box sx={{ display: "flex", gap: "8px" }}>
          {question.images.map((src) => (
            <Box
              key={src}
              component="img"
              src={src}
              alt=""
              sx={{
                width: "110px",
                height: "72px",
                borderRadius: "10px",
                objectFit: "cover",
                flexShrink: 0,
              }}
            />
          ))}
        </Box>
      )}

      <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <Box
          component="img"
          src={question.avatar}
          alt={question.author}
          sx={{
            width: "32px",
            height: "32px",
            borderRadius: "50%",
            objectFit: "cover",
            flexShrink: 0,
          }}
        />
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography
            sx={{
              fontFamily: 'var(--font-product-sans), "Product Sans", sans-serif',
              fontSize: "14px",
              fontWeight: 600,
              color: "#000000",
              lineHeight: 1.3,
            }}
          >
            {question.author}
          </Typography>
          <Typography
            sx={{
              fontFamily: 'var(--font-product-sans), "Product Sans", sans-serif',
              fontSize: "12px",
              color: "#9CA3AF",
              lineHeight: 1.3,
            }}
          >
            {question.time}
          </Typography>
        </Box>
        <Typography
          sx={{
            fontFamily: 'var(--font-product-sans), "Product Sans", sans-serif',
            fontSize: "13px",
            color: "#6D6D6D",
            whiteSpace: "nowrap",
          }}
        >
          {question.answers} answers
        </Typography>
      </Box>
    </Box>
  );
};

export default QuestionCard;
