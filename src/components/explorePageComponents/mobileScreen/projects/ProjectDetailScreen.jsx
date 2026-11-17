"use client";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Skeleton from "@mui/material/Skeleton";
import Button from "@mui/material/Button";
import GitHubIcon from "@mui/icons-material/GitHub";
import InsertLinkIcon from "@mui/icons-material/InsertLink";
import LanguageIcon from "@mui/icons-material/Language";
import { useRouter } from "next/navigation";
import MobileScreenShell from "@/components/FormComponents/MobileScreenShell";
import CtaCard from "@/components/FormComponents/CtaCard";
import { CircleLink } from "./ProjectCard";
import Tag from "../Tag";
import { colors } from "@/theme/colors";
import {
  uploadCtaContent,
  uploadProjectRoute,
} from "@/data/exploreScreenData";
import { useProjectDetail } from "@/hooks/useProjectDetail";

const fontFamily = 'var(--font-product-sans), "Product Sans", sans-serif';

const Heading = ({ children, mt }) => (
  <Typography
    sx={{
      mt,
      fontFamily,
      fontSize: "16px",
      lineHeight: "24px",
      color: colors.neutral[950],
    }}
  >
    {children}
  </Typography>
);

const Body = ({ children }) => (
  <Typography
    sx={{
      mt: "8px",
      fontFamily,
      fontSize: "16px",
      lineHeight: "24px",
      color: colors.neutral[500],
    }}
  >
    {children}
  </Typography>
);

/**
 * ProjectDetailScreen — Mobile project details
 * (route: /explore/browse-projects/[id])
 */
const ProjectDetailScreen = ({ projectId }) => {
  const router = useRouter();
  const { data: project, loading, error } = useProjectDetail(projectId);

  if (loading) {
    return (
      <MobileScreenShell title="Projects" contentSx={{ pt: "26px" }}>
        <Skeleton variant="rounded" height={36} width="80%" />
        <Skeleton variant="text" height={24} width="100%" sx={{ mt: 1.5 }} />
        <Box sx={{ mt: 2, display: "flex", gap: 1 }}>
          <Skeleton variant="rounded" height={32} width={70} sx={{ borderRadius: "999px" }} />
          <Skeleton variant="rounded" height={32} width={70} sx={{ borderRadius: "999px" }} />
        </Box>
        <Skeleton variant="rounded" height={100} sx={{ mt: 3 }} />
      </MobileScreenShell>
    );
  }

  if (error || !project) {
    return (
      <MobileScreenShell title="Projects" contentSx={{ pt: "26px" }}>
        <Box sx={{ py: 6, textAlign: "center" }}>
          <Typography
            sx={{
              fontFamily,
              fontSize: "20px",
              fontWeight: 600,
              color: colors.neutral[950],
              mb: 1,
            }}
          >
            Project not found
          </Typography>
          <Typography
            sx={{
              fontFamily,
              fontSize: "14px",
              color: colors.neutral[500],
              mb: 3,
            }}
          >
            The project you are looking for does not exist or has been removed.
          </Typography>
          <Button
            variant="outlined"
            onClick={() => router.back()}
            sx={{
              borderRadius: "999px",
              color: colors.primary[500],
              borderColor: colors.primary[500],
              textTransform: "none",
              px: 3,
            }}
          >
            Go back
          </Button>
        </Box>
      </MobileScreenShell>
    );
  }

  return (
    <MobileScreenShell title="Projects" contentSx={{ pt: "26px" }}>
      <Typography
        sx={{
          fontFamily,
          fontSize: "24px",
          lineHeight: "32px",
          color: colors.neutral[950],
        }}
      >
        {project.title}
      </Typography>
      <Typography
        sx={{
          mt: "12px",
          fontFamily,
          fontSize: "16px",
          lineHeight: "24px",
          color: colors.neutral[500],
        }}
      >
        {project.summary}
      </Typography>

      {project.tags && project.tags.length > 0 && (
        <Box sx={{ mt: "10px", display: "flex", flexWrap: "wrap", gap: "8px" }}>
          {project.tags.map((tag) => (
            <Tag
              key={tag}
              label={tag}
              sx={{
                height: "34px",
                fontSize: "16px",
                backgroundColor: "#FFFFFF",
                border: `1px solid ${colors.neutral[200]}`,
              }}
            />
          ))}
        </Box>
      )}

      <Typography
        sx={{
          mt: "12px",
          fontFamily,
          fontSize: "16px",
          lineHeight: "24px",
          color: colors.neutral[500],
        }}
      >
        Project by{" "}
        <Box component="span" sx={{ color: colors.primary[500] }}>
          {project.author}
        </Box>
      </Typography>

      <Box sx={{ mt: "16px", borderTop: "1px dashed #D1D1D1" }} />

      <Heading mt="26px">About the project</Heading>
      <Body>{project.about}</Body>

      {(project.links.github || project.links.link || project.links.website) && (
        <>
          <Heading mt="48px">Project links</Heading>
          <Box sx={{ mt: "6px", display: "flex", gap: "5px" }}>
            {project.links.github && (
              <CircleLink size={36} href={project.links.github} label="GitHub">
                <GitHubIcon sx={{ fontSize: 20 }} />
              </CircleLink>
            )}
            {project.links.link && (
              <CircleLink size={36} href={project.links.link} label="Project link">
                <InsertLinkIcon sx={{ fontSize: 20 }} />
              </CircleLink>
            )}
            {project.links.website && (
              <CircleLink size={36} href={project.links.website} label="Website">
                <LanguageIcon sx={{ fontSize: 20 }} />
              </CircleLink>
            )}
          </Box>
        </>
      )}

      {project.screenshots && project.screenshots.length > 0 && (
        <>
          <Heading mt="24px">Screenshots</Heading>
          <Box
            sx={{
              mt: "10px",
              mr: "-24px",
              display: "flex",
              gap: "10px",
              overflowX: "auto",
              scrollbarWidth: "none",
              "&::-webkit-scrollbar": { display: "none" },
            }}
          >
            {project.screenshots.map((src, i) => (
              <Box
                key={src}
                sx={{
                  flex: "0 0 224px",
                  height: "140px",
                  boxSizing: "border-box",
                  border: "1px solid #D5D5D5",
                  borderRadius: "16px",
                  overflow: "hidden",
                  backgroundColor: colors.neutral[50],
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={src}
                  alt={`${project.title} screenshot ${i + 1}`}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                  }}
                />
              </Box>
            ))}
            <Box sx={{ flex: "0 0 14px" }} />
          </Box>
        </>
      )}

      <Typography
        sx={{
          mt: "23px",
          textAlign: "center",
          fontFamily,
          fontSize: "14px",
          lineHeight: "20px",
          color: colors.neutral[500],
        }}
      >
        Shared on {project.sharedOn}
      </Typography>

      <Box sx={{ mt: "25px" }}>
        <CtaCard
          {...uploadCtaContent.detail}
          onClick={() => router.push(uploadProjectRoute)}
          sx={{ mx: "13px" }}
        />
      </Box>
    </MobileScreenShell>
  );
};

export default ProjectDetailScreen;
