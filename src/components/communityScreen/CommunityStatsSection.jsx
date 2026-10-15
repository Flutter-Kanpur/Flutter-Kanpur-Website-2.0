"use client";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import EastRoundedIcon from "@mui/icons-material/EastRounded";
import SectionHeader from "./SectionHeader";
import { communityStats } from "@/data/communityScreenData";

const CommunityStatsSection = ({ onJoinDiscord = () => {} }) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "14px" }}>
      <SectionHeader title="Community Stats" />

      <Box
        sx={{
          bgcolor: "#EFF3FF",
          borderRadius: "20px",
          p: "20px 12px",
          display: "flex",
          alignItems: "center",
        }}
      >
        {communityStats.map((stat, index) => (
          <Box
            key={stat.id}
            sx={{
              flex: 1,
              textAlign: "center",
              borderLeft: index === 0 ? "none" : "1px solid rgba(65,103,242,0.15)",
              px: "4px",
            }}
          >
            <Typography
              sx={{
                fontFamily: 'var(--font-product-sans), "Product Sans", sans-serif',
                fontSize: "24px",
                fontWeight: 700,
                color: "#000000",
                lineHeight: "32px",
              }}
            >
              {stat.value}
            </Typography>
            <Typography
              sx={{
                fontFamily: 'var(--font-product-sans), "Product Sans", sans-serif',
                fontSize: "14px",
                fontWeight: 400,
                color: "#6D6D6D",
                lineHeight: "20px",
              }}
            >
              {stat.label}
            </Typography>
          </Box>
        ))}
      </Box>

      <Button
        onClick={onJoinDiscord}
        endIcon={<EastRoundedIcon sx={{ fontSize: 18 }} />}
        sx={{
          width: "100%",
          bgcolor: "#0A0A0A",
          color: "#FFFFFF",
          borderRadius: "999px",
          py: "14px",
          fontSize: "15px",
          fontWeight: 600,
          textTransform: "none",
          fontFamily: 'var(--font-product-sans), "Product Sans", sans-serif',
          "&:hover": { bgcolor: "#1A1A1A" },
        }}
      >
        Join us on discord
      </Button>
    </Box>
  );
};

export default CommunityStatsSection;
