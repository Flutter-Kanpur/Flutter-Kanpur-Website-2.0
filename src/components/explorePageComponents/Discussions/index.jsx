import React from "react";
import styles from "./Discussions.module.css";
import PrimaryButton from "@/components/buttons/PrimaryButton/PrimaryButton";
import Image from "next/image";
import { discussions, discussionsContent } from "@/data/discussionsData";

function Card({ d }) {
  return (
    <div className={`${styles.card} ${d.active ? styles.active : ""}`}>
      <p className={styles.text}>{d.text}</p>
      <div className={styles.meta}>
        <div className={styles.authorInfo}>
          <span className={styles.author}>{d.author}</span>
          <span className={styles.time}>{d.time}</span>
        </div>
        <img src={d.avatar} alt={d.author} className={styles.avatar} />
      </div>
    </div>
  );
}

export default function Discussions() {
  // Split into two columns for layout similar to screenshot
  const left = discussions.slice(0, 3);
  const right = discussions.slice(3, 6);

  return (
    <section className={styles.discussionsSection}>
      <h2 className={styles.heading}>{discussionsContent.heading}</h2>

      <div className={styles.actions}>
        <PrimaryButton
          fullWidth={false}
          sx={{
            width: "fit-content",
            minWidth: "0",
            maxWidth: "none",
            px: "24px",
            fontSize: "16px",
            fontWeight: 400,
            backgroundColor: "#1a1a1a",
            color: "#ffffff",
            "&:hover": { backgroundColor: "#000000" },
          }}
          endIcon={
            <Image
              src="/assets/explore-page-assets/eye-icon.svg"
              alt="View"
              width={18}
              height={18}
            />
          }
        >
          {discussionsContent.viewAllLabel}
        </PrimaryButton>
        <a className={styles.askButton} href="#">
          {discussionsContent.askLabel}
          <Image
            src="/assets/explore-page-assets/discussion-arrow.svg"
            alt=""
            width={14}
            height={14}
          />
        </a>
      </div>

      <div className={styles.gridWrap}>
        <div className={styles.col}>
          {left.map((d) => (
            <Card d={d} key={d.id} />
          ))}
        </div>

        <div className={styles.col}>
          {right.map((d) => (
            <Card d={d} key={d.id} />
          ))}
        </div>
      </div>
    </section>
  );
}
