import { supabase } from "@/lib/supabase/client";
import { teamClusters as baseClusters } from "@/data/communityData";

/**
 * Fetches community items from Supabase.
 * - Attempts to query the `community` table first (per FKP-142 specification).
 * - If the `community` table is not yet created in the Supabase schema cache (error PGRST205 / 404),
 *   it seamlessly falls back to the existing `questions` table (joined with `users`).
 * - Uses `@supabase/supabase-js` client if available, with native `fetch` fallback.
 */
export async function fetchCommunityItems() {
  // Option A: Use `@supabase/supabase-js` client
  if (supabase) {
    try {
      // 1. Primary: Try 'community' table
      const { data, error } = await supabase
        .from("community")
        .select("*");

      if (!error && data) {
        return data;
      }

      // If 'community' table is not found in schema cache (PGRST205), fall back to 'questions'
      if (error && (error.code === "PGRST205" || error.message?.includes("community"))) {
        console.warn(
          "Table 'community' not found in Supabase schema cache (PGRST205). Falling back to 'questions' table."
        );
        const fallbackRes = await supabase
          .from("questions")
          .select("*, users(*)")
          .eq("is_deleted", false);

        if (!fallbackRes.error && fallbackRes.data) {
          return fallbackRes.data;
        }
      }
    } catch (err) {
      console.warn("Supabase client call threw exception:", err);
    }
  }

  // Option B: Native fetch using Supabase REST endpoint
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.replace(/\/$/, "");
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !anonKey) {
    throw new Error(
      "Supabase environment variables (NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY) are not set."
    );
  }

  const endpoint = `${supabaseUrl}/rest/v1/community?select=*`;
  const response = await fetch(endpoint, {
    method: "GET",
    headers: {
      apikey: anonKey,
      Authorization: `Bearer ${anonKey}`,
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });

  // If table 'community' is not found (404 / PGRST205), fall back to 'questions'
  if (response.status === 404) {
    const questionsEndpoint = `${supabaseUrl}/rest/v1/questions?select=*,users(*)&is_deleted=eq.false`;
    const fallbackResponse = await fetch(questionsEndpoint, {
      method: "GET",
      headers: {
        apikey: anonKey,
        Authorization: `Bearer ${anonKey}`,
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (fallbackResponse.ok) {
      return await fallbackResponse.json();
    }
  }

  if (!response.ok) {
    const errorText = await response.text().catch(() => "");
    throw new Error(
      `Failed to fetch community data: ${response.status} ${response.statusText} ${errorText}`
    );
  }

  const data = await response.json();
  return data;
}

/**
 * Fetches real community members from the Supabase `users` table.
 */
export async function fetchCommunityMembers() {
  const selectFields =
    "uid, full_name, display_name, username, photo_url, roles, bio, github_url, linkedin_url, website_url";

  if (supabase) {
    try {
      const { data, error } = await supabase
        .from("users")
        .select(selectFields)
        .order("created_at", { ascending: false });

      if (!error && data) {
        return data.filter(
          (u) =>
            (u.full_name || u.display_name || u.username)?.trim().length > 0
        );
      }
    } catch (err) {
      console.warn("Failed to fetch users from supabase-js:", err);
    }
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.replace(/\/$/, "");
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (supabaseUrl && anonKey) {
    try {
      const res = await fetch(
        `${supabaseUrl}/rest/v1/users?select=${encodeURIComponent(
          selectFields
        )}&order=created_at.desc`,
        {
          headers: {
            apikey: anonKey,
            Authorization: `Bearer ${anonKey}`,
          },
          cache: "no-store",
        }
      );
      if (res.ok) {
        const raw = await res.json();
        return (raw || []).filter(
          (u) =>
            (u.full_name || u.display_name || u.username)?.trim().length > 0
        );
      }
    } catch (e) {
      console.warn("REST fetch for users failed:", e);
    }
  }

  return [];
}

/**
 * Builds dynamic team clusters by overlaying real Supabase members
 * onto the geometric layout clusters used by the Desktop Meet the Team section.
 */
export function buildDynamicTeamClusters(realUsers = []) {
  if (!realUsers || realUsers.length === 0) {
    return baseClusters;
  }

  let userIndex = 0;
  return baseClusters.map((cluster) => {
    const updatedMembers = cluster.members.map((slot) => {
      const user = realUsers[userIndex % realUsers.length];
      userIndex++;

      const userName = user?.full_name || user?.display_name || "Community Member";
      const userRole = user?.roles?.[0] || "Flutter Developer";
      const userInitial = userName.trim()[0]?.toUpperCase() || "F";
      const userImage =
        user?.photo_url ||
        slot.image ||
        `https://ui-avatars.com/api/?name=${encodeURIComponent(userName)}&background=4167F2&color=fff`;

      return {
        ...slot,
        image: userImage,
        tag: slot.tag
          ? {
              ...slot.tag,
              name: userName,
              role: userRole,
              value: userInitial,
            }
          : undefined,
      };
    });

    return {
      ...cluster,
      members: updatedMembers,
    };
  });
}

/**
 * Fetches dynamic stats from Supabase (`users`, `questions`, `events`, `projects`).
 */
export async function fetchCommunityStats() {
  let usersCount = 0;
  let questionsCount = 0;
  let eventsCount = 0;

  if (supabase) {
    try {
      const [u, q, e] = await Promise.allSettled([
        supabase.from("users").select("*", { count: "exact", head: true }),
        supabase.from("questions").select("*", { count: "exact", head: true }),
        supabase.from("events").select("*", { count: "exact", head: true }),
      ]);

      if (u.status === "fulfilled" && u.value.count !== null) {
        usersCount = u.value.count;
      }
      if (q.status === "fulfilled" && q.value.count !== null) {
        questionsCount = q.value.count;
      }
      if (e.status === "fulfilled" && e.value.count !== null) {
        eventsCount = e.value.count;
      }
    } catch (err) {
      console.warn("Error fetching live counts:", err);
    }
  }

  return [
    {
      id: 1,
      value: `${Math.max(usersCount, 30)}+`,
      label: "Community members",
    },
    {
      id: 2,
      value: `${Math.max(questionsCount, 15)}+`,
      label: "Community contributions",
    },
    {
      id: 3,
      value: `${Math.max(eventsCount, 5)}+`,
      label: "Events hosted",
    },
  ];
}

/**
 * Maps raw database rows from Supabase into the UI format for forum discussions timeline.
 */
export function mapCommunityItemToForumTimeline(item, index) {
  return {
    id: item.id || `community-item-${index}`,

    // TODO: Confirm the exact column name for title (e.g., item.title, item.subject, item.topic)
    title: item.title || item.subject || item.topic || null,

    // TODO: Confirm the exact column name for author name (e.g., item.users?.full_name, item.author_name, item.author)
    author:
      item.users?.full_name ||
      item.users?.display_name ||
      item.author_name ||
      item.author ||
      item.user_name ||
      item.created_by ||
      "Community Member",

    // TODO: Confirm the exact column name for author avatar / profile image (e.g., item.users?.photo_url, item.image_url)
    avatar:
      item.users?.photo_url ||
      item.image_url ||
      item.avatar_url ||
      item.avatar ||
      item.author_avatar ||
      "/assets/community-page-assets/avatar-icon.svg",

    // TODO: Confirm the exact column name for text content / body (e.g., item.content, item.body, item.description)
    body: item.content || item.body || item.description || item.message || "",

    // TODO: Confirm the exact column name for created date / timestamp (e.g., item.created_at, item.date)
    date: item.created_at
      ? new Date(item.created_at).toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        })
      : item.date || "Recently",

    // TODO: Confirm the exact column name for badge / tag (e.g., item.category, item.badge)
    badge: item.category || item.badge || (index === 0 ? "Most active" : null),

    // TODO: Confirm the exact column name for highlights label
    highlightsLabel:
      item.highlights_label ||
      item.highlightsLabel ||
      (item.highlights ? "This week, we worked on:" : null),

    // TODO: Confirm the exact column name for highlights items
    highlights: Array.isArray(item.highlights)
      ? item.highlights
      : typeof item.highlights === "string"
      ? [item.highlights]
      : null,
  };
}

/**
 * Maps raw database rows from Supabase into the UI format for mobile FeaturedDiscussions.
 */
export function mapCommunityItemToFeaturedDiscussion(item, index) {
  return {
    id: item.id || `discussion-${index}`,

    // TODO: Confirm author name column (e.g., item.users?.full_name, item.author_name)
    author:
      item.users?.full_name ||
      item.users?.display_name ||
      item.author_name ||
      item.author ||
      item.user_name ||
      "Community Member",

    // TODO: Confirm avatar column (e.g., item.users?.photo_url, item.image_url)
    avatar:
      item.users?.photo_url ||
      item.image_url ||
      item.avatar_url ||
      item.avatar ||
      "/assets/community-page-assets/avatar-icon.svg",

    // TODO: Confirm time/date column (e.g., item.time, item.created_at)
    time: item.time || (item.created_at ? new Date(item.created_at).toLocaleDateString() : "Recently"),

    // TODO: Confirm title column (e.g., item.title, item.subject)
    title: item.title || item.subject || "Discussion Topic",

    // TODO: Confirm body column (e.g., item.content, item.body)
    body: item.content || item.body || item.description || "",

    // TODO: Confirm hashtags column (e.g., item.tags, item.hashtags)
    hashtags: Array.isArray(item.tags) && item.tags.length > 0
      ? item.tags.map((t) => (t.startsWith("#") ? t : `#${t}`))
      : Array.isArray(item.hashtags)
      ? item.hashtags
      : item.category
      ? [`#${item.category.toLowerCase().replace(/\s+/g, "")}`]
      : ["#flutter", "#community"],

    // TODO: Confirm likes column (e.g., item.like_count, item.likes)
    likes: String(item.like_count ?? item.likes ?? "0"),

    // TODO: Confirm comments column (e.g., item.answer_count, item.comments)
    comments: String(item.answer_count ?? item.comments ?? "0"),

    // TODO: Confirm bookmarks column (e.g., item.save_count, item.bookmarks)
    bookmarks: String(item.save_count ?? item.bookmarks ?? "0"),
  };
}

/**
 * Maps raw database rows from Supabase into the UI format for Discussion questions list.
 */
export function mapCommunityItemToQuestion(item, index = 0) {
  const authorName =
    item.users?.full_name ||
    item.users?.display_name ||
    item.users?.username ||
    item.author_name ||
    item.author ||
    "Community Member";

  const authorAvatar =
    item.users?.photo_url ||
    item.image_url ||
    item.avatar_url ||
    item.avatar ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(authorName)}&background=4167F2&color=fff`;

  let images = [];
  if (Array.isArray(item.images)) {
    images = item.images;
  } else if (item.image_url) {
    images = [item.image_url];
  }

  let timeStr = "Recently";
  if (item.created_at) {
    try {
      const createdDate = new Date(item.created_at);
      const diffMs = Date.now() - createdDate.getTime();
      const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
      const diffDays = Math.floor(diffHours / 24);
      if (diffHours < 1) {
        timeStr = "Just now";
      } else if (diffHours < 24) {
        timeStr = `${diffHours}h ago`;
      } else if (diffDays < 7) {
        timeStr = `${diffDays}d ago`;
      } else {
        timeStr = createdDate.toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
        });
      }
    } catch {
      timeStr = "Recently";
    }
  }

  return {
    id: item.id || `question-${index}`,
    title: item.title || item.subject || "Discussion question",
    body: item.body || item.content || item.description || "",
    author: authorName,
    avatar: authorAvatar,
    time: timeStr,
    answers: item.answer_count ?? item.answers ?? 0,
    images,
    category: item.category || "General",
    tags:
      Array.isArray(item.tags) && item.tags.length > 0
        ? item.tags.map((t) => (t.startsWith("#") ? t : `#${t}`))
        : item.category
        ? [`#${item.category.toLowerCase().replace(/\s+/g, "")}`]
        : ["#Flutter"],
    likes: item.like_count ?? 0,
    views: item.view_count ?? 0,
    created_at: item.created_at,
  };
}

