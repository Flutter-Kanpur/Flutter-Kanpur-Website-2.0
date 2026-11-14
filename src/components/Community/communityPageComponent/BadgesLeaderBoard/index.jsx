"use client";

import PrimaryButton from "@/components/buttons/PrimaryButton/PrimaryButton";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import EastIcon from "@mui/icons-material/East";
import styles from "./BadgesLeaderBoard.module.css";
import { badgeCategories as fallbackCategories } from "@/data/communityData";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { supabase } from "@/lib/supabase/client";

const EARNED_ICON = "/assets/community-page-assets/badge-earned.svg";
const LOCKED_ICON = "/assets/community-page-assets/badge-locked.svg";

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
                src={badge.icon || (badge.earned ? EARNED_ICON : LOCKED_ICON)}
                alt={badge.title || (badge.earned ? "Earned badge" : "Locked badge")}
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
  const router = useRouter();
  const [categories, setCategories] = useState(fallbackCategories);
  const [openId, setOpenId] = useState(fallbackCategories[0]?.id ?? null);

  // Fetch real badges from Supabase badges table if populated
  useEffect(() => {
    let isCancelled = false;

    async function loadBadges() {
      if (!supabase) return;
      try {
        const { data, error } = await supabase.from("badges").select("*");
        if (!error && data && data.length > 0 && !isCancelled) {
          const groups = {};
          data.forEach((b) => {
            const cat = b.category || "daily";
            if (!groups[cat]) {
              groups[cat] = {
                id: cat,
                label:
                  b.category_label ||
                  `${cat.charAt(0).toUpperCase() + cat.slice(1)} badges`,
                badges: [],
              };
            }
            groups[cat].badges.push({
              id: b.id,
              earned: Boolean(b.is_earned ?? b.earned),
              title: b.title || b.name,
              icon: b.icon_url,
            });
          });
          const groupedList = Object.values(groups);
          if (groupedList.length > 0) {
            setCategories(groupedList);
            setOpenId(groupedList[0]?.id ?? null);
          }
        }
      } catch (e) {
        console.warn("Could not load dynamic badges from Supabase:", e);
      }
    }

    loadBadges();

    return () => {
      isCancelled = true;
    };
  }, []);

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
            onClick={() => router.push("/dashboard")}
          >
            View dashboard
          </PrimaryButton>
        </div>

        <div className={styles.right}>
          <div className={styles.card}>
            {categories.map((category, index) => (
              <div key={category.id}>
                <BadgeCategoryRow
                  category={category}
                  isOpen={openId === category.id}
                  onToggle={() =>
                    setOpenId(openId === category.id ? null : category.id)
                  }
                />
                {index < categories.length - 1 && (
                  <div className={styles.divider} />
                )}
              </div>
            ))}
          </div>

          <Link href="/dashboard" className={styles.viewBadgesLink}>
            View your badges
            <EastIcon sx={{ fontSize: 16 }} />
          </Link>
        </div>
      </div>
    </section>
  );
}
