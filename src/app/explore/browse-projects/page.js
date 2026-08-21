"use client";

import { useMemo, useState } from "react";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";

import FooterComponent from "@/components/FooterComponent";
import {
  BrowseHero,
  CategorySidebar,
  ProjectSection,
  ShowMoreButton,
  ShowcaseCTA,
  categories,
  projectSections,
  showcaseCta,
} from "@/components/browseProjectsComponents";
import { t, figma } from "@/components/browseProjectsComponents/tokens";

const HERO = {
  title: "Browse Projects",
  description:
    "Explore Flutter projects, open-source contributions, UI concepts, and hackathon builds created by Flutter Kanpur members.",
  searchPlaceholder: "Search Projects...",
};

const CONTENT_PX = { xs: t.spacing.lg, md: t.spacing.xxl };
const ULTRA_WIDE = "@media (min-width:2400px)";
const ULTRA_MAX_WIDTH = "none";

export default function BrowseProjectsPage() {
  const [activeCategory, setActiveCategory] = useState(categories[0].id);
  const [isFiltering, setIsFiltering] = useState(false);

  const handleSelectCategory = (id) => {
    if (id === activeCategory && isFiltering) {
      setIsFiltering(false);
      return;
    }
    setActiveCategory(id);
    setIsFiltering(true);
  };

  const visibleSections = useMemo(
    () =>
      isFiltering
        ? projectSections.filter(
            (section) => section.category === activeCategory,
          )
        : projectSections,
    [isFiltering, activeCategory],
  );

  return (
    <Box sx={{ width: "100%", bgcolor: t.surface.page }}>
      {/* The navbar is rendered above the page by AppShell, so this band pulls
          itself up underneath it — the gradient then starts at the very top of
          the viewport with the navbar floating on it. */}
      <Box
        sx={{
          background: figma.topGradient,
          mt: figma.navbarOffset,
          pt: figma.navbarClearance,
          pb: { xs: t.spacing.xxxl, md: "120px" },
          px: CONTENT_PX,
        }}
      >
        <Box
          sx={{
            maxWidth: t.layout.maxWidth,
            mx: "auto",
            [ULTRA_WIDE]: {
              maxWidth: ULTRA_MAX_WIDTH,
              "& > div > div:last-of-type": { width: 480 },
            },
          }}
        >
          <BrowseHero {...HERO} />
        </Box>
      </Box>

      <Box
        sx={{
          maxWidth: t.layout.maxWidth,
          mx: "auto",
          px: CONTENT_PX,
          pb: { xs: t.spacing.xxxl, md: t.spacing.huge },
          [ULTRA_WIDE]: { maxWidth: ULTRA_MAX_WIDTH },
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: "flex-start",
            gap: t.layout.columnGap,
          }}
        >
          <Box
            sx={{
              width: { xs: "100%", md: t.layout.sidebarWidth },
              flexShrink: 0,
              position: { md: "sticky" },
              top: { md: t.spacing.xxl },
            }}
          >
            <CategorySidebar
              categories={categories}
              activeCategory={activeCategory}
              onSelect={handleSelectCategory}
            />
          </Box>

          <Box
            sx={{
              flex: 1,
              minWidth: 0,
              display: "flex",
              flexDirection: "column",
              gap: t.layout.sectionGap,
              [ULTRA_WIDE]: {
                "& > section > div": {
                  gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
                },
              },
            }}
          >
            {visibleSections.map((section) => (
              <ProjectSection
                key={section.id}
                title={section.title}
                projects={section.projects}
              />
            ))}

            <ShowMoreButton onClick={() => {}} />
          </Box>
        </Box>

        <Box sx={{ mt: { xs: t.spacing.xxxl, md: t.spacing.massive } }}>
          <ShowcaseCTA {...showcaseCta} />
        </Box>

        <Divider sx={{ my: t.spacing.xxxl, borderColor: t.border.subtle }} />
        <FooterComponent />
      </Box>
    </Box>
  );
}
