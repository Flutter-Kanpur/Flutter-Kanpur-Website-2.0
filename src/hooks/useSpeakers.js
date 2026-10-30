// src/hooks/useSpeakers.js
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";

/**
 * Fetches speakers from published events.
 *
 * Filtering strategy (order of preference):
 *  1. Events where end_at IS set and is in the past  (truly past events)
 *  2. If that returns nothing, fall back to ALL published events
 *     (handles DBs where end_at is null or all events are upcoming)
 *
 * Flattens the `speakers` JSONB array into { name, company, image }.
 * Falls back to speaker_name / speaker_image_url when `speakers` is null/empty.
 * Deduplicates by name. Limits to 5.
 *
 * Returns { speakers, loading, error }.
 */
export const useSpeakers = () => {
  const [speakers, setSpeakers] = useState([]);
  const [loading, setLoading] = useState(supabase !== null);
  const [error, setError] = useState(
    supabase === null
      ? new Error("Supabase client is not initialised (missing env vars).")
      : null
  );

  useEffect(() => {
    if (!supabase) return;

    let cancelled = false;

    const fetchSpeakers = async () => {
      const now = new Date().toISOString();

      // Primary query: past events (end_at is set and in the past)
      let { data, error: fetchError } = await supabase
        .from("events")
        .select(
          "id, speaker_name, speaker_image_url, speakers, end_at, status, is_deleted"
        )
        .eq("is_deleted", false)
        .eq("status", "published")
        .not("end_at", "is", null)
        .lt("end_at", now)
        .order("end_at", { ascending: false });

      if (cancelled) return;

      if (fetchError) {
        setError(fetchError);
        setLoading(false);
        return;
      }

      // If no rows came back (end_at is null for all, or all events are upcoming),
      // widen to all published events so we still get speaker info.
      if (!data || data.length === 0) {
        const fallbackResult = await supabase
          .from("events")
          .select(
            "id, speaker_name, speaker_image_url, speakers, end_at, status, is_deleted"
          )
          .eq("is_deleted", false)
          .eq("status", "published")
          .order("end_at", { ascending: false, nullsFirst: false });

        if (cancelled) return;

        if (fallbackResult.error) {
          setError(fallbackResult.error);
          setLoading(false);
          return;
        }

        data = fallbackResult.data ?? [];
      }

      const seen = new Set();
      const flat = [];

      for (const event of data) {
        const jsonbSpeakers =
          Array.isArray(event.speakers) && event.speakers.length > 0
            ? event.speakers
            : null;

        if (jsonbSpeakers) {
          for (const sp of jsonbSpeakers) {
            const name = sp?.name?.trim();
            if (!name || seen.has(name)) continue;
            seen.add(name);
            flat.push({
              name,
              company: sp.intro ?? "",
              image: sp.image_url ?? null,
            });
          }
        } else {
          // Fallback to top-level scalar fields
          const name = event.speaker_name?.trim();
          if (name && !seen.has(name)) {
            seen.add(name);
            flat.push({
              name,
              company: "",
              image: event.speaker_image_url ?? null,
            });
          }
        }

        if (flat.length >= 5) break;
      }

      setSpeakers(flat.slice(0, 5));
      setLoading(false);
    };

    fetchSpeakers();

    return () => {
      cancelled = true;
    };
  }, []);

  return { speakers, loading, error };
};
