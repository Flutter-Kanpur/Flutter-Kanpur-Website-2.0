import Image from "next/image";
import PrimaryButton from "@/components/buttons/PrimaryButton/PrimaryButton";
import styles from "./ForumDiscussion.module.css";
import {
  
  forumDiscussionsTimeline,
} from "@/data/communityData";


function AuthorAvatar({ onLine }) {
  return (
    <span
      className={
        onLine
          ? `${styles.avatarIcon} ${styles.avatarIconOnLine}`
          : styles.avatarIcon
      }
    >
        <Image
          src="/assets/community-page-assets/avatar-icon.svg"
          alt="Avatar Icon"
          width={22}
          height={22}
        />
    </span>
  );
}

function TimelineItem({ item, featured }) {
  return (
    <div className={styles.item}>
      {item.title && <h3 className={styles.itemTitle}>{item.title}</h3>}

      <div className={styles.meta}>
        <AuthorAvatar onLine={!featured} />
        <span className={styles.author}>{item.author}</span>
        <span className={styles.metaDot}>·</span>
        <span className={styles.date}>{item.date}</span>
        {item.badge && <span className={styles.badge}>{item.badge}</span>}
      </div>

      <p className={featured ? styles.bodyFeatured : styles.body}>
        {item.body}
      </p>

      {item.highlights && (
        <div className={styles.highlights}>
          <p className={styles.highlightsLabel}>{item.highlightsLabel}</p>
          <ul className={styles.highlightsList}>
            {item.highlights.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default function ForumDiscussions() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <h2 className={styles.heading}>Forum Discussions</h2>
          <p className={styles.description}>
            Engage in topic-based discussions, ask questions, help others, and exchange ideas around Flutter, Dart, tools, careers, and real-world development challenges.
          </p>
        </div>

        <div className={styles.timeline}>
          <span className={styles.timelineDot} />
          <span className={styles.timelineLine} />

          <div className={styles.itemsList}>
            {forumDiscussionsTimeline.map((item, index) => (
              <TimelineItem
                key={item.id}
                item={item}
                featured={index === 0}
              />
            ))}
          </div>
        </div>

        <div className={styles.ctaRow}>
          <PrimaryButton
            fullWidth={false}
            sx={{
              width: "fit-content",
              minWidth: "0",
              maxWidth: "none",
              px: "24px",
              fontSize: "16px",
              fontWeight: 400,
            }}
            endIcon={
              <Image
                src="/assets/explore-page-assets/eye-icon.svg"
                alt="Eye Icon"
                width={16}
                height={16}
              />
            }
          >
            View discussion
          </PrimaryButton>
        </div>
      </div>
    </section>
  );
}
