"use client";

import { useState } from "react";
import Image from "next/image";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import PrimaryButton from "@/components/buttons/PrimaryButton/PrimaryButton";
import { t, assets, fontFamily } from "../tokens";

const pillSx = (isActive) => ({
  textTransform: "none",
  fontFamily,
  fontSize: t.typography.label2.fontSize,
  fontWeight: t.typography.label2.fontWeight,
  lineHeight: "20px",
  height: t.size.filterPillHeight,
  minHeight: t.size.filterPillHeight,
  minWidth: 0,
  px: t.spacing.lg,
  py: t.spacing.none,
  borderRadius: t.radius.xs,
  color: t.text.heading,
  bgcolor: t.surface.card,
  border: isActive
    ? `1.5px solid ${t.border.active}`
    : `1px solid ${t.border.subtle}`,
  boxShadow: t.shadow.pill,
  "&:hover": {
    bgcolor: t.surface.card,
    borderColor: isActive ? t.border.active : t.border.strong,
    boxShadow: t.shadow.pill,
  },
});

const FilterBar = ({
  filtersLabel,
  quickFilters,
  topicFilters,
  activeQuickFilter,
  activeTopic,
  onQuickFilterChange,
  onTopicChange,
  ctaLabel,
  onCtaClick,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const isTopicFiltered = activeTopic !== "all";

  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "space-between",
        gap: t.spacing.md,
      }}
    >
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: t.spacing.md }}>
        <Button
          disableElevation
          disableRipple
          onClick={(event) => setAnchorEl(event.currentTarget)}
          aria-haspopup="listbox"
          aria-expanded={Boolean(anchorEl)}
          startIcon={
            <Image src={assets.filters} alt="" width={14} height={14} />
          }
          endIcon={
            <Image src={assets.chevronDown} alt="" width={14} height={14} />
          }
          sx={pillSx(isTopicFiltered)}
        >
          {isTopicFiltered ? activeTopic : filtersLabel}
        </Button>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={() => setAnchorEl(null)}
          slotProps={{
            paper: {
              sx: {
                mt: t.spacing.sm,
                borderRadius: t.radius.sm,
                border: `1px solid ${t.border.subtle}`,
                boxShadow: "0 8px 24px rgba(16, 24, 40, 0.10)",
              },
            },
          }}
        >
          {topicFilters.map((topic) => (
            <MenuItem
              key={topic.value}
              selected={topic.value === activeTopic}
              onClick={() => {
                onTopicChange(topic.value);
                setAnchorEl(null);
              }}
              sx={{
                fontFamily,
                fontSize: t.typography.paragraph3.fontSize,
                color: t.text.heading,
              }}
            >
              {topic.label}
            </MenuItem>
          ))}
        </Menu>

        {quickFilters.map((filter) => {
          const isActive = filter.value === activeQuickFilter;

          return (
            <Button
              key={filter.value}
              disableElevation
              disableRipple
              onClick={() => onQuickFilterChange(filter.value)}
              aria-pressed={isActive}
              sx={pillSx(isActive)}
            >
              {filter.label}
            </Button>
          );
        })}
      </Box>

      <PrimaryButton
        fullWidth={false}
        onClick={onCtaClick}
        endIcon={<Image src={assets.ctaArrow} alt="" width={16} height={16} />}
        sx={{
          width: t.size.ctaWidth,
          minWidth: t.size.ctaWidth,
          maxWidth: t.size.ctaWidth,
          height: t.size.ctaHeight,
          px: t.spacing.xl,
          fontFamily,
          fontSize: t.typography.label2.fontSize,
          color: t.text.onDark,
        }}
      >
        {ctaLabel}
      </PrimaryButton>
    </Box>
  );
};

export default FilterBar;
