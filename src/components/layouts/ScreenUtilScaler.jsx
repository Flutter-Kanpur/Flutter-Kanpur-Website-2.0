"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";

// Flutter `screen_util`-style proportional scaling for the web.
//
// The content is authored at a fixed `designWidth` canvas. On desktop
// (viewport >= desktopMin) the canvas is scaled by `availableWidth / designWidth`
// via CSS `zoom`, so it reproduces the design exactly while always fitting the
// space it is given. Below desktopMin the wrapper is a passthrough so the layout
// can reflow naturally.
//
// IMPORTANT: it scales to the width of its CONTAINER (measured with a
// ResizeObserver), NOT the raw viewport — so it stays correct even when placed
// next to a sidebar or inside any narrower column.
//
// `zoom` is used instead of `transform: scale` because it scales the px literals
// this codebase uses everywhere AND reserves layout space, so the document flow
// (scrollbars, centering) stays correct.

// useLayoutEffect warns during SSR; fall back to useEffect on the server so the
// client can measure and correct the scale before the first paint.
const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

export default function ScreenUtilScaler({
  children,
  designWidth = 1600,
  desktopMin = 1200,
  allowUpscale = false,
}) {
  const containerRef = useRef(null);
  // Start as a passthrough so the server-rendered markup is deterministic; the
  // layout effect measures and corrects before paint.
  const [scale, setScale] = useState(1);
  const [scaling, setScaling] = useState(false);

  useIsomorphicLayoutEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const update = () => {
      const available = el.clientWidth;
      // Band decision uses the real viewport so it lines up with the MUI
      // breakpoints used elsewhere (desktopMin === lg).
      if (window.innerWidth >= desktopMin && available > 0) {
        const ratio = available / designWidth;
        setScale(allowUpscale ? ratio : Math.min(1, ratio));
        setScaling(true);
      } else {
        setScale(1);
        setScaling(false);
      }
    };

    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    window.addEventListener("resize", update);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", update);
    };
  }, [designWidth, desktopMin, allowUpscale]);

  return (
    <div ref={containerRef} style={{ width: "100%" }}>
      <div
        style={
          scaling
            ? { zoom: scale, width: designWidth, marginInline: "auto" }
            : { width: "100%" }
        }
      >
        {children}
      </div>
    </div>
  );
}
