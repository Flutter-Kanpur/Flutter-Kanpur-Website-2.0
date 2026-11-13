// src/hooks/useEvents.js
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";

/**
 * Fetches published, non-deleted events ordered by start_at descending.
 *
 * @param {number} [limit=4] – Maximum number of events to return.
 * Returns { events, loading, error }.
 * Refetches when the browser tab becomes visible again.
 */
export const useEvents = ({ limit = 4 } = {}) => {
  // If supabase is null we know immediately there's no client available.
  const [events, setEvents] = useState([]);
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

    const fetchEvents = async () => {
      setLoading(true);
      const { data, error: fetchError } = await supabase
        .from("events")
        .select(
          "id, slug, title, short_description, description, banner_url, event_type, start_at, end_at, location_text, location_type, is_paid, status"
        )
        .eq("is_deleted", false)
        .eq("status", "published")
        .order("start_at", { ascending: false })
        .limit(limit);

      if (cancelled) return;

      if (fetchError) {
        setError(fetchError);
      } else {
        setEvents(data ?? []);
        setError(null);
      }
      setLoading(false);
    };

    fetchEvents();

    return () => {
      cancelled = true;
    };
  }, [limit, fetchCount]);

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

  return { events, loading, error };
};
