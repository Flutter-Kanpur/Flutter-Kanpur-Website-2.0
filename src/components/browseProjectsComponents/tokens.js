import { colors } from "@/theme/colors";
import { radius } from "@/theme/radius";
import { spacing } from "@/theme/spacing";
import { typography } from "@/theme/typography";

export const figma = {
  ink: "#1F1F1F",
  inkHover: "#000000",

  avatars: [
    "#7878ff",
    "#24bc4f",
    colors.primary[500], // #4167f2
    "#efe14c",
    colors.warning[600], // #cc3333
  ],

  topGradient: "linear-gradient(180deg, #9cc8fe 0%, #ffffff 100%)",
  navbarOffset: "-104px",
  navbarClearance: "176px",
};

export const assets = {
  star: "/assets/explore-page-assets/star.svg",
  github: "/assets/explore-page-assets/explore-github.svg",
  linkedin: "/assets/explore-page-assets/linkedin.svg",
  arrowUpRight: "/assets/explore-page-assets/projects-arrow.svg",
};

export const t = {
  colors,
  radius,
  spacing,
  typography,

  text: {
    heading: figma.ink,
    body: colors.neutral[500],
    muted: colors.neutral[400],
    accent: colors.primary[600],
  },

  surface: {
    page: colors.base.white,
    card: colors.base.white,
    cta: colors.primary[50], // #eff3ff 
    placeholder: colors.neutral[200],
    emptyAvatar: colors.neutral[50],
  },

  border: {
    subtle: colors.neutral[100],
  },

  shadow: {
    card: "0px 1px 2px rgba(0, 0, 0, 0.04)",
  },

  layout: {
    maxWidth: 1200,
    sidebarWidth: 300,
    columnGap: spacing.huge, // 64px
    sectionGap: spacing.huge, // 64px
    cardGap: spacing.xxl, // 32px
  },
};

export const fontFamily =
  'var(--font-product-sans), "Product Sans", sans-serif';
