"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Box,
  Typography,
  InputBase,
  Select,
  MenuItem,
  Chip,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import CloseIcon from "@mui/icons-material/Close";

import PrimaryButton from "@/components/buttons/PrimaryButton/PrimaryButton";
import { techStackOptions } from "@/data/projectSubmissionsData";

const ICON_BASE = "/assets/explore-page-assets";

const FieldLabel = ({ children }) => (
  <Typography
    sx={{ fontSize: 16, fontWeight: 500, color: "#000000", mb: "8px" }}
  >
    {children}
  </Typography>
);

const fieldSx = {
  width: "100%",
  height: 44,
  border: "1px solid #E4E4E4",
  borderRadius: "10px",
  px: "14px",
  fontSize: 14,
  color: "#000000",
  bgcolor: "#fff",
  "&.Mui-focused": { borderColor: "#111" },
  "& input::placeholder": { color: "#9A9A9A", opacity: 1 },
};

const textareaSx = {
  width: "100%",
  border: "1px solid #E4E4E4",
  borderRadius: "10px",
  px: "14px",
  py: "12px",
  fontSize: 14,
  color: "#1A1A1A",
  bgcolor: "#fff",
  alignItems: "flex-start",
  "& textarea": { resize: "vertical" },
  "&.Mui-focused": { borderColor: "#111" },
  "& textarea::placeholder": { color: "#9A9A9A", opacity: 1 },
};

