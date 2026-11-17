"use client";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Skeleton from "@mui/material/Skeleton";
import Button from "@mui/material/Button";
import SectionHeader from "@/components/communityScreen/SectionHeader";
import { colors } from "@/theme/colors";
import { useExploreStories } from "@/hooks/useExploreStories";
import { readTime } from "@/lib/exploreFormat";

const fontFamily =
  'var(--font-product-sans), "Product Sans", sans-serif';

const hideScrollbar = {
  scrollbarWidth: "none",
  "&::-webkit-scrollbar": { display: "none" },
};

const DEFAULT_STORY_IMAGE = "/assets/explore-page-assets/stories.svg";

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
      src={blog.image || DEFAULT_STORY_IMAGE}
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
        overflow: "hidden",
        textOverflow: "ellipsis",
        display: "-webkit-box",
        WebkitLineClamp: 2,
        WebkitBoxOrient: "vertical",
        minHeight: "56px",
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
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
      }}
    >
      By {blog.author}
    </Typography>
  </Box>
);

const BlogSkeletonCard = () => (
  <Box
    sx={{
      flex: "0 0 202px",
      boxSizing: "border-box",
      p: "12px",
      border: `1px solid ${colors.neutral[100]}`,
      borderRadius: "20px",
      backgroundColor: "#FFFFFF",
    }}
  >
    <Skeleton
      variant="rounded"
      width="100%"
      height={100}
      sx={{ borderRadius: "12px" }}
    />
    <Skeleton variant="text" width="85%" height={28} sx={{ mt: "12px" }} />
    <Skeleton variant="text" width="60%" height={28} />
    <Skeleton variant="text" width="40%" height={20} sx={{ mt: "6px" }} />
    <Skeleton variant="text" width="50%" height={24} sx={{ mt: "8px" }} />
  </Box>
);

const BlogsSection = ({ onViewAll }) => {
  const { data: stories, loading, error, refetch } = useExploreStories(4);

  const blogs = (stories || []).map((s) => ({
    id: s.id,
    title: s.title,
    readTime: readTime(s.content),
    author: s.author,
    image: s.image || DEFAULT_STORY_IMAGE,
    href: "/blogs",
  }));

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "14px" }}>
      <SectionHeader
        title="Blogs & Articles"
        actionLabel="View all"
        onAction={onViewAll}
      />

      <Box
        sx={{
          mr: "-24px",
          display: "flex",
          flexDirection: "column",
          gap: "13px",
        }}
      >
        {/* Filter chips hidden per Phase 2 instructions: tag_mappings is empty in DB */}
        {loading ? (
          <Box
            sx={{
              display: "flex",
              gap: "12px",
              overflowX: "auto",
              ...hideScrollbar,
            }}
          >
            <BlogSkeletonCard />
            <BlogSkeletonCard />
            <BlogSkeletonCard />
            <Box sx={{ flex: "0 0 12px" }} />
          </Box>
        ) : error ? (
          <Box sx={{ py: 2, display: "flex", alignItems: "center", gap: 1 }}>
            <Typography
              sx={{
                fontFamily,
                fontSize: "14px",
                color: colors.neutral[600],
              }}
            >
              Unable to load stories.
            </Typography>
            <Button
              size="small"
              onClick={refetch}
              sx={{ textTransform: "none" }}
            >
              Retry
            </Button>
          </Box>
        ) : blogs.length === 0 ? (
          <Typography
            sx={{
              fontFamily,
              fontSize: "14px",
              color: colors.neutral[600],
              py: 2,
            }}
          >
            No stories published yet.
          </Typography>
        ) : (
          <Box
            sx={{
              display: "flex",
              gap: "12px",
              overflowX: "auto",
              ...hideScrollbar,
            }}
          >
            {blogs.map((blog) => (
              <BlogCard key={blog.id} blog={blog} />
            ))}
            <Box sx={{ flex: "0 0 12px" }} />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default BlogsSection;
