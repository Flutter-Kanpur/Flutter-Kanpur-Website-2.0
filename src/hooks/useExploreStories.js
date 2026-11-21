'use client';

import { useCallback } from 'react';
import { useSupabaseQuery } from './useSupabaseQuery';
import { fetchUserCards } from '@/lib/fetchUserCards';

const DEFAULT_LIMIT = 4;

export function useExploreStories(limit = DEFAULT_LIMIT) {
  const fetcher = useCallback(
    async (supabase) => {
      const { data: blogs, error: blogsError } = await supabase
        .from('blogs')
        .select(
          'id, slug, title, summary, content, cover_image_url, author_uid, published_at, status, is_deleted'
        )
        .eq('status', 'published')
        .eq('is_deleted', false)
        .order('published_at', { ascending: false })
        .limit(limit);

      if (blogsError) {
        throw blogsError;
      }

      if (!blogs || blogs.length === 0) {
        return [];
      }

      const authorUids = [
        ...new Set(blogs.map((b) => b.author_uid).filter(Boolean)),
      ];
      const userMap = await fetchUserCards(supabase, authorUids);

      return blogs.map((blog) => {
        const user = userMap.get(blog.author_uid);
        return {
          id: blog.id,
          title: blog.title,
          description: blog.summary,
          author: user?.name || 'Community member',
          image: blog.cover_image_url,
          active: false,
          content: blog.content,
        };
      });
    },
    [limit]
  );

  return useSupabaseQuery(fetcher, [limit]);
}
