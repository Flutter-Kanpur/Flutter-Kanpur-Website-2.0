"use client";

import Link from "next/link";
import Image from "next/image";
import { Box, Typography } from "@mui/material";

import PrimaryButton from "@/components/buttons/PrimaryButton/PrimaryButton";
import { projectStatusConfig } from "@/data/projectSubmissionsData";

const ICON_BASE = "/assets/explore-page-assets";

const StatusBadge = ({ status }) => {
  const config = projectStatusConfig[status];
  if (!config) return null;

  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: "5px" }}>
      <Image src={config.icon} alt="" width={15} height={15} />
      <Typography sx={{ fontSize: 13, fontWeight: 400, color: config.color }}>
        {config.label}
      </Typography>
    </Box>
  );
};

const TechTag = ({ label }) => (
  <Box
    sx={{
      px: "10px",
      py: "3px",
      borderRadius: "16px",
      border: "1px solid #E6E6E6",
      bgcolor: "#F6F6F6",
      fontSize: 12,
      fontWeight: 400,
      color: "#000000",
      lineHeight: "18px",
    }}
  >
    {label}
  </Box>
);

const IconLink = ({ href, icon }) => {
  const isActive = Boolean(href);

  return (
    <Box
      component={isActive ? Link : "div"}
      href={isActive ? href : undefined}
      target={isActive ? "_blank" : undefined}
      sx={{
        width: 32,
        height: 32,
        borderRadius: "50%",
        border: "1px solid #E6E6E6",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
        cursor: isActive ? "pointer" : "default",
        transition: "background-color 0.15s ease",
        "&:hover": { bgcolor: isActive ? "#F4F4F4" : "transparent" },
      }}
    >
      <Image src={icon} alt="" width={16} height={16} />
    </Box>
  );
};

export default function ProjectCard({ project }) {
  if (!project) return null;

  const {
    name,
    techStack = [],
    author,
    submittedOn,
    status,
    links = {},
    detailsHref,
  } = project;

  return (
    <Box
      sx={{
        bgcolor: "#fff",
        border: "1px solid #EDEDED",
        borderRadius: "14px",
        p: "18px",
        display: "flex",
        flexDirection: "column",
        gap: "12px",
        boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
      }}
    >
      {/* Title + status */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 1,
        }}
      >
        <Typography sx={{ fontSize: 13.06, fontWeight: 500, color: "#000000" }}>
          {name}
        </Typography>
        <StatusBadge status={status} />
      </Box>

      {/* Tech stack */}
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
        {techStack.map((tech, i) => (
          <TechTag key={`${tech}-${i}`} label={tech} />
        ))}
      </Box>

      {/* Meta */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "4px 8px",
          mt: "2px",
        }}
      >
        <Typography sx={{ fontSize: 11.5, color: "#ADADAD" }}>
          project by
        </Typography>
        <Typography sx={{ fontSize: 11.5, color: "#ADADAD" }}>
          submitted on
        </Typography>
        <Typography sx={{ fontSize: 13, fontWeight: 400, color: "#000000" }}>
          {author}
        </Typography>
        <Typography sx={{ fontSize: 13, fontWeight: 400, color: "#000000" }}>
          {submittedOn}
        </Typography>
      </Box>

      {/* Dashed divider */}
      <Box sx={{ borderTop: "1px dashed #DADADA", my: "4px" }} />

      {/* Actions */}
      <Box sx={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <PrimaryButton
          component={Link}
          href={detailsHref || "#"}
          fullWidth={false}
          sx={{
            width: "179px",
            minWidth: 0,
            maxWidth: "none",
            height: 26.85,
            fontSize: 12.5,
            fontWeight: 500,
            px: "20px",
            flexShrink: 1,
          }}
        >
          View project details
        </PrimaryButton>

        <IconLink href={links.github} icon={`${ICON_BASE}/github.svg`} />
        <IconLink href={links.live} icon={`${ICON_BASE}/attachment.svg`} />
        <IconLink href={links.website} icon={`${ICON_BASE}/globe.svg`} />
      </Box>
    </Box>
  );
}
