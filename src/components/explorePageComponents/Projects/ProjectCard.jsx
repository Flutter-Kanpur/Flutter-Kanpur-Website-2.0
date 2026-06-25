import React from "react";
import Image from "next/image";
import styles from "./ProjectCard.module.css";

export default function ProjectCard({ project }) {
  if (!project) return null;

  const { title, description, tags = [], date, author, href = "#" } = project;

  return (
    <div className={styles.cardContainer}>
      <article className={styles.card}>
        <span className={styles.topIcon}>
          <Image
            src="/assets/explore-page-assets/project-arrow.svg"
            alt=""
            width={10}
            height={10}
          />
        </span>

        <h4 className={styles.title}>{title}</h4>
        <p className={styles.desc}>{description}</p>

        <div className={styles.tags}>
          {tags.map((tag) => (
            <span className={styles.tag} key={tag}>
              {tag}
            </span>
          ))}
        </div>

        <div className={styles.meta}>
          <span className={styles.date}>{date}</span>
          <a className={styles.author} href={href}>
            {author}
          </a>
        </div>
      </article>
    </div>
  );
}
