import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Image from "next/image";

const SearchBar = ({
  onSearchClick = () => {},
  placeholder = "Search for events...",
  sx = {},
}) => {
  return (
    <Box
      onClick={onSearchClick}
      sx={{
        display: "flex",
        alignItems: "center",
        bgcolor: "#FAFBFF",
        borderRadius: "24px",
        px: "16px",
        height: "52px",
        width: "100%",
        border: "1px solid #DCE8F8",
        boxShadow: "inset 0px 0px 15px #2373E23D, 0px 0px 10px #2373E236",
        cursor: "pointer",
        boxSizing: "border-box",
        ...sx,
      }}
    >
      <Image
        src="/assets/landing-page-assets/search.svg"
        alt="Search"
        width={20}
        height={20}
        style={{
          marginRight: "10px",
          flexShrink: 0,
        }}
      />

      <Typography
        sx={{
          flex: 1,
          fontSize: "16px",
          color: "#929292",
          fontWeight: 400,
          userSelect: "none",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        {placeholder}
      </Typography>

      <Box
        sx={{
          height: "24px",
          width: "1px",
          bgcolor: "#E5E7EB",
          mx: "10px",
          flexShrink: 0,
        }}
      />

      <Image
        src="/assets/landing-page-assets/mic.svg"
        alt="Mic"
        width={20}
        height={20}
        style={{
          flexShrink: 0,
        }}
      />
    </Box>
  );
};

export default SearchBar;