/**
 * Fetches dynamic discussion questions from Supabase `questions` or `community` table.
 * Supports filters: "All", "Trending", "Active", "Unanswered".
 */
export async function fetchDiscussionQuestions(filter = "All") {
  if (supabase) {
    try {
      let query = supabase
        .from("questions")
        .select("*, users(*)")
        .eq("is_deleted", false);

      const f = (filter || "").toLowerCase();
      if (f === "trending") {
        query = query
          .order("like_count", { ascending: false })
          .order("view_count", { ascending: false });
      } else if (f === "active") {
        query = query.gt("answer_count", 0).order("created_at", { ascending: false });
      } else if (f === "unanswered") {
        query = query.eq("answer_count", 0).order("created_at", { ascending: false });
      } else {
        query = query.order("created_at", { ascending: false });
      }

      const { data, error } = await query;
      if (!error && data && data.length > 0) {
        return data.map((item, index) => mapCommunityItemToQuestion(item, index));
      }
    } catch (err) {
      console.warn("fetchDiscussionQuestions error with supabase client:", err);
    }
  }

  // Fallback to REST endpoint
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.replace(/\/$/, "");
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (supabaseUrl && anonKey) {
    try {
      const endpoint = `${supabaseUrl}/rest/v1/questions?select=*,users(*)&is_deleted=eq.false&order=created_at.desc`;
      const res = await fetch(endpoint, {
        headers: {
          apikey: anonKey,
          Authorization: `Bearer ${anonKey}`,
        },
        cache: "no-store",
      });
      if (res.ok) {
        const raw = await res.json();
        if (raw && raw.length > 0) {
          const f = (filter || "").toLowerCase();
          let filtered = raw;
          if (f === "trending") {
            filtered = [...raw].sort(
              (a, b) => (b.like_count || 0) - (a.like_count || 0)
            );
          } else if (f === "active") {
            filtered = raw.filter((q) => (q.answer_count || 0) > 0);
          } else if (f === "unanswered") {
            filtered = raw.filter((q) => (q.answer_count || 0) === 0);
          }
          return filtered.map((item, index) =>
            mapCommunityItemToQuestion(item, index)
          );
        }
      }
    } catch (err) {
      console.warn("fetchDiscussionQuestions REST error:", err);
    }
  }

  return [];
}

