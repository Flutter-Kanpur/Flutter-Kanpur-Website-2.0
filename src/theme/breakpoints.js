export const breakpoints = {
  mobile: "425px",
  tablet: "768px",
  laptop: "1024px",
  desktop: "1280px",
  wide: "1440px",
  ultraWide: "2400px", // keep in sync with ULTRA_WIDE_MIN
};

export const ULTRA_WIDE_QUERY = `(min-width: ${breakpoints.ultraWide})`;
export const ULTRA_WIDE_MEDIA = `@media ${ULTRA_WIDE_QUERY}`;


// Ultra-wide pages are authored at a fixed canvas and scaled up to fit (see
// ScreenUtilScaler) so typography and spacing grow with the screen.
export const ULTRA_WIDE_MIN = 2400;
