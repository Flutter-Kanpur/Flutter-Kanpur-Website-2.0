'use client';

import React from "react";
import styles from "./Projects.module.css";
import ProjectCard from "./ProjectCard";
import { projectsContent } from "@/data/projectsData";
import Image from "next/image";
import { Skeleton, Box, Typography, Button } from "@mui/material";
import { useExploreProjects } from "@/hooks/useExploreProjects";

export default function Projects() {
  const { data: projects, loading, error, refetch } = useExploreProjects();

  return (
    <section className={styles.projectsSection}>
      <div className={styles.header}>
        <div className={styles.headerText}>
          <h2>{projectsContent.heading}</h2>
          <p>{projectsContent.subheading}</p>
        </div>

        <a className={styles.viewAll} href={projectsContent.ctaHref}>
          {projectsContent.ctaLabel}
          <Image
            src="/assets/explore-page-assets/projects-arrow.svg"
            alt=""
            width={10}
            height={10}
          />
        </a>
      </div>

      <div className={styles.grid}>
        {loading &&
          [1, 2, 3, 4].map((n) => (
            <Skeleton
              key={n}
              variant="rounded"
              width={421}
              height={346}
              sx={{ borderRadius: "16px", maxWidth: "100%" }}
            />
          ))}

        {!loading && error && (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
              minHeight: 200,
              gap: 2,
              textAlign: "center",
            }}
          >
            <Typography variant="body1" sx={{ color: "#d32f2f" }}>
              Failed to load projects: {error.message || "Unknown error"}
            </Typography>
            <Button
              variant="outlined"
              onClick={refetch}
              sx={{
                borderRadius: "999px",
                borderColor: "#000000",
                color: "#000000",
                textTransform: "none",
                "&:hover": {
                  borderColor: "#333333",
                  backgroundColor: "rgba(0, 0, 0, 0.04)",
                },
              }}
            >
              Retry
            </Button>
          </Box>
        )}

        {!loading && !error && projects && projects.length === 0 && (
          <Typography
            sx={{
              textAlign: "center",
              color: "#6D6D6D",
              fontSize: "18px",
              width: "100%",
              py: 4,
            }}
          >
            Community projects will appear here.
          </Typography>
        )}

        {!loading && !error && projects && projects.length > 0 &&
          projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
      </div>
    </section>
  );
}
