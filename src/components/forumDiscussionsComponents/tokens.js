import { breakpoints } from "@/theme/breakpoints";
import { colors } from "@/theme/colors";
import { radius } from "@/theme/radius";
import { spacing } from "@/theme/spacing";
import { typography } from "@/theme/typography";

export const t = {
  colors,
  radius,
  spacing,
  typography,
  breakpoints,

  text: {
    heading: colors.neutral[950], // #000000
    body: colors.neutral[500], // #6d6d6d
    muted: colors.neutral[300], // #b0b0b0
    onLight: colors.neutral[900], // #3d3d3d
    link: colors.primary[500], // #4167f2
    onDark: "#f4f4f4",
  },

  surface: {
    page: colors.base.white,
    card: colors.base.white,
    tag: colors.primary[100], // #dce5fd
    placeholder: colors.neutral[100],
    hover: colors.neutral[50],
  },

  border: {
    subtle: colors.neutral[100], // #e7e7e7
    strong: colors.neutral[200], // #d1d1d1
    active: colors.primary[400], // #638df7
  },

  accent: {
    like: colors.warning[600], // #cc3333
  },

  shadow: {
    pill: "0 1px 3px rgba(16, 24, 40, 0.06), inset 0 0 8.91px rgba(179, 196, 255, 0.43)",
    card: "0px 1px 2px rgba(0, 0, 0, 0.04)",
  },

  layout: {
    contentMax: 1088,
    railWidth: 330,
    columnGap: spacing.xxxl,
    pagePadding: { xs: spacing.lg, md: spacing.xxl },
  },

  size: {
    backHeight: 40,
    filterPillHeight: 34,
    ctaWidth: 304,
    ctaHeight: 40,
    tagHeight: 32,
    attachment: { width: 146, height: 89 },
    railAttachment: { width: 130, height: 80 },
    carousel: { width: 347, height: 102 },
    replyMinHeight: 92,
  },
};

export const assets = {
  backArrow: "/assets/forum-page-assets/left-arrow.svg",
  filters: "/assets/forum-page-assets/filterbar.svg",
  chevronDown: "/assets/forum-page-assets/down-arrow.svg",
  ctaArrow: "/assets/forum-page-assets/right-arrow.svg",
  heart: "/assets/forum-page-assets/heart.svg",
  comments: "/assets/forum-page-assets/comments.svg",
  banners: [
    "/assets/forum-page-assets/banner1.svg",
    "/assets/forum-page-assets/banner2.svg",
    "/assets/forum-page-assets/banner3.svg",
  ],
};

export const fontFamily =
  'var(--font-product-sans), "Product Sans", sans-serif';
