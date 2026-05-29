"use client";

import { Box, Avatar, Typography } from "@mui/material";

export default function ProfileAvatarCard({
  name,
  photoURL,
  handleImageClick,
  fileInputRef,
  handleFileChange,
}) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        p: 2,
        mb: 3,
        borderRadius: 4,
        backgroundColor: "#fff",
        border: "1px solid #E0E0E0",
        boxShadow: "0px 2px 8px rgba(0,0,0,0.05)",
      }}
    >
      <Avatar src={photoURL} sx={{ width: 64, height: 64, mr: 2 }}>
        {!photoURL && name?.[0]}
      </Avatar>

      <Box>
        <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
          {name || "User Name"}
        </Typography>

        <Typography
          variant="body2"
          color="primary"
          sx={{ cursor: "pointer", fontWeight: 500 }}
          onClick={handleImageClick}
        >
          Change photo
        </Typography>

        <input
          type="file"
          hidden
          ref={fileInputRef}
          accept="image/*"
          onChange={handleFileChange}
        />
      </Box>
    </Box>
  );
}