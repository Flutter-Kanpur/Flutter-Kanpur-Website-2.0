"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Skeleton from "@mui/material/Skeleton";
import Typography from "@mui/material/Typography";

import {
  DiscussionThread,
  FilterBar,
  ForumHeader,
  NewDiscussionDialog,
  RelatedDiscussions,
  ResponsesSection,
  forumContent,
  newDiscussionForm,
  quickFilters,
} from "@/components/forumDiscussionsComponents";
import PrimaryButton from "@/components/buttons/PrimaryButton/PrimaryButton";
import { t, fontFamily } from "@/components/forumDiscussionsComponents/tokens";
import { useForumDiscussions } from "@/hooks/useForumDiscussions";
import ScreenUtilScaler from "@/components/layouts/ScreenUtilScaler";
import { ULTRA_WIDE_MIN } from "@/theme/breakpoints";

const DESIGN_WIDTH = t.layout.contentMax + 2 * 32;

function ForumDiscussionsSkeleton() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", lg: "row" },
        alignItems: "flex-start",
        gap: t.layout.columnGap,
        mt: t.spacing.xxl,
      }}
    >
      <Box sx={{ flex: 1, minWidth: 0, width: "100%" }}>
        <Skeleton variant="text" width="85%" height={48} />
        <Box sx={{ display: "flex", gap: 1.5, mt: 2 }}>
          <Skeleton
            variant="rounded"
            width={90}
            height={28}
            sx={{ borderRadius: t.radius.xs }}
          />
          <Skeleton
            variant="rounded"
            width={120}
            height={28}
            sx={{ borderRadius: t.radius.xs }}
          />
        </Box>
        <Box sx={{ mt: 3, pt: 2 }}>
          <Skeleton variant="text" width="100%" height={22} />
          <Skeleton variant="text" width="95%" height={22} />
          <Skeleton variant="text" width="75%" height={22} />
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, mt: 3 }}>
          <Skeleton variant="circular" width={36} height={36} />
          <Box sx={{ flexGrow: 1 }}>
            <Skeleton variant="text" width={130} height={20} />
            <Skeleton variant="text" width={90} height={16} />
          </Box>
        </Box>
        <Box sx={{ mt: 4, pt: 3 }}>
          <Skeleton variant="text" width={160} height={32} />
          <Skeleton
            variant="rounded"
            width="100%"
            height={70}
            sx={{ mt: 2, borderRadius: t.radius.sm }}
          />
        </Box>
      </Box>

      <Box
        sx={{
          width: { xs: "100%", lg: t.layout.railWidth },
          flexShrink: 0,
        }}
      >
        <Box
          sx={{
            bgcolor: t.surface.card,
            border: `1px solid ${t.border.subtle}`,
            borderRadius: t.radius.sm,
            p: t.spacing.md,
          }}
        >
          <Skeleton variant="text" width={160} height={24} sx={{ m: 1 }} />
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}>
            {[1, 2].map((i) => (
              <Box
                key={i}
                sx={{
                  p: 2,
                  border: `1px solid ${t.border.subtle}`,
                  borderRadius: t.radius.sm,
                }}
              >
                <Skeleton variant="text" width="90%" height={20} />
                <Skeleton variant="text" width="60%" height={20} />
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1.5,
                    mt: 2,
                  }}
                >
                  <Skeleton variant="circular" width={28} height={28} />
                  <Skeleton variant="text" width={90} height={16} />
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

function ForumDiscussionsContent() {
  const searchParams = useSearchParams();
  const initialId = searchParams?.get("id") || null;

  const {
    loading,
    error,
    refetch,
    quickFilter,
    setQuickFilter,
    topic,
    setTopic,
    topicFilters,
    isDialogOpen,
    setDialogOpen,
    activeDiscussion,
    relatedDiscussions,
    setSelectedId,
    handleAddResponse,
    handleToggleLike,
    handleCreateDiscussion,
    totalDiscussions,
  } = useForumDiscussions(initialId);

  return (
    <>
      <ForumHeader
        backLabel={forumContent.backLabel}
        backHref={forumContent.backHref}
        title={forumContent.title}
        subtitle={forumContent.subtitle}
      />

      <Box sx={{ mt: t.spacing.lg }}>
        <FilterBar
          filtersLabel={forumContent.filtersLabel}
          quickFilters={quickFilters}
          topicFilters={topicFilters}
          activeQuickFilter={quickFilter}
          activeTopic={topic}
          onQuickFilterChange={setQuickFilter}
          onTopicChange={setTopic}
          ctaLabel={forumContent.newDiscussionLabel}
          onCtaClick={() => setDialogOpen(true)}
        />
      </Box>

      {loading ? (
        <ForumDiscussionsSkeleton />
      ) : error ? (
        <Box
          sx={{
            py: t.spacing.huge,
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Typography
            sx={{
              fontFamily,
              fontSize: t.typography.heading2.fontSize,
              fontWeight: 600,
              color: t.text.heading,
            }}
          >
            Failed to load discussions
          </Typography>
          <Typography
            sx={{
              fontFamily,
              fontSize: t.typography.paragraph3.fontSize,
              color: t.text.muted,
              maxWidth: 500,
            }}
          >
            {error.message || "An unexpected error occurred while fetching discussions."}
          </Typography>
          <Button
            variant="outlined"
            onClick={refetch}
            sx={{
              mt: 1,
              textTransform: "none",
              fontFamily,
              borderColor: t.border.strong,
              color: t.text.heading,
              "&:hover": {
                borderColor: t.border.active,
                bgcolor: t.surface.hover,
              },
            }}
          >
            Retry
          </Button>
        </Box>
      ) : totalDiscussions === 0 ? (
        <Box
          sx={{
            py: t.spacing.huge,
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 1.5,
          }}
        >
          <Typography
            sx={{
              fontFamily,
              fontSize: t.typography.heading2.fontSize,
              fontWeight: 600,
              color: t.text.heading,
            }}
          >
            No discussions yet. Start a new discussion to get the conversation going.
          </Typography>
          <Typography
            sx={{
              fontFamily,
              fontSize: t.typography.paragraph3.fontSize,
              color: t.text.muted,
            }}
          >
            Be the first community member to ask a question or start a topic!
          </Typography>
          <Box sx={{ mt: 2 }}>
            <PrimaryButton
              title={forumContent.newDiscussionLabel}
              onClick={() => setDialogOpen(true)}
            />
          </Box>
        </Box>
      ) : (
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", lg: "row" },
            alignItems: "flex-start",
            gap: t.layout.columnGap,
            mt: t.spacing.xxl,
          }}
        >
          <Box component="main" sx={{ flex: 1, minWidth: 0, width: "100%" }}>
            {activeDiscussion ? (
              <>
                <DiscussionThread
                  discussion={activeDiscussion}
                  onTagClick={setTopic}
                />

                <ResponsesSection
                  label={forumContent.responsesLabel}
                  responses={activeDiscussion.responses || []}
                  replyPlaceholder={forumContent.replyPlaceholder}
                  replySubmitLabel={forumContent.replySubmitLabel}
                  onAddResponse={handleAddResponse}
                  onToggleLike={handleToggleLike}
                />
              </>
            ) : (
              <Box sx={{ py: t.spacing.huge }}>
                <Typography
                  sx={{
                    fontFamily,
                    fontSize: t.typography.heading2.fontSize,
                    color: t.text.heading,
                  }}
                >
                  {forumContent.emptyTitle}
                </Typography>
                <Typography
                  sx={{
                    fontFamily,
                    fontSize: t.typography.paragraph3.fontSize,
                    color: t.text.body,
                    mt: t.spacing.sm,
                  }}
                >
                  {forumContent.emptyBody}
                </Typography>
              </Box>
            )}
          </Box>

          <Box
            sx={{
              width: { xs: "100%", lg: t.layout.railWidth },
              flexShrink: 0,
              position: { lg: "sticky" },
              top: { lg: t.spacing.xxl },
            }}
          >
            <RelatedDiscussions
              title={forumContent.relatedTitle}
              discussions={relatedDiscussions}
              answersLabel={forumContent.answersLabel}
              onSelect={setSelectedId}
              emptyLabel={
                totalDiscussions <= 1
                  ? "No other discussions yet."
                  : forumContent.emptyTitle
              }
            />
          </Box>
        </Box>
      )}

      <NewDiscussionDialog
        open={isDialogOpen}
        form={newDiscussionForm}
        onClose={() => setDialogOpen(false)}
        onSubmit={handleCreateDiscussion}
      />
    </>
  );
}

export default function ForumDiscussionsPage() {
  return (
    <ScreenUtilScaler
      designWidth={DESIGN_WIDTH}
      desktopMin={ULTRA_WIDE_MIN}
      allowUpscale
    >
      <Box
        sx={{
          width: "100%",
          minHeight: "100vh",
          bgcolor: t.surface.page,
          px: t.layout.pagePadding,
          py: { xs: t.spacing.xl, md: t.spacing.xxl },
        }}
      >
        <Box
          sx={{
            maxWidth: t.layout.contentMax,
            mx: "auto",
          }}
        >
          <Suspense fallback={<ForumDiscussionsSkeleton />}>
            <ForumDiscussionsContent />
          </Suspense>
        </Box>
      </Box>
    </ScreenUtilScaler>
  );
}
