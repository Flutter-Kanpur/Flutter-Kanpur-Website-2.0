"use client";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import ChatBubbleOutlineRoundedIcon from "@mui/icons-material/ChatBubbleOutlineRounded";
import BookmarkRoundedIcon from "@mui/icons-material/BookmarkRounded";

const DiscussionCard = ({ discussion }) => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        borderRadius: "20px",
        bgcolor: "#FFFFFF",
        border: "1px solid rgba(0,0,0,0.06)",
        boxShadow: "0 2px 16px rgba(0,0,0,0.06), 0 1px 4px rgba(0,0,0,0.04)",
        p: "18px",
        display: "flex",
        flexDirection: "column",
        gap: "12px",
        boxSizing: "border-box",
      }}
    >
      {/* Author row */}
      <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <Box
          component="img"
          src={discussion.avatar}
          alt={discussion.author}
          sx={{
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            objectFit: "cover",
            flexShrink: 0,
          }}
        />
        <Box>
          <Typography
            sx={{
              fontFamily: 'var(--font-product-sans), "Product Sans", sans-serif',
              fontSize: "15px",
              fontWeight: 600,
              color: "#000000",
              lineHeight: 1.3,
            }}
          >
            {discussion.author}
          </Typography>
          <Typography
            sx={{
              fontFamily: 'var(--font-product-sans), "Product Sans", sans-serif',
              fontSize: "12px",
              fontWeight: 400,
              color: "#9CA3AF",
              lineHeight: 1.3,
            }}
          >
            {discussion.time}
          </Typography>
        </Box>
      </Box>

      {/* Title */}
      <Typography
        sx={{
          fontFamily: 'var(--font-product-sans), "Product Sans", sans-serif',
          fontSize: "17px",
          fontWeight: 700,
          color: "#000000",
          lineHeight: 1.35,
        }}
      >
        {discussion.title}
      </Typography>

      {/* Body */}
      <Typography
        sx={{
          fontFamily: 'var(--font-product-sans), "Product Sans", sans-serif',
          fontSize: "14px",
          fontWeight: 400,
          color: "#6D6D6D",
          lineHeight: 1.6,
          display: "-webkit-box",
          WebkitLineClamp: 3,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
        }}
      >
        {discussion.body}
      </Typography>

      {/* Hashtags */}
      <Box sx={{ display: "flex", flexWrap: "wrap", columnGap: "10px", rowGap: "4px" }}>
        {discussion.hashtags.map((tag) => (
          <Typography
            key={tag}
            sx={{
              fontFamily: 'var(--font-product-sans), "Product Sans", sans-serif',
              fontSize: "14px",
              fontWeight: 500,
              color: "#4167F2",
            }}
          >
            {tag}
          </Typography>
        ))}
      </Box>

      <Box sx={{ height: "1px", bgcolor: "#EDEDED", my: "2px" }} />

      {/* Stats row */}
      <Box sx={{ display: "flex", alignItems: "center", gap: "18px" }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <FavoriteRoundedIcon sx={{ fontSize: 18, color: "#CC3333" }} />
          <Typography
            sx={{ fontSize: "13px", fontWeight: 500, color: "#5D5D5D" }}
          >
            {discussion.likes}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <ChatBubbleOutlineRoundedIcon sx={{ fontSize: 17, color: "#1F1F1F" }} />
          <Typography
            sx={{ fontSize: "13px", fontWeight: 500, color: "#5D5D5D" }}
          >
            {discussion.comments}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <BookmarkRoundedIcon sx={{ fontSize: 17, color: "#4167F2" }} />
          <Typography
            sx={{ fontSize: "13px", fontWeight: 500, color: "#5D5D5D" }}
          >
            {discussion.bookmarks}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default DiscussionCard;
