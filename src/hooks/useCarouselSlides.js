// src/hooks/useCarouselSlides.js
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";

/**
 * Fetches active, non-deleted image slides for the home carousel.
 *
 * Filters:
 *  - screen = 'home'
 *  - is_active = true
 *  - is_deleted = false
 *  - content_type = 'image'  (video slides are ignored)
 *  - starts_at is null OR starts_at <= now
 *  - ends_at is null OR ends_at >= now
 *
 * Returns slides ordered by sort_order ascending.
 * Maps to { id, title, description, buttonText, backgroundImage, btn_url }.
 *
 * Returns { slides, loading, error }.
 * Refetches when the browser tab becomes visible again.
 */
export const useCarouselSlides = () => {
  const [slides, setSlides] = useState([]);
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

    const fetchSlides = async () => {
      setLoading(true);
      const now = new Date().toISOString();

      const { data, error: fetchError } = await supabase
        .from("home_carousel_slides")
        .select(
          "id, title, body, btn_text, btn_url, image_url, content_type, sort_order, starts_at, ends_at"
        )
        .eq("screen", "home")
        .eq("is_active", true)
        .eq("is_deleted", false)
        .eq("content_type", "image")
        .or(`starts_at.is.null,starts_at.lte.${now}`)
        .or(`ends_at.is.null,ends_at.gte.${now}`)
        .order("sort_order", { ascending: true });

      if (cancelled) return;

      if (fetchError) {
        setError(fetchError);
        setLoading(false);
        return;
      }

      const mapped = (data ?? []).map((row) => ({
        id: row.id,
        title: row.title ?? "",
        description: row.body ?? "",
        buttonText: row.btn_text ?? "View Details",
        backgroundImage:
          row.image_url ?? "/assets/landing-page-assets/updateCard.png",
        btn_url: row.btn_url ?? null,
      }));

      setSlides(mapped);
      setError(null);
      setLoading(false);
    };

    fetchSlides();

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

  return { slides, loading, error };
};
