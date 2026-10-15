export const breakpoints = {
  mobile: "425px",
  tablet: "768px",
  laptop: "1024px",
  desktop: "1280px",
  wide: "1440px",
  ultraWide: "2400px",
};

export const ULTRA_WIDE_QUERY = `(min-width: ${breakpoints.ultraWide})`;
export const ULTRA_WIDE_MEDIA = `@media ${ULTRA_WIDE_QUERY}`;
