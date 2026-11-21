'use client';

import { useCallback } from 'react';
import { useSupabaseQuery } from './useSupabaseQuery';
import { fetchUserCards } from '@/lib/fetchUserCards';
import { timeAgo } from '@/lib/exploreFormat';

const DEFAULT_LIMIT = 6;

export function useExploreDiscussions(limit = DEFAULT_LIMIT) {
  const fetcher = useCallback(
    async (supabase) => {
      const { data: questions, error: questionsError } = await supabase
        .from('questions')
        .select(
          'id, title, body, author_uid, status, answer_count, is_deleted, created_at, category, tags, like_count'
        )
        .eq('status', 'open')
        .eq('is_deleted', false)
        .order('created_at', { ascending: false })
        .limit(limit);

      if (questionsError) {
        throw questionsError;
      }

      if (!questions || questions.length === 0) {
        return [];
      }

      const authorUids = [
        ...new Set(questions.map((q) => q.author_uid).filter(Boolean)),
      ];
      const userMap = await fetchUserCards(supabase, authorUids);

      return questions.map((q) => {
        const user = userMap.get(q.author_uid);
        return {
          id: q.id,
          text: q.title,
          author: user?.name || 'Community member',
          time: timeAgo(q.created_at),
          avatar: user?.avatar || '/assets/explore-page-assets/avatar.svg',
          href: `/community/discussion/${q.id}`,
          active: false,
        };
      });
    },
    [limit]
  );

  return useSupabaseQuery(fetcher, [limit]);
}
