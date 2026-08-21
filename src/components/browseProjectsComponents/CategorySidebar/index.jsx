"use client";

import Box from "@mui/material/Box";
import ButtonBase from "@mui/material/ButtonBase";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import { t, assets, fontFamily } from "../tokens";

const STAR_SIZE = 18;
const StarOutline = ({ color }) => (
  <Box
    aria-hidden
    sx={{
      width: STAR_SIZE,
      height: STAR_SIZE,
      flexShrink: 0,
      bgcolor: color,
      transition: "background-color 0.15s ease",
      maskImage: `url(${assets.star})`,
      WebkitMaskImage: `url(${assets.star})`,
      maskRepeat: "no-repeat",
      WebkitMaskRepeat: "no-repeat",
      maskPosition: "center",
      WebkitMaskPosition: "center",
      maskSize: "contain",
      WebkitMaskSize: "contain",
    }}
  />
);

const CategorySidebar = ({ categories, activeCategory, onSelect }) => (
  <Box component="nav" aria-label="Project categories" sx={{ width: "100%" }}>
    <Stack spacing={t.spacing.md} alignItems="flex-start">
      {categories.map(({ id, label }) => {
        const isActive = id === activeCategory;
        const tint = isActive ? t.colors.primary[500] : t.text.muted;

        return (
          <ButtonBase
            key={id}
            onClick={() => onSelect(id)}
            aria-current={isActive ? "true" : undefined}
            disableRipple
            sx={{
              display: "flex",
              alignItems: "center",
              gap: t.spacing.md,
              py: t.spacing.xs,
              borderRadius: t.radius.xxs,
              justifyContent: "flex-start",
              "&:hover .browse-category-label": {
                color: t.colors.primary[500],
              },
            }}
          >
            <StarOutline color={tint} />

            <Typography
              className="browse-category-label"
              sx={{
                fontFamily,
                fontSize: t.typography.paragraph3.fontSize,
                fontWeight: isActive
                  ? t.typography.label2.fontWeight
                  : t.typography.paragraph3.fontWeight,
                color: isActive ? t.colors.primary[500] : t.text.body,
                whiteSpace: "nowrap",
                transition: "color 0.15s ease",
              }}
            >
              {label}
            </Typography>
          </ButtonBase>
        );
      })}
    </Stack>
  </Box>
);

export default CategorySidebar;
