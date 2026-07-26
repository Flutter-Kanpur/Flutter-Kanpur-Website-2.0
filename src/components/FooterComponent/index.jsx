"use client";

import React from "react";
import {
  Box,
  Typography,
  Link as MuiLink,
  IconButton,
  Stack,
} from "@mui/material";
import Link from "next/link";
import GitHubIcon from "@mui/icons-material/GitHub";
import YouTubeIcon from "@mui/icons-material/YouTube";
import XIcon from "@mui/icons-material/X";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import Image from "next/image";
import FlutterNavbarIcon from "@/../public/assets/landing-page-assets/flutter-navbar-icon.svg";

const PRODUCT_SANS = "'Product Sans', system-ui, -apple-system, sans-serif";
const BLUE_COLOR = "#3D6BFF";

const ProductText = ({ children, sx, ...props }) => (
  <Typography sx={{ fontFamily: PRODUCT_SANS, ...sx }} {...props}>
    {children}
  </Typography>
);

const FooterLink = ({ href, children, external = false }) => {
  const linkSx = {
    color: "#666",
    textDecoration: "none",
    fontFamily: PRODUCT_SANS,
    fontSize: "16px",
    "&:hover": { color: BLUE_COLOR },
  };

  return (
    <Box sx={{ mb: 1.5 }}>
      {external ? (
        <MuiLink
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          sx={linkSx}
        >
          {children}
        </MuiLink>
      ) : (
        <MuiLink component={Link} href={href} sx={linkSx}>
          {children}
        </MuiLink>
      )}
    </Box>
  );
};

const FooterColumn = ({ title, links }) => (
  <Box sx={{ flex: "1 1 0", minWidth: { xs: "40%", sm: 0 } }}>
    <ProductText
      sx={{ color: BLUE_COLOR, fontWeight: 500, fontSize: "20px", mb: 3 }}
    >
      {title}
    </ProductText>
    {links.map((link) => (
      <FooterLink
        key={`${link.label}-${link.href}`}
        href={link.href}
        external={link.external}
      >
        {link.label}
      </FooterLink>
    ))}
  </Box>
);

const columns = [
  {
    title: "Explore",
    links: [
      { label: "Home", href: "/" },
      { label: "Explore", href: "/explore" },
      { label: "Events", href: "/eventsPage" },
      { label: "Blogs", href: "/blogs" },
    ],
  },
  {
    title: "Community",
    links: [
      { label: "Community Guidelines", href: "/communityGuidelines" },
      { label: "Profile", href: "/profile" },
      { label: "Dashboard", href: "/dashboard" },
      { label: "Join / Login", href: "/Auth/login" },
    ],
  },
  {
    title: "Resources",
    links: [
      {
        label: "Framework 1.0",
        href: "https://framework.flutterkanpur.in/",
        external: true,
      },
      {
        label: "Official Website",
        href: "https://flutterkanpur.in/",
        external: true,
      },
      {
        label: "Readme Blogs",
        href: "https://readme.flutterkanpur.in/blogs",
        external: true,
      },
      {
        label: "GitHub Org",
        href: "https://github.com/Flutter-Kanpur",
        external: true,
      },
    ],
  },
  {
    title: "Contact",
    links: [
      {
        label: "flutterkanpur@gmail.com",
        href: "mailto:flutterkanpur@gmail.com",
        external: true,
      },
      {
        label: "LinkedIn",
        href: "https://www.linkedin.com/company/flutterkanpur",
        external: true,
      },
      {
        label: "YouTube",
        href: "https://www.youtube.com/@flutterkanpur",
        external: true,
      },
      {
        label: "X / Twitter",
        href: "https://x.com/FlutterKanpur",
        external: true,
      },
    ],
  },
];

const socialIcons = [
  {
    Icon: GitHubIcon,
    href: "https://github.com/Flutter-Kanpur",
    label: "GitHub",
  },
  {
    Icon: YouTubeIcon,
    href: "https://www.youtube.com/@flutterkanpur",
    label: "YouTube",
  },
  {
    Icon: XIcon,
    href: "https://x.com/FlutterKanpur",
    label: "X",
  },
  {
    Icon: LinkedInIcon,
    href: "https://www.linkedin.com/company/flutterkanpur",
    label: "LinkedIn",
  },
];

const FooterComponent = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 4,
        width: "100%",
        boxSizing: "border-box",
      }}
    >
      <hr style={{ width: "100%", border: "none", borderTop: "1px solid #E5E5E5" }} />

      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          alignItems: "flex-start",
          justifyContent: "space-between",
          gap: 6,
        }}
      >
        <Box sx={{ flex: "0 0 auto", maxWidth: 220 }}>
          <Image
            src={FlutterNavbarIcon}
            alt="Flutter Kanpur"
            width={40}
            height={40}
          />
          <ProductText
            sx={{
              mt: 2,
              fontSize: 15,
              fontWeight: 600,
              color: "#111",
              lineHeight: 1.3,
            }}
          >
            Flutter Kanpur
          </ProductText>
          <ProductText
            sx={{
              mt: 1,
              fontSize: 13,
              color: "#777",
              lineHeight: 1.6,
            }}
          >
            A developer-first community for learning, building, and growing
            together with Flutter.
          </ProductText>
        </Box>

        <Box
          sx={{
            flex: "1 1 auto",
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-between",
            gap: { xs: 4, md: 6 },
            minWidth: 0,
          }}
        >
          {columns.map((col) => (
            <FooterColumn key={col.title} title={col.title} links={col.links} />
          ))}
        </Box>

        <Box sx={{ flex: "0 0 auto" }}>
          <Stack spacing={2}>
            {socialIcons.map(({ Icon, href, label }) => (
              <IconButton
                key={label}
                component="a"
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                sx={{
                  backgroundColor: "#1A1A1A",
                  color: "#FFF",
                  width: 50,
                  height: 50,
                  "&:hover": { backgroundColor: "#333" },
                }}
              >
                <Icon sx={{ fontSize: "24px" }} />
              </IconButton>
            ))}
          </Stack>
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 1.5,
          pt: 1,
          borderTop: "1px solid #F0F0F0",
        }}
      >
        <ProductText sx={{ fontSize: 13, color: "#999" }}>
          © {new Date().getFullYear()} Flutter Kanpur. All rights reserved.
        </ProductText>
        <ProductText sx={{ fontSize: 13, color: "#999" }}>
          Built by the Flutter Kanpur community
        </ProductText>
      </Box>
    </Box>
  );
};

export default FooterComponent;
