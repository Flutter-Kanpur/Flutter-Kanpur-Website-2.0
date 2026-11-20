"use client";

import { Box, Button } from "@mui/material";

import { projectFilters } from "@/data/projectSubmissionsData";

export default function FilterTabs({ selected, onSelect }) {
  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: { xs: "wrap", md: "nowrap" },
        justifyContent: "space-between",
        gap: "12px",
      }}
    >
      {projectFilters.map((filter) => {
        const isActive = selected === filter.value;

        return (
          <Button
            key={filter.label}
            disableElevation
            disableRipple
            onClick={() => onSelect(filter.value)}
            sx={{
              textTransform: "none",
              fontSize: 14,
              fontWeight: 500,
              lineHeight: "20px",
              minHeight: "36px",
              px: "18px",
              py: "7px",
              minWidth: 0,
              borderRadius: "9px",
              color: "#1A1A1A",
              bgcolor: "#fff",
              border: isActive ? "1.5px solid #5A7BF6" : "1px solid #E6E6E6",
              boxShadow: "0 1px 3px rgba(16,24,40,0.06), inset 0 0 8.91px rgba(179, 196, 255, 0.43)",
              "&:hover": {
                bgcolor: "#fff",
                borderColor: isActive ? "#5A7BF6" : "#D5D5D5",
                boxShadow: "0 1px 3px rgba(16,24,40,0.06), inset 0 0 8.91px rgba(179, 196, 255, 0.43)",
              },
            }}
          >
            {filter.label}
          </Button>
        );
      })}
    </Box>
  );
}
