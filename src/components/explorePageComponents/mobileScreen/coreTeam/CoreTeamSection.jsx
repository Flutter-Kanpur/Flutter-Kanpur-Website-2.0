"use client";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Skeleton from "@mui/material/Skeleton";
import SectionHeader from "@/components/communityScreen/SectionHeader";
import { colors } from "@/theme/colors";
import { useCoreTeam } from "@/hooks/useCoreTeam";

const fontFamily =
  'var(--font-product-sans), "Product Sans", sans-serif';

const DEFAULT_AVATAR = "/assets/explore-page-assets/avatar.svg";

const CoreTeamSection = ({ onViewAll }) => {
  const { data: teamMembers, loading, error } = useCoreTeam();

  const members = teamMembers || [];

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "14px" }}>
      <SectionHeader title="Core team" actionLabel="View all" onAction={onViewAll} />

      <Box
        sx={{
          mr: "-24px",
          display: "flex",
          gap: "8px",
          overflowX: "auto",
          scrollbarWidth: "none",
          "&::-webkit-scrollbar": { display: "none" },
        }}
      >
        {loading ? (
          [1, 2, 3, 4].map((i) => (
            <Box
              key={i}
              sx={{
                flex: "0 0 64px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <Skeleton variant="circular" width={64} height={64} />
              <Skeleton variant="text" width={48} height={16} />
            </Box>
          ))
        ) : error ? (
          <Typography sx={{ fontFamily, fontSize: "14px", color: colors.neutral[600], py: 1 }}>
            Unable to load core team members.
          </Typography>
        ) : members.length === 0 ? (
          <Typography sx={{ fontFamily, fontSize: "14px", color: colors.neutral[600], py: 1 }}>
            Core team members will appear here.
          </Typography>
        ) : (
          members.map((member) => (
            <Box
              key={member.id}
              sx={{
                flex: "0 0 64px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <Box
                component="img"
                src={member.avatar || DEFAULT_AVATAR}
                alt={member.name}
                sx={{
                  width: "64px",
                  height: "64px",
                  borderRadius: "50%",
                  objectFit: "cover",
                  backgroundColor: colors.neutral[50],
                }}
              />
              <Typography
                sx={{
                  fontFamily,
                  fontSize: "14px",
                  lineHeight: "20px",
                  color: "#1F1F1F",
                  textAlign: "center",
                  maxWidth: "64px",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {member.name}
              </Typography>
            </Box>
          ))
        )}
        <Box sx={{ flex: "0 0 16px" }} />
      </Box>
    </Box>
  );
};

export default CoreTeamSection;