/**
 * Fetches single discussion question by ID and its answers/replies.
 */
export async function fetchQuestionById(id) {
  if (supabase && id) {
    try {
      // 1. Fetch Question
      const { data: qData, error: qErr } = await supabase
        .from("questions")
        .select("*, users(*)")
        .eq("id", id)
        .maybeSingle();

      if (!qErr && qData) {
        const question = mapCommunityItemToQuestion(qData);
        let postedLabel = "Posted recently";
        if (qData.created_at) {
          try {
            const d = new Date(qData.created_at);
            postedLabel = `Posted on ${d.toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })}`;
          } catch {
            postedLabel = "Posted recently";
          }
        }

        // 2. Fetch Answers
        const { data: aData } = await supabase
          .from("answers")
          .select("*, users(*)")
          .eq("question_id", id)
          .eq("is_deleted", false)
          .order("created_at", { ascending: true });

        const responses = (aData || []).map((ans, idx) => {
          const aAuthor =
            ans.users?.full_name ||
            ans.users?.display_name ||
            ans.users?.username ||
            "Community Member";
          const aAvatar =
            ans.users?.photo_url ||
            ans.image_url ||
            `https://ui-avatars.com/api/?name=${encodeURIComponent(
              aAuthor
            )}&background=4167F2&color=fff`;

          let timeStr = "Recently";
          if (ans.created_at) {
            try {
              timeStr = new Date(ans.created_at).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "short",
              });
            } catch {
              timeStr = "Recently";
            }
          }

          return {
            id: ans.id || `answer-${idx}`,
            author: aAuthor,
            avatar: aAvatar,
            time: timeStr,
            postedLabel: timeStr,
            content: ans.body || ans.content || "",
            body: ans.body || ans.content || "",
            likes: ans.like_count ?? 0,
            replies: [],
          };
        });

        return {
          question: {
            ...question,
            postedLabel,
          },
          responses,
        };
      }
    } catch (err) {
      console.warn("fetchQuestionById supabase-js error:", err);
    }
  }

  return null;
}

/**
 * Posts an answer / reply to a question.
 */
export async function postDiscussionAnswer(questionId, body, authorUid = null) {
  if (!supabase) {
    throw new Error("Supabase client is not available.");
  }

  let uid = authorUid;
  if (!uid) {
    try {
      const { data } = await supabase.auth.getUser();
      uid = data?.user?.id || null;
    } catch {
      uid = null;
    }
  }

  const { data, error } = await supabase
    .from("answers")
    .insert([
      {
        question_id: questionId,
        body,
        author_uid: uid,
      },
    ])
    .select("*, users(*)")
    .single();

  if (error) {
    throw error;
  }

  return data;
}

