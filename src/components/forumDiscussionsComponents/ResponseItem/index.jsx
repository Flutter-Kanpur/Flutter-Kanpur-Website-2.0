"use client";

import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import ButtonBase from "@mui/material/ButtonBase";
import Image from "next/image";
import Typography from "@mui/material/Typography";

import { t, assets, fontFamily } from "../tokens";

const AVATAR_SIZE = 28;
const HeartIcon = ({ liked }) => (
  <Box
    aria-hidden
    sx={{
      width: 16,
      height: 14,
      bgcolor: liked ? t.accent.like : t.text.muted,
      transition: "background-color 0.15s ease",
      maskImage: `url(${assets.heart})`,
      WebkitMaskImage: `url(${assets.heart})`,
      maskRepeat: "no-repeat",
      WebkitMaskRepeat: "no-repeat",
      maskPosition: "center",
      WebkitMaskPosition: "center",
      maskSize: "contain",
      WebkitMaskSize: "contain",
    }}
  />
);

const CountAction = ({ icon, count, onClick, label }) => {
  const body = (
    <>
      {icon}
      <Typography
        component="span"
        sx={{
          fontFamily,
          fontSize: t.typography.label3.fontSize,
          color: t.text.heading,
        }}
      >
        {count}
      </Typography>
    </>
  );

  const sx = {
    display: "inline-flex",
    alignItems: "center",
    gap: t.spacing.xs,
    borderRadius: t.radius.xxs,
  };

  return onClick ? (
    <ButtonBase onClick={onClick} aria-label={label} disableRipple sx={sx}>
      {body}
    </ButtonBase>
  ) : (
    <Box sx={sx}>{body}</Box>
  );
};

const ResponseItem = ({ response, onToggleLike }) => (
  <Box sx={{ display: "flex", gap: t.spacing.sm }}>
    <Avatar
      src={response.author?.avatar}
      alt={response.author?.name}
      sx={{ width: AVATAR_SIZE, height: AVATAR_SIZE, flexShrink: 0 }}
    />

    <Box
      sx={{
        flexGrow: 1,
        minWidth: 0,
        borderLeft: `1px solid ${t.border.subtle}`,
        pl: t.spacing.lg,
        pb: t.spacing.lg,
      }}
    >
      <Typography
        sx={{
          fontFamily,
          fontSize: t.typography.label3.fontSize,
          fontWeight: 700,
          color: t.text.heading,
          lineHeight: 1.3,
        }}
      >
        {response.author?.name}
      </Typography>

      <Typography
        sx={{
          fontFamily,
          fontSize: "11px",
          color: t.text.muted,
          lineHeight: 1.4,
        }}
      >
        {response.postedAt}
      </Typography>

      <Typography
        sx={{
          fontFamily,
          fontSize: t.typography.paragraph3.fontSize,
          fontWeight: t.typography.paragraph3.fontWeight,
          lineHeight: 1.7,
          color: t.text.heading,
          mt: t.spacing.md,
        }}
      >
        {response.text}
      </Typography>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: t.spacing.lg,
          mt: t.spacing.md,
        }}
      >
        <CountAction
          label={response.liked ? "Remove like" : "Like this reply"}
          onClick={onToggleLike}
          count={response.likes}
          icon={<HeartIcon liked={response.liked} />}
        />

        <CountAction
          count={response.comments}
          icon={<Image src={assets.comments} alt="" width={15} height={15} />}
        />
      </Box>
    </Box>
  </Box>
);

export default ResponseItem;
