"use client";

import { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import ChatBubbleOutlineRoundedIcon from "@mui/icons-material/ChatBubbleOutlineRounded";

const font = 'var(--font-product-sans), "Product Sans", sans-serif';

const AVATAR = 36; // avatar size (px) — same for every reply in the thread
const ITEM_GAP = 18; // vertical gap between thread items (px)

/**
 * ReplyCard — one reply + its thread.
 */
const ReplyCard = ({ reply, onReplyClick, connectNext = false }) => {
  const [showReplies, setShowReplies] = useState(false);
  const hasReplies = reply.replies && reply.replies.length > 0;

  const showLine = hasReplies || connectNext;
  // Collapsed → the "Show replies" link follows (stop 10px above it);
  // otherwise the next avatar follows (stop 7px above it).
  const lineEnd = hasReplies && !showReplies ? 10 : 7;

  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", gap: `${ITEM_GAP}px` }}
    >
      <Box sx={{ display: "flex", alignItems: "stretch", gap: "12px" }}>
        {/* Avatar column + thread line */}
        <Box
          sx={{
            position: "relative",
            width: `${AVATAR}px`,
            flexShrink: 0,
          }}
        >
          <Box
            component="img"
            src={reply.avatar}
            alt={reply.author}
            sx={{
              display: "block",
              width: `${AVATAR}px`,
              height: `${AVATAR}px`,
              borderRadius: "50%",
              objectFit: "cover",
            }}
          />

          {showLine && (
            <Box
              aria-hidden
              sx={{
                position: "absolute",
                left: "50%",
                transform: "translateX(-50%)",
                top: `${AVATAR + 5}px`,
                bottom: `-${ITEM_GAP - lineEnd}px`,
                width: "1px",
                bgcolor: "#D1D1D1",
              }}
            />
          )}
        </Box>

        {/* Content column */}

        <Box
          sx={{
            flex: 1,
            minWidth: 0,
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          <Box
            sx={{
              minHeight: `${AVATAR}px`,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Typography
              sx={{
                fontFamily: font,
                fontSize: "14px",
                fontWeight: 600,
                color: "#000000",
                lineHeight: 1.3,
              }}
            >
              {reply.author}
            </Typography>
            <Typography
              sx={{
                fontFamily: font,
                fontSize: "12px",
                color: "#9CA3AF",
                lineHeight: 1.3,
              }}
            >
              {reply.time}
            </Typography>
          </Box>

          <Typography
            sx={{
              fontFamily: font,
              fontSize: "14px",
              color: "#3F3F3F",
              lineHeight: 1.6,
            }}
          >
            {reply.body}
          </Typography>

          <Box sx={{ display: "flex", alignItems: "center", gap: "18px" }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <FavoriteRoundedIcon sx={{ fontSize: 16, color: "#CC3333" }} />
              <Typography sx={{ fontSize: "13px", color: "#5D5D5D" }}>
                {reply.likes}
              </Typography>
            </Box>
            <Box
              component="button"
              type="button"
              onClick={() => onReplyClick(reply)}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                border: "none",
                bgcolor: "transparent",
                p: 0,
                cursor: "pointer",
              }}
            >
              <ChatBubbleOutlineRoundedIcon
                sx={{ fontSize: 15, color: "#1F1F1F" }}
              />
              <Typography sx={{ fontSize: "13px", color: "#5D5D5D" }}>
                {reply.replyCount} reply
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Child replies*/}
      {hasReplies &&
        showReplies &&
        reply.replies.map((child, index) => (
          <ReplyCard
            key={child.id}
            reply={child}
            onReplyClick={onReplyClick}
            connectNext={index < reply.replies.length - 1}
          />
        ))}


      {hasReplies && !showReplies && (
        <Box
          component="button"
          type="button"
          onClick={() => setShowReplies(true)}
          sx={{
            alignSelf: "flex-start",
            ml: `${AVATAR / 2}px`,
            border: "none",
            bgcolor: "transparent",
            p: 0,
            fontSize: "14px",
            fontWeight: 500,
            color: "#4167F2",
            cursor: "pointer",
            fontFamily: font,
          }}
        >
          Show replies
        </Box>
      )}
    </Box>
  );
};

export default ReplyCard;
