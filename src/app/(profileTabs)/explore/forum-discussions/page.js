"use client";

import Box from "@mui/material/Box";
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
  topicFilters,
} from "@/components/forumDiscussionsComponents";
import { t, fontFamily } from "@/components/forumDiscussionsComponents/tokens";
import { useForumDiscussions } from "@/hooks/useForumDiscussions";
import ScreenUtilScaler from "@/components/layouts/ScreenUtilScaler";
import { ULTRA_WIDE_MIN } from "@/theme/breakpoints";

const DESIGN_WIDTH = t.layout.contentMax + 2 * 32;

export default function ForumDiscussionsPage() {
  const {
    quickFilter,
    setQuickFilter,
    topic,
    setTopic,
    isDialogOpen,
    setDialogOpen,
    activeDiscussion,
    relatedDiscussions,
    setSelectedId,
    handleAddResponse,
    handleToggleLike,
    handleCreateDiscussion,
  } = useForumDiscussions();

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
                  responses={activeDiscussion.responses}
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
              emptyLabel={forumContent.emptyTitle}
            />
          </Box>
        </Box>
      </Box>

      <NewDiscussionDialog
        open={isDialogOpen}
        form={newDiscussionForm}
        onClose={() => setDialogOpen(false)}
        onSubmit={handleCreateDiscussion}
      />
    </Box>
    </ScreenUtilScaler>
  );
}
