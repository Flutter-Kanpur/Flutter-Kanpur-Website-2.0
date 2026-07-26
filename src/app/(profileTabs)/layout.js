"use client";

import { Box } from "@mui/material";
import ProfileSidebar from "@/components/profile/ProfileSidebar";

/**
 * Shared shell for account-area pages (profile, guidelines, project submission).
 * Sidebar stays mounted while navigating between these routes.
 */
export default function AccountLayout({ children }) {
  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        minHeight: "100vh",
        overflowX: "hidden",
        backgroundColor: "#fff",
      }}
    >
      <ProfileSidebar />
      <Box
        component="main"
        sx={{
          flex: 1,
          minWidth: 0,
          width: "100%",
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
