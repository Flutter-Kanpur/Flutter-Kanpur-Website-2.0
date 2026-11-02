"use client";

import Box from "@mui/material/Box";
import { useRouter } from "next/navigation";
import SectionHeader from "@/components/communityScreen/SectionHeader";
import ProjectCard from "./ProjectCard";
import { communityProjects } from "@/data/exploreScreenData";

/**
 * ProjectsSection — "Community projects" on the Explore landing screen.
 */
const ProjectsSection = ({ onViewAll }) => {
  const router = useRouter();

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "14px" }}>
      <SectionHeader
        title="Community projects"
        actionLabel="View all"
        onAction={onViewAll}
      />
      <Box sx={{ display: "flex", flexDirection: "column", gap: "14px" }}>
        {communityProjects.map((project) => (
          <ProjectCard
            key={project.id}
            title={project.title}
            tags={project.tags}
            author={project.author}
            date={project.date}
            links={project.links}
            onAction={() => router.push(`/explore/browse-projects/${project.id}`)}
          />
        ))}
      </Box>
    </Box>
  );
};

export default ProjectsSection;
