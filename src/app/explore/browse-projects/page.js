"use client";

import { useMemo, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Skeleton from "@mui/material/Skeleton";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import { useMediaQuery } from "@mui/material";
import Link from "next/link";

import FooterComponent from "@/components/FooterComponent";
import {
  BrowseHero,
  CategorySidebar,
  ProjectSection,
  ShowMoreButton,
  ShowcaseCTA,
} from "@/components/browseProjectsComponents";
import { t, figma, fontFamily } from "@/components/browseProjectsComponents/tokens";
import ScreenUtilScaler from "@/components/layouts/ScreenUtilScaler";
import ProjectsListScreen from "@/components/explorePageComponents/mobileScreen/projects";
import { ULTRA_WIDE_MIN } from "@/theme/breakpoints";
import { useBrowseProjects } from "@/hooks/useBrowseProjects";

const HERO = {
  title: "Browse Projects",
  description:
    "Explore Flutter projects, open-source contributions, UI concepts, and hackathon builds created by Flutter Kanpur members.",
  searchPlaceholder: "Search Projects...",
};

const SHOWCASE_CTA = {
  title: "Want to showcase your skills?",
  description:
    "We're always looking for passionate contributors, mentors, and organisers to help grow the Flutter Kanpur community.",
  buttonLabel: "Upload your project",
  buttonHref: "/explore/projects",
};

const PAGE_SIZE = 6;
const CONTENT_PX = { xs: t.spacing.lg, md: t.spacing.xxl };
const DESIGN_WIDTH = t.layout.maxWidth + 2 * 32;

export default function BrowseProjectsPage() {
  const isMobile = useMediaQuery("(max-width:480px)");
  const { data, loading, error, refetch } = useBrowseProjects();

  const allProjects = useMemo(() => data?.projects || [], [data]);
  const techNames = useMemo(() => data?.techNames || [], [data]);

  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const sidebarCategories = useMemo(() => {
    return [
      { id: "all", label: "All projects" },
      ...techNames.map((tech) => ({ id: tech, label: tech })),
    ];
  }, [techNames]);

  const { projects, loading, error, refetch } = useProjects();

  const handleSelectCategory = (id) => {
    setActiveCategory((prev) => (prev === id && id !== "all" ? "all" : id));
    setVisibleCount(PAGE_SIZE);
  };

  const handleSearch = (val) => {
    setSearchQuery(val);
    setVisibleCount(PAGE_SIZE);
  };

  const filteredProjects = useMemo(() => {
    let list = allProjects;
    if (activeCategory !== "all") {
      list = list.filter((p) => p.tags.includes(activeCategory));
    }
    const q = searchQuery.trim().toLowerCase();
    if (q) {
      list = list.filter((p) => {
        const inTitle = p.title?.toLowerCase().includes(q);
        const inSummary = p.description?.toLowerCase().includes(q);
        const inTech = p.tags?.some((tech) => tech.toLowerCase().includes(q));
        return inTitle || inSummary || inTech;
      });
    }
    return list;
  }, [allProjects, activeCategory, searchQuery]);

  if (isMobile) return <ProjectsListScreen />;

  const sectionTitle =
    activeCategory === "all" ? "All Projects" : `${activeCategory} Projects`;

  return (
    <ScreenUtilScaler
      designWidth={DESIGN_WIDTH}
      desktopMin={ULTRA_WIDE_MIN}
      allowUpscale
    >
      <Box sx={{ width: "100%", bgcolor: t.surface.page }}>
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
            <BrowseHero
              {...HERO}
              searchValue={searchQuery}
              onSearch={handleSearch}
            />
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
                categories={sidebarCategories}
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
              {loading && (
                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: {
                      xs: "1fr",
                      sm: "repeat(2, minmax(0, 1fr))",
                    },
                    gap: t.layout.cardGap,
                  }}
                >
                  {[1, 2, 3, 4, 5, 6].map((n) => (
                    <Skeleton
                      key={n}
                      variant="rounded"
                      height={200}
                      sx={{ borderRadius: t.radius.md }}
                    />
                  ))}
                </Box>
              )}

              {!loading && error && (
                <Box sx={{ py: 4, textAlign: "center" }}>
                  <Typography sx={{ color: "#d32f2f", mb: 2 }}>
                    Failed to load projects: {error.message || "Unknown error"}
                  </Typography>
                  <Button
                    variant="outlined"
                    onClick={refetch}
                    sx={{
                      borderRadius: "999px",
                      textTransform: "none",
                      color: t.colors.primary[500],
                      borderColor: t.colors.primary[500],
                    }}
                  >
                    Retry
                  </Button>
                </Box>
              )}

              {!loading && !error && allProjects.length === 0 && (
                <Typography
                  sx={{
                    fontFamily,
                    fontSize: t.typography.paragraph2.fontSize,
                    color: t.text.muted,
                    py: 4,
                    textAlign: "center",
                  }}
                >
                  No projects yet. Be the first to share yours.
                </Typography>
              )}

              {!loading &&
                !error &&
                allProjects.length > 0 &&
                filteredProjects.length === 0 && (
                  <Typography
                    sx={{
                      fontFamily,
                      fontSize: t.typography.paragraph2.fontSize,
                      color: t.text.muted,
                      py: 4,
                      textAlign: "center",
                    }}
                  >
                    No projects match your search
                  </Typography>
                )}

              {!loading && !error && filteredProjects.length > 0 && (
                <>
                  <ProjectSection
                    title={sectionTitle}
                    projects={filteredProjects.slice(0, visibleCount)}
                  />

                  {visibleCount < filteredProjects.length && (
                    <ShowMoreButton
                      onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
                    />
                  )}
                </>
              )}
            </Box>
          </Box>

          <Box sx={{ mt: { xs: t.spacing.xxxl, md: t.spacing.massive } }}>
            <ShowcaseCTA {...SHOWCASE_CTA} />
          </Box>

          <Divider sx={{ my: t.spacing.xxxl, borderColor: t.border.subtle }} />
          <FooterComponent />
        </Box>
      </Box>
    </ScreenUtilScaler>
  );
}
