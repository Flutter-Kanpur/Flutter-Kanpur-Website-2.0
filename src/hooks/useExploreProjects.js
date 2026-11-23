'use client';

import { useCallback } from 'react';
import { useSupabaseQuery } from './useSupabaseQuery';
import { fetchUserCards } from '@/lib/fetchUserCards';
import { formatDate } from '@/lib/exploreFormat';

const DEFAULT_LIMIT = 4;

export function useExploreProjects(limit = DEFAULT_LIMIT) {
  const fetcher = useCallback(
    async (supabase) => {
      const { data: projects, error: projectsError } = await supabase
        .from('projects')
        .select(
          'id, slug, title, summary, description, status, owner_uid, github_url, figma_url, live_url, is_deleted, created_at, cover_image_url'
        )
        .eq('status', 'published')
        .eq('is_deleted', false)
        .order('created_at', { ascending: false })
        .limit(limit);

      if (projectsError) {
        throw projectsError;
      }

      if (!projects || projects.length === 0) {
        return [];
      }

      const projectIds = projects.map((p) => p.id);
      const ownerUids = [
        ...new Set(projects.map((p) => p.owner_uid).filter(Boolean)),
      ];

      const [techRes, userMap] = await Promise.all([
        supabase
          .from('project_tech_stack')
          .select('project_id, tech_name')
          .in('project_id', projectIds),
        fetchUserCards(supabase, ownerUids),
      ]);

      const tagsMap = new Map();
      if (techRes.data) {
        for (const item of techRes.data) {
          if (!tagsMap.has(item.project_id)) {
            tagsMap.set(item.project_id, []);
          }
          if (item.tech_name) {
            tagsMap.get(item.project_id).push(item.tech_name);
          }
        }
      }

      return projects.map((p) => {
        const user = userMap.get(p.owner_uid);
        return {
          id: p.id,
          title: p.title,
          description: p.summary,
          tags: tagsMap.get(p.id) || [],
          date: formatDate(p.created_at),
          author: user?.name || 'Community member',
          href: `/explore/browse-projects/${p.id}`,
          image: p.cover_image_url,
          github_url: p.github_url,
          figma_url: p.figma_url,
          live_url: p.live_url,
        };
      });
    },
    [limit]
  );

  return useSupabaseQuery(fetcher, [limit]);
}