export default function UploadProject({ onSubmit }) {
  const [form, setForm] = useState({
    name: "",
    description: "",
    techStack: [],
    githubLink: "",
    liveLink: "",
    file: null,
  });

  const update = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));

  const addTech = (tech) => {
    if (!tech || form.techStack.includes(tech)) return;
    update("techStack", [...form.techStack, tech]);
  };

  const removeTech = (tech) =>
    update(
      "techStack",
      form.techStack.filter((t) => t !== tech),
    );

  const handleSubmit = () => onSubmit?.(form);

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: { xs: "100%", lg: 411 },
        boxSizing: "border-box",
        bgcolor: "#ffffff",
        border: "1px solid #EAEAEA",
        borderRadius: "16px",
        p: { xs: "20px", md: "24px" },
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        gap: { xs: 2, md: 2.5 },
        mx: "auto",
      }}
    >
      <Typography sx={{ fontSize: 20, fontWeight: 500, color: "#000000" }}>
        Upload project
      </Typography>

      {/* Project name */}
      <Box>
        <FieldLabel>Project name</FieldLabel>
        <InputBase
          placeholder="Enter title"
          value={form.name}
          onChange={(e) => update("name", e.target.value)}
          sx={fieldSx}
        />
      </Box>

      {/* Short description */}
      <Box>
        <FieldLabel>Short description</FieldLabel>
        <InputBase
          placeholder="Max 120 characters"
          value={form.description}
          onChange={(e) => update("description", e.target.value.slice(0, 120))}
          multiline
          minRows={5}
          maxRows={6}
          sx={textareaSx}
        />
      </Box>

      {/* Tech stack */}
      <Box>
        <FieldLabel>Tech stack</FieldLabel>
        <Select
          value=""
          displayEmpty
          onChange={(e) => addTech(e.target.value)}
          IconComponent={KeyboardArrowDownIcon}
          renderValue={() => (
            <Typography sx={{ fontSize: 16, color: "#B0B0B0" }}>
              -select-
            </Typography>
          )}
          sx={{
            width: "100%",
            height: 44,
            borderRadius: "10px",
            fontSize: 14,
            "& .MuiOutlinedInput-notchedOutline": { borderColor: "#E4E4E4" },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "#D0D0D0",
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "#111",
            },
            "& .MuiSelect-select": {
              py: 0,
              px: "14px",
              display: "flex",
              alignItems: "center",
            },
            "& .MuiSelect-icon": { color: "#1A1A1A", right: 12 },
          }}
        >
          {techStackOptions.map((tech) => (
            <MenuItem key={tech} value={tech} sx={{ fontSize: 14 }}>
              {tech}
            </MenuItem>
          ))}
        </Select>

        {form.techStack.length > 0 && (
          <Box
            sx={{ display: "flex", flexWrap: "wrap", gap: "8px", mt: "12px" }}
          >
            {form.techStack.map((tech) => (
              <Chip
                key={tech}
                label={tech}
                onDelete={() => removeTech(tech)}
                deleteIcon={<CloseIcon />}
                sx={{
                  height: 40,
                  bgcolor: "#4167F2",
                  color: "#fff",
                  fontSize: 14,
                  fontWeight: 400,
                  borderRadius: "100px",
                  px: "4px",
                  "& .MuiChip-deleteIcon": {
                    color: "rgba(255,255,255,0.9)",
                    fontSize: 15,
                    "&:hover": { color: "#fff" },
                  },
                }}
              />
            ))}
          </Box>
        )}
      </Box>

      {/* Project links */}
      <Box>
        <FieldLabel>Project links</FieldLabel>
        <Box sx={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <Box
            sx={{
              ...fieldSx,
              display: "flex",
              alignItems: "center",
              gap: "8px",
              pr: "10px",
            }}
          >
            <InputBase
              placeholder="https://github.com/username"
              value={form.githubLink}
              onChange={(e) => update("githubLink", e.target.value)}
              sx={{
                flex: 1,
                fontSize: 14,
                color: "#000000",
                "& input::placeholder": { color: "#9A9A9A", opacity: 1 },
              }}
            />
            <Box
              component="button"
              type="button"
              aria-label="Remove link"
              onClick={() => update("githubLink", "")}
              sx={{
                border: "none",
                bgcolor: "transparent",
                p: 0,
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
                flexShrink: 0,
              }}
            >
              <Image
                src={`${ICON_BASE}/delete.svg`}
                alt=""
                width={18}
                height={18}
              />
            </Box>
          </Box>

          <InputBase
            placeholder="Live demo / APK"
            value={form.liveLink}
            onChange={(e) => update("liveLink", e.target.value)}
            sx={fieldSx}
          />
        </Box>
      </Box>

      {/* Upload file */}
      <Box>
        <FieldLabel>Upload screenshot or file (optional)</FieldLabel>
        <Box
          component="label"
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "8px",
            border: "1.5px dashed #DCDCDC",
            borderRadius: "10px",
            py: "28px",
            px: "16px",
            cursor: "pointer",
            textAlign: "center",
            "&:hover": { borderColor: "#BFBFBF", bgcolor: "#FAFAFA" },
          }}
        >
          <Image
            src={`${ICON_BASE}/browse.svg`}
            alt=""
            width={24}
            height={24}
          />
          <Typography sx={{ fontSize: 16, color: "#6D6D6D" }}>
            Choose a file or drag &amp; drop it here.
          </Typography>
          <Box
            component="span"
            sx={{
              mt: "2px",
              px: "16px",
              py: "7px",
              border: "1px solid #E0E0E0",
              borderRadius: "8px",
              fontSize: 14,
              fontWeight: 500,
              color: "#000000",
              bgcolor: "#fff",
              boxShadow: "inset 0 0 8.91px rgba(179, 196, 255, 0.43)",
            }}
          >
            {form.file ? form.file.name : "Browse files"}
          </Box>
          <input
            type="file"
            hidden
            onChange={(e) => update("file", e.target.files?.[0] ?? null)}
          />
        </Box>
      </Box>

      {/* Submit */}
      <PrimaryButton
        onClick={handleSubmit}
        endIcon={
          <Image
            src={`${ICON_BASE}/right-arrow.svg`}
            alt=""
            width={18}
            height={18}
          />
        }
        sx={{
          width: "100%",
          minWidth: 0,
          maxWidth: "none",
          height: 52,
          fontsize: 16,
          fontWeight: 400,
          borderRadius: "100px",
          
        }}
      >
        Submit project
      </PrimaryButton>
    </Box>
  );
}
