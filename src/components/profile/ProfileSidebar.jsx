"use client";

import { useState } from "react";
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
  IconButton,
  Tooltip,
  Collapse,
} from "@mui/material";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import LogoutIcon from "@mui/icons-material/Logout";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";

const EXPANDED_WIDTH = { sm: 220, md: 272 };
const COLLAPSED_WIDTH = 72;

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
        href: "/communityGuidelines",
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
  const [collapsed, setCollapsed] = useState(false);
  const [openSections, setOpenSections] = useState(() =>
    Object.fromEntries(sections.map((section) => [section.title, true])),
  );

  // Drawer always shows the expanded menu; icon-rail collapse is desktop-only.
  const isCollapsed = inDrawer ? false : collapsed;

  const toggleSection = (title) => {
    setOpenSections((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  return (
    <Box
      component="aside"
      sx={{
        width: inDrawer
          ? "100%"
          : isCollapsed
            ? COLLAPSED_WIDTH
            : EXPANDED_WIDTH,
        flexShrink: 0,
        minHeight: inDrawer ? "100%" : "100vh",
        bgcolor: "#f7f7f8",
        px: isCollapsed ? 1 : { sm: 1.5, md: 2 },
        py: 4,
        // Drawer: always visible. Aside: hide below md (MobileTopBar takes over).
        display: inDrawer ? "flex" : { xs: "none", md: "flex" },
        flexDirection: "column",
        borderRight: inDrawer ? "none" : "1px solid #eee",
        position: "relative",
        transition: "width 0.25s ease, padding 0.25s ease",
        overflow: "visible",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: isCollapsed ? "column" : "row",
          alignItems: "center",
          gap: 1,
          justifyContent: isCollapsed ? "center" : "space-between",
          minHeight: 58,
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            minWidth: 0,
            justifyContent: isCollapsed ? "center" : "flex-start",
            width: isCollapsed ? "100%" : "auto",
          }}
        >
          <Box
            component="img"
            src="/assets/landing-page-assets/flutter-navbar-icon.svg"
            alt="FlutterKanpur"
            sx={{
              width: isCollapsed ? 40 : 58,
              height: isCollapsed ? 40 : 58,
              borderRadius: "14px",
              bgcolor: "#fff",
              p: 1,
              boxShadow: "0 1px 5px rgba(0,0,0,0.08)",
              flexShrink: 0,
              transition: "width 0.25s ease, height 0.25s ease",
            }}
          />
          {!isCollapsed && (
            <Typography
              sx={{
                fontSize: { sm: 18, md: 24 },
                fontWeight: 700,
                color: "#111",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              FlutterKanpur
            </Typography>
          )}
        </Box>

        {!inDrawer && (
          <IconButton
            onClick={() => setCollapsed((prev) => !prev)}
            aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            size="small"
            sx={{
              flexShrink: 0,
              width: 32,
              height: 32,
              bgcolor: "#fff",
              border: "1px solid #e0e0e0",
              boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
              "&:hover": { bgcolor: "#f5f5f5" },
            }}
          >
            {isCollapsed ? (
              <ChevronRightIcon sx={{ fontSize: 18 }} />
            ) : (
              <ChevronLeftIcon sx={{ fontSize: 18 }} />
            )}
          </IconButton>
        )}
      </Box>

      <Divider sx={{ my: isCollapsed ? 2 : 4 }} />

      {sections.map((section) => {
        const isOpen = openSections[section.title];

        return (
          <Box key={section.title} sx={{ mb: isCollapsed ? 2 : 2.5 }}>
            {!isCollapsed && (
              <Box
                component="button"
                type="button"
                onClick={() => toggleSection(section.title)}
                aria-expanded={isOpen}
                sx={{
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  gap: 0.5,
                  width: "auto",
                  maxWidth: "100%",
                  mb: isOpen ? 1.5 : 0,
                  px: 1,
                  py: 0,
                  border: "none",
                  background: "transparent",
                  boxShadow: "none",
                  outline: "none",
                  cursor: "pointer",
                  borderRadius: 0,
                  appearance: "none",
                  WebkitAppearance: "none",
                  "&:hover": {
                    bgcolor: "transparent",
                  },
                  "&:focus": {
                    outline: "none",
                    bgcolor: "transparent",
                  },
                  "&:focus-visible": {
                    outline: "1px solid #bbb",
                    outlineOffset: 2,
                  },
                }}
              >
                <Typography
                  sx={{
                    fontSize: { sm: 12, md: 13 },
                    color: "#777",
                    fontWeight: 600,
                    letterSpacing: "0.04em",
                    textAlign: "left",
                  }}
                >
                  {section.title}
                </Typography>
                <KeyboardArrowDownIcon
                  sx={{
                    fontSize: 18,
                    color: "#999",
                    transform: isOpen ? "rotate(0deg)" : "rotate(-90deg)",
                    transition: "transform 0.2s ease",
                  }}
                />
              </Box>
            )}

            <Collapse in={isCollapsed || isOpen} timeout="auto" unmountOnExit>
              <List disablePadding sx={{ width: "100%" }}>
                {section.items.map((item) => {
                  const active = pathname === item.href;

                  const button = (
                    <ListItemButton
                      key={item.label}
                      component={Link}
                      href={item.href}
                      onClick={onNavigate}
                      sx={{
                        minHeight: 48,
                        height: "auto",
                        borderRadius: "12px",
                        px: isCollapsed ? 1 : 1.25,
                        py: 1,
                        mb: 0.5,
                        justifyContent: isCollapsed ? "center" : "flex-start",
                        alignItems: "center",
                        textAlign: "left",
                        color: active ? "#111" : "#555",
                        bgcolor: active ? "#fff" : "transparent",
                        "&:hover": {
                          bgcolor: "#fff",
                          color: "#111",
                        },
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          minWidth: isCollapsed ? "auto" : 36,
                          width: isCollapsed ? "auto" : 36,
                          mr: isCollapsed ? 0 : 1.25,
                          justifyContent: "flex-start",
                          alignItems: "center",
                          color: "inherit",
                        }}
                      >
                        <Badge
                          badgeContent={isCollapsed ? item.badge : 0}
                          color="error"
                          sx={{
                            "& .MuiBadge-badge": {
                              fontSize: 10,
                              minWidth: 16,
                              height: 16,
                            },
                          }}
                        >
                          <Box
                            sx={{
                              width: 22,
                              height: 22,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "flex-start",
                            }}
                          >
                            <Image
                              src={item.icon}
                              alt={item.label}
                              width={22}
                              height={22}
                            />
                          </Box>
                        </Badge>
                      </ListItemIcon>

                      {!isCollapsed && (
                        <>
                          <ListItemText
                            primary={item.label}
                            sx={{
                              m: 0,
                              flex: "1 1 auto",
                              "& .MuiListItemText-primary": {
                                textAlign: "left",
                              },
                            }}
                            primaryTypographyProps={{
                              fontSize: { sm: 14, md: 15 },
                              fontWeight: 500,
                              lineHeight: 1.3,
                              noWrap: true,
                            }}
                          />

                          {item.badge && (
                            <Badge
                              badgeContent={item.badge}
                              color="error"
                              sx={{
                                ml: 1,
                                flexShrink: 0,
                                "& .MuiBadge-badge": {
                                  fontSize: 11,
                                  fontWeight: 700,
                                  minWidth: 20,
                                  height: 20,
                                  borderRadius: "50%",
                                  position: "static",
                                  transform: "none",
                                },
                              }}
                            />
                          )}
                        </>
                      )}
                    </ListItemButton>
                  );

                  return isCollapsed ? (
                    <Tooltip
                      key={item.label}
                      title={item.label}
                      placement="right"
                      arrow
                    >
                      <Box>{button}</Box>
                    </Tooltip>
                  ) : (
                    button
                  );
                })}
              </List>
            </Collapse>
          </Box>
        );
      })}

      <Box sx={{ mt: 1 }}>
        <Divider sx={{ mb: 1.5 }} />

        {isCollapsed ? (
          <Tooltip title="Log out" placement="right" arrow>
            <IconButton
              sx={{
                width: "100%",
                height: 48,
                color: "#e53935",
                borderRadius: "14px",
              }}
            >
              <LogoutIcon />
            </IconButton>
          </Tooltip>
        ) : (
          <ListItemButton
            sx={{
              minHeight: 48,
              borderRadius: "12px",
              px: 1.25,
              py: 1,
              mb: 0.5,
              justifyContent: "flex-start",
              alignItems: "center",
              color: "#e53935",
              "&:hover": {
                bgcolor: "#fff",
              },
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 36,
                width: 36,
                mr: 1.25,
                justifyContent: "flex-start",
                color: "#e53935",
              }}
            >
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText
              primary="Log out"
              sx={{ m: 0 }}
              primaryTypographyProps={{
                fontSize: { sm: 14, md: 15 },
                fontWeight: 500,
                textAlign: "left",
                color: "#e53935",
                noWrap: true,
              }}
            />
          </ListItemButton>
        )}

        {isCollapsed ? (
          <Tooltip title="Contact support" placement="right" arrow>
            <IconButton
              component={Link}
              href="/support"
              onClick={onNavigate}
              sx={{
                width: "100%",
                height: 48,
                color: "#777",
                borderRadius: "14px",
              }}
            >
              <SupportAgentIcon />
            </IconButton>
          </Tooltip>
        ) : (
          <ListItemButton
            component={Link}
            href="/support"
            onClick={onNavigate}
            sx={{
              minHeight: 48,
              borderRadius: "12px",
              px: 1.25,
              py: 1,
              justifyContent: "flex-start",
              alignItems: "center",
              color: "#777",
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 36,
                width: 36,
                mr: 1.25,
                justifyContent: "flex-start",
                color: "#111",
              }}
            >
              <SupportAgentIcon />
            </ListItemIcon>
            <ListItemText
              primary="Contact support"
              sx={{ m: 0 }}
              primaryTypographyProps={{
                fontSize: { sm: 14, md: 15 },
                fontWeight: 500,
                textAlign: "left",
                noWrap: true,
              }}
            />
          </ListItemButton>
        )}
      </Box>
    </Box>
  );
}
