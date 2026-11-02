"use client";

import Box from "@mui/material/Box";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { colors } from "@/theme/colors";

const fontFamily = 'var(--font-product-sans), "Product Sans", sans-serif';

const chipSx = (active) => ({
  display: "inline-flex",
  alignItems: "center",
  flexShrink: 0,
  height: "36px",
  boxSizing: "border-box",
  py: 0,
  m: 0,
  gap: "6px",
  borderRadius: "8px",
  border: active ? `1px solid ${colors.primary[500]}` : "1px solid #D1D1D1",
  backgroundColor: "#FFFFFF",
  boxShadow: "inset 0px 0px 10px 0px #B3C4FF6E",
  color: "#1F1F1F",
  fontFamily,
  fontSize: "14px",
  fontWeight: 500,
  lineHeight: "20px",
  whiteSpace: "nowrap",
  cursor: "pointer",
  transition: "border-color 0.2s ease",
});

/**
 * FilterChipRow — "Filters" button + horizontally scrolling quick filters.
 * The active chip moves to the front and shows a close (x) icon.
 */
const FilterChipRow = ({
  chips = [],
  active = null,
  onToggle,
  onFiltersClick,
  showFiltersButton = true,
  sx,
}) => {
  const ordered = active ? [active, ...chips.filter((c) => c !== active)] : chips;

  return (
    <Box
      sx={{
        display: "flex",
        gap: "10px",
        overflowX: "auto",
        scrollbarWidth: "none",
        "&::-webkit-scrollbar": { display: "none" },
        ...sx,
      }}
    >
      {showFiltersButton && (
        <Box
          component="button"
          type="button"
          onClick={onFiltersClick}
          sx={{ ...chipSx(false), px: "12px" }}
        >
          <Box component="img" src="/assets/landing-page-assets/filter-icon.svg" alt="" sx={{ width: 16, height: 16 }} />
          Filters
          <Box component="img" src="/assets/landing-page-assets/down-arrow.svg" alt="" sx={{ width: 12, height: 8, ml: "2px" }} />
        </Box>
      )}

      {ordered.map((chip) => {
        const isActive = chip === active;
        return (
          <Box
            key={chip}
            component="button"
            type="button"
            onClick={() => onToggle?.(chip)}
            aria-pressed={isActive}
            sx={{ ...chipSx(isActive), px: "16px" }}
          >
            {chip}
            {isActive && <CloseRoundedIcon sx={{ fontSize: 16 }} />}
          </Box>
        );
      })}
      <Box sx={{ flex: "0 0 14px" }} />
    </Box>
  );
};

export default FilterChipRow;
