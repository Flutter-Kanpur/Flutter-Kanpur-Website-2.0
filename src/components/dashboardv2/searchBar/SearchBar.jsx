import React from "react";
import Box from "@mui/material/Box";
import Image from "next/image";
import Typography from "@mui/material/Typography";
import { IoSearchOutline, IoMicOutline } from "react-icons/io5";

/**
 * SearchBar — Presentational "fake" search bar on the Dashboard.
 * Tapping anywhere on it triggers onSearchClick to navigate to SearchScreen.
 *
 * @param {function} onSearchClick – Callback when user taps the bar
 */
const SearchBar = ({ onSearchClick = () => {} }) => {
  return (
    <Box
      onClick={onSearchClick}
      sx={{
        display: "flex",
        alignItems: "center",
        width: "100%",
        height: "68px",
        bgcolor: "#FFFFFF",
        borderRadius: "40px",
        px: "18px",
        border: "2px solid #E3E3E3",
        boxShadow: "0px 4px 12px rgba(0,0,0,0.08)",
        cursor: "pointer",
        boxSizing: "border-box",
      }}
    >
      {/* Search Icon */}
      <Image
        src="/assets/landing-page-assets/search.png"
        alt="Search"
        width={18}
        height={18}
        style={{
          flexShrink: 0,
          objectFit: "contain",
        }}
      />

      {/* Placeholder */}
      <Typography
        sx={{
          flex: 1,
          fontSize: "16px",
          fontWeight: 400,
          color: "#929292",
          userSelect: "none",
          lineHeight: 1,
        }}
      >
        Search for events...
      </Typography>

      {/* Divider */}
      <Box
        sx={{
          width: "1px",
          height: "32px",
          bgcolor: "#454545",
          mx: "10px",
          flexShrink: 0,
        }}
      />

      {/* Mic Icon */}
      <Image
        src="/assets/landing-page-assets/mic.png"
        alt="Mic"
        width={18}
        height={18}
        style={{
          flexShrink: 0,
          objectFit: "contain",
        }}
      />
    </Box>
  );
};

export default SearchBar;
