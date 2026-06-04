"use client";

import React from "react";
import { Box, InputBase, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const PRODUCT_SANS = "'Product Sans', system-ui, -apple-system, sans-serif";

const SearchSection = () => {
  return (
    <Box
      sx={{
        width: "100%",
        bgcolor: "#FAFAFA",
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: "1400px",

          height: "46px",

          mx: "auto",

          px: 0,
          py: "40px",

          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* TITLE */}

        <Typography
          sx={{
            width: "193px",
            height: "29px",

            fontSize: "24px",
            fontWeight: 500,
            color: "#000000",
            fontFamily: PRODUCT_SANS,
            lineHeight: 1.1,
          }}
        >
          Search for events
        </Typography>

        {/* SEARCH BAR */}

        <Box
          sx={{
            width: "513px",
            height: "46px",

            border: "1px solid #E6E6E6",
            borderRadius: "12px",

            bgcolor: "#FFFFFF",

            px: "16px",
            py: "12px",

            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <InputBase
            placeholder="Search...  "
            sx={{
              width: "453px",
              height: "19px",

              fontSize: "16px",
              fontWeight: 400,

              fontFamily: PRODUCT_SANS,
              color: "#5D5D5D",
            }}
          />

          <SearchIcon
            sx={{
              color: "#8A8A8A",
              fontSize: "20px",
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default SearchSection;
