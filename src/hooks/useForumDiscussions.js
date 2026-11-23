"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useSupabaseQuery } from "./useSupabaseQuery";
import { supabase } from "@/lib/supabase/client";
import { fetchUserCards } from "@/lib/fetchUserCards";
import { formatPostedAgo } from "@/lib/exploreFormat";

const DEFAULT_AVATAR = "/assets/explore-page-assets/avatar.svg";

const DEFAULT_TOPIC_FILTERS = [
  { label: "All topics", value: "all" },
  { label: "State management", value: "State management" },
  { label: "Flutter development", value: "Flutter development" },
  { label: "UI / UX", value: "UI / UX" },
  { label: "Open source", value: "Open source" },
];

export const useForumDiscussions = (initialSelectedId = null) => {
  const fetcher = useCallback(async (supabase) => {
    // 1. Fetch published/active questions ordered newest first
    const { data: questions, error: questionsError } = await supabase
      .from("questions")
      .select(
        "id, title, body, author_uid, status, answer_count, is_deleted, created_at, updated_at, category, image_url, like_count, view_count, tags, save_count"
      )
      .eq("is_deleted", false)
      .order("created_at", { ascending: false });

    if (questionsError) {
      throw questionsError;
    }

    if (!questions || questions.length === 0) {
      return {
        discussions: [],
        topicFilters: DEFAULT_TOPIC_FILTERS,
      };
    }

    const questionIds = questions.map((q) => q.id);

    // 2. Fetch answers if table exists
    let answersList = [];
    try {
      const { data: answersData, error: answersError } = await supabase
        .from("answers")
        .select(
          "id, question_id, author_uid, body, is_accepted, is_deleted, created_at, updated_at, image_url, code_snippet, like_count, view_count, comment_count"
        )
        .in("question_id", questionIds)
        .eq("is_deleted", false)
        .order("created_at", { ascending: true });

      if (!answersError && answersData) {
        answersList = answersData;
      }
    } catch {
      answersList = [];
    }

    // 3. Fetch author details using fetchUserCards
    const allAuthorUids = [
      ...new Set(
        [
          ...questions.map((q) => q.author_uid),
          ...answersList.map((a) => a.author_uid),
        ].filter(Boolean)
      ),
    ];
    const userMap = await fetchUserCards(supabase, allAuthorUids);

    // Group answers by question_id
    const answersByQuestion = new Map();
    for (const ans of answersList) {
      const qId = ans.question_id;
      if (!answersByQuestion.has(qId)) {
        answersByQuestion.set(qId, []);
      }
      const authorUser = userMap.get(ans.author_uid);
      answersByQuestion.get(qId).push({
        id: ans.id,
        author: {
          name: authorUser?.name || "Community member",
          avatar: authorUser?.avatar || DEFAULT_AVATAR,
        },
        postedAt: formatPostedAgo(ans.created_at),
        text: ans.body || "",
        likes: ans.like_count || 0,
        comments: ans.comment_count || 0,
        liked: false,
        isAccepted: ans.is_accepted || false,
      });
    }

    // Map questions to discussion objects
    const topicSet = new Set();
    const discussions = questions.map((q) => {
      const authorUser = userMap.get(q.author_uid);
      const responses = answersByQuestion.get(q.id) || [];
      const answerCount =
        q.answer_count != null ? q.answer_count : responses.length;
      const tags = Array.isArray(q.tags) ? q.tags.filter(Boolean) : [];
      if (q.category) topicSet.add(q.category);
      for (const t of tags) {
        if (t?.trim()) topicSet.add(t.trim());
      }

      const attachments = q.image_url
        ? [
            {
              id: `att-${q.id}`,
              src: q.image_url,
              alt: q.title || "Attachment",
            },
          ]
        : [];

      return {
        id: q.id,
        title: q.title || "Untitled Discussion",
        body: q.body || "",
        tags,
        category: q.category || null,
        attachments,
        author: {
          name: authorUser?.name || "Community member",
          avatar: authorUser?.avatar || DEFAULT_AVATAR,
        },
        postedAt: formatPostedAgo(q.created_at),
        rawCreatedAt: q.created_at,
        rawUpdatedAt: q.updated_at,
        views: q.view_count || 0,
        likes: q.like_count || 0,
        answerCount,
        trending:
          (q.view_count || 0) > 10 ||
          (q.like_count || 0) > 5 ||
          answerCount > 2,
        responses,
      };
    });

    const dynamicTopicFilters =
      topicSet.size > 0
        ? [
            { label: "All topics", value: "all" },
            ...Array.from(topicSet).map((t) => ({ label: t, value: t })),
          ]
        : DEFAULT_TOPIC_FILTERS;

    return {
      discussions,
      topicFilters: dynamicTopicFilters,
    };
  }, []);

  const { data, loading, error, refetch } = useSupabaseQuery(fetcher, []);

  const [quickFilter, setQuickFilter] = useState("trending");
  const [topic, setTopic] = useState("all");
  const [userSelectedId, setUserSelectedId] = useState(null);
  const [isDialogOpen, setDialogOpen] = useState(false);

  // Interactive responses cache for fast optimistic UI updates
  const [responsesByQuestion, setResponsesByQuestion] = useState({});

  const selectedId = userSelectedId ?? initialSelectedId;
  const setSelectedId = setUserSelectedId;

  const allDiscussions = useMemo(() => {
    return data?.discussions || [];
  }, [data]);

  const topicFilters = data?.topicFilters || DEFAULT_TOPIC_FILTERS;

  // Filter & sort visible discussions in-memory
  const visibleDiscussions = useMemo(() => {
    let list = [...allDiscussions];

    // Filter by topic
    if (topic !== "all") {
      list = list.filter(
        (d) =>
          (Array.isArray(d.tags) && d.tags.includes(topic)) ||
          d.category === topic
      );
    }

    // Filter / sort by quick filter
    if (quickFilter === "unanswered") {
      list = list.filter(
        (d) => (d.responses?.length || d.answerCount || 0) === 0
      );
    } else if (quickFilter === "trending") {
      list.sort((a, b) => {
        const scoreA =
          (a.views || 0) +
          (a.likes || 0) * 2 +
          (a.responses?.length || a.answerCount || 0) * 3;
        const scoreB =
          (b.views || 0) +
          (b.likes || 0) * 2 +
          (b.responses?.length || b.answerCount || 0) * 3;
        if (scoreB !== scoreA) return scoreB - scoreA;
        return new Date(b.rawCreatedAt || 0) - new Date(a.rawCreatedAt || 0);
      });
    } else if (quickFilter === "active") {
      list.sort((a, b) => {
        const timeA = new Date(a.rawUpdatedAt || a.rawCreatedAt || 0).getTime();
        const timeB = new Date(b.rawUpdatedAt || b.rawCreatedAt || 0).getTime();
        return timeB - timeA;
      });
    }

    return list;
  }, [allDiscussions, quickFilter, topic]);

  // Selected thread or first visible
  const activeDiscussion = useMemo(() => {
    if (visibleDiscussions.length === 0) return null;
    const match = visibleDiscussions.find((d) => d.id === selectedId);
    const chosen = match || visibleDiscussions[0];
    if (responsesByQuestion[chosen.id]) {
      return {
        ...chosen,
        responses: responsesByQuestion[chosen.id],
      };
    }
    return chosen;
  }, [visibleDiscussions, selectedId, responsesByQuestion]);

  // Sidebar: remaining questions excluding the currently active one
  const relatedDiscussions = useMemo(() => {
    if (!activeDiscussion) return [];
    return visibleDiscussions.filter((d) => d.id !== activeDiscussion.id);
  }, [visibleDiscussions, activeDiscussion]);

  // Persist response to Supabase answers table
  const handleAddResponse = async (text) => {
    if (!text?.trim() || !activeDiscussion) {
      return { error: new Error("Reply content cannot be empty.") };
    }
    if (!supabase) {
      return { error: new Error("Database client is not configured.") };
    }

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return {
        notAuthenticated: true,
        error: new Error("Please sign in to post a reply"),
      };
    }

    const { data: newRow, error: insertError } = await supabase
      .from("answers")
      .insert({
        question_id: activeDiscussion.id,
        author_uid: user.id,
        body: text.trim(),
      })
      .select()
      .single();

    if (insertError) {
      return { error: insertError };
    }

    let author = {
      name:
        user.user_metadata?.display_name ||
        user.user_metadata?.full_name ||
        user.user_metadata?.name ||
        user.email ||
        "Community member",
      avatar:
        user.user_metadata?.photo_url ||
        user.user_metadata?.avatar_url ||
        DEFAULT_AVATAR,
    };

    try {
      const userMap = await fetchUserCards(supabase, [user.id]);
      const card = userMap.get(user.id);
      if (card && card.name !== "Community member") {
        author.name = card.name;
        if (card.avatar) author.avatar = card.avatar;
      }
    } catch {
      // fallback to metadata
    }

    const newResponseObj = {
      id: newRow.id,
      author,
      postedAt: formatPostedAgo(newRow.created_at) || "just now",
      text: newRow.body || text.trim(),
      likes: newRow.like_count || 0,
      comments: newRow.comment_count || 0,
      liked: false,
      isAccepted: newRow.is_accepted || false,
    };

    setResponsesByQuestion((prev) => {
      const existing =
        prev[activeDiscussion.id] || activeDiscussion.responses || [];
      return {
        ...prev,
        [activeDiscussion.id]: [...existing, newResponseObj],
      };
    });

    refetch();

    return { success: true, data: newResponseObj };
  };

  const handleToggleLike = (responseId) => {
    if (!activeDiscussion) return;
    const currentResponses = activeDiscussion.responses || [];
    const updated = currentResponses.map((res) =>
      res.id === responseId
        ? {
            ...res,
            liked: !res.liked,
            likes: res.liked ? res.likes - 1 : res.likes + 1,
          }
        : res
    );
    setResponsesByQuestion((prev) => ({
      ...prev,
      [activeDiscussion.id]: updated,
    }));
  };

  // Persist new question to Supabase questions table
  const handleCreateDiscussion = async ({ title, body, tags }) => {
    if (!title?.trim() || !body?.trim()) {
      return { error: new Error("Title and description are required.") };
    }
    if (!supabase) {
      return { error: new Error("Database client is not configured.") };
    }

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return {
        notAuthenticated: true,
        error: new Error("Please sign in to start a discussion"),
      };
    }

    const cleanedTags = Array.isArray(tags)
      ? tags.map((t) => t.trim()).filter(Boolean)
      : [];

    const newQuestionPayload = {
      title: title.trim(),
      body: body.trim(),
      author_uid: user.id,
      status: "open",
      category: cleanedTags[0] || "General",
      tags: cleanedTags,
      is_deleted: false,
    };

    const { data: newQuestion, error: insertError } = await supabase
      .from("questions")
      .insert(newQuestionPayload)
      .select()
      .single();

    if (insertError) {
      return { error: insertError };
    }

    // Refetch the discussions list so the new question is loaded from Supabase
    refetch();

    if (newQuestion?.id) {
      setUserSelectedId(newQuestion.id);
    }
    setTopic("all");
    setDialogOpen(false);

    return { success: true, data: newQuestion };
  };

  return {
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
    selectedId,
    setSelectedId,
    handleAddResponse,
    handleToggleLike,
    handleCreateDiscussion,
    totalDiscussions: allDiscussions.length,
  };
};
