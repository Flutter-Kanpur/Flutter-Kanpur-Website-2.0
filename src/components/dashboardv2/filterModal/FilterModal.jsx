import React, { useState, useEffect } from "react";
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { IoClose } from "react-icons/io5";

const FILTER_SECTIONS = [
  {
    key: "status",
    title: "Status-based",
    multiSelect: false,
    options: ["Flutter", "Live", "Today", "Past"],
  },
  {
    key: "mode",
    title: "Mode / Format",
    multiSelect: false,
    options: ["Online", "Offline"],
  },
  {
    key: "timeRange",
    title: "Time-based",
    multiSelect: false,
    options: ["This Week", "This Month"],
  },
  {
    key: "access",
    title: "Access",
    multiSelect: false,
    options: ["Free", "Open to All"],
  },
  {
    key: "tags",
    title: "Interest / Type",
    multiSelect: true,
    options: ["Flutter", "UI / UX", "Advanced", "Beginner Friendly", "Design"],
  },
];

export const EMPTY_FILTERS = {
  status: null,
  mode: null,
  timeRange: null,
  access: null,
  tags: [],
};

const FilterModal = ({ isOpen, filters, onApply, onClose }) => {
  const [draft, setDraft] = useState({
    ...EMPTY_FILTERS,
    ...filters,
  });

  useEffect(() => {
    if (isOpen) {
      setDraft({
        ...EMPTY_FILTERS,
        ...filters,
      });
    }
  }, [isOpen, filters]);

  const toggleSingle = (sectionKey, value) => {
    setDraft((prev) => ({
      ...prev,
      [sectionKey]: prev[sectionKey] === value ? null : value,
    }));
  };

  const toggleMulti = (sectionKey, value) => {
    setDraft((prev) => {
      const arr = prev[sectionKey] || [];

      return {
        ...prev,
        [sectionKey]: arr.includes(value)
          ? arr.filter((v) => v !== value)
          : [...arr, value],
      };
    });
  };

  const clearAll = () => setDraft({ ...EMPTY_FILTERS });

  const handleApply = () => {
    onApply?.(draft);
    onClose?.();
  };

  const isChipActive = (sectionKey, value) => {
    const val = draft[sectionKey];

    if (Array.isArray(val)) {
      return val.includes(value);
    }

    return val === value;
  };

  const activeCount = Object.entries(draft).reduce((count, [, val]) => {
    if (Array.isArray(val)) {
      return count + val.length;
    }

    return val ? count + 1 : count;
  }, 0);

  return (
    <Drawer
      anchor="bottom"
      open={isOpen}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: "100%",
          maxWidth: "100%",

          borderTopLeftRadius: "28px",
          borderTopRightRadius: "28px",

          bgcolor: "#FFFFFF",

          pt: "6px",
          pb: "24px",

          maxHeight: "90vh",
          overflowY: "auto",
          boxSizing: "border-box",

          "&::-webkit-scrollbar": {
            display: "none",
          },
        },
      }}
    >
      {/* Drag Handle */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mb: "14px",
        }}
      >
        <Box
          sx={{
            width: "64px",
            height: "4px",
            borderRadius: "999px",
            bgcolor: "#1F1F1F",
          }}
        />
      </Box>

      {/* Header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          px: "24px",
          pb: "10px",
          pt: "2px",
        }}
      >
        <Typography
          sx={{
            fontSize: "22px",
            fontWeight: 600,
            color: "#111827",
          }}
        >
          Filters
        </Typography>

        <IconButton
          onClick={onClose}
          sx={{
            width: "36px",
            height: "36px",
            bgcolor: "#2D2D2D",
            color: "#FFFFFF",

            "&:hover": {
              bgcolor: "#2D2D2D",
            },
          }}
        >
          <IoClose size={18} />
        </IconButton>
      </Box>

      {/* Divider */}
      <Box px="20px">
        <Box
          sx={{
            height: "1px",
            width: "100%",
            bgcolor: "#ECEFF3",
            mb: "28px",
          }}
        />
      </Box>

      {/* Sections */}
      <Box px="24px" pt="16px">
        {FILTER_SECTIONS.map((section) => (
          <Box
            key={section.key}
            sx={{
              mb: "32px",
            }}
          >
            <Typography
              sx={{
                fontSize: "20px",
                fontWeight: 500,
                lineHeight: "28px",
                color: "#111827",
                mb: "16px",
              }}
            >
              {section.title}
            </Typography>

            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: "12px",
              }}
            >
              {section.options.map((option) => {
                const active = isChipActive(section.key, option);

                return (
                  <Chip
                    key={option}
                    label={option}
                    onClick={() =>
                      section.multiSelect
                        ? toggleMulti(section.key, option)
                        : toggleSingle(section.key, option)
                    }
                    sx={{
                      height: "40px",
                      borderRadius: "10px",

                      bgcolor: active ? "#EEF3FF" : "#EEF2FA",

                      border: active
                        ? "1.5px solid #4F6DFF"
                        : "1.5px solid transparent",

                      color: "#111827",

                      transition: "all 0.15s ease",

                      "& .MuiChip-label": {
                        px: "20px",
                        fontSize: "16px",
                        fontWeight: 400,
                        lineHeight: "24px",
                      },

                      "&:hover": {
                        bgcolor: active ? "#EEF3FF" : "#EEF2FA",
                      },
                    }}
                  />
                );
              })}
            </Box>
          </Box>
        ))}
      </Box>

      {/* Footer */}
      <Box px="24px">
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "12px",
            mt: "8px",
          }}
        >
          <Button
            variant="text"
            onClick={clearAll}
            disabled={activeCount === 0}
            sx={{
              textTransform: "none",
              fontWeight: 600,
              fontSize: "15px",
            }}
          >
            Clear All
          </Button>

          <Button
            variant="contained"
            disableElevation
            onClick={handleApply}
            sx={{
              flex: 1,
              maxWidth: "220px",
              height: "48px",
              borderRadius: "999px",
              textTransform: "none",
              fontSize: "15px",
              fontWeight: 600,
            }}
          >
            Apply Filters
            {activeCount > 0 ? ` (${activeCount})` : ""}
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
};

export default FilterModal;
