"use client";

import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { t, fontFamily } from "../tokens";

/** Avatar + name + timestamp. `size="sm"` is the variant used inside replies. */
const AuthorRow = ({ author, timeLabel, size = "md", trailing }) => {
  const isSmall = size === "sm";
  const avatarSize = isSmall ? 28 : 36;

  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: t.spacing.md }}>
      <Avatar
        src={author?.avatar}
        alt={author?.name}
        sx={{ width: avatarSize, height: avatarSize, flexShrink: 0 }}
      />

      <Box sx={{ minWidth: 0, flexGrow: 1 }}>
        <Typography
          sx={{
            fontFamily,
            fontSize: isSmall
              ? t.typography.label3.fontSize
              : t.typography.paragraph3.fontSize,
            fontWeight: 700,
            color: t.text.heading,
            lineHeight: 1.3,
          }}
        >
          {author?.name}
        </Typography>

        {timeLabel && (
          <Typography
            sx={{
              fontFamily,
              fontSize: isSmall ? "11px" : t.typography.label3.fontSize,
              fontWeight: t.typography.label3.fontWeight,
              color: t.text.muted,
              lineHeight: 1.4,
            }}
          >
            {timeLabel}
          </Typography>
        )}
      </Box>

      {trailing}
    </Box>
  );
};

export default AuthorRow;
