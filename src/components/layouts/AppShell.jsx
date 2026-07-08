"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/TopNavbar/index";

export default function AppShell({ children }) {
  const pathname = usePathname();

  const hideNavbarRoutes = ["/profile", "/profile/edit", "/explore/projects"];

  const hideNavbar = hideNavbarRoutes.some((route) =>
    pathname.startsWith(route)
  );

  return (
    <>
      {!hideNavbar && <Navbar />}
      {children}
    </>
  );
}