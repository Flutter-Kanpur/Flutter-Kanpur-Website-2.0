import { useEffect, useState } from "react";

import { ULTRA_WIDE_QUERY } from "@/theme/breakpoints";

export const useUltraWide = () => {
  const [ultraWide, setUltraWide] = useState(false);

  useEffect(() => {
    const query = window.matchMedia(ULTRA_WIDE_QUERY);
    const sync = () => setUltraWide(query.matches);

    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  return ultraWide;
};
