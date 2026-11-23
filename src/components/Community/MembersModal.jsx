"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import styles from "./MembersModal.module.css";

function GitHubIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
    </svg>
  );
}

function GlobeIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
      <path d="M18 6L6 18M6 6l12 12" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
      <circle cx="11" cy="11" r="8" />
      <path d="M21 21l-4.35-4.35" />
    </svg>
  );
}

export default function MembersModal({ isOpen, onClose, members = [] }) {
  const [search, setSearch] = useState("");

  // Lock body scroll and register Esc key listener while modal is open
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const q = search.trim().toLowerCase();
  const filtered = members.filter((m) => {
    if (!q) return true;
    const name = (m.full_name || m.display_name || m.username || "").toLowerCase();
    const role = (m.roles?.[0] || "").toLowerCase();
    const bio = (m.bio || "").toLowerCase();
    return name.includes(q) || role.includes(q) || bio.includes(q);
  });

  const handleScrollToCollage = () => {
    onClose();
    setTimeout(() => {
      const collage = document.getElementById("community-collage");
      if (collage) {
        collage.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }, 100);
  };

  return (
    <div
      className={styles.modalBackdrop}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Flutter Kanpur Community Members"
    >
      <div
        className={styles.modalContent}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className={styles.modalHeader}>
          <div className={styles.headerText}>
            <h2 className={styles.title}>Flutter Kanpur Community Members</h2>
            <p className={styles.subtitle}>
              <span className={styles.badgePill}>
                {members.length} {members.length === 1 ? "Member" : "Members"}
              </span>
              Connected to our developer community
            </p>
          </div>
          <button
            type="button"
            className={styles.closeButton}
            onClick={onClose}
            aria-label="Close members modal"
          >
            <CloseIcon />
          </button>
        </div>

        {/* Search Bar */}
        <div className={styles.searchContainer}>
          <div className={styles.searchBox}>
            <span className={styles.searchIcon}>
              <SearchIcon />
            </span>
            <input
              type="text"
              className={styles.searchInput}
              placeholder="Search members by name, role, or bio..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              autoFocus
            />
            {search && (
              <button
                type="button"
                className={styles.clearSearch}
                onClick={() => setSearch("")}
              >
                Clear
              </button>
            )}
          </div>
          {search && (
            <span className={styles.resultsMeta}>
              Showing {filtered.length} of {members.length} members
            </span>
          )}
        </div>

        {/* Members Grid */}
        <div className={styles.bodyContainer}>
          {filtered.length === 0 ? (
            <div className={styles.emptyState}>
              <p style={{ fontWeight: 600, fontSize: "16px", color: "#374151", margin: 0 }}>
                No members found
              </p>
              <p style={{ fontSize: "13.5px", margin: 0 }}>
                No community members matched &quot;{search}&quot;. Try another search term.
              </p>
            </div>
          ) : (
            <div className={styles.memberGrid}>
              {filtered.map((user, idx) => {
                const name =
                  user.full_name || user.display_name || user.username || "Community Member";
                const role = user.roles?.[0] || "Flutter Developer";
                const avatar =
                  user.photo_url ||
                  `https://ui-avatars.com/api/?name=${encodeURIComponent(
                    name
                  )}&background=4167F2&color=fff&bold=true`;

                return (
                  <div key={user.uid || `user-${idx}`} className={styles.memberCard}>
                    <div className={styles.avatarWrap}>
                      <Image
                        src={avatar || "/assets/community-page-assets/avatar-icon.svg"}
                        alt={name}
                        width={48}
                        height={48}
                        className={styles.avatarImg}
                        unoptimized
                      />
                    </div>

                    <div className={styles.memberInfo}>
                      <h3 className={styles.memberName} title={name}>
                        {name}
                      </h3>
                      <span className={styles.memberRole}>{role}</span>

                      {user.bio && (
                        <p className={styles.memberBio} title={user.bio}>
                          {user.bio}
                        </p>
                      )}

                      <div className={styles.socialRow}>
                        {user.github_url && (
                          <a
                            href={user.github_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.socialIconBtn}
                            title="GitHub Profile"
                            aria-label={`${name}'s GitHub Profile`}
                          >
                            <GitHubIcon />
                          </a>
                        )}
                        {user.linkedin_url && (
                          <a
                            href={user.linkedin_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.socialIconBtn}
                            title="LinkedIn Profile"
                            aria-label={`${name}'s LinkedIn Profile`}
                          >
                            <LinkedInIcon />
                          </a>
                        )}
                        {user.website_url && (
                          <a
                            href={user.website_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.socialIconBtn}
                            title="Website / Portfolio"
                            aria-label={`${name}'s Website`}
                          >
                            <GlobeIcon />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className={styles.modalFooter}>
          <button
            type="button"
            className={styles.scrollCollageBtn}
            onClick={handleScrollToCollage}
          >
            ↓ Jump to Photo Collage
          </button>
          <button
            type="button"
            className={styles.doneBtn}
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
