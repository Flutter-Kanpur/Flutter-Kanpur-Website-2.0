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
  cursor: "pointer",
  transition: "all 0.2s ease",
  "&:hover": {
    borderColor: "#4167F2",
  },
};

const activePillSx = {
  ...pillSx,
  background: "#4167F2",
  color: "#FFFFFF",
  borderColor: "#4167F2",
  "&:hover": {
    background: "#3557D6",
    borderColor: "#3557D6",
  },
};

const FilterRow = ({ activeFilter = "All", onSelectFilter = () => {} }) => {
  const allFilters = ["All", ...discussionFilters];

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
      <Box sx={pillSx} onClick={() => onSelectFilter("All")}>
        <IoFilterOutline size={15} />
        Filters
        <KeyboardArrowDownRoundedIcon sx={{ fontSize: 16 }} />
      </Box>

      {allFilters.map((filter) => {
        const isActive = activeFilter.toLowerCase() === filter.toLowerCase();
        return (
          <Box
            key={filter}
            role="button"
            tabIndex={0}
            onClick={() => onSelectFilter(filter)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onSelectFilter(filter);
              }
            }}
            sx={isActive ? activePillSx : pillSx}
          >
            {filter}
          </Box>
        );
      })}
    </Box>
  );
};

export default FilterRow;
