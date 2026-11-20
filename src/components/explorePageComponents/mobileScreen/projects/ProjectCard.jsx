"use client";

import { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import GitHubIcon from "@mui/icons-material/GitHub";
import InsertLinkIcon from "@mui/icons-material/InsertLink";
import LanguageIcon from "@mui/icons-material/Language";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import WarningIcon from "@mui/icons-material/Warning";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import Tag from "../Tag";
import RevampButton from "@/components/buttons/revampbutton/RevampButton";
import { colors } from "@/theme/colors";
import { projectStatusConfig } from "@/data/projectSubmissionsData";

const fontFamily = 'var(--font-product-sans), "Product Sans", sans-serif';

// Colours/icons per submission status (labels come from projectSubmissionsData).
const STATUS_STYLE = {
  published: { color: colors.success[600], Icon: CheckCircleIcon },
  rejected: { color: colors.warning[600], Icon: WarningIcon },
  needs_changes: { color: colors.pending[600], Icon: WarningIcon },
  in_review: { color: colors.primary[500], Icon: AccessTimeFilledIcon },
};

const StatusBadge = ({ status }) => {
  const style = STATUS_STYLE[status];
  if (!style) return null;
  const { Icon, color } = style;

  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: "6px", color }}>
      <Icon sx={{ fontSize: 20 }} />
      <Typography sx={{ fontFamily, fontSize: "16px", lineHeight: "24px", color }}>
        {projectStatusConfig[status]?.label ?? status}
      </Typography>
    </Box>
  );
};

// Round outlined icon button that opens a link (inert when href is empty).
export const CircleLink = ({ href, label, size = 40, children }) => (
  <IconButton
    component="a"
    href={href || undefined}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={label}
    sx={{
      width: size,
      height: size,
      flexShrink: 0,
      border: `1px solid ${colors.neutral[200]}`,
      backgroundColor: "#FFFFFF",
      color: "#1F1F1F",
    }}
  >
    {children}
  </IconButton>
);

const MetaItem = ({ label, value }) => (
  <Box sx={{ flex: 1 }}>
    <Typography
      sx={{ fontFamily, fontSize: "14px", lineHeight: "20px", color: "#949494" }}
    >
      {label}
    </Typography>
    <Typography
      sx={{
        mt: "4px",
        fontFamily,
        fontSize: "16px",
        lineHeight: "24px",
        color: colors.neutral[950],
      }}
    >
      {value}
    </Typography>
  </Box>
);

/**
 * ProjectCard — shared by the landing "Community projects" section, the
 * Projects list and the "Your projects" screen.
 *  - browse mode (default): heart toggle, "posted on"
 *  - submission mode (`status` set): status badge instead of heart,
 *    pass dateLabel="submitted on" and a different actionLabel if needed.
 */
const ProjectCard = ({
  title,
  tags = [],
  author,
  date,
  dateLabel = "posted on",
  liked = false,
  status,
  actionLabel = "View project details",
  links = {},
  onAction,
}) => {
  const [isLiked, setIsLiked] = useState(liked);

  return (
    <Box
      sx={{
        boxSizing: "border-box",
        p: "16px",
        border: `1px solid ${colors.neutral[100]}`,
        borderRadius: "16px",
        backgroundColor: "#FFFFFF",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          gap: "8px",
        }}
      >
        <Typography
          sx={{
            fontFamily,
            fontSize: "18px",
            fontWeight: 500,
            lineHeight: "26px",
            color: colors.neutral[950],
          }}
        >
          {title}
        </Typography>

        {status ? (
          <StatusBadge status={status} />
        ) : (
          <IconButton
            onClick={() => setIsLiked((v) => !v)}
            aria-label={isLiked ? "Remove from favourites" : "Add to favourites"}
            sx={{ p: 0, mt: "2px", color: colors.warning[600] }}
          >
            {isLiked ? (
              <FavoriteIcon sx={{ fontSize: 22 }} />
            ) : (
              <FavoriteBorderIcon sx={{ fontSize: 22 }} />
            )}
          </IconButton>
        )}
      </Box>

      <Box sx={{ mt: "11px", display: "flex", flexWrap: "wrap", gap: "10px 8px" }}>
        {tags.map((tag) => (
          <Tag key={tag} label={tag} sx={{ height: "30px" }} />
        ))}
      </Box>

      <Box sx={{ mt: "17px", display: "flex", gap: "16px" }}>
        <MetaItem label="project by" value={author} />
        <MetaItem label={dateLabel} value={date} />
      </Box>

      <Box sx={{ mt: "16px", borderTop: "1px dashed #D1D1D1" }} />

      <Box sx={{ mt: "8px", display: "flex", alignItems: "center", gap: "8px" }}>
        <RevampButton
          text={actionLabel}
          onClick={onAction}
          width="auto"
          sx={{ flex: 1, height: "36px", py: 0, fontSize: "14px" }}
        />
        <CircleLink href={links.github} label="GitHub">
          <GitHubIcon sx={{ fontSize: 20 }} />
        </CircleLink>
        <CircleLink href={links.link} label="Project link">
          <InsertLinkIcon sx={{ fontSize: 20 }} />
        </CircleLink>
        <CircleLink href={links.website} label="Website">
          <LanguageIcon sx={{ fontSize: 20 }} />
        </CircleLink>
      </Box>
    </Box>
  );
};

export default ProjectCard;
