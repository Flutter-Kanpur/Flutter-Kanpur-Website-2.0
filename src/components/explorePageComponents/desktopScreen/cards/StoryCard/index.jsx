import React from "react";
import Image from "next/image";
import styles from "./StoryCard.module.css";

const StoryCard = ({ story }) => {
  if (!story) return null;

  return (
    <article className={`${styles.card} ${story.active ? styles.active : ""}`}>
      <span className={styles.icon}>
        <Image
          src="/assets/explore-page-assets/arrow-icon.svg"
          alt=""
          width={12}
          height={12}
        />
      </span>

      <div className={styles.imageBox}>
        <img
          src="/assets/explore-page-assets/stories.svg"
          alt="story"
          className={styles.image}
        />
      </div>

      <div className={styles.content}>
        <h3 className={styles.title}>{story.title}</h3>
        <p className={styles.description}>{story.description}</p>
        <span className={styles.author}>{story.author}</span>
      </div>
    </article>
  );
};

export default StoryCard;
