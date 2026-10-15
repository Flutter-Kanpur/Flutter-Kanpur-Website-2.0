"use client";
 
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { keyframes } from "@mui/system";
import SectionHeader from "./SectionHeader";
import { teamMembers } from "@/data/communityScreenData";
 
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
          lineHeight:"24px",
          fontWeight: 500,
          color: "#000000",
          lineHeight: 1.3,
        }}
      >
        {member.name}
      </Typography>
      <Typography
        sx={{
          fontFamily,
          fontSize: "14px",
          lineHeight:"20px",
          fontWeight: 400,
          color: "#6D6D6D",
          lineHeight: 1.4,
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
  const half = Math.ceil(teamMembers.length / 2);
  const rowOne = teamMembers.slice(0, half);
  const rowTwo = teamMembers.slice(half);
 
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "14px" }}>
      <SectionHeader title="Our team" />
 
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
    </Box>
  );
};
 
export default TeamSection;