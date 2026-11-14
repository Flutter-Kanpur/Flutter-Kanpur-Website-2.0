"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import RefreshRoundedIcon from "@mui/icons-material/RefreshRounded";
import ErrorOutlineRoundedIcon from "@mui/icons-material/ErrorOutlineRounded";
import PrimaryButton from "@/components/buttons/PrimaryButton/PrimaryButton";
import styles from "./ForumDiscussion.module.css";
import {
  fetchCommunityItems,
  mapCommunityItemToForumTimeline,
} from "@/lib/supabase/community";

function AuthorAvatar({ onLine, avatarUrl }) {
  const isCustomImage =
    avatarUrl && avatarUrl !== "/assets/community-page-assets/avatar-icon.svg";

  return (
    <span
      className={
        onLine
          ? `${styles.avatarIcon} ${styles.avatarIconOnLine}`
          : styles.avatarIcon
      }
    >
      {isCustomImage ? (
        <Image
          src={avatarUrl}
          alt="Avatar"
          width={22}
          height={22}
          unoptimized
          style={{
            borderRadius: "50%",
            objectFit: "cover",
            width: "22px",
            height: "22px",
            display: "block",
          }}
        />
      ) : (
        <Image
          src="/assets/community-page-assets/avatar-icon.svg"
          alt="Avatar Icon"
          width={22}
          height={22}
        />
      )}
    </span>
  );
}

function TimelineItem({ item, featured }) {
  return (
    <div className={styles.item}>
      {item.title && <h3 className={styles.itemTitle}>{item.title}</h3>}

      <div className={styles.meta}>
        <AuthorAvatar onLine={!featured} avatarUrl={item.avatar} />
        {/* TODO: Confirm author name column (currently mapped from item.author_name / item.author) */}
        <span className={styles.author}>{item.author}</span>
        <span className={styles.metaDot}>·</span>
        {/* TODO: Confirm date column (currently mapped from item.created_at / item.date) */}
        <span className={styles.date}>{item.date}</span>
        {/* TODO: Confirm badge column (currently mapped from item.badge / item.category) */}
        {item.badge && <span className={styles.badge}>{item.badge}</span>}
      </div>

      {/* TODO: Confirm text content/body column (currently mapped from item.content / item.body) */}
      <p className={featured ? styles.bodyFeatured : styles.body}>
        {item.body}
      </p>

      {/* TODO: Confirm highlights columns if stored in table (item.highlights, item.highlights_label) */}
      {item.highlights && (
        <div className={styles.highlights}>
          <p className={styles.highlightsLabel}>{item.highlightsLabel}</p>
          <ul className={styles.highlightsList}>
            {item.highlights.map((line, idx) => (
              <li key={idx}>{line}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default function ForumDiscussions() {
  const router = useRouter();
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Helper to fetch and normalize community records
  const fetchAndMapData = async () => {
    const rawData = await fetchCommunityItems();
    return (rawData || []).map((row, index) =>
      mapCommunityItemToForumTimeline(row, index)
    );
  };

  // Initial fetch on component mount
  useEffect(() => {
    let isCancelled = false;

    async function loadInitialData() {
      try {
        const mapped = await fetchAndMapData();
        if (!isCancelled) {
          setItems(mapped);
          setError(null);
        }
      } catch (err) {
        if (!isCancelled) {
          console.error("Failed to load community discussions from backend:", err);
          setError(err?.message || "Failed to load community discussions.");
        }
      } finally {
        if (!isCancelled) {
          setIsLoading(false);
        }
      }
    }

    loadInitialData();

    return () => {
      isCancelled = true;
    };
  }, []);

  // Explicit user refresh trigger
  const handleRefresh = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const mapped = await fetchAndMapData();
      setItems(mapped);
    } catch (err) {
      console.error("Failed to refresh community discussions:", err);
      setError(err?.message || "Failed to load community discussions.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <div className={styles.headerTop}>
            <div className={styles.headerText}>
              <h2 className={styles.heading}>Forum Discussions</h2>
              <p className={styles.description}>
                Engage in topic-based discussions, ask questions, help others, and exchange ideas around Flutter, Dart, tools, careers, and real-world development challenges.
              </p>
            </div>

            {/* Subtle Refresh button */}
            <button
              type="button"
              onClick={handleRefresh}
              disabled={isLoading}
              className={styles.refreshButton}
              title="Refresh discussions"
              aria-label="Refresh community discussions"
            >
              <RefreshRoundedIcon
                sx={{
                  fontSize: 18,
                  animation: isLoading ? "spin 1s linear infinite" : "none",
                  "@keyframes spin": {
                    "0%": { transform: "rotate(0deg)" },
                    "100%": { transform: "rotate(360deg)" },
                  },
                }}
              />
              <span>{isLoading ? "Refreshing..." : "Refresh"}</span>
            </button>
          </div>
        </div>

        <div className={styles.timeline}>
          <span className={styles.timelineDot} />
          <span className={styles.timelineLine} />

          <div className={styles.itemsList}>
            {/* Loading State: Skeletons mimicking the timeline layout */}
            {isLoading && (
              <div className={styles.skeletonList}>
                {[1, 2, 3].map((key) => (
                  <div key={key} className={styles.skeletonItem}>
                    <div className={styles.skeletonTitle} />
                    <div className={styles.skeletonMeta}>
                      <div className={styles.skeletonAvatar} />
                      <div className={styles.skeletonMetaText} />
                    </div>
                    <div className={styles.skeletonBody} />
                    <div className={styles.skeletonBodyShort} />
                  </div>
                ))}
              </div>
            )}

            {/* Error State: Fallback UI when fetch fails */}
            {!isLoading && error && (
              <div className={styles.errorState}>
                <div className={styles.errorIconWrap}>
                  <ErrorOutlineRoundedIcon sx={{ fontSize: 32, color: "#b91c1c" }} />
                </div>
                <h4 className={styles.errorTitle}>Unable to load discussions</h4>
                <p className={styles.errorMessage}>
                  {error}
                </p>
                <button
                  type="button"
                  onClick={handleRefresh}
                  className={styles.retryButton}
                >
                  Try Again
                </button>
              </div>
            )}

            {/* Empty State: Graceful message when no data is returned */}
            {!isLoading && !error && items.length === 0 && (
              <div className={styles.emptyState}>
                <h4 className={styles.emptyTitle}>No community discussions found</h4>
                <p className={styles.emptyMessage}>
                  Be the first to start a conversation in the community!
                </p>
              </div>
            )}

            {/* Dynamic Data Mapping: Fetched API records rendered into UI components */}
            {!isLoading &&
              !error &&
              items.map((item, index) => (
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
            onClick={() => router.push("/community/discussion")}
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
