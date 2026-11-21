'use client';

import { useCallback } from 'react';
import { useSupabaseQuery } from './useSupabaseQuery';
import { fetchUserCards } from '@/lib/fetchUserCards';
import { formatDate } from '@/lib/exploreFormat';

const UUID_REGEX =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export function useProjectDetail(idOrSlug) {
  const fetcher = useCallback(
    async (supabase) => {
      if (!idOrSlug) {
        return null;
      }

      const isUuid = UUID_REGEX.test(idOrSlug);

      let query = supabase
        .from('projects')
        .select(
          'id, slug, title, summary, description, status, owner_uid, github_url, figma_url, live_url, is_deleted, created_at, cover_image_url'
        )
        .eq('status', 'published')
        .eq('is_deleted', false);

      if (isUuid) {
        query = query.eq('id', idOrSlug);
      } else {
        query = query.eq('slug', idOrSlug);
      }

      const { data: project, error: projectError } = await query.maybeSingle();

      if (projectError) {
        throw projectError;
      }

      if (!project) {
        return null;
      }

      const [techRes, membersRes] = await Promise.all([
        supabase
          .from('project_tech_stack')
          .select('tech_name')
          .eq('project_id', project.id),
        supabase
          .from('project_members')
          .select('user_uid, member_role, active, joined_at')
          .eq('project_id', project.id)
          .eq('active', true),
      ]);

      const memberUids = (membersRes.data || [])
        .map((m) => m.user_uid)
        .filter(Boolean);
      const allUids = [
        ...new Set([project.owner_uid, ...memberUids].filter(Boolean)),
      ];

      const userMap = await fetchUserCards(supabase, allUids);
      const ownerUser = userMap.get(project.owner_uid);
      const tags = (techRes.data || [])
        .map((t) => t.tech_name)
        .filter(Boolean);

      const members = (membersRes.data || []).map((m) => {
        const u = userMap.get(m.user_uid);
        return {
          uid: m.user_uid,
          role: m.member_role,
          name: u?.name || 'Community member',
          avatar: u?.avatar || null,
        };
      });

      return {
        id: project.id,
        slug: project.slug,
        title: project.title,
        summary: project.summary,
        tags,
        author: ownerUser?.name || 'Community member',
        about: project.description || project.summary || '',
        links: {
          github: project.github_url || '',
          link: project.live_url || '',
          website: project.figma_url || '',
        },
        sharedOn: formatDate(project.created_at),
        screenshots: project.cover_image_url ? [project.cover_image_url] : [],
        members,
      };
    },
    [idOrSlug]
  );

  return useSupabaseQuery(fetcher, [idOrSlug]);
}
