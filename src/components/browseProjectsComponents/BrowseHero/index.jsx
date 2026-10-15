"use client";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import SearchBar from "@/components/explorePageComponents/SearchBar";
import { t, fontFamily } from "../tokens";

const BrowseHero = ({ title, description, searchPlaceholder, onSearch }) => (
  <Box
    sx={{
      display: "flex",
      flexDirection: { xs: "column", md: "row" },
      alignItems: { xs: "stretch", md: "flex-start" },
      justifyContent: "space-between",
      gap: t.spacing.xl,
    }}
  >
    <Box sx={{ maxWidth: 560 }}>
      <Typography
        component="h1"
        sx={{
          fontFamily,
          fontSize: {
            xs: t.typography.display3.fontSize,
            md: t.typography.display2.fontSize,
          },
          fontWeight: t.typography.display2.fontWeight,
          lineHeight: 1.1,
          color: t.text.heading,
        }}
      >
        {title}
      </Typography>

      <Typography
        sx={{
          fontFamily,
          fontSize: t.typography.paragraph3.fontSize,
          fontWeight: t.typography.paragraph3.fontWeight,
          color: t.text.body,
          lineHeight: 1.7,
          mt: t.spacing.md,
        }}
      >
        {description}
      </Typography>
    </Box>

    <Box
      sx={{ width: { xs: "100%", md: 340 }, flexShrink: 0, mt: t.spacing.sm }}
    >
      <SearchBar
        placeholder={searchPlaceholder}
        onSubmit={onSearch}
        maxWidth="100%"
        ariaLabel="Search projects"
      />
    </Box>
  </Box>
);

export default BrowseHero;
