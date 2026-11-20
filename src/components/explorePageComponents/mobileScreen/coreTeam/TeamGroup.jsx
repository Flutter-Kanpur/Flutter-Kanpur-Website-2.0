"use client";

import Box from "@mui/material/Box";
import ButtonBase from "@mui/material/ButtonBase";
import Collapse from "@mui/material/Collapse";
import Typography from "@mui/material/Typography";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import MemberCard from "./MemberCard";
import { colors } from "@/theme/colors";

const fontFamily = 'var(--font-product-sans), "Product Sans", sans-serif';

/**
 * TeamGroup — accordion row (dashed divider) that expands into a 3-column
 * grid of MemberCards. Open: shows "N members"; closed: shows a chevron.
 */
const TeamGroup = ({ group, open, onToggle, onSelectMember }) => (
  <Box>
    <ButtonBase
      onClick={onToggle}
      aria-expanded={open}
      sx={{
        width: "100%",
        mt: "20px",
        pb: open ? "12px" : 0,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottom: `1px dashed ${colors.neutral[200]}`,
        borderRadius: 0,
        textAlign: "left",
      }}
    >
      <Typography
        sx={{
          fontFamily,
          fontSize: "16px",
          lineHeight: "24px",
          color: colors.neutral[950],
        }}
      >
        {group.name}
      </Typography>

      {open ? (
        <Typography
          sx={{
            fontFamily,
            fontSize: "16px",
            lineHeight: "24px",
            color: colors.primary[500],
          }}
        >
          {group.members.length} members
        </Typography>
      ) : (
        <KeyboardArrowDownIcon sx={{ fontSize: 24, color: colors.neutral[950] }} />
      )}
    </ButtonBase>

    <Collapse in={open} unmountOnExit>
      <Box
        sx={{
          pt: "20px",
          display: "grid",
          gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
          columnGap: "9px",
          rowGap: "8px",
        }}
      >
        {group.members.map((member) => (
          <MemberCard key={member.id} member={member} onSelect={onSelectMember} />
        ))}
      </Box>
    </Collapse>
  </Box>
);

export default TeamGroup;
