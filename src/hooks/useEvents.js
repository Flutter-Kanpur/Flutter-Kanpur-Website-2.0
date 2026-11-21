// src/hooks/useEvents.js
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";

/**
 * Format a start_at / end_at pair into a readable time label.
 * Uses a fixed locale ('en-IN') and timeZone ('Asia/Kolkata') so the output
 * is identical on server and client, avoiding hydration mismatches.
 */
export function formatTimeRange(startAt, endAt) {
  if (!startAt) return "";
  try {
    const timeOpts = {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
      timeZone: "Asia/Kolkata",
    };
    const formatTime = (d) =>
      new Date(d)
        .toLocaleTimeString("en-IN", timeOpts)
        .replace(/\u202f/g, " ")
        .toUpperCase();

    const start = formatTime(startAt);
    if (!endAt) return start;

    const dayOpts = {
      timeZone: "Asia/Kolkata",
      year: "numeric",
      month: "numeric",
      day: "numeric",
    };
    const isSameDay =
      new Date(startAt).toLocaleDateString("en-IN", dayOpts) ===
      new Date(endAt).toLocaleDateString("en-IN", dayOpts);

    if (isSameDay) {
      const end = formatTime(endAt);
      return `${start} – ${end}`;
    }

    const startDate = new Date(startAt).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      timeZone: "Asia/Kolkata",
    });
    return `${startDate} · ${start}`;
  } catch {
    return "";
  }
}

/**
 * Check whether an event has ended (past event).
 */
export function isEventPast(event) {
  if (!event) return false;
  if (
    event.status === "closed" ||
    event.status === "completed" ||
    event.status === "past"
  ) {
    return true;
  }
  const endBoundary = event.end_at
    ? new Date(event.end_at).getTime()
    : event.start_at
    ? new Date(event.start_at).getTime()
    : null;
  return endBoundary !== null && endBoundary < Date.now();
}

/**
 * Format date for display (e.g. "25 Nov 2026").
 */
export function formatEventDate(dateStr) {
  if (!dateStr) return "";
  try {
    return new Date(dateStr).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
      timeZone: "Asia/Kolkata",
    });
  } catch {
    return "";
  }
}

/**
 * Fetches non-deleted events ordered by start_at descending.
 *
 * @param {object} options
 * @param {number} [options.limit=4] – Maximum number of events to return.
 * @param {string|string[]} [options.status="published"] – Status to filter by ("published", "all", or array of statuses).
 * Returns { events, loading, error, refetch }.
 * Refetches when the browser tab becomes visible again.
 */
export const useEvents = ({ limit = 4, status = "published" } = {}) => {
  // If supabase is null we know immediately there's no client available.
  const [events, setEvents] = useState([]);
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

    const fetchEvents = async () => {
      setLoading(true);
      let query = supabase
        .from("events")
        .select(
          "id, slug, title, short_description, description, banner_url, event_type, start_at, end_at, location_text, location_type, is_paid, status"
        )
        .eq("is_deleted", false);

      if (status && status !== "all") {
        if (Array.isArray(status)) {
          query = query.in("status", status);
        } else {
          query = query.eq("status", status);
        }
      }

      query = query.order("start_at", { ascending: false });

      if (limit) {
        query = query.limit(limit);
      }

      const { data, error: fetchError } = await query;

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
  }, [limit, status, fetchCount]);

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

  return { events, loading, error, refetch };
};
