"use client";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CodeIcon from "@mui/icons-material/Code";
import SectionHeader from "@/components/communityScreen/SectionHeader";
import { activities } from "@/data/exploreScreenData";
import { colors } from "@/theme/colors";

const fontFamily =
  'var(--font-product-sans), "Product Sans", sans-serif';

const ActivityTile = ({ activity }) => (
  <Box
    component="a"
    href={activity.href}
    sx={{
      boxSizing: "border-box",
      p: "16px",
      borderRadius: "16px",
      backgroundColor: colors.primary[50],
      textDecoration: "none",
      color: "inherit",
    }}
  >
    <Box
      sx={{
        width: "48px",
        height: "48px",
        borderRadius: "50%",
        border: `1px solid ${colors.primary[500]}`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: colors.primary[500],
      }}
    >
      <CodeIcon sx={{ fontSize: 22 }} />
    </Box>
    <Typography
      sx={{
        mt: "20px",
        fontFamily,
        fontSize: "16px",
        fontWeight: 500,
        lineHeight: "24px",
        color: colors.neutral[950],
      }}
    >
      {activity.title}
    </Typography>
    <Typography
      sx={{
        mt: "6px",
        fontFamily,
        fontSize: "14px",
        lineHeight: "20px",
        color: colors.neutral[500],
      }}
    >
      {activity.description}
    </Typography>
  </Box>
);

const ActivitiesSection = ({ onViewAll }) => (
  <Box sx={{ display: "flex", flexDirection: "column", gap: "14px" }}>
    <SectionHeader
      title="Participation & activities"
      actionLabel="View all"
      onAction={onViewAll}
    />
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
        columnGap: "10px",
        rowGap: "12px",
      }}
    >
      {activities.map((activity) => (
        <ActivityTile key={activity.id} activity={activity} />
      ))}
    </Box>
  </Box>
);

export default ActivitiesSection;