"use client";

import { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import PrimaryButton from "@/components/buttons/PrimaryButton/PrimaryButton";
import { t, fontFamily } from "../tokens";

const ReplyComposer = ({ placeholder, submitLabel, onSubmit }) => {
  const [value, setValue] = useState("");
  const canSubmit = value.trim().length > 0;

  const handleSubmit = () => {
    if (!canSubmit) return;
    onSubmit(value.trim());
    setValue("");
  };

  return (
    <Box>
      <TextField
        fullWidth
        multiline
        minRows={3}
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder={placeholder}
        aria-label={placeholder}
        slotProps={{
          input: {
            sx: {
              fontFamily,
              fontSize: t.typography.paragraph3.fontSize,
              color: t.text.heading,
              borderRadius: t.radius.sm,
              alignItems: "flex-start",
              minHeight: t.size.replyMinHeight,
              p: t.spacing.lg,
              "& textarea::placeholder": {
                color: t.text.muted,
                opacity: 1,
              },
              "& fieldset": { borderColor: t.border.strong },
              "&:hover fieldset": { borderColor: t.border.strong },
              "&.Mui-focused fieldset": { borderColor: t.border.active },
            },
          },
        }}
      />

      <Box
        sx={{ display: "flex", justifyContent: "flex-end", mt: t.spacing.md }}
      >
        <PrimaryButton
          fullWidth={false}
          disabled={!canSubmit}
          onClick={handleSubmit}
          sx={{
            width: "auto",
            minWidth: 0,
            maxWidth: "none",
            height: 40,
            px: t.spacing.xl,
            fontFamily,
            fontSize: t.typography.label2.fontSize,
          }}
        >
          {submitLabel}
        </PrimaryButton>
      </Box>
    </Box>
  );
};

export default ReplyComposer;
