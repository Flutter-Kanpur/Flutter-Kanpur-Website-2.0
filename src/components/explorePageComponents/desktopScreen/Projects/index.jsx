import React from "react";
import styles from "./Projects.module.css";
import ProjectCard from "./ProjectCard";
import { projects, projectsContent } from "@/data/projectsData";
import Image from "next/image";

export default function Projects() {
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
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
}
