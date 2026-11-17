// src/lib/exploreFormat.js
// Pure formatting helpers — no React, no Supabase.
// All dates are expressed in IST (locale: 'en-IN', timeZone: 'Asia/Kolkata').

const TZ = "Asia/Kolkata";
const LOCALE = "en-IN";

/**
 * Format an ISO date string as "03 Apr 2025".
 * @param {string} iso
 * @returns {string}
 */
export function formatDate(iso) {
  if (!iso) return "";
  try {
    return new Date(iso).toLocaleDateString(LOCALE, {
      day: "2-digit",
      month: "short",
      year: "numeric",
      timeZone: TZ,
    });
  } catch {
    return "";
  }
}

/**
 * Format an ISO date string as "June 2024".
 * @param {string} iso
 * @returns {string}
 */
export function formatMonthYear(iso) {
  if (!iso) return "";
  try {
    return new Date(iso).toLocaleDateString(LOCALE, {
      month: "long",
      year: "numeric",
      timeZone: TZ,
    });
  } catch {
    return "";
  }
}

/**
 * Return a human-readable relative time string such as "posted 2h ago".
 * Must only be called after data loads (client-side) to avoid hydration mismatch.
 * @param {string} iso
 * @returns {string}
 */
export function timeAgo(iso) {
  if (!iso) return "";
  try {
    const diffMs = Date.now() - new Date(iso).getTime();
    if (diffMs < 0) return "just now";

    const diffSec = Math.floor(diffMs / 1000);
    if (diffSec < 60) return "posted just now";

    const diffMin = Math.floor(diffSec / 60);
    if (diffMin < 60) return `posted ${diffMin}m ago`;

    const diffHr = Math.floor(diffMin / 60);
    if (diffHr < 24) return `posted ${diffHr}h ago`;

    const diffDay = Math.floor(diffHr / 24);
    if (diffDay < 7) return `posted ${diffDay}d ago`;

    const diffWk = Math.floor(diffDay / 7);
    if (diffWk < 5) return `posted ${diffWk}w ago`;

    const diffMo = Math.floor(diffDay / 30);
    if (diffMo < 12) return `posted ${diffMo}mo ago`;

    const diffYr = Math.floor(diffDay / 365);
    return `posted ${diffYr}y ago`;
  } catch {
    return "";
  }
}

/**
 * Estimate reading time from plain text.
 * Uses 200 words-per-minute; minimum 1 minute.
 * @param {string} text
 * @returns {string}  e.g. "6 min read"
 */
export function readTime(text) {
  if (!text) return "1 min read";
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(words / 200));
  return `${minutes} min read`;
}
