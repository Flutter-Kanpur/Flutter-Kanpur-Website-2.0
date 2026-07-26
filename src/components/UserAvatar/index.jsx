"use client";
import { Box } from "@mui/material";
import Image from "next/image";

const colors = ["#2563eb", "#ef4444", "#16a34a", "#f97316"];

const sizeMap = {
  sm: { size: 24, fontSize: 12 },
  md: { size: 32, fontSize: 14 },
  lg: { size: 40, fontSize: 16 },
};

const UserAvatar = ({ name = "", size = "md", imageUrl, fromCard = false }) => {
  const { size: avatarSize, fontSize } = sizeMap[size] || sizeMap.md;

  const initials = name
    ?.split(" ")
    ?.map((n) => n[0])
    ?.join("")
    ?.slice(0, 2)
    ?.toUpperCase();

  const colorIndex = name.length % colors.length;
  const backgroundColor = colors[colorIndex];

  return (
    <Box
      sx={{
        width: avatarSize,
        height: avatarSize,
        borderRadius: "50%",
        overflow: "hidden",
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: 600,
        fontSize,
        color: "#fff",
        backgroundColor,
        marginLeft: !fromCard ? '-8px' : '0px'
      }}
    >
      {imageUrl ? (
        <Image
          src={imageUrl}
          alt={name}
          fill
          style={{ objectFit: "cover" }}
        />
      ) : (
        initials
      )}
    </Box>
  );
};

export default UserAvatar;
