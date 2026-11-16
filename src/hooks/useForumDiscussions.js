import { useMemo, useState } from "react";

import {
  defaultAvatar,
  discussions as seedDiscussions,
  quickFilters,
} from "@/components/forumDiscussionsComponents";

const currentUser = { name: "Sam Sameul", avatar: defaultAvatar };

const matchesQuickFilter = (discussion, filter) => {
  if (filter === "trending") return Boolean(discussion.trending);
  if (filter === "active") return discussion.responses.length > 0;
  if (filter === "unanswered") return discussion.responses.length === 0;
  return true;
};

export const useForumDiscussions = () => {
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

  return {
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
  };
};
