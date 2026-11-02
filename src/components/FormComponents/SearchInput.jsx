"use client";

import { useState } from "react";
import Box from "@mui/material/Box";
import InputBase from "@mui/material/InputBase";

const fontFamily = 'var(--font-product-sans), "Product Sans", sans-serif';

/**
 * SearchInput — controlled search pill.
 * Light glow pill by default; turns dark while focused or when it has text.
 */
const SearchInput = ({
  value = "",
  onChange,
  placeholder = "Search...",
  onMicClick,
  sx,
}) => {
  const [focused, setFocused] = useState(false);
  const dark = focused || value.length > 0;

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        height: "52px",
        px: "16px",
        boxSizing: "border-box",
        borderRadius: "26px",
        backgroundColor: dark ? "#232323" : "#FAFBFF",
        border: dark ? "1px solid #232323" : "1px solid #DCE8F8",
        boxShadow: dark
          ? "none"
          : "inset 0px 0px 15px #2373E23D, 0px 0px 10px #2373E236",
        transition: "background-color 0.2s ease, box-shadow 0.2s ease",
        ...sx,
      }}
    >
      <Box
        component="img"
        src="/assets/landing-page-assets/search.svg"
        alt=""
        sx={{
          width: "20px",
          height: "20px",
          mr: "10px",
          flexShrink: 0,
          filter: dark ? "invert(1)" : "none",
        }}
      />
      <InputBase
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder={placeholder}
        fullWidth
        inputProps={{ "aria-label": placeholder }}
        sx={{
          fontFamily,
          fontSize: "16px",
          color: dark ? "#FFFFFF" : "#1F1F1F",
          caretColor: dark ? "#FFFFFF" : "#1F1F1F",
          "& input::placeholder": {
            color: dark ? "#8C8C8C" : "#929292",
            opacity: 1,
          },
        }}
      />
      <Box
        sx={{
          height: "24px",
          width: "1px",
          mx: "10px",
          flexShrink: 0,
          backgroundColor: dark ? "#4A4A4A" : "#E5E7EB",
        }}
      />
      <Box
        component="img"
        src="/assets/landing-page-assets/mic.svg"
        alt="Voice search"
        onClick={onMicClick}
        sx={{
          width: "20px",
          height: "20px",
          flexShrink: 0,
          cursor: onMicClick ? "pointer" : "default",
          filter: dark ? "invert(1)" : "none",
        }}
      />
    </Box>
  );
};

export default SearchInput;
