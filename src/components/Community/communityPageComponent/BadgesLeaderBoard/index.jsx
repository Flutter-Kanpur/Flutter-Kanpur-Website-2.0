"use client";


import PrimaryButton from "@/components/buttons/PrimaryButton/PrimaryButton";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import EastIcon from "@mui/icons-material/East";
import styles from "./BadgesLeaderBoard.module.css";
import {
  badgesLeaderboardContent,
  badgeCategories,
} from "@/data/communityData";
import { useState } from "react";
import Image from "next/image";

const EARNED_ICON =
  "/assets/community-page-assets/badge-earned.svg";

const LOCKED_ICON =
  "/assets/community-page-assets/badge-locked.svg";

function BadgeCategoryRow({ category, isOpen, onToggle }) {



  return (
    <div className={styles.categoryRow}>
      <button
        type="button"
        className={styles.categoryHeader}
        onClick={onToggle}
        aria-expanded={isOpen}
      >
        <span className={styles.categoryLabel}>{category.label}</span>
        {isOpen ? (
          <KeyboardArrowUpIcon sx={{ color: "#4167F2", fontSize: 20 }} />
        ) : (
          <KeyboardArrowDownIcon sx={{ color: "#6d6d6d", fontSize: 20 }} />
        )}
      </button>

      {isOpen && (
        <div className={styles.badgeIcons}>
          {category.badges.map((badge) => (
            
            <span
                key={badge.id}
                className={`${styles.badgeIcon} ${
                    badge.earned ? styles.badgeEarned : styles.badgeLocked
                }`}
                >
                <Image
                    src={
                    badge.earned
                        ? EARNED_ICON
                        : LOCKED_ICON
                    }
                    alt={badge.earned ? "Earned badge" : "Locked badge"}
                    width={60}
                    height={61}
                />
                </span>
          ))}
        </div>
      )}
    </div>
  );
}

export default function BadgesLeaderBoard() {
  const [openId, setOpenId] = useState(badgeCategories[0]?.id ?? null);

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.left}>
          <h2 className={styles.heading}>
            Badges & Leaderboard
            <br />
            <span className={styles.headingAccent}>
              recognize your contributions.
            </span>
          </h2>
          <p className={styles.description}>
            Build your reputation in the Flutter Kanpur community by actively participating in discussions, writing blogs, contributing to projects, and joining events.
          </p>
          <PrimaryButton
            fullWidth={false}
            sx={{
              width: "fit-content",
              minWidth: "0",
              maxWidth: "none",
              px: "32px",
              fontSize: "16px",
              fontWeight: 500,
            }}
          >
            View dashboard
          </PrimaryButton>
        </div>

        <div className={styles.right}>
          <div className={styles.card}>
            {badgeCategories.map((category, index) => (
              <div key={category.id}>
                <BadgeCategoryRow
                  category={category}
                  isOpen={openId === category.id}
                  onToggle={() =>
                    setOpenId(openId === category.id ? null : category.id)
                  }
                />
                {index < badgeCategories.length - 1 && (
                  <div className={styles.divider} />
                )}
              </div>
            ))}
          </div>

          <a href="#" className={styles.viewBadgesLink}>
            View your badges
            <EastIcon sx={{ fontSize: 16 }} />
          </a>
        </div>
      </div>
    </section>
  );
}
