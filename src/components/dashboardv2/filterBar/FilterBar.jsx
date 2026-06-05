import React from "react";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import { IoFilterOutline } from "react-icons/io5";
import Image from "next/image";

/**
 * FILTER_OPTIONS — config for the filter buttons
 */
const FILTER_OPTIONS = [
  { key: "filters", label: "Filters", icon: true },
  { key: "myevents", label: "My events" },
  { key: "announcements", label: "Announcements" },
  { key: "updates", label: "Updates" },
  { key: "events", label: "Events" },
];

const FILTER_WIDTHS = {
  filters: "107px",
  myevents: "96px",
  announcements: "136px",
  updates: "85px",
  events: "74px",
};

/**
 * FilterBar
 */
const FilterBar = ({
  activeFilter = null,
  hasModalFilters = false,
  onQuickFilter,
  onOpenModal,
}) => {
  const handleClick = (key) => {
    if (key === "filters") {
      onOpenModal?.();
    } else {
      onQuickFilter?.(activeFilter === key ? null : key);
    }
  };

  const isActive = (key) => {
    if (key === "filters") return hasModalFilters;
    return activeFilter === key;
  };

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        gap: "8px",
        overflowX: "auto",
        pb: "4px",
        scrollbarWidth: "none",
        "&::-webkit-scrollbar": {
          display: "none",
        },
      }}
    >
      {FILTER_OPTIONS.map(({ key, label, icon }) => {
        const active = isActive(key);

        return (
          <Chip
            key={key}
            label={label}
            icon={
              icon ? (
                <Image
                  src="/assets/landing-page-assets/filter-icon.png"
                  alt="Filter"
                  width={16}
                  height={16}
                />
              ) : undefined
            }
            deleteIcon={
              key === "filters" ? (
                <Image
                  src="/assets/landing-page-assets/down-arrow.png"
                  alt="Arrow"
                  width={12}
                  height={12}
                />
              ) : undefined
            }
            onDelete={key === "filters" ? () => {} : undefined}
            onClick={() => handleClick(key)}
            variant="outlined"
            sx={{
              flexShrink: 0,

              width: FILTER_WIDTHS[key],
              height: "36px",

              borderRadius: "8px",

              px: "7px",
              py: "4px",

              backgroundColor: "#FFFFFF",

              border: active ? "1px solid #4F46E5" : "1px solid #D1D1D1",

              boxShadow: "inset 0px 0px 10px 0px #B3C4FF6E",

              color: "#1F1F1F",

              fontFamily:
                'var(--font-product-sans), "Product Sans", sans-serif',

              fontWeight: 500,
              fontSize: "14px",
              lineHeight: "20px",
              letterSpacing: "0",
              textTransform: "none",

              transition: "all 0.2s ease",

              "& .MuiChip-label": {
                px: 0,
                overflow: "visible",

                fontFamily:
                  'var(--font-product-sans), "Product Sans", sans-serif',
                fontWeight: 500,
                fontSize: "14px",
                lineHeight: "20px",
                letterSpacing: "0",
              },

              "& .MuiChip-icon": {
                color: "#1F1F1F",
                marginLeft: "0px",
                marginRight: "4px",
                fontSize: "16px",
              },

              "& .MuiChip-deleteIcon": {
                margin: 0,
                marginRight: "4px",
                width: "12px",
                height: "12px",
                color: "transparent",
              },

              "&:hover": {
                backgroundColor: "#FFFFFF",
              },
            }}
          />
        );
      })}
    </Box>
  );
};

export default FilterBar;
