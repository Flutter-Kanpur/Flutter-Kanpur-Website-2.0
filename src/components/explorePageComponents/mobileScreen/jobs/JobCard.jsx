"use client";

import { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import ButtonBase from "@mui/material/ButtonBase";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import Tag from "../Tag";
import { colors } from "@/theme/colors";

const fontFamily = 'var(--font-product-sans), "Product Sans", sans-serif';

// Save toggle. Clicking it only saves / un-saves — it never opens the job.
const SaveBadge = ({ saved, onToggle }) => (
  <ButtonBase
    onClick={(event) => {
      event.stopPropagation();
      onToggle();
    }}
    aria-pressed={saved}
    aria-label={saved ? "Remove from saved jobs" : "Save job"}
    sx={{
      display: "inline-flex",
      alignItems: "center",
      gap: "4px",
      height: "24px",
      px: "8px",
      borderRadius: "4px",
      flexShrink: 0,
      fontFamily,
      fontSize: "12px",
      lineHeight: "16px",
      backgroundColor: saved ? colors.primary[500] : "transparent",
      color: saved ? "#FFFFFF" : colors.primary[500],
      // outline drawn inside so the badge keeps the same size in both states
      boxShadow: saved ? "none" : `inset 0 0 0 1px ${colors.primary[500]}`,
    }}
  >
    {saved ? (
      <BookmarkIcon sx={{ fontSize: 12 }} />
    ) : (
      <BookmarkBorderIcon sx={{ fontSize: 12 }} />
    )}
    {saved ? "Saved" : "Save"}
  </ButtonBase>
);

// Company logo image; falls back to the first letter if `logo` is missing.
export const CompanyLogo = ({ company }) => {
  const shared = {
    width: "32px",
    height: "32px",
    borderRadius: company.round ? "50%" : "8px",
    flexShrink: 0,
  };

  if (company.logo) {
    return (
      <Box
        component="img"
        src={company.logo}
        alt={`${company.name} logo`}
        sx={{ ...shared, objectFit: "cover", display: "block" }}
      />
    );
  }

  return (
    <Box
      aria-hidden
      sx={{
        ...shared,
        backgroundColor: colors.neutral[100],
        color: colors.neutral[500],
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily,
        fontSize: "14px",
        fontWeight: 700,
      }}
    >
      {company.name.charAt(0)}
    </Box>
  );
};

/**
 * JobCard — shared by the Explore landing "Suggested jobs" section and the
 * Suggested Jobs list. `description` is optional (landing has none).
 */
const JobCard = ({ job, onClick }) => {
  const [saved, setSaved] = useState(Boolean(job.saved));

  return (
  <Box
    onClick={onClick}
    sx={{
      cursor: onClick ? "pointer" : "default",
      boxSizing: "border-box",
      pt: "11px",
      pb: "11px",
      px: "15px",
      border: `1px solid ${colors.neutral[100]}`,
      borderRadius: "16px",
      backgroundColor: "#FFFFFF",
    }}
  >
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "8px",
      }}
    >
      <Typography
        sx={{
          fontFamily,
          fontSize: "16px",
          fontWeight: 500,
          lineHeight: "24px",
          color: colors.neutral[950],
        }}
      >
        {job.title}
      </Typography>
      <SaveBadge saved={saved} onToggle={() => setSaved((v) => !v)} />
    </Box>

    {job.description && (
      <Typography
        sx={{
          mt: "8px",
          fontFamily,
          fontSize: "14px",
          lineHeight: "21px",
          color: colors.neutral[500],
        }}
      >
        {job.description}
      </Typography>
    )}

    <Box
      sx={{
        mt: job.description ? "7px" : "8px",
        display: "flex",
        flexWrap: "wrap",
        gap: "4px",
      }}
    >
      {job.tags.map((tag) => (
        <Tag
          key={tag}
          label={tag}
          sx={{
            height: "30px",
            border: `1px solid ${colors.neutral[100]}`,
          }}
        />
      ))}
    </Box>

    <Box sx={{ mt: "17px", display: "flex", alignItems: "center", gap: "8px" }}>
      <CompanyLogo company={job.company} />
      <Typography
        sx={{
          fontFamily,
          fontSize: "14px",
          lineHeight: "20px",
          color: colors.neutral[500],
        }}
      >
        {job.company.name} | {job.company.location}
      </Typography>
    </Box>
  </Box>
  );
};

export default JobCard;