'use client';

import React from "react";
import styles from "./StoriesSection.module.css";
import StoryCard from "@/components/explorePageComponents/cards/StoryCard";
import PrimaryButton from "@/components/buttons/PrimaryButton/PrimaryButton";
import Image from "next/image";
import Link from "next/link";
import { Skeleton, Box, Typography, Button } from "@mui/material";
import { useExploreStories } from "@/hooks/useExploreStories";

const StoriesSection = () => {
  const { data: stories, loading, error, refetch } = useExploreStories();

  return (
    <section className={styles.storiesSection}>
      <section className={styles.container}>
        <div className={styles.left}>
          <h1>
            Explore Stories <br />
            Written by Fellow <br />
            Users
          </h1>

          <p>
            Developers from our community share what they learn, from Flutter
            best practices to state management and Firebase. Read their stories,
            pick up new techniques and write your own.
          </p>

          <PrimaryButton
            component={Link}
            href="/blogs"
            fullWidth={false}
            sx={{
              width: "fit-content",
              minWidth: "unset",
              maxWidth: "unset",
              px: 3,
              mt: "auto",
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
            View more blogs
          </PrimaryButton>
        </div>

        <div className={styles.right}>
          {loading && (
            <div className={styles.grid}>
              {[1, 2, 3, 4].map((n) => (
                <Skeleton
                  key={n}
                  variant="rounded"
                  width="100%"
                  height={297}
                  sx={{ borderRadius: "16px" }}
                />
              ))}
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
                minHeight: 297,
                gap: 2,
                textAlign: "center",
              }}
            >
              <Typography variant="body1" sx={{ color: "#d32f2f" }}>
                Failed to load stories: {error.message || "Unknown error"}
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

          {!loading && !error && stories && stories.length === 0 && (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                minHeight: 297,
              }}
            >
              <Typography variant="body1" sx={{ color: "#6d6d6d" }}>
                No stories published yet.
              </Typography>
            </Box>
          )}

          {!loading && !error && stories && stories.length > 0 && (
            <div className={styles.grid}>
              {stories.map((item) => (
                <StoryCard key={item.id} story={item} />
              ))}
            </div>
          )}
        </div>
      </section>
    </section>
  );
};

export default StoriesSection;
