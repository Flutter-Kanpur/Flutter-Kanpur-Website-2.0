"use client";

import Chip from "@mui/material/Chip";
import { t, fontFamily } from "../tokens";

const TagChip = ({ label, onClick }) => (
  <Chip
    label={label}
    onClick={onClick}
    clickable={Boolean(onClick)}
    sx={{
      height: t.size.tagHeight,
      px: t.spacing.xs,
      bgcolor: t.surface.tag,
      color: t.text.heading,
      borderRadius: t.radius.full,
      fontFamily,
      fontSize: t.typography.label3.fontSize,
      fontWeight: t.typography.label2.fontWeight,
      "& .MuiChip-label": { px: t.spacing.md },
      "&:hover": { bgcolor: t.colors.primary[200] },
    }}
  />
);

export default TagChip;
