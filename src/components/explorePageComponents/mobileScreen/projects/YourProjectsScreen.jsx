"use client";

import { useState } from "react";
import Box from "@mui/material/Box";
import { useRouter } from "next/navigation";
import MobileScreenShell from "@/components/FormComponents/MobileScreenShell";
import RevampButton from "@/components/buttons/revampbutton/RevampButton";
import { colors } from "@/theme/colors";
import EmptyState from "@/components/FormComponents/EmptyState";
import ProjectCard from "./ProjectCard";
import { projectSubmissions } from "@/data/projectSubmissionsData";
import { uploadProjectRoute } from "@/data/exploreScreenData";

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

  const visible = projectSubmissions.filter(
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
        {visible.length === 0 ? (
          <EmptyState
            title="No projects found"
            description="Projects you submit will appear here."
            buttonLabel="Upload your project"
            mt="60px"
            onAction={() => router.push(uploadProjectRoute)}
          />
        ) : (
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
          })
        )}
      </Box>
    </MobileScreenShell>
  );
};

export default YourProjectsScreen;
