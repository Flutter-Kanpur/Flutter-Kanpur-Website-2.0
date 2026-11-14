"use client";

import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { keyframes } from "@mui/system";
import SectionHeader from "./SectionHeader";
import MembersModal from "@/components/Community/MembersModal";
import { teamMembers as fallbackMembers } from "@/data/communityScreenData";
import { fetchCommunityMembers } from "@/lib/supabase/community";

/* ---- tweak these ---- */
const DURATION = 32; // seconds for one full loop 
const REPEAT = 3; // how many times a row's members repeat inside one group
const GAP = 8; // space between pills (px) and between the two rows (px)
const ROW2_OFFSET = -65; // row 2 starts shifted left, like the frame

// row 1 → moves right, row 2 → moves left
const scrollLeft = keyframes`
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
`;
const scrollRight = keyframes`
  from { transform: translateX(-50%); }
  to   { transform: translateX(0); }
`;

const fontFamily = 'var(--font-product-sans), "Product Sans", sans-serif';

const MemberPill = ({ member }) => (
  <Box
    sx={{
      display: "flex",
      alignItems: "center",
      gap: "10px",
      flexShrink: 0,
      padding: "8px 30px 8px 10px",
      backgroundColor: "#F6F6F6",
      borderRadius: "999px",
      whiteSpace: "nowrap",
    }}
  >
    <Box
      component="img"
      src={member.avatar}
      alt={member.name}
      sx={{
        width: "52px",
        height: "52px",
        borderRadius: "50%",
        objectFit: "cover",
        flexShrink: 0,
      }}
    />
    <Box>
      <Typography
        sx={{
          fontFamily,
          fontSize: "16px",
          lineHeight: "24px",
          fontWeight: 500,
          color: "#000000",
        }}
      >
        {member.name}
      </Typography>
      <Typography
        sx={{
          fontFamily,
          fontSize: "14px",
          lineHeight: "20px",
          fontWeight: 400,
          color: "#6D6D6D",
        }}
      >
        {member.role}
      </Typography>
    </Box>
  </Box>
);

const MarqueeRow = ({ members, direction, offset = 0 }) => {
  const items = Array.from({ length: REPEAT }).flatMap((_, r) =>
    members.map((m) => ({ ...m, key: `${m.id}-${r}` }))
  );

  return (
    <Box sx={{ overflow: "hidden", width: "100%" }}>
      <Box
        sx={{
          display: "flex",
          width: "max-content",
          ml: `${offset}px`,
          animation: `${
            direction === "right" ? scrollRight : scrollLeft
          } ${DURATION}s linear infinite`,
          "&:hover": { animationPlayState: "paused" },
          "@media (prefers-reduced-motion: reduce)": { animation: "none" },
        }}
      >
        {/* two identical groups → translateX(-50%) loops seamlessly */}
        {[0, 1].map((g) => (
          <Box
            key={g}
            aria-hidden={g === 1}
            sx={{
              display: "flex",
              gap: `${GAP}px`,
              pr: `${GAP}px`,
              flexShrink: 0,
            }}
          >
            {items.map((item) => (
              <MemberPill key={item.key} member={item} />
            ))}
          </Box>
        ))}
      </Box>
    </Box>
  );
};

const TeamSection = () => {
  const [members, setMembers] = useState(fallbackMembers);
  const [rawUsers, setRawUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    let isCancelled = false;

    async function loadMembers() {
      try {
        const users = await fetchCommunityMembers();
        if (!isCancelled && users.length > 0) {
          setRawUsers(users);
          const mapped = users.map((u, i) => {
            const name = u.full_name || u.display_name || u.username || "Community Member";
            return {
              id: u.uid || `member-${i}`,
              name,
              role: u.roles?.[0] || "Community Member",
              avatar:
                u.photo_url ||
                `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=4167F2&color=fff`,
            };
          });
          setMembers(mapped);
        }
      } catch (err) {
        console.warn("Could not load dynamic members for mobile team:", err);
      }
    }

    loadMembers();

    return () => {
      isCancelled = true;
    };
  }, []);

  const half = Math.ceil(members.length / 2);
  const rowOne = members.slice(0, half);
  const rowTwo = members.slice(half);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "14px" }}>
      <SectionHeader
        title="Our team"
        actionLabel="View all"
        onAction={() => setIsModalOpen(true)}
      />

      <Box sx={{ display: "flex", flexDirection: "column", gap: `${GAP}px` }}>
        <MarqueeRow members={rowOne} direction="right" />
        {rowTwo.length > 0 && (
          <MarqueeRow
            members={rowTwo}
            direction="left"
            offset={ROW2_OFFSET}
          />
        )}
      </Box>

      {/* Full members modal for mobile view */}
      <MembersModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        members={rawUsers.length > 0 ? rawUsers : members.map((m) => ({
          uid: m.id,
          full_name: m.name,
          roles: [m.role],
          photo_url: m.avatar,
        }))}
      />
    </Box>
  );
};

export default TeamSection;