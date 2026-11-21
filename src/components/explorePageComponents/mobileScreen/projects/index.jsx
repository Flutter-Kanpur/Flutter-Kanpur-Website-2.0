"use client";

import { useMemo, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Skeleton from "@mui/material/Skeleton";
import { useRouter } from "next/navigation";
import MobileScreenShell from "@/components/FormComponents/MobileScreenShell";
import SearchInput from "@/components/FormComponents/SearchInput";
import FilterChipRow from "@/components/FormComponents/FilterChipRow";
import EmptyState from "@/components/FormComponents/EmptyState";
import CtaCard from "@/components/FormComponents/CtaCard";
import LoadMoreButton from "@/components/FormComponents/LoadMoreButton";
import ProjectCard from "./ProjectCard";
import { colors } from "@/theme/colors";
import {
  projectFilterChips,
  projectEmptyContent,
  uploadCtaContent,
  uploadProjectRoute,
} from "@/data/exploreScreenData";
import { useProjects } from "@/hooks/useProjects";

const fontFamily = 'var(--font-product-sans), "Product Sans", sans-serif';
const PAGE_SIZE = 4;

const Bar = ({ h, w = "100%", r = "8px", mt = 0 }) => (
  <Skeleton
    variant="rounded"
    height={h}
    width={w}
    sx={{ mt, borderRadius: r, bgcolor: colors.primary[100] }}
  />
);

const ProjectSkeleton = () => (
  <Box
    aria-hidden
    sx={{
      p: "16px 15px 17px",
      borderRadius: "20px",
      backgroundColor: colors.primary[50],
    }}
  >
    <Bar h={36} />
    <Box sx={{ mt: "10px", display: "flex", gap: "4px" }}>
      <Bar h={32} w={82} r="999px" />
      <Bar h={32} w={82} r="999px" />
      <Bar h={32} w={58} r="999px" />
    </Box>
    <Bar h={56} mt="10px" />
    <Bar h={36} mt="11px" />
  </Box>
);

/**
 * ProjectsListScreen — Mobile "Projects" (route: /explore/browse-projects)
 */
const ProjectsListScreen = () => {
  const router = useRouter();
  const { projects, loading, error, refetch } = useProjects();
  const [query, setQuery] = useState("");
  const [activeChip, setActiveChip] = useState(null);
  const [visible, setVisible] = useState(PAGE_SIZE);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    const chip = activeChip ? activeChip.toLowerCase() : null;
    return projects.filter((project) => {
      const matchesChip =
        !chip ||
        (project.category && project.category.toLowerCase().includes(chip)) ||
        (Array.isArray(project.categories) &&
          project.categories.some((c) => c && c.toLowerCase().includes(chip))) ||
        (Array.isArray(project.tags) &&
          project.tags.some((tag) => tag && tag.toLowerCase().includes(chip)));
      const matchesQuery =
        !q ||
        (project.title && project.title.toLowerCase().includes(q)) ||
        (project.author && project.author.toLowerCase().includes(q)) ||
        (Array.isArray(project.tags) &&
          project.tags.some((tag) => tag && tag.toLowerCase().includes(q))) ||
        (project.description && project.description.toLowerCase().includes(q));
      return matchesChip && matchesQuery;
    });
  }, [projects, query, activeChip]);

  const goUpload = () => router.push(uploadProjectRoute);
  const handleQueryChange = (val) => {
    setQuery(val);
    setVisible(PAGE_SIZE);
  };
  const toggleChip = (chip) => {
    setActiveChip((prev) => (prev === chip ? null : chip));
    setVisible(PAGE_SIZE);
  };
  const trimmed = query.trim();

  const renderBody = () => {
    if (loading) {
      return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: "17px" }}>
          <ProjectSkeleton />
          <ProjectSkeleton />
        </Box>
      );
    }

    if (error) {
      return (
        <Box sx={{ textAlign: "center", py: 4 }}>
          <Typography sx={{ fontFamily, color: "error.main", mb: 2 }}>
            Unable to load projects right now.
          </Typography>
          <Button variant="outlined" onClick={refetch}>
            Retry
          </Button>
        </Box>
      );
    }

    if (projects.length === 0) {
      return (
        <EmptyState
          title="No projects yet"
          description="No projects yet. Be the first to share yours."
          buttonLabel="Share project"
          onAction={goUpload}
        />
      );
    }

    if (results.length === 0) {
      return (
        <>
          {trimmed && (
            <Typography
              sx={{
                fontFamily,
                fontSize: "16px",
                lineHeight: "24px",
                color: colors.neutral[500],
              }}
            >
              Results for “{trimmed}”
            </Typography>
          )}
          <EmptyState
            {...projectEmptyContent.noResults}
            mt={trimmed ? "114px" : undefined}
            onAction={goUpload}
          />
        </>
      );
    }

    return (
      <Box sx={{ display: "flex", flexDirection: "column", gap: "17px" }}>
        {results.slice(0, visible).map((project) => (
          <ProjectCard
            key={project.id}
            title={project.title}
            tags={project.tags}
            author={project.author}
            date={project.date}
            liked={project.liked}
            links={project.links}
            onAction={() => router.push(`/explore/browse-projects/${project.id}`)}
          />
        ))}

        {visible < results.length && (
          <LoadMoreButton onClick={() => setVisible((v) => v + PAGE_SIZE)} />
        )}

        <CtaCard
          {...uploadCtaContent.list}
          onClick={goUpload}
          sx={{ mx: "13px" }}
        />
      </Box>
    );
  };

  return (
    <MobileScreenShell title="Projects">
      <SearchInput
        value={query}
        onChange={handleQueryChange}
        placeholder="Search for titles..."
      />

      <FilterChipRow
        chips={projectFilterChips}
        active={activeChip}
        onToggle={toggleChip}
        sx={{ mt: "15px", mr: "-24px" }}
      />

      <Box sx={{ mt: "20px" }}>{renderBody()}</Box>
    </MobileScreenShell>
  );
};

export default ProjectsListScreen;
