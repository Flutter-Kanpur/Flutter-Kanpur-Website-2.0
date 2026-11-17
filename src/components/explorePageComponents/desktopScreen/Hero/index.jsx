'use client';

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { Skeleton } from "@mui/material";
import { supabase } from "@/lib/supabase/client";
import styles from "./Hero.module.css";

function escapeSearchTerm(term) {
  return term
    .replace(/\\/g, "\\\\")
    .replace(/%/g, "\\%")
    .replace(/_/g, "\\_")
    .replace(/,/g, "\\,")
    .trim();
}

const Hero = () => {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [results, setResults] = useState(null);

  const containerRef = useRef(null);
  const debounceTimerRef = useRef(null);

  const executeSearch = useCallback(async (queryText) => {
    const trimmed = queryText.trim();
    if (trimmed.length < 2) {
      setResults(null);
      setLoading(false);
      return;
    }

    if (!supabase) {
      setError("Search is not configured");
      setLoading(false);
      setIsOpen(true);
      return;
    }

    setLoading(true);
    setError(null);
    setIsOpen(true);

    const escaped = escapeSearchTerm(trimmed);

    try {
      const [blogsRes, projectsRes, questionsRes] = await Promise.all([
        supabase
          .from("blogs")
          .select("id, title")
          .eq("status", "published")
          .eq("is_deleted", false)
          .ilike("title", `%${escaped}%`)
          .limit(4),
        supabase
          .from("projects")
          .select("id, title")
          .eq("status", "published")
          .eq("is_deleted", false)
          .ilike("title", `%${escaped}%`)
          .limit(4),
        supabase
          .from("questions")
          .select("id, title")
          .eq("status", "open")
          .eq("is_deleted", false)
          .ilike("title", `%${escaped}%`)
          .limit(4),
      ]);

      if (blogsRes.error) throw blogsRes.error;
      if (projectsRes.error) throw projectsRes.error;
      if (questionsRes.error) throw questionsRes.error;

      setResults({
        blogs: blogsRes.data || [],
        projects: projectsRes.data || [],
        questions: questionsRes.data || [],
      });
    } catch (err) {
      console.error("Search error:", err);
      setError(err.message || "Search failed");
    } finally {
      setLoading(false);
    }
  }, []);

  const handleInputChange = (e) => {
    const val = e.target.value;
    setQuery(val);

    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    if (val.trim().length < 2) {
      setIsOpen(false);
      setResults(null);
      return;
    }

    debounceTimerRef.current = setTimeout(() => {
      executeSearch(val);
    }, 300);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
      if (query.trim().length >= 2) {
        executeSearch(query);
      }
    } else if (e.key === "Escape") {
      setIsOpen(false);
    }
  };

  const handleFocus = () => {
    if (query.trim().length >= 2 && (results || loading || error)) {
      setIsOpen(true);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, []);

  const hasResults =
    results &&
    (results.blogs.length > 0 ||
      results.projects.length > 0 ||
      results.questions.length > 0);

  return (
    <section className={styles.hero}>
      <div className={styles.heroContent}>
        <span className={styles.badge}>Explore</span>
        <h1 className={styles.heading}>
          Discover blogs, projects,
          <br />
          discussions, and what&apos;s new on the
          <br />
          platform.
        </h1>

        <p className={styles.description}>
          Read stories written by community members, browse projects built with
          Flutter, join live discussions and keep up with what&apos;s new at
          Flutter Kanpur.
        </p>

        <div className={styles.searchBar} ref={containerRef}>
          <input
            type="text"
            placeholder="Search blogs, projects, discussions..."
            className={styles.searchInput}
            value={query}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onFocus={handleFocus}
          />

          <span className={styles.searchIcon}>
            <Image
              src="/assets/explore-page-assets/search-icon.svg"
              alt="Search"
              width={18}
              height={18}
            />
          </span>

          {isOpen && (
            <div className={styles.dropdown}>
              {loading && (
                <div className={styles.skeletonList}>
                  <Skeleton variant="text" width="30%" height={20} />
                  <Skeleton variant="rounded" width="100%" height={28} />
                  <Skeleton variant="rounded" width="100%" height={28} />
                </div>
              )}

              {!loading && error && (
                <div className={styles.errorState}>{error}</div>
              )}

              {!loading && !error && results && !hasResults && (
                <div className={styles.emptyState}>No results</div>
              )}

              {!loading && !error && results && hasResults && (
                <>
                  {results.blogs.length > 0 && (
                    <div className={styles.dropdownGroup}>
                      <div className={styles.groupLabel}>Blogs</div>
                      {results.blogs.map((b) => (
                        <Link
                          key={b.id}
                          href="/blogs"
                          className={styles.dropdownItem}
                          onClick={() => setIsOpen(false)}
                        >
                          {b.title}
                        </Link>
                      ))}
                    </div>
                  )}

                  {results.projects.length > 0 && (
                    <div className={styles.dropdownGroup}>
                      <div className={styles.groupLabel}>Projects</div>
                      {results.projects.map((p) => (
                        <Link
                          key={p.id}
                          href={`/explore/browse-projects/${p.id}`}
                          className={styles.dropdownItem}
                          onClick={() => setIsOpen(false)}
                        >
                          {p.title}
                        </Link>
                      ))}
                    </div>
                  )}

                  {results.questions.length > 0 && (
                    <div className={styles.dropdownGroup}>
                      <div className={styles.groupLabel}>Discussions</div>
                      {results.questions.map((q) => (
                        <Link
                          key={q.id}
                          href="/explore/forum-discussions"
                          className={styles.dropdownItem}
                          onClick={() => setIsOpen(false)}
                        >
                          {q.title}
                        </Link>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Hero;
