import React from "react";
import styles from "./SuccessStories.module.css";

const stories = [
  { id: 1, label: "UI/UX Design", action: "Open Adobe", icon: "" },
  { id: 2, label: "Frameworks", action: "Open Flutter", icon: "" },
  { id: 3, label: "Prototyping", action: "Open Figma", icon: "" },
];

export default function SuccessStories() {
  return (
    <section className={styles.successSection}>
      <div className={styles.left}>
        <h2 className={styles.heading}>
          Read success stories
          <br />
          <span className={styles.accent}>from our Members.</span>
        </h2>
      </div>

      <div className={styles.cardRow}>
        {stories.map((s) => (
          <div className={styles.card} key={s.id}>
            <div className={styles.cardText}>
              <span className={styles.cardLabel}>{s.label}</span>
              <span className={styles.cardAction}>{s.action} ▾</span>
            </div>
            <span className={styles.cardIcon}>{s.icon}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
