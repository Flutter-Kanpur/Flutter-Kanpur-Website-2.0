// src/hooks/useAnnouncements.js
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";

/**
 * Fetches active announcements targeted at all users.
 *
 * Filters:
 *  - is_active = true
 *  - show_from is null OR show_from <= now
 *  - show_until is null OR show_until >= now
 *  - target_audience = 'all'
 *
 * Returns announcements ordered by created_at descending.
 * Maps: type 'event' → category "Featured Event", type 'info' → category "Announcement".
 *
 * Returns { announcements, loading, error }.
 * Refetches when the browser tab becomes visible again.
 */
export const useAnnouncements = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(supabase !== null);
  const [error, setError] = useState(
    supabase === null
      ? new Error("Supabase client is not initialised (missing env vars).")
      : null
  );
  const [fetchCount, setFetchCount] = useState(0);

  useEffect(() => {
    if (!supabase) return;

    let cancelled = false;

    const fetchAnnouncements = async () => {
      setLoading(true);
      const now = new Date().toISOString();

      const { data, error: fetchError } = await supabase
        .from("announcements")
        .select("id, title, body, type, cta_text, cta_url, show_from, show_until")
        .eq("is_active", true)
        .or(`show_from.is.null,show_from.lte.${now}`)
        .or(`show_until.is.null,show_until.gte.${now}`)
        .eq("target_audience", "all")
        .order("created_at", { ascending: false });

      if (cancelled) return;

      if (fetchError) {
        setError(fetchError);
        setLoading(false);
        return;
      }

      const mapped = (data ?? []).map((row) => ({
        id: row.id,
        category: row.type === "event" ? "Featured Event" : "Announcement",
        title: row.title ?? "",
        description: row.body ?? "",
      }));

      setAnnouncements(mapped);
      setError(null);
      setLoading(false);
    };

    fetchAnnouncements();

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

  return { announcements, loading, error };
};
