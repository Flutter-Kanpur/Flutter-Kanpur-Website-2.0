"use client";

import { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import ButtonBase from "@mui/material/ButtonBase";
import IconButton from "@mui/material/IconButton";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import GitHubIcon from "@mui/icons-material/GitHub";
import InsertLinkIcon from "@mui/icons-material/InsertLink";
import LanguageIcon from "@mui/icons-material/Language";
import SectionHeader from "@/components/communityScreen/SectionHeader";
import Tag from "./Tag";
import { communityProjects } from "@/data/exploreScreenData";
import { colors } from "@/theme/colors";

const fontFamily =
  'var(--font-product-sans), "Product Sans", sans-serif';

const MetaItem = ({ label, value }) => (
  <Box sx={{ flex: 1 }}>
    <Typography
      sx={{ fontFamily, fontSize: "14px", lineHeight: "20px", color: "#949494" }}
    >
      {label}
    </Typography>
    <Typography
      sx={{
        mt: "2px",
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

const CircleLink = ({ href, label, children }) => (
  <IconButton
    component="a"
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={label}
    sx={{
      width: "40px",
      height: "40px",
      border: "1px solid #D1D1D1",
      color: "#1F1F1F",
      backgroundColor: "#FFFFFF",
    }}
  >
    {children}
  </IconButton>
);

const ProjectCard = ({ project, onOpen }) => {
  const [liked, setLiked] = useState(false);

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
      <Box sx={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
        <Typography
          sx={{
            fontFamily,
            fontSize: "18px",
            fontWeight: 500,
            lineHeight: "26px",
            color: colors.neutral[950],
          }}
        >
          {project.title}
        </Typography>
        <IconButton
          onClick={() => setLiked((v) => !v)}
          aria-label={liked ? "Remove from favourites" : "Add to favourites"}
          sx={{ p: 0, mt: "2px", color: colors.warning[600] }}
        >
          {liked ? (
            <FavoriteIcon sx={{ fontSize: 22 }} />
          ) : (
            <FavoriteBorderIcon sx={{ fontSize: 22 }} />
          )}
        </IconButton>
      </Box>

      <Box sx={{ mt: "12px", display: "flex", flexWrap: "wrap", gap: "8px" }}>
        {project.tags.map((tag) => (
          <Tag key={tag} label={tag} />
        ))}
      </Box>

      <Box sx={{ mt: "16px", display: "flex", gap: "16px" }}>
        <MetaItem label="project by" value={project.author} />
        <MetaItem label="posted on" value={project.date} />
      </Box>

      <Box sx={{ mt: "14px", borderTop: "1px dashed #D1D1D1" }} />

      <Box sx={{ mt: "8px", display: "flex", alignItems: "center", gap: "8px" }}>
        <ButtonBase
          onClick={onOpen}
          sx={{
            flex: 1,
            height: "36px",
            borderRadius: "999px",
            backgroundColor: "#000000",
            color: "#FFFFFF",
            fontFamily,
            fontSize: "14px",
            fontWeight: 400,
          }}
        >
          View project details
        </ButtonBase>
        <CircleLink href={project.links.github} label="GitHub">
          <GitHubIcon sx={{ fontSize: 20 }} />
        </CircleLink>
        <CircleLink href={project.links.link} label="Project link">
          <InsertLinkIcon sx={{ fontSize: 20 }} />
        </CircleLink>
        <CircleLink href={project.links.website} label="Website">
          <LanguageIcon sx={{ fontSize: 20 }} />
        </CircleLink>
      </Box>
    </Box>
  );
};

const ProjectsSection = ({ onViewAll }) => (
  <Box sx={{ display: "flex", flexDirection: "column", gap: "14px" }}>
    <SectionHeader
      title="Community projects"
      actionLabel="View all"
      onAction={onViewAll}
    />
    <Box sx={{ display: "flex", flexDirection: "column", gap: "14px" }}>
      {communityProjects.map((project) => (
        <ProjectCard key={project.id} project={project} onOpen={onViewAll} />
      ))}
    </Box>
  </Box>
);

export default ProjectsSection;