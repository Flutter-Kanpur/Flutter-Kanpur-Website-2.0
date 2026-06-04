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

    const FooterLink = ({ href, children }) => (
      <Box sx={{ mb: 1.5 }}>
        <MuiLink
          component={Link}
          href={href}
          sx={{
            color: "#666",
            textDecoration: "none",
            fontFamily: PRODUCT_SANS,
            fontSize: "16px",
            "&:hover": { color: BLUE_COLOR },
          }}
        >
          {children}
        </MuiLink>
      </Box>
    );

    const FooterColumn = ({ title, links }) => (
      <Box sx={{ flex: "1 1 0", minWidth: 0 }}>
        <ProductText
          sx={{ color: BLUE_COLOR, fontWeight: 500, fontSize: "20px", mb: 3 }}
        >
          {title}
        </ProductText>
        {links.map((link, index) => (
          <FooterLink key={index} href={link.href}>
            {link.label}
          </FooterLink>
        ))}
      </Box>
    );

    const FooterComponent = () => {
      // DRY: Centralize repeating links
      const defaultLinks = [
        { label: "What it Does", href: "#" },
        { label: "Features", href: "#" },
        { label: "How it Works", href: "#" },
        { label: "Docs", href: "#" },
      ];

      const extendedLinks = [
        ...defaultLinks.slice(0, 3),
        { label: "How it Works", href: "#" },
        { label: "How it Works", href: "#" },
        { label: "Docs", href: "#" },
      ];

      const columns = [
        { title: "Explore", links: defaultLinks },
        { title: "Explore", links: defaultLinks },
        { title: "Explore", links: extendedLinks },
        { title: "Explore", links: defaultLinks },
      ];

      const socialIcons = [
        {
          Icon: GitHubIcon,
          href: "https://github.com/Flutter-Kanpur",
        },
        {
          Icon: YouTubeIcon,
          href: "https://www.youtube.com/@flutterkanpur",
        },
        {
          Icon: XIcon,
          href: "https://x.com/FlutterKanpur",
        },
        {
          Icon: LinkedInIcon,
          href: "https://www.linkedin.com/company/flutterkanpur",
        },
      ];

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
          <hr style={{ width: "100%", color: "#d5d5d5" }} />
          <Box
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "row",
              alignItems: "flex-start",
              justifyContent: "space-between",
              gap: 6,
            }}
          >
            {/* Flutter Icon */}
            <Box sx={{ flex: "0 0 auto" }}>
              <Image
                src={FlutterNavbarIcon}
                alt="Flutter Navbar Icon"
                width={40}
                height={40}
              />
            </Box>

            {/* Explore Columns - takes up remaining space */}
            <Box
              sx={{
                flex: "1 1 auto",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                gap: 8,
                maxWidth: "none",
              }}
            >
              {columns.map((col, index) => (
                <FooterColumn key={index} title={col.title} links={col.links} />
              ))}
            </Box>

            {/* Social Icons */}
            <Box sx={{ flex: "0 0 auto" }}>
              <Stack spacing={2}>
                {socialIcons.map(({ Icon, href }, index) => (
                  <IconButton
                    key={index}
                    component={Link}
                    href={href}
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
        </Box>
      );
    };

    export default FooterComponent;
