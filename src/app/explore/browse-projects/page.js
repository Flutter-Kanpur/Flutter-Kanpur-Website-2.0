"use client";

import { useMemo, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Skeleton from "@mui/material/Skeleton";
import Divider from "@mui/material/Divider";
import { useMediaQuery } from "@mui/material";
import Link from "next/link";

import FooterComponent from "@/components/FooterComponent";
import {
  BrowseHero,
  CategorySidebar,
  ProjectSection,
  ShowcaseCTA,
  categories,
  showcaseCta,
} from "@/components/browseProjectsComponents";
import { t, figma, fontFamily } from "@/components/browseProjectsComponents/tokens";
import ScreenUtilScaler from "@/components/layouts/ScreenUtilScaler";
import ProjectsListScreen from "@/components/explorePageComponents/mobileScreen/projects";
import { ULTRA_WIDE_MIN } from "@/theme/breakpoints";
import { useProjects } from "@/hooks/useProjects";

const HERO = {
  title: "Browse Projects",
  description:
    "Explore Flutter projects, open-source contributions, UI concepts, and hackathon builds created by Flutter Kanpur members.",
  searchPlaceholder: "Search Projects...",
};

const CONTENT_PX = { xs: t.spacing.lg, md: t.spacing.xxl };
const DESIGN_WIDTH = t.layout.maxWidth + 2 * 32;

export default function BrowseProjectsPage() {
  const isMobile = useMediaQuery("(max-width:480px)");
  const [activeCategory, setActiveCategory] = useState(categories[0].id);
  const [isFiltering, setIsFiltering] = useState(false);

  const { projects, loading, error, refetch } = useProjects();

  const handleSelectCategory = (id) => {
    if (id === activeCategory && isFiltering) {
      setIsFiltering(false);
      return;
    }
    setActiveCategory(id);
    setIsFiltering(true);
  };

  const visibleSections = useMemo(() => {
    if (!projects || projects.length === 0) return [];

    if (isFiltering) {
      const filtered = projects.filter(
        (p) =>
          p.category?.toLowerCase() === activeCategory?.toLowerCase() ||
          p.tags?.some((t) => t.toLowerCase() === activeCategory?.toLowerCase())
      );
      const catLabel =
        categories.find((c) => c.id === activeCategory)?.label || "Projects";
      return [
        {
          id: activeCategory,
          title: catLabel,
          projects: filtered,
        },
      ];
    }

    // When not filtering, group into sections by category or show All Projects
    const groups = new Map();
    for (const p of projects) {
      const cat = p.category || "General";
      if (!groups.has(cat)) {
        const catLabel =
          categories.find((c) => c.id === cat.toLowerCase())?.label ||
          cat.charAt(0).toUpperCase() + cat.slice(1) + " Projects";
        groups.set(cat, {
          id: cat,
          title: catLabel,
          projects: [],
        });
      }
      groups.get(cat).projects.push(p);
    }

    return Array.from(groups.values());
  }, [projects, isFiltering, activeCategory]);

  if (isMobile) return <ProjectsListScreen />;

  return (
    <ScreenUtilScaler
      designWidth={DESIGN_WIDTH}
      desktopMin={ULTRA_WIDE_MIN}
      allowUpscale
    >
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
            }}
          >
            {loading ? (
              <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)" }, gap: t.layout.cardGap }}>
                {Array.from({ length: 4 }).map((_, i) => (
                  <Box
                    key={`proj-skel-${i}`}
                    sx={{
                      p: t.spacing.xl,
                      borderRadius: t.radius.md,
                      border: `1px solid ${t.border.subtle}`,
                      bgcolor: t.surface.card,
                    }}
                  >
                    <Box sx={{ display: "flex", gap: t.spacing.md, alignItems: "center" }}>
                      <Skeleton variant="rounded" width={40} height={40} sx={{ borderRadius: t.radius.xs }} />
                      <Box sx={{ flex: 1 }}>
                        <Skeleton width="60%" height={24} />
                        <Skeleton width="40%" height={16} sx={{ mt: 0.5 }} />
                      </Box>
                    </Box>
                    <Skeleton width="100%" height={60} sx={{ mt: 2 }} />
                  </Box>
                ))}
              </Box>
            ) : error ? (
              <Box
                sx={{
                  py: 8,
                  textAlign: "center",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 2,
                }}
              >
                <Typography
                  sx={{
                    fontFamily,
                    fontSize: 20,
                    fontWeight: 600,
                    color: "error.main",
                  }}
                >
                  Failed to load projects
                </Typography>
                <Typography
                  sx={{
                    fontFamily,
                    fontSize: 15,
                    color: t.text.muted,
                    maxWidth: 500,
                  }}
                >
                  {error.message || "An unexpected error occurred while fetching projects."}
                </Typography>
                <Button
                  variant="outlined"
                  onClick={refetch}
                  sx={{
                    borderRadius: "100px",
                    px: 3,
                    py: 1,
                    textTransform: "none",
                    fontFamily,
                    borderColor: t.text.heading,
                    color: t.text.heading,
                  }}
                >
                  Retry
                </Button>
              </Box>
            ) : visibleSections.length === 0 || visibleSections.every((s) => s.projects.length === 0) ? (
              <Box
                sx={{
                  py: 8,
                  textAlign: "center",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 2,
                }}
              >
                <Typography
                  sx={{
                    fontFamily,
                    fontSize: 22,
                    fontWeight: 600,
                    color: t.text.heading,
                  }}
                >
                  No projects yet. Be the first to share yours.
                </Typography>
                <Typography
                  sx={{
                    fontFamily,
                    fontSize: 16,
                    color: t.text.body,
                    maxWidth: 480,
                  }}
                >
                  Showcase your open source apps, tools, and UI concepts to the Flutter Kanpur community.
                </Typography>
                <Button
                  component={Link}
                  href="/community/project/upload"
                  variant="contained"
                  sx={{
                    bgcolor: "#101010",
                    color: "#FFFFFF",
                    borderRadius: "100px",
                    py: "12px",
                    px: "32px",
                    textTransform: "none",
                    fontFamily,
                    fontSize: "15px",
                    fontWeight: 500,
                    "&:hover": { bgcolor: "#333333" },
                    boxShadow: "none",
                  }}
                >
                  Share project
                </Button>
              </Box>
            ) : (
              visibleSections.map((section) => (
                <ProjectSection
                  key={section.id}
                  title={section.title}
                  projects={section.projects}
                />
              ))
            )}
          </Box>
        </Box>

        <Box sx={{ mt: { xs: t.spacing.xxxl, md: t.spacing.massive } }}>
          <ShowcaseCTA {...showcaseCta} />
        </Box>

        <Divider sx={{ my: t.spacing.xxxl, borderColor: t.border.subtle }} />
        <FooterComponent />
      </Box>
    </Box>
    </ScreenUtilScaler>
  );
}
