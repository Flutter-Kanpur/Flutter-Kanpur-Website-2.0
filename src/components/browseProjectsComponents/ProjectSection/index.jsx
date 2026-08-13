"use client";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import ProjectCard from "../ProjectCard";
import { t, fontFamily } from "../tokens";

const ProjectSection = ({ title, projects }) => (
  <Box component="section">
    <Typography
      component="h2"
      sx={{
        fontFamily,
        fontSize: t.typography.display3.fontSize,
        fontWeight: t.typography.display3.fontWeight,
        color: t.text.heading,
        mb: t.spacing.xl,
      }}
    >
      {title}
    </Typography>

    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: { xs: "1fr", sm: "repeat(2, minmax(0, 1fr))" },
        gap: t.layout.cardGap,
      }}
    >
      {projects.map((project) => (
        <ProjectCard key={project.id} {...project} />
      ))}
    </Box>
  </Box>
);

export default ProjectSection;
