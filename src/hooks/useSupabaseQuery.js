// src/hooks/useSupabaseQuery.js
"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { supabase } from "@/lib/supabase/client";

const SUPABASE_NULL_ERROR = new Error("Supabase is not configured");

/**
 * Generic Supabase data-fetching hook.
 *
 * @param {(supabase: import('@supabase/supabase-js').SupabaseClient) => Promise<any>} fetcher
 *   A function that receives the supabase client and returns the data
 *   (throw or return { error } to signal failure).
 * @param {any[]} deps  Dependency array — re-fetches whenever these change.
 * @returns {{ data: any, loading: boolean, error: Error|null, refetch: () => void }}
 */
export function useSupabaseQuery(fetcher, deps = []) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(supabase !== null);
  const [error, setError] = useState(supabase === null ? SUPABASE_NULL_ERROR : null);
  const [fetchTick, setFetchTick] = useState(0);

  // Keep a stable ref to the latest fetcher so the effect deps stay tight.
  const fetcherRef = useRef(fetcher);
  useEffect(() => {
    fetcherRef.current = fetcher;
  });

  const refetch = useCallback(() => setFetchTick((n) => n + 1), []);

  // Core fetch effect.
  useEffect(() => {
    if (!supabase) return;

    let cancelled = false;

    const run = async () => {
      setLoading(true);
      setError(null);

      try {
        const result = await fetcherRef.current(supabase);
        if (!cancelled) {
          setData(result);
          setError(null);
        }
      } catch (err) {
        if (!cancelled) {
          setData(null);
          setError(err instanceof Error ? err : new Error(String(err)));
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    run();

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchTick, ...deps]);

  // Refetch when the tab becomes visible again.
  useEffect(() => {
    if (!supabase) return;

    const handleVisibility = () => {
      if (document.visibilityState === "visible") {
        setFetchTick((n) => n + 1);
      }
    };

    document.addEventListener("visibilitychange", handleVisibility);
    return () => document.removeEventListener("visibilitychange", handleVisibility);
  }, []);

  return { data, loading, error, refetch };
}
