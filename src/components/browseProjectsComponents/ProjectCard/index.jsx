"use client";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Image from "next/image";

import { t, assets, fontFamily } from "../tokens";

const ICON_BUTTON_SIZE = 28;
const THUMBNAIL_SIZE = 40;
const CardIconLink = ({ href, label, src }) => (
  <Box
    component="a"
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={label}
    sx={{
      display: "inline-flex",
      width: ICON_BUTTON_SIZE,
      height: ICON_BUTTON_SIZE,
      borderRadius: t.radius.full,
      transition: "opacity 0.15s ease",
      "&:hover": { opacity: 0.85 },
    }}
  >
    <Image
      src={src}
      alt=""
      width={ICON_BUTTON_SIZE}
      height={ICON_BUTTON_SIZE}
    />
  </Box>
);

const ProjectCard = ({
  title,
  author,
  description,
  thumbnail,
  githubUrl,
  linkedinUrl,
}) => (
  <Box
    sx={{
      display: "flex",
      flexDirection: "column",
      height: "100%",
      bgcolor: t.surface.card,
      border: `1px solid ${t.border.subtle}`,
      borderRadius: t.radius.md,
      boxShadow: t.shadow.card,
      p: t.spacing.xl,
    }}
  >
    <Stack direction="row" spacing={t.spacing.md} alignItems="flex-start">
      <Box
        sx={{
          width: THUMBNAIL_SIZE,
          height: THUMBNAIL_SIZE,
          flexShrink: 0,
          borderRadius: t.radius.xs,
          bgcolor: t.surface.placeholder,
          overflow: "hidden",
        }}
      >
        {thumbnail && (
          <Image
            src={thumbnail}
            alt={title}
            width={THUMBNAIL_SIZE}
            height={THUMBNAIL_SIZE}
            style={{ objectFit: "cover", width: "100%", height: "100%" }}
          />
        )}
      </Box>

      <Box sx={{ minWidth: 0 }}>
        <Typography
          sx={{
            fontFamily,
            fontSize: t.typography.label2.fontSize,
            fontWeight: 700,
            color: t.text.heading,
          }}
        >
          {title}
        </Typography>
        <Typography
          sx={{
            fontFamily,
            fontSize: t.typography.label3.fontSize,
            fontWeight: t.typography.label3.fontWeight,
            color: t.text.muted,
            mt: t.spacing.xxs,
          }}
        >
          by {author}
        </Typography>
      </Box>
    </Stack>

    <Typography
      sx={{
        fontFamily,
        fontSize: t.typography.paragraph3.fontSize,
        fontWeight: t.typography.paragraph3.fontWeight,
        color: t.text.body,
        lineHeight: 1.6,
        mt: t.spacing.lg,
        flexGrow: 1,
      }}
    >
      {description}
    </Typography>

    <Stack direction="row" spacing={t.spacing.sm} sx={{ mt: t.spacing.lg }}>
      <CardIconLink
        href={githubUrl}
        src={assets.github}
        label={`${title} on GitHub`}
      />
      <CardIconLink
        href={linkedinUrl}
        src={assets.linkedin}
        label={`${title} on LinkedIn`}
      />
    </Stack>
  </Box>
);

export default ProjectCard;
