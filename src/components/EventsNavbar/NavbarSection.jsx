"use client";

import React from "react";
import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import Image from "next/image";

const PRODUCT_SANS = "'Product Sans', system-ui, -apple-system, sans-serif";

const NavbarSection = () => {
  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        background: "#fff",
        borderBottom: "1px solid #F1F1F1",
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",

          width: "100%",
          width: "100%",
          maxWidth: "1400px",
          height: "36px",

          mx: "auto",

          px: 0,
          py: "32px",
        }}
      >
        {/* LEFT SIDE */}

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
          }}
        >
          <Image
            src="/assets/landing-page-assets/flutter-navbar-icon.svg"
            alt="flutter"
            width={36}
            height={36}
          />

          <Typography
            sx={{
              fontSize: "16px",
              fontWeight: 600,
              color: "#000",
              fontFamily: PRODUCT_SANS,
            }}
          >
            FlutterKanpur
          </Typography>
        </Box>

        {/* RIGHT SIDE */}

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "14px",
          }}
        >
          {/* LOGIN BUTTON */}

          <Button
            variant="outlined"
            sx={{
              textTransform: "none",
              color: "#000",
              borderColor: "#E5E5E5",
              borderRadius: "100px",
              px: "22px",
              py: "10px",
              fontWeight: 500,
              fontSize: "16px",
              fontFamily: PRODUCT_SANS,
              background: "#fff",

              "&:hover": {
                background: "#f5f5f5",
                borderColor: "#E5E5E5",
              },
            }}
          >
            Log in
          </Button>

          {/* SIGN UP BUTTON */}

          <Button
            variant="contained"
            sx={{
              textTransform: "none",
              background: "#111111",
              color: "#fff",
              borderRadius: "100px",
              px: "22px",
              py: "10px",
              fontWeight: 500,
              fontSize: "16px",
              fontFamily: PRODUCT_SANS,
              boxShadow: "none",

              "&:hover": {
                background: "#222222",
                boxShadow: "none",
              },
            }}
          >
            Sign up
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavbarSection;
