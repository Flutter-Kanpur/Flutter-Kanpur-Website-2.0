"use client";

import { useEffect, useLayoutEffect, useState } from "react";

// Flutter `screen_util`-style proportional scaling for the web.
//
// The page is authored at a fixed `designWidth` canvas. On desktop
// (viewport >= desktopMin) the whole canvas is scaled by
// `viewport / designWidth` via CSS `zoom`, reproducing the design at every
// width. Below desktopMin the wrapper is a passthrough so the layout can
// reflow naturally.
//
// `zoom` is used instead of `transform: scale` because it scales the px
// literals this codebase uses everywhere AND reserves layout space, so the
// document flow (scrollbars, centering) stays correct.

// useLayoutEffect warns during SSR; fall back to useEffect on the server so
// the client can measure and correct the scale before the first paint.
const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

export default function ScreenUtilScaler({
  children,
  designWidth = 1600,
  desktopMin = 1200,
  allowUpscale = false,
}) {
  // Start at 1 so the server-rendered markup is deterministic; the layout
  // effect corrects it on the client before paint.
  const [scale, setScale] = useState(1);
  const [isDesktop, setIsDesktop] = useState(false);

  useIsomorphicLayoutEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      if (w >= desktopMin) {
        setIsDesktop(true);
        setScale(allowUpscale ? w / designWidth : Math.min(1, w / designWidth));
      } else {
        setIsDesktop(false);
        setScale(1);
      }
    };

    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [designWidth, desktopMin, allowUpscale]);

  const style = isDesktop
    ? {
        zoom: scale,
        width: designWidth,
        // Under `zoom: scale`, a child's `100vh` renders as `100vh * scale`,
        // leaving a gap below full-height elements (the sidebar) when scale<1.
        // `(100/scale)vh` compensates so it fills the viewport visually.
        minHeight: `${100 / scale}vh`,
        marginInline: "auto",
      }
    : { width: "100%" };

  return <div style={style}>{children}</div>;
}
