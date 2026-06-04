"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  Box,
  Typography,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Badge,
  Divider,
  Button,
} from "@mui/material";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
// import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import KeyIcon from "@mui/icons-material/Key";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";

const sections = [
  {
    title: "ACCOUNT",
    items: [
      { label: "Profile Overview", href: "/profile", icon: <AccountCircleOutlinedIcon />, badge: 3 },
      { label: "Edit Profile", href: "/profile/edit", icon: <KeyIcon /> },
      { label: "Account Settings", href: "/profile/settings", icon: <NotificationsNoneIcon /> },
      { label: "Notification Preferences", href: "/profile/notifications", icon: <NotificationsNoneIcon /> },
      { label: "Login & Security", href: "/profile/security", icon: <NotificationsNoneIcon /> },
    ],
  },
  {
    title: "MY ACTIVITY",
    items: [
      { label: "Dashboard", href: "/profile/dashboard", icon: <AccountCircleOutlinedIcon /> },
      { label: "My Events", href: "/profile/events", icon: <KeyIcon /> },
      { label: "My Contests", href: "/profile/contests", icon: <NotificationsNoneIcon /> },
      { label: "Problem of the Day", href: "/profile/problem-of-the-day", icon: <NotificationsNoneIcon /> },
      { label: "Practice History", href: "/profile/history", icon: <NotificationsNoneIcon /> },
      { label: "Saved Items", href: "/profile/saved", icon: <NotificationsNoneIcon /> },
    ],
  },
  {
    title: "COMMUNITY",
    items: [
      { label: "My Contributions", href: "/profile/contributions", icon: <AccountCircleOutlinedIcon /> },
      { label: "Forum Discussions", href: "/profile/forum", icon: <KeyIcon /> },
      { label: "Join as a Contributor", href: "/profile/join", icon: <NotificationsNoneIcon /> },
      { label: "Community Guidelines", href: "/profile/guidelines", icon: <NotificationsNoneIcon /> },
      { label: "Project Submissions", href: "/profile/submissions", icon: <NotificationsNoneIcon /> },
    ],
  },
];

export default function ProfileSidebar() {
  const pathname = usePathname();

  return (
    <Box
      component="aside"
      sx={{
        width: 340,
        minHeight: "100vh",
        bgcolor: "#f7f7f8",
        px: 3,
        py: 4,
        display: { xs: "none", md: "flex" },
        flexDirection: "column",
        borderRight: "1px solid #eee",
      }}
    >
      {/* Logo */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <Box
          component="img"
          src="/flutter-logo.png"
          alt="FlutterKanpur"
          sx={{
            width: 58,
            height: 58,
            borderRadius: "14px",
            bgcolor: "#fff",
            p: 1,
            boxShadow: "0 1px 5px rgba(0,0,0,0.08)",
          }}
        />
        <Typography sx={{ fontSize: 28, fontWeight: 700, color: "#111" }}>
          FlutterKanpur
        </Typography>
      </Box>

      <Divider sx={{ my: 4 }} />

      {/* Sections */}
      {sections.map((section) => (
        <Box key={section.title} sx={{ mb: 4 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 1.5,
            }}
          >
            <Typography sx={{ fontSize: 20, color: "#777", fontWeight: 500 }}>
              {section.title}
            </Typography>
            <KeyboardArrowDownIcon />
          </Box>

          <List disablePadding>
            {section.items.map((item) => {
              const active = pathname === item.href;

              return (
                <ListItemButton
                  key={item.label}
                  component={Link}
                  href={item.href}
                  sx={{
                    height: 58,
                    borderRadius: "14px",
                    px: 2,
                    mb: 0.8,
                    color: active ? "#111" : "#777",
                    bgcolor: active ? "#fff" : "transparent",
                    "&:hover": {
                      bgcolor: "#fff",
                      color: "#111",
                    },
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 42,
                      color: "#111",
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>

                  <ListItemText
                    primary={item.label}
                    primaryTypographyProps={{
                      fontSize: 21,
                      fontWeight: 500,
                    }}
                  />

                  {item.badge && (
                    <Badge
                      badgeContent={item.badge}
                      color="error"
                      sx={{
                        "& .MuiBadge-badge": {
                          fontSize: 14,
                          fontWeight: 700,
                          minWidth: 28,
                          height: 28,
                          borderRadius: "50%",
                        },
                      }}
                    />
                  )}
                </ListItemButton>
              );
            })}
          </List>
        </Box>
      ))}

      {/* Bottom */}
      <Box sx={{ mt: "auto" }}>
        <Divider sx={{ mb: 2 }} />

        <Button
          startIcon={<LogoutIcon />}
          sx={{
            justifyContent: "flex-start",
            width: "100%",
            height: 58,
            px: 2,
            fontSize: 21,
            fontWeight: 500,
            color: "#e53935",
            textTransform: "none",
          }}
        >
          Log out
        </Button>

        <ListItemButton
          component={Link}
          href="/support"
          sx={{
            height: 58,
            borderRadius: "14px",
            px: 2,
            color: "#777",
          }}
        >
          <ListItemIcon sx={{ minWidth: 42, color: "#111" }}>
            <SupportAgentIcon />
          </ListItemIcon>
          <ListItemText
            primary="Contact support"
            primaryTypographyProps={{
              fontSize: 21,
              fontWeight: 500,
            }}
          />
        </ListItemButton>
      </Box>
    </Box>
  );
}