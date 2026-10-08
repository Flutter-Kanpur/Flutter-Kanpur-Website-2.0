"use client";

import Box from "@mui/material/Box";
import { IoFilterOutline } from "react-icons/io5";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import { discussionFilters } from "@/data/communityScreenData";

const pillSx = {
  flexShrink: 0,
  display: "flex",
  alignItems: "center",
  gap: "6px",
  padding: "10px 16px",
  borderRadius: "999px",
  border: "1px solid #E5E5E5",
  background: "#FFFFFF",
  fontFamily: 'var(--font-product-sans), "Product Sans", sans-serif',
  fontSize: "14px",
  fontWeight: 500,
  color: "#000000",
  whiteSpace: "nowrap",
};

const FilterRow = () => {
  return (
    <Box
      sx={{
        display: "flex",
        overflowX: "auto",
        gap: "10px",
        mx: "-16px",
        px: "16px",
        "&::-webkit-scrollbar": { display: "none" },
        scrollbarWidth: "none",
      }}
    >
      <Box sx={pillSx}>
        <IoFilterOutline size={15} />
        Filters
        <KeyboardArrowDownRoundedIcon sx={{ fontSize: 16 }} />
      </Box>

      {discussionFilters.map((filter) => (
        <Box key={filter} sx={pillSx}>
          {filter}
        </Box>
      ))}
    </Box>
  );
};

export default FilterRow;
