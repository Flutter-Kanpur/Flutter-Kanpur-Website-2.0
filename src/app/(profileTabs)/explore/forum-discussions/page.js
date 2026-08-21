"use client";

import { useMemo, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import {
  DiscussionThread,
  FilterBar,
  ForumHeader,
  NewDiscussionDialog,
  RelatedDiscussions,
  ResponsesSection,
  defaultAvatar,
  discussions as seedDiscussions,
  forumContent,
  newDiscussionForm,
  quickFilters,
  topicFilters,
} from "@/components/forumDiscussionsComponents";
import { t, fontFamily } from "@/components/forumDiscussionsComponents/tokens";


const currentUser = { name: "Sam Sameul", avatar: defaultAvatar };
const ULTRA_WIDE = "@media (min-width:2400px)";
const ultra = {
  
  contentMax: "none",
  railWidth: 420,
};

const matchesQuickFilter = (discussion, filter) => {
  if (filter === "trending") return Boolean(discussion.trending);
  if (filter === "active") return discussion.responses.length > 0;
  if (filter === "unanswered") return discussion.responses.length === 0;
  return true;
};

export default function ForumDiscussionsPage() {
  const [discussions, setDiscussions] = useState(seedDiscussions);
  const [quickFilter, setQuickFilter] = useState(quickFilters[0].value);
  const [topic, setTopic] = useState("all");
  const [selectedId, setSelectedId] = useState(seedDiscussions[0].id);
  const [isDialogOpen, setDialogOpen] = useState(false);

  const visibleDiscussions = useMemo(
    () =>
      discussions.filter(
        (discussion) =>
          matchesQuickFilter(discussion, quickFilter) &&
          (topic === "all" || discussion.tags.includes(topic)),
      ),
    [discussions, quickFilter, topic],
  );

  // Keep showing the selected thread while it still passes the filters,
  // otherwise fall back to the first match.
  const activeDiscussion =
    visibleDiscussions.find((discussion) => discussion.id === selectedId) ||
    visibleDiscussions[0] ||
    null;

  const relatedDiscussions = visibleDiscussions.filter(
    (discussion) => discussion.id !== activeDiscussion?.id,
  );

  const updateActive = (updater) =>
    setDiscussions((previous) =>
      previous.map((discussion) =>
        discussion.id === activeDiscussion?.id ? updater(discussion) : discussion,
      ),
    );

  const handleAddResponse = (text) =>
    updateActive((discussion) => ({
      ...discussion,
      responses: [
        ...discussion.responses,
        {
          id: `${discussion.id}-reply-${discussion.responses.length + 1}`,
          author: currentUser,
          postedAt: "just now",
          text,
          likes: 0,
          comments: 0,
          liked: false,
        },
      ],
    }));

  const handleToggleLike = (responseId) =>
    updateActive((discussion) => ({
      ...discussion,
      responses: discussion.responses.map((response) =>
        response.id === responseId
          ? {
              ...response,
              liked: !response.liked,
              likes: response.liked ? response.likes - 1 : response.likes + 1,
            }
          : response,
      ),
    }));

  const handleCreateDiscussion = ({ title, body, tags }) => {
    const id = `discussion-${Date.now()}`;

    setDiscussions((previous) => [
      {
        id,
        title,
        body,
        tags,
        attachments: [],
        author: currentUser,
        postedAt: "just now",
        trending: false,
        responses: [],
      },
      ...previous,
    ]);

    // A brand new post has no replies, so move to the filter that shows it.
    setQuickFilter("unanswered");
    setTopic("all");
    setSelectedId(id);
  };

  return (
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
          [ULTRA_WIDE]: { maxWidth: ultra.contentMax },
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
              [ULTRA_WIDE]: { width: ultra.railWidth },
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
  );
}
