"use client";

import { useState } from "react";
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import { IoClose } from "react-icons/io5";
import FormTextarea from "../../FormComponents/FormTextarea";

const ReplyModal = ({ isOpen, replyingTo, onClose, onSubmit }) => {
  const [draft, setDraft] = useState("");

  const handleClose = () => {
    setDraft("");
    onClose();
  };

  const handleSubmit = () => {
    if (!draft.trim()) return;
    onSubmit?.(draft);
    setDraft("");
    onClose();
  };

  if (!replyingTo) return null;

  return (
    <Drawer
      anchor="bottom"
      open={isOpen}
      onClose={handleClose}
      slotProps={{
        paper: {
          sx: {
            width: "100%",
            maxWidth: "480px",
            mx: "auto",
            borderTopLeftRadius: "28px",
            borderTopRightRadius: "28px",
            bgcolor: "#FFFFFF",
            pt: "10px",
            pb: "24px",
            px: "16px",
            maxHeight: "85vh",
            overflowY: "auto",
            boxSizing: "border-box",
            "&::-webkit-scrollbar": { display: "none" },
          },
        },
      }}
    >
      {/* Drag handle */}
      <Box sx={{ display: "flex", justifyContent: "center", mb: "14px" }}>
        <Box
          sx={{
            width: "64px",
            height: "4px",
            borderRadius: "999px",
            bgcolor: "#1F1F1F",
          }}
        />
      </Box>

      {/* Header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: "20px",
        }}
      >
        <Typography
          sx={{
            fontFamily: 'var(--font-product-sans), "Product Sans", sans-serif',
            fontSize: "18px",
            fontWeight: 600,
            color: "#000000",
          }}
        >
          Post your reply
        </Typography>

        <IconButton
          onClick={handleClose}
          sx={{
            width: "32px",
            height: "32px",
            bgcolor: "#1F1F1F",
            color: "#FFFFFF",
            "&:hover": { bgcolor: "#1F1F1F" },
          }}
        >
          <IoClose size={16} />
        </IconButton>
      </Box>

      {/* The comment being replied to */}
      <Box sx={{ display: "flex", flexDirection: "column", gap: "10px", mb: "20px" }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <Box
            component="img"
            src={replyingTo.avatar}
            alt={replyingTo.author}
            sx={{ width: "36px", height: "36px", borderRadius: "50%", objectFit: "cover" }}
          />
          <Box>
            <Typography
              sx={{
                fontFamily: 'var(--font-product-sans), "Product Sans", sans-serif',
                fontSize: "14px",
                fontWeight: 600,
                color: "#000000",
                lineHeight: 1.3,
              }}
            >
              {replyingTo.author}
            </Typography>
            <Typography
              sx={{
                fontFamily: 'var(--font-product-sans), "Product Sans", sans-serif',
                fontSize: "12px",
                color: "#9CA3AF",
                lineHeight: 1.3,
              }}
            >
              {replyingTo.time}
            </Typography>
          </Box>
        </Box>

        <Typography
          sx={{
            fontFamily: 'var(--font-product-sans), "Product Sans", sans-serif',
            fontSize: "14px",
            color: "#3F3F3F",
            lineHeight: 1.6,
            pl: "46px",
          }}
        >
          {replyingTo.body}
        </Typography>
      </Box>

      {/* New reply input */}
      <Box sx={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
        <Box
          component="img"
          src={replyingTo.avatar}
          alt=""
          sx={{ width: "32px", height: "32px", borderRadius: "50%", objectFit: "cover", mt: "4px" }}
        />
        <Box sx={{ flex: 1 }}>
          <FormTextarea
            placeholder="Write a reply"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            height="110px"
          />
        </Box>
      </Box>
    </Drawer>
  );
};

export default ReplyModal;