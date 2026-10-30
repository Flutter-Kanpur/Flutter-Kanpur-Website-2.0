// src/hooks/useEvents.js
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";

/**
 * Fetches up to 4 published, non-deleted events ordered by start_at descending.
 * Returns { events, loading, error }.
 */
export const useEvents = () => {
  // If supabase is null we know immediately there's no client available.
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(supabase !== null);
  const [error, setError] = useState(
    supabase === null
      ? new Error("Supabase client is not initialised (missing env vars).")
      : null
  );

  useEffect(() => {
    if (!supabase) return;

    let cancelled = false;

    const fetchEvents = async () => {
      const { data, error: fetchError } = await supabase
        .from("events")
        .select(
          "id, slug, title, short_description, description, banner_url, event_type, start_at, end_at, location_text, status"
        )
        .eq("is_deleted", false)
        .eq("status", "published")
        .order("start_at", { ascending: false })
        .limit(4);

      if (cancelled) return;

      if (fetchError) {
        setError(fetchError);
      } else {
        setEvents(data ?? []);
      }
      setLoading(false);
    };

    fetchEvents();

    return () => {
      cancelled = true;
    };
  }, []);

  return { events, loading, error };
};
