'use client';

import React from "react";
import styles from "./Discussions.module.css";
import Image from "next/image";
import Link from "next/link";
import { Skeleton, Box, Typography, Button } from "@mui/material";
import { discussionsContent } from "@/data/discussionsData";
import { useExploreDiscussions } from "@/hooks/useExploreDiscussions";

function Card({ d }) {
  return (
    <Link
      href={d.href || `/community/discussion/${d.id}`}
      style={{ textDecoration: "none", color: "inherit", display: "block" }}
    >
      <div className={`${styles.card} ${d.active ? styles.active : ""}`}>
        <p className={styles.text}>{d.text}</p>
        <div className={styles.meta}>
          <div className={styles.authorInfo}>
            <span className={styles.author}>{d.author}</span>
            <span className={styles.time}>{d.time}</span>
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={d.avatar || "/assets/explore-page-assets/avatar.svg"}
            alt={d.author}
            className={styles.avatar}
          />
        </div>
      </div>
    </Link>
  );
}

export default function Discussions() {
  const { data: discussions, loading, error, refetch } = useExploreDiscussions();

  const left = discussions ? discussions.slice(0, Math.ceil(discussions.length / 2)) : [];
  const right = discussions ? discussions.slice(Math.ceil(discussions.length / 2)) : [];

  return (
    <section className={styles.discussionsSection}>
      <h2 className={styles.heading}>{discussionsContent.heading}</h2>

      <div className={styles.actions}>
        <a className={styles.askButton} href={discussionsContent.askHref}>
          {discussionsContent.askLabel}
          <Image
            src="/assets/explore-page-assets/discussion-arrow.svg"
            alt=""
            width={14}
            height={14}
          />
        </a>
      </div>

      {loading && (
        <div className={styles.gridWrap}>
          <div className={styles.col}>
            {[1, 2, 3].map((n) => (
              <Skeleton
                key={n}
                variant="rounded"
                width="100%"
                height={160}
                sx={{ borderRadius: "16px" }}
              />
            ))}
          </div>
          <div className={styles.col}>
            {[4, 5, 6].map((n) => (
              <Skeleton
                key={n}
                variant="rounded"
                width="100%"
                height={160}
                sx={{ borderRadius: "16px" }}
              />
            ))}
          </div>
        </div>
      )}

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
            Failed to load discussions: {error.message || "Unknown error"}
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

      {!loading && !error && discussions && discussions.length === 0 && (
        <Typography
          sx={{
            textAlign: "center",
            color: "#6D6D6D",
            fontSize: "18px",
            width: "100%",
            py: 4,
          }}
        >
          No discussions yet.
        </Typography>
      )}

      {!loading && !error && discussions && discussions.length > 0 && (
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
      )}
    </section>
  );
}
