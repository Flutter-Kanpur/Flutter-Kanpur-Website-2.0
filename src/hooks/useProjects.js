// src/hooks/useProjects.js
"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";
import { formatEventDate } from "@/hooks/useEvents";

/**
 * Fetches published projects from Supabase.
 * Maps project owner details from the users table when user_uid is available.
 */
export const useProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(supabase !== null);
  const [error, setError] = useState(
    supabase === null
      ? new Error("Supabase client is not initialised (missing env vars).")
      : null
  );
  const [fetchCount, setFetchCount] = useState(0);

  const refetch = () => setFetchCount((c) => c + 1);

  useEffect(() => {
    if (!supabase) return;

    let cancelled = false;

    const fetchProjects = async () => {
      setLoading(true);
      const { data, error: fetchError } = await supabase
        .from("projects")
        .select(
          "id, title, description, category, author_name, github_url, linkedin_url, live_url, image_url, thumbnail_url, user_uid, created_at, tags, status, is_deleted"
        )
        .eq("status", "published")
        .eq("is_deleted", false)
        .order("created_at", { ascending: false });

      if (cancelled) return;

      if (fetchError) {
        setError(fetchError);
        setLoading(false);
        return;
      }

      const rows = data || [];
      const uids = [...new Set(rows.map((p) => p.user_uid).filter(Boolean))];
      let userMap = new Map();

      if (uids.length > 0) {
        try {
          const { data: usersData } = await supabase
            .from("users")
            .select("uid, display_name, full_name, username, photo_url")
            .in("uid", uids);
          if (usersData) {
            for (const u of usersData) {
              userMap.set(u.uid, {
                name:
                  u.display_name?.trim() ||
                  u.full_name?.trim() ||
                  u.username?.trim() ||
                  "Community member",
                avatar: u.photo_url || null,
              });
            }
          }
        } catch {
          // ignore profile mapping error
        }
      }

      if (cancelled) return;

      const formatted = rows.map((p) => {
        const user = userMap.get(p.user_uid);
        const author = user?.name || p.author_name || "Community member";
        const thumbnail = p.image_url || p.thumbnail_url || null;
        const tags = Array.isArray(p.tags) ? p.tags : [];
        const category = p.category || "featured";

        return {
          id: p.id,
          title: p.title || "Untitled Project",
          author,
          description: p.description || "",
          thumbnail,
          category,
          tags,
          categories: [category, ...tags].filter(Boolean),
          date: formatEventDate(p.created_at) || "Recently",
          links: {
            github: p.github_url || "",
            live: p.live_url || "",
            linkedin: p.linkedin_url || "",
          },
          githubUrl: p.github_url || "#",
          linkedinUrl: p.linkedin_url || "#",
          liveUrl: p.live_url || "#",
        };
      });

      setProjects(formatted);
      setError(null);
      setLoading(false);
    };

    fetchProjects();

    return () => {
      cancelled = true;
    };
  }, [fetchCount]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        setFetchCount((c) => c + 1);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return { projects, loading, error, refetch };
};
