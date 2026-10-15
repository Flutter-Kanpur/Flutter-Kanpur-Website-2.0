"use client";

import { useRouter } from "next/navigation";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import SectionHeader from "./SectionHeader";
import { contributeItems } from "@/data/communityScreenData";

const cardSx = {
  borderRadius: "18px",
  bgcolor: "#FFFFFF",
  border: "1px solid rgba(0,0,0,0.05)",
  boxShadow: "0 2px 16px rgba(0,0,0,0.05), 0 1px 4px rgba(0,0,0,0.03)",
  p: "16px",
  display: "flex",
  flexDirection: "column",
  gap: "10px",
  boxSizing: "border-box",
};

const Badge = ({ label }) => (
  <Box
    sx={{
      alignSelf: "flex-start",
      bgcolor: "#4167F2",
      color: "#FFFFFF",
      borderRadius: "999px",
      px: "14px",
      py: "6px",
      fontSize: "14px",
      lineHeight:"20px",
      fontWeight: 600,
      fontFamily: 'var(--font-product-sans), "Product Sans", sans-serif',
    }}
  >
    {label}
  </Box>
);

const ContributeSection = () => {
  const router = useRouter();
  const leftItem = contributeItems.find((item) => item.column === "left");
  const rightItems = contributeItems.filter((item) => item.column === "right");

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "14px" }}>
      <SectionHeader title="Contribute" />

      <Box sx={{ display: "flex", gap: "12px", alignItems: "stretch" }}>
        {/* Left: single taller card */}
        {leftItem && (
          <Box sx={{ flex: 1, display: "flex" }}>
            {/* "Upload Your Projects" opens the project showcase flow */}
            <Box
              role="button"
              tabIndex={0}
              onClick={() => router.push("/community/project")}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  router.push("/community/project");
                }
              }}
              sx={{
                ...cardSx,
                flex: 1,
                justifyContent: "flex-start",
                cursor: "pointer",
              }}
            >
              <Badge label={leftItem.badge} />
              {leftItem.title && (
                <Typography
                  sx={{
                    fontFamily:
                      'var(--font-product-sans), "Product Sans", sans-serif',
                    fontSize: "16px",
                    fontWeight: 700,
                    color: "#000000",
                    lineHeight: 1.3,
                  }}
                >
                  {leftItem.title}
                </Typography>
              )}
              {leftItem.description && (
                <Typography
                  sx={{
                    fontFamily:
                      'var(--font-product-sans), "Product Sans", sans-serif',
                    fontSize: "14px",
                    fontWeight: 400,
                    color: "#6D6D6D",
                    lineHeight: "20px",
                  }}
                >
                  {leftItem.description}
                </Typography>
              )}
            </Box>
          </Box>
        )}

        {/* Right: two stacked cards */}
        <Box sx={{ flex: 1, display: "flex", flexDirection: "column", gap: "12px" }}>
          {rightItems.map((item) => (
            <Box key={item.id} sx={cardSx}>
              <Badge label={item.badge} />
              {item.description && (
                <Typography
                  sx={{
                    fontFamily:
                      'var(--font-product-sans), "Product Sans", sans-serif',
                    fontSize: "14px",
                    fontWeight: 400,
                    color: "#000",
                    lineHeight: "20px",
                  }}
                >
                  {item.description}
                </Typography>
              )}
              {item.title && (
                <Typography
                  sx={{
                    fontFamily:
                      'var(--font-product-sans), "Product Sans", sans-serif',
                    fontSize: "14px",
                    fontWeight: 400,
                    color: "#000",
                    lineHeight: "20px",
                  }}
                >
                  {item.title}
                </Typography>
              )}
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default ContributeSection;
