"use client";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import SectionHeader from "@/components/communityScreen/SectionHeader";
import { coreTeam } from "@/data/exploreScreenData";
import { colors } from "@/theme/colors";

const fontFamily =
  'var(--font-product-sans), "Product Sans", sans-serif';

const CoreTeamSection = ({ onViewAll }) => (
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
      {coreTeam.map((member) => (
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
            src={member.avatar}
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
            }}
          >
            {member.name}
          </Typography>
        </Box>
      ))}
      <Box sx={{ flex: "0 0 16px" }} />
    </Box>
  </Box>
);

export default CoreTeamSection;