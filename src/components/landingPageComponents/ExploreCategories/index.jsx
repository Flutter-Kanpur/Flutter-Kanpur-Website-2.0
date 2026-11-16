import { Box, Typography } from "@mui/material";
import React from "react";
import ExploreCategoriesCard from "./Card";

const DEFAULT_TITLE = "Explore top categories";
const DEFAULT_CATEGORIES = [
  {
    title: "Blogs/Articles",
    linkText: "Open full story",
    linkHref: "#",
  },
  {
    title: "Top Projects",
    linkText: "Open full story",
    linkHref: "#",
  },
  {
    title: "Meet Team",
    linkText: "Open full story",
    linkHref: "#",
  },
];

const ExploreCategoriesSection = ({
  title = DEFAULT_TITLE,
  titleHighlight = "",
  categories = DEFAULT_CATEGORIES,
  variant = "default", 
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },

        justifyContent: "space-between",
        alignItems: variant === "explore" ? "flex-start" : "center",

        gap: { xs: 4, md: 3 },
      }}
    >
      {/* LEFT TITLE */}
      <Box
        sx={{
          flexShrink: 0,
          flex: variant === "explore" ? "0 0 40%" : { xs: "unset", md: "0 0 auto" },
          maxWidth: { xs: "100%", md: variant === "explore" ? "40%" : "360px" },
        }}
      >
        <Typography
          sx={{
            fontSize: { xs: 28, sm: 36, md: 42, lg: 48 },
            fontWeight: 600,
            color: "#000",
            lineHeight: 1.15,
            textAlign: { xs: "center", md: "left" },
          }}
        >
          {title}
          {titleHighlight && (
            <Box component="span" sx={{ color: "#3D6BFF" }}>
              {" "}
              {titleHighlight}
            </Box>
          )}
        </Typography>
      </Box>

      {/* RIGHT CARDS */}
      <Box
        sx={{
          width: "100%",
          minWidth: 0,
          flex: 1,
          display: "flex",
          flexDirection: "row",
          flexWrap: "nowrap",
          justifyContent: "flex-start",
          alignItems: "center",
          gap: "16px",
          overflowX: "auto",
          paddingBottom: "8px",
          "&::-webkit-scrollbar": {
            display: "none",
          },
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {categories.map((data, index) => (
          <ExploreCategoriesCard key={index} exploreData={data} />
        ))}
      </Box>
    </Box>
  );
};

export default ExploreCategoriesSection;