// src/hooks/useCoreTeam.js
"use client";

import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/lib/supabase/client";

const DEFAULT_AVATAR = "/assets/explore-page-assets/avatar.svg";

/**
 * Fetches active core team members from Supabase.
 * Maps member profiles from the users table and groups by team/department.
 */
export const useCoreTeam = () => {
  const [teamGroups, setTeamGroups] = useState([]);
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

    const fetchCoreTeam = async () => {
      setLoading(true);
      const { data, error: fetchError } = await supabase
        .from("core_team_members")
        .select("*")
        .eq("is_active", true)
        .eq("is_deleted", false)
        .order("sort_order", { ascending: true });

      if (cancelled) return;

      if (fetchError) {
        setError(fetchError);
        setLoading(false);
        return;
      }

      const rows = data || [];
      const uids = [...new Set(rows.map((m) => m.user_uid).filter(Boolean))];
      let userMap = new Map();

      if (uids.length > 0) {
        try {
          const { data: usersData } = await supabase
            .from("users")
            .select(
              "uid, display_name, full_name, username, photo_url, bio, github_url, linkedin_url, website_url"
            )
            .in("uid", uids);
          if (usersData) {
            for (const u of usersData) {
              userMap.set(u.uid, u);
            }
          }
        } catch {
          // ignore profile join error
        }
      }

      if (cancelled) return;

      // Group members by team / department
      const groupsMap = new Map();

      for (const row of rows) {
        const u = userMap.get(row.user_uid);
        const name =
          u?.display_name?.trim() ||
          u?.full_name?.trim() ||
          u?.username?.trim() ||
          row.name ||
          "Team Member";
        const avatar = u?.photo_url || row.image_url || DEFAULT_AVATAR;
        const bio = u?.bio || row.bio || "";
        const role = row.role || "Member";
        const teamName = row.team || row.department || "Core Team";
        const groupId = teamName.toLowerCase().replace(/[^a-z0-9]+/g, "-");

        const memberObj = {
          id: row.id,
          name,
          role,
          is_lead: row.is_lead ?? false,
          title: row.title || `${teamName} • ${role}`,
          since: row.since || "",
          avatar,
          bio,
          skills: Array.isArray(row.skills) ? row.skills : [],
          links: {
            github: u?.github_url || row.github_url || "#",
            linkedin: u?.linkedin_url || row.linkedin_url || "#",
            website: u?.website_url || row.website_url || "#",
          },
        };

        if (!groupsMap.has(groupId)) {
          groupsMap.set(groupId, {
            id: groupId,
            name: teamName,
            defaultOpen: groupsMap.size === 0,
            members: [],
          });
        }
        groupsMap.get(groupId).members.push(memberObj);
      }

      const groupsArray = Array.from(groupsMap.values());
      setTeamGroups(groupsArray);
      setError(null);
      setLoading(false);
    };

    fetchCoreTeam();

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

  const data = useMemo(
    () => teamGroups.flatMap((g) => g.members),
    [teamGroups]
  );

  return { teamGroups, data, loading, error, refetch };

};
