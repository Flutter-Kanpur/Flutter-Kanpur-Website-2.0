'use client';

import React from "react";
import ExploreCategoriesSection from "@/components/landingPageComponents/ExploreCategories";
import { exploreCategoriesContent } from "@/data/exploreCategoriesData";
import { useExploreStories } from "@/hooks/useExploreStories";
import styles from "@/app/explore/page.module.css";
import { Box, Skeleton, Typography } from "@mui/material";

export default function MemberStoriesSection() {
  const { data: stories, loading } = useExploreStories(6);

  if (!loading && (!stories || stories.length === 0)) {
    return null;
  }

  const mappedCategories = (stories || []).map((story) => ({
    title: story.title,
    linkText: "Open full story",
    linkHref: "/blogs",
  }));

  return (
    <div className={styles.container}>
      {loading ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "space-between",
            alignItems: "flex-start",
            gap: { xs: 4, md: 3 },
          }}
        >
          <Box sx={{ flex: { xs: "unset", md: "0 0 40%" } }}>
            <Typography
              sx={{
                fontSize: { xs: 28, sm: 36, md: 42, lg: 48 },
                fontWeight: 600,
                color: "#000",
                lineHeight: 1.15,
                textAlign: { xs: "center", md: "left" },
              }}
            >
              {exploreCategoriesContent.title}
              {exploreCategoriesContent.titleHighlight && (
                <Box component="span" sx={{ color: "#3D6BFF" }}>
                  {" "}
                  {exploreCategoriesContent.titleHighlight}
                </Box>
              )}
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: "16px",
              overflowX: "hidden",
            }}
          >
            {[1, 2, 3].map((n) => (
              <Skeleton
                key={n}
                variant="rounded"
                width={320}
                height={110}
                sx={{ borderRadius: "20px", flexShrink: 0 }}
              />
            ))}
          </Box>
        </Box>
      ) : (
        <ExploreCategoriesSection
          title={exploreCategoriesContent.title}
          titleHighlight={exploreCategoriesContent.titleHighlight}
          categories={mappedCategories}
          variant="explore"
        />
      )}
    </div>
  );
}
