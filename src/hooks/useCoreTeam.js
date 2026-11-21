'use client';

import { useCallback } from 'react';
import { useSupabaseQuery } from './useSupabaseQuery';
import { fetchUserCards } from '@/lib/fetchUserCards';

export function useCoreTeam() {
  const fetcher = useCallback(async (supabase) => {
    const { data: members, error: membersError } = await supabase
      .from('core_team_members')
      .select('id, user_uid, role, is_lead, sort_order, is_active, is_deleted, section_id')
      .eq('is_active', true)
      .eq('is_deleted', false)
      .order('sort_order', { ascending: true });

    if (membersError) {
      throw membersError;
    }

    if (!members || members.length === 0) {
      return [];
    }

    const userUids = [...new Set(members.map((m) => m.user_uid).filter(Boolean))];
    const userMap = await fetchUserCards(supabase, userUids);

    return members.map((member) => {
      const user = userMap.get(member.user_uid);
      const name =
        user?.name && user.name !== 'Community member'
          ? user.name
          : member.role || 'Community member';
      const avatar = user?.avatar || null;

      return {
        id: member.id,
        name,
        avatar,
        role: member.role,
        is_lead: member.is_lead,
      };
    });
  }, []);

  return useSupabaseQuery(fetcher, []);
}
