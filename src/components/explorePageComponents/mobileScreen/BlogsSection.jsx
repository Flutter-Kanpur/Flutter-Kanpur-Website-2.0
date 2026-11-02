"use client";

import { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import FilterListIcon from "@mui/icons-material/FilterList";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import SectionHeader from "@/components/communityScreen/SectionHeader";
import Tag from "./Tag";
import { blogFilters, blogs } from "@/data/exploreScreenData";
import { colors } from "@/theme/colors";

const fontFamily =
  'var(--font-product-sans), "Product Sans", sans-serif';

const hideScrollbar = {
  scrollbarWidth: "none",
  "&::-webkit-scrollbar": { display: "none" },
};

const BlogCard = ({ blog }) => (
  <Box
    component="a"
    href={blog.href}
    sx={{
      flex: "0 0 202px",
      boxSizing: "border-box",
      p: "12px",
      border: `1px solid ${colors.neutral[100]}`,
      borderRadius: "20px",
      backgroundColor: "#FFFFFF",
      textDecoration: "none",
      color: "inherit",
    }}
  >
    <Box
      component="img"
      src={blog.image}
      alt={blog.title}
      sx={{
        display: "block",
        width: "100%",
        height: "100px",
        borderRadius: "12px",
        objectFit: "cover",
        backgroundColor: colors.neutral[50],
      }}
    />
    <Typography
      sx={{
        mt: "12px",
        fontFamily,
        fontSize: "18px",
        fontWeight: 400,
        lineHeight: "28px",
        color: colors.neutral[950],
      }}
    >
      {blog.title}
    </Typography>
    <Typography
      sx={{
        mt: "6px",
        pb: "10px",
        borderBottom: "1px dashed #D1D1D1",
        fontFamily,
        fontSize: "14px",
        lineHeight: "20px",
        color: colors.neutral[500],
      }}
    >
      {blog.readTime}
    </Typography>
    <Typography
      sx={{
        mt: "8px",
        fontFamily,
        fontSize: "16px",
        fontWeight: 400,
        lineHeight: "24px",
        color: colors.primary[500],
      }}
    >
      By {blog.author}
    </Typography>
  </Box>
);

const BlogsSection = ({ onViewAll }) => {
  const [activeFilter, setActiveFilter] = useState(null);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "14px" }}>
      <SectionHeader
        title="Blogs & Articles"
        actionLabel="View all"
        onAction={onViewAll}
      />

      <Box sx={{ mr: "-24px", display: "flex", flexDirection: "column", gap: "13px" }}>
        <Box sx={{ display: "flex", gap: "12px", overflowX: "auto", ...hideScrollbar }}>
          <Tag
            variant="filter"
            label="Filters"
            startIcon={<FilterListIcon sx={{ fontSize: 18 }} />}
            endIcon={<ArrowDropDownIcon sx={{ fontSize: 20, ml: "-4px" }} />}
            sx={{ fontWeight: 500, gap: "8px" }}
          />
          {blogFilters.map((label) => (
            <Tag
              key={label}
              variant="filter"
              label={label}
              onClick={() => setActiveFilter(activeFilter === label ? null : label)}
              sx={
                activeFilter === label
                  ? { borderColor: colors.primary[500], color: colors.primary[500] }
                  : undefined
              }
            />
          ))}
          <Box sx={{ flex: "0 0 12px" }} />
        </Box>

        <Box sx={{ display: "flex", gap: "12px", overflowX: "auto", ...hideScrollbar }}>
          {blogs.map((blog) => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
          <Box sx={{ flex: "0 0 12px" }} />
        </Box>
      </Box>
    </Box>
  );
};

export default BlogsSection;