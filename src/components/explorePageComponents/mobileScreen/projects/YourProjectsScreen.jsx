"use client";

import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Skeleton from "@mui/material/Skeleton";
import { useRouter } from "next/navigation";
import MobileScreenShell from "@/components/FormComponents/MobileScreenShell";
import RevampButton from "@/components/buttons/revampbutton/RevampButton";
import { colors } from "@/theme/colors";
import EmptyState from "@/components/FormComponents/EmptyState";
import ProjectCard from "./ProjectCard";
import { uploadProjectRoute } from "@/data/exploreScreenData";
import { supabase } from "@/lib/supabase/client";
import { fetchUserCards } from "@/lib/fetchUserCards";
import { formatDate } from "@/lib/exploreFormat";

const fontFamily = 'var(--font-product-sans), "Product Sans", sans-serif';

// Tab order from the mobile design (value null → show everything).
const TABS = [
  { label: "All", value: null },
  { label: "Published", value: "published" },
  { label: "Rejected", value: "rejected" },
  { label: "Needs changes", value: "needs_changes" },
  { label: "In review", value: "in_review" },
];

// Flat pill style for the status tabs (built on RevampButton).
const tabSx = (isActive) => ({
  flexShrink: 0,
  height: "36px",
  px: "20px",
  py: 0,
  fontSize: "16px",
  fontWeight: isActive ? 500 : 400,
  whiteSpace: "nowrap",
  border: `1px solid ${isActive ? colors.primary[500] : colors.neutral[200]}`,
  color: isActive ? "#FFFFFF" : colors.neutral[950],
  backgroundImage: "none",
  boxShadow: "none",
  "&:hover": {
    backgroundImage: "none",
    backgroundColor: isActive ? colors.primary[500] : "#FFFFFF",
    boxShadow: "none",
    transform: "none",
  },
});

/**
 * YourProjectsScreen — Mobile "Your projects" (route: /explore/projects,
 * profile tab).
 */
const YourProjectsScreen = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(() => Boolean(supabase));
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    let isCancelled = false;

    if (!supabase) {
      return;
    }

    const loadUserAndProjects = async () => {
      try {
        const {
          data: { user: authUser },
        } = await supabase.auth.getUser();

        if (isCancelled) return;

        if (!authUser) {
          setUser(null);
          setProjects([]);
          setLoading(false);
          return;
        }

        setUser(authUser);

        const { data: rows, error: rowsError } = await supabase
          .from("projects")
          .select(
            "id, slug, title, summary, description, status, owner_uid, github_url, figma_url, live_url, is_deleted, created_at, cover_image_url"
          )
          .eq("owner_uid", authUser.id)
          .eq("is_deleted", false)
          .order("created_at", { ascending: false });

        if (isCancelled) return;

        if (rowsError) {
          console.error("Error loading user projects:", rowsError);
          setProjects([]);
          setLoading(false);
          return;
        }

        if (!rows || rows.length === 0) {
          setProjects([]);
          setLoading(false);
          return;
        }

        const projectIds = rows.map((p) => p.id);
        const [techRes, userMap] = await Promise.all([
          supabase
            .from("project_tech_stack")
            .select("project_id, tech_name")
            .in("project_id", projectIds),
          fetchUserCards(supabase, [authUser.id]),
        ]);

        if (isCancelled) return;

        const tagsMap = new Map();
        if (techRes.data) {
          for (const item of techRes.data) {
            if (!tagsMap.has(item.project_id)) {
              tagsMap.set(item.project_id, []);
            }
            if (item.tech_name) {
              tagsMap.get(item.project_id).push(item.tech_name);
            }
          }
        }

        const authorName = userMap.get(authUser.id)?.name || "You";

        const mapped = rows.map((p) => ({
          id: p.id,
          name: p.title,
          techStack: tagsMap.get(p.id) || [],
          author: authorName,
          submittedOn: formatDate(p.created_at),
          status: p.status,
          links: {
            github: p.github_url,
            live: p.live_url,
            website: p.figma_url,
          },
        }));

        setProjects(mapped);
      } catch (err) {
        if (!isCancelled) {
          console.error("Failed to load your projects:", err);
          setProjects([]);
        }
      } finally {
        if (!isCancelled) {
          setLoading(false);
        }
      }
    };

    loadUserAndProjects();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(() => {
      if (!isCancelled) {
        setLoading(true);
        loadUserAndProjects();
      }
    });

    return () => {
      isCancelled = true;
      subscription?.unsubscribe();
    };
  }, []);

  const visible = projects.filter(
    (project) => activeTab === null || project.status === activeTab
  );

  return (
    <MobileScreenShell title="Your projects" contentSx={{ px: 0 }}>
      <Box
        sx={{
          pl: "20px",
          display: "flex",
          gap: "7px",
          overflowX: "auto",
          scrollbarWidth: "none",
          "&::-webkit-scrollbar": { display: "none" },
        }}
      >
        {TABS.map((tab) => {
          const isActive = tab.value === activeTab;
          return (
            <RevampButton
              key={tab.label}
              text={tab.label}
              width="auto"
              bgColor={isActive ? colors.primary[500] : "#FFFFFF"}
              onClick={() => setActiveTab(tab.value)}
              sx={tabSx(isActive)}
            />
          );
        })}
        <Box sx={{ flex: "0 0 13px" }} />
      </Box>

      <Box
        sx={{
          mt: "33px",
          px: "24px",
          display: "flex",
          flexDirection: "column",
          gap: "24px",
        }}
      >
        {loading && (
          <Box sx={{ display: "flex", flexDirection: "column", gap: "17px" }}>
            <Skeleton variant="rounded" height={160} sx={{ borderRadius: "16px" }} />
            <Skeleton variant="rounded" height={160} sx={{ borderRadius: "16px" }} />
          </Box>
        )}

        {!loading && !user && (
          <Box sx={{ py: 6, textAlign: "center" }}>
            <Typography
              sx={{
                fontFamily,
                fontSize: "18px",
                fontWeight: 600,
                color: colors.neutral[950],
                mb: 1,
              }}
            >
              Sign in to see your projects
            </Typography>
            <Typography
              sx={{
                fontFamily,
                fontSize: "14px",
                color: colors.neutral[500],
                mb: 3,
              }}
            >
              Log in to view and manage your submitted projects.
            </Typography>
            <RevampButton
              text="Sign in"
              onClick={() => router.push("/auth/login")}
              width="auto"
              sx={{ px: 4, height: "40px", mx: "auto" }}
            />
          </Box>
        )}

        {!loading && user && visible.length === 0 && (
          <EmptyState
            title="No projects found"
            description="Projects you submit will appear here."
            buttonLabel="Upload your project"
            mt="60px"
            onAction={() => router.push(uploadProjectRoute)}
          />
        )}

        {!loading &&
          user &&
          visible.length > 0 &&
          visible.map((project) => {
            const needsFeedback =
              project.status === "rejected" || project.status === "needs_changes";
            return (
              <ProjectCard
                key={project.id}
                title={project.name}
                tags={project.techStack}
                author={project.author}
                date={project.submittedOn}
                dateLabel="submitted on"
                status={project.status}
                actionLabel={needsFeedback ? "View feedback" : "View project details"}
                links={{
                  github: project.links?.github,
                  link: project.links?.live,
                  website: project.links?.website,
                }}
                onAction={
                  needsFeedback
                    ? undefined
                    : () => router.push(`/explore/browse-projects/${project.id}`)
                }
              />
            );
          })}
      </Box>
    </MobileScreenShell>
  );
};

export default YourProjectsScreen;
