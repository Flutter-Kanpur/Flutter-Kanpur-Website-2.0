'use client';

import { useCallback } from 'react';
import { useSupabaseQuery } from './useSupabaseQuery';
import { fetchUserProfiles } from '@/lib/fetchUserCards';
import { formatDate } from '@/lib/exploreFormat';

export function useBrowseProjects() {
  const fetcher = useCallback(async (supabase) => {
    const { data: projects, error: projectsError } = await supabase
      .from('projects')
      .select(
        'id, slug, title, summary, description, status, owner_uid, github_url, figma_url, live_url, is_deleted, created_at, cover_image_url'
      )
      .eq('status', 'published')
      .eq('is_deleted', false)
      .order('created_at', { ascending: false });

    if (projectsError) {
      throw projectsError;
    }

    if (!projects || projects.length === 0) {
      return { projects: [], techNames: [] };
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
      fetchUserProfiles(supabase, ownerUids),
    ]);

    const tagsMap = new Map();
    const techSet = new Set();

    if (techRes.data) {
      for (const item of techRes.data) {
        if (!tagsMap.has(item.project_id)) {
          tagsMap.set(item.project_id, []);
        }
        if (item.tech_name) {
          tagsMap.get(item.project_id).push(item.tech_name);
          techSet.add(item.tech_name);
        }
      }
    }

    const mappedProjects = projects.map((p) => {
      const owner = userMap.get(p.owner_uid);
      const tags = tagsMap.get(p.id) || [];
      return {
        id: p.id,
        slug: p.slug,
        title: p.title,
        author: owner?.name || 'Community member',
        description: p.summary || '',
        about: p.description || '',
        thumbnail: p.cover_image_url || null,
        githubUrl: p.github_url || '',
        linkedinUrl: owner?.linkedin_url || '',
        liveUrl: p.live_url || '',
        figmaUrl: p.figma_url || '',
        tags,
        date: formatDate(p.created_at),
        created_at: p.created_at,
      };
    });

    return {
      projects: mappedProjects,
      techNames: Array.from(techSet).sort(),
    };
  }, []);

  return useSupabaseQuery(fetcher, []);
}
