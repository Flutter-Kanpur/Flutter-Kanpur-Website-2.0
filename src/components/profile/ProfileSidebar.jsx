"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

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
      {
        label: "Profile Overview",
        href: "/profile",
        icon: "/assets/profile-sidebar-assets/profile_overview_icon.svg",
        badge: 3,
      },
      {
        label: "Edit Profile",
        href: "/profile/edit",
        icon: "/assets/profile-sidebar-assets/edit_profile_icon.svg",
      },
      {
        label: "Account Settings",
        href: "/profile/settings",
        icon: "/assets/profile-sidebar-assets/account_setting_icon.svg",
      },
      {
        label: "Notification Preferences",
        href: "/profile/notifications",
        icon: "/assets/profile-sidebar-assets/notification_icon.svg",
      },
      {
        label: "Login & Security",
        href: "/profile/security",
        icon: "/assets/profile-sidebar-assets/login_security_icon.svg",
      },
    ],
  },
  {
    title: "MY ACTIVITY",
    items: [
      {
        label: "Dashboard",
        href: "/profile/dashboard",
        icon: "/assets/profile-sidebar-assets/dashboard_icon.svg",
      },
      {
        label: "My Events",
        href: "/profile/events",
        icon: "/assets/profile-sidebar-assets/event_icon.svg",
      },
      {
        label: "My Contests",
        href: "/profile/contests",
        icon: "/assets/profile-sidebar-assets/contest_icon.svg",
      },
      {
        label: "Problem of the Day",
        href: "/profile/problem-of-the-day",
        icon: "/assets/profile-sidebar-assets/problem_of_day_icon.svg",
      },
      {
        label: "Practice History",
        href: "/profile/history",
        icon: "/assets/profile-sidebar-assets/practice_history_icon.svg",
      },
      {
        label: "Saved Items",
        href: "/profile/saved",
        icon: "/assets/profile-sidebar-assets/saved_items_icon.svg",
      },
    ],
  },
  {
    title: "COMMUNITY",
    items: [
      {
        label: "My Contributions",
        href: "/profile/contributions",
        icon: "/assets/profile-sidebar-assets/contribution_icon.svg",
      },
      {
        label: "Forum Discussions",
        href: "/profile/forum",
        icon: "/assets/profile-sidebar-assets/forum_discussions_icon.svg",
      },
      {
        label: "Join as a Contributor",
        href: "/profile/join",
        icon: "/assets/profile-sidebar-assets/join_as_contributor_icon.svg",
      },
      {
        label: "Community Guidelines",
        href: "/profile/guidelines",
        icon: "/assets/profile-sidebar-assets/community_guidlines_icon.svg",
      },
      {
        label: "Project Submissions",
        href: "/profile/submissions",
        icon: "/assets/profile-sidebar-assets/project_submissios_icon.svg",
      },
    ],
  },
];

export default function ProfileSidebar({ inDrawer = false, onNavigate } = {}) {
  const pathname = usePathname();

  return (
    <Box
      component="aside"
      sx={{
        width: inDrawer ? "100%" : 340,
        minHeight: inDrawer ? "100%" : "100vh",
        bgcolor: "#f7f7f8",
        px: 3,
        py: 4,
        // In the drawer the sidebar is always visible; as the page aside it
        // only shows from md up (below md the MobileTopBar drawer takes over).
        display: inDrawer ? "flex" : { xs: "none", md: "flex" },
        flexDirection: "column",
        borderRight: inDrawer ? "none" : "1px solid #eee",
      }}
    >
      {/* Logo */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <Box
          component="img"
          src="/assets/landing-page-assets/flutter-navbar-icon.svg"
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
                  onClick={onNavigate}
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
                  <ListItemIcon sx={{ minWidth: 42 }}>
                    <Image
                      src={item.icon}
                      alt={item.label}
                      width={22}
                      height={22}
                    />
                  </ListItemIcon>

                  <ListItemText
                    primary={item.label}
                    slotProps={{
                      primary: {
                        fontSize: 21,
                        fontWeight: 500,
                      },
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
          onClick={onNavigate}
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
            slotProps={{
              primary: {
                fontSize: 21,
                fontWeight: 500,
              },
            }}
          />
        </ListItemButton>
      </Box>
    </Box>
  );
}
