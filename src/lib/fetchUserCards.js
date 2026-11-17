// src/lib/fetchUserCards.js
// Server-safe helpers — called inside useSupabaseQuery fetchers.
// Never called at module level; always inside an async function.

const FALLBACK_CARD = { name: "Community member", avatar: null };

/**
 * Build a uid → { name, avatar } Map for a list of UIDs.
 * Selects ONLY: uid, display_name, full_name, username, photo_url.
 *
 * Missing rows and errors both resolve to the FALLBACK_CARD so callers
 * never have to handle undefined.
 *
 * @param {import('@supabase/supabase-js').SupabaseClient} supabase
 * @param {string[]} uids
 * @returns {Promise<Map<string, { name: string, avatar: string|null }>>}
 */
export async function fetchUserCards(supabase, uids) {
  const unique = [...new Set(uids.filter(Boolean))];
  const map = new Map();

  if (unique.length === 0) return map;

  const { data, error } = await supabase
    .from("users")
    .select("uid, display_name, full_name, username, photo_url")
    .in("uid", unique);

  if (!error && data) {
    for (const row of data) {
      map.set(row.uid, {
        name:
          row.display_name?.trim() ||
          row.full_name?.trim() ||
          row.username?.trim() ||
          "Community member",
        avatar: row.photo_url || null,
      });
    }
  }

  // Fill any UIDs that the query didn't return (deleted / no row).
  for (const uid of unique) {
    if (!map.has(uid)) map.set(uid, { ...FALLBACK_CARD });
  }

  return map;
}

/**
 * Same as fetchUserCards, but also selects bio, github_url, linkedin_url, website_url.
 * Intended for core-team profile sheets where richer info is needed.
 *
 * @param {import('@supabase/supabase-js').SupabaseClient} supabase
 * @param {string[]} uids
 * @returns {Promise<Map<string, {
 *   name: string,
 *   avatar: string|null,
 *   bio: string|null,
 *   github_url: string|null,
 *   linkedin_url: string|null,
 *   website_url: string|null,
 * }>>}
 */
export async function fetchUserProfiles(supabase, uids) {
  const unique = [...new Set(uids.filter(Boolean))];
  const map = new Map();

  if (unique.length === 0) return map;

  const { data, error } = await supabase
    .from("users")
    .select(
      "uid, display_name, full_name, username, photo_url, bio, github_url, linkedin_url, website_url"
    )
    .in("uid", unique);

  if (!error && data) {
    for (const row of data) {
      map.set(row.uid, {
        name:
          row.display_name?.trim() ||
          row.full_name?.trim() ||
          row.username?.trim() ||
          "Community member",
        avatar: row.photo_url || null,
        bio: row.bio || null,
        github_url: row.github_url || null,
        linkedin_url: row.linkedin_url || null,
        website_url: row.website_url || null,
      });
    }
  }

  // Fill missing UIDs with a safe fallback.
  for (const uid of unique) {
    if (!map.has(uid)) {
      map.set(uid, {
        ...FALLBACK_CARD,
        bio: null,
        github_url: null,
        linkedin_url: null,
        website_url: null,
      });
    }
  }

  return map;
}
