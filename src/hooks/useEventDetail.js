// src/hooks/useEventDetail.js
"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";

const UUID_REGEX =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

const EVENT_COLUMNS =
  "id, slug, title, short_description, description, banner_url, event_type, location_type, location_text, registration_url, capacity, price, currency, is_paid, max_per_user, status, start_at, end_at, is_deleted, host_name, host_image_url, speaker_name, speaker_image_url, speaker_intro, speaker_linkedin, speaker_twitter, speakers";

/**
 * Fetches an event by UUID from the `events` table where status = 'published' and is_deleted = false.
 *
 * @param {string} id - The event UUID from route params.
 * @returns {{ event: object|null, loading: boolean, error: Error|null, notFound: boolean, isStatic: boolean }}
 */
export const useEventDetail = (id) => {
  const isValidUuid = typeof id === "string" && UUID_REGEX.test(id);

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(isValidUuid && supabase !== null);
  const [notFound, setNotFound] = useState(false);
  const [error, setError] = useState(
    isValidUuid && supabase === null
      ? new Error("Supabase client is not initialised (missing env vars).")
      : null
  );
  const [fetchCount, setFetchCount] = useState(0);

  useEffect(() => {
    if (!isValidUuid || !supabase) {
      return;
    }

    let cancelled = false;

    const fetchDetail = async () => {
      setLoading(true);

      const { data, error: fetchError } = await supabase
        .from("events")
        .select(EVENT_COLUMNS)
        .eq("id", id)
        .eq("is_deleted", false)
        .in("status", ["published", "closed", "completed", "past"])
        .maybeSingle();

      if (cancelled) return;

      if (fetchError) {
        setError(fetchError);
        setEvent(null);
        setNotFound(false);
      } else if (!data) {
        setNotFound(true);
        setEvent(null);
        setError(null);
      } else {
        const endBoundary = data.end_at
          ? new Date(data.end_at).getTime()
          : data.start_at
          ? new Date(data.start_at).getTime()
          : null;
        const isClosed = endBoundary !== null && endBoundary < Date.now();

        setEvent({
          ...data,
          isClosed,
        });
        setNotFound(false);
        setError(null);
      }

      setLoading(false);
    };

    fetchDetail();

    return () => {
      cancelled = true;
    };
  }, [id, isValidUuid, fetchCount]);

  useEffect(() => {
    if (!isValidUuid) return;

    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        setFetchCount((c) => c + 1);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [isValidUuid]);

  if (!isValidUuid) {
    return {
      event: null,
      loading: false,
      error: null,
      notFound: false,
      isStatic: true,
    };
  }

  return {
    event,
    loading,
    error,
    notFound,
    isStatic: false,
  };
};
