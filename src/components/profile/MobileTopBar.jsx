"use client";

import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  IconButton,
  Drawer,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

import ProfileSidebar from "@/components/profile/ProfileSidebar";

// Top bar shown only below md, where ProfileSidebar is hidden. The menu button
// opens the same sidebar nav inside a temporary Drawer.
export default function MobileTopBar() {
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));

  // The Drawer renders in a portal, so if the viewport grows past md while it
  // is open it would stay open over the desktop layout with the (now hidden)
  // hamburger unable to close it. Close it when we cross into desktop.
  useEffect(() => {
    if (isDesktop && open) setOpen(false);
  }, [isDesktop, open]);

  return (
    <Box
      sx={{
        display: { xs: "flex", md: "none" },
        alignItems: "center",
        gap: 1.5,
        mb: 2,
      }}
    >
      <IconButton
        aria-label="Open navigation menu"
        onClick={() => setOpen(true)}
        sx={{ color: "#111" }}
      >
        <MenuIcon />
      </IconButton>

      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Box
          component="img"
          src="/assets/landing-page-assets/flutter-navbar-icon.svg"
          alt="FlutterKanpur"
          sx={{
            width: 36,
            height: 36,
            borderRadius: "10px",
            bgcolor: "#fff",
            p: 0.5,
            boxShadow: "0 1px 5px rgba(0,0,0,0.08)",
          }}
        />
        <Typography sx={{ fontSize: 18, fontWeight: 700, color: "#111" }}>
          FlutterKanpur
        </Typography>
      </Box>

      <Drawer
        anchor="left"
        open={open}
        onClose={() => setOpen(false)}
        slotProps={{
          paper: {
            sx: {
              width: 300,
              maxWidth: "85vw",
              bgcolor: "#f7f7f8",
              overflowY: "auto",
              "&::-webkit-scrollbar": { display: "none" },
            },
          },
        }}
      >
        <ProfileSidebar inDrawer onNavigate={() => setOpen(false)} />
      </Drawer>
    </Box>
  );
}
