"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/TopNavbar/index";

export default function AppShell({ children }) {
  const pathname = usePathname();

  const hideNavbarRoutes = ["/profile", "/profile/edit", "/explore/projects"];

  // The "/" landing page imports its own navbar as an overlay on the hero
  // (see components/Home), so suppress the global one there only.
  const hideNavbar =
    pathname === "/" ||
    hideNavbarRoutes.some((route) => pathname.startsWith(route));

  return (
    <>
      {!hideNavbar && <Navbar />}
      {children}
    </>
  );
}
