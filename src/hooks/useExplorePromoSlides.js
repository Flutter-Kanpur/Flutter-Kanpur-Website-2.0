'use client';

import { useCallback } from 'react';
import { useSupabaseQuery } from './useSupabaseQuery';
import { promoSlides as staticPromoSlides } from '@/data/exploreScreenData';

export function useExplorePromoSlides() {
  const fetcher = useCallback(async (supabase) => {
    const { data: rows, error } = await supabase
      .from('home_carousel_slides')
      .select('*')
      .eq('screen', 'explore')
      .eq('is_active', true)
      .eq('is_deleted', false)
      .eq('content_type', 'image')
      .order('sort_order', { ascending: true });

    if (error) {
      console.error('Error fetching explore carousel slides:', error);
      // Intentionally fallback to static editorial promo slides when query fails
      return staticPromoSlides;
    }

    if (!rows || rows.length === 0) {
      // Intentionally fallback to static editorial promo slides when no database rows are present for screen='explore'
      return staticPromoSlides;
    }

    return rows.map((row) => ({
      id: row.id,
      title: row.title,
      description: row.description,
      ctaLabel: row.cta_label || 'Learn more',
      ctaHref: row.cta_url || row.cta_href || '/explore',
    }));
  }, []);

  return useSupabaseQuery(fetcher, []);
}
