"use client";

import { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import PrimaryButton from "@/components/buttons/PrimaryButton/PrimaryButton";
import { t, fontFamily } from "../tokens";

const ReplyComposer = ({ placeholder, submitLabel, onSubmit }) => {
  const [value, setValue] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [notAuthenticated, setNotAuthenticated] = useState(false);

  const canSubmit = value.trim().length > 0;

  const handleSubmit = async () => {
    if (!canSubmit || isSubmitting) return;
    setIsSubmitting(true);
    setErrorMessage("");
    setNotAuthenticated(false);

    try {
      const result = await onSubmit(value.trim());
      if (result?.notAuthenticated) {
        setNotAuthenticated(true);
        setErrorMessage("Please sign in to post a reply");
      } else if (result?.error) {
        setErrorMessage(
          result.error.message || "Failed to post reply. Please try again."
        );
      } else {
        setValue("");
        setErrorMessage("");
        setNotAuthenticated(false);
      }
    } catch (err) {
      setErrorMessage(err?.message || "An unexpected error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box>
      <TextField
        fullWidth
        multiline
        minRows={3}
        value={value}
        onChange={(event) => {
          setValue(event.target.value);
          if (errorMessage) setErrorMessage("");
          if (notAuthenticated) setNotAuthenticated(false);
        }}
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

      {notAuthenticated && (
        <Typography
          sx={{
            fontFamily,
            fontSize: t.typography.paragraph3.fontSize,
            color: "error.main",
            mt: 1,
          }}
        >
          Please sign in to post a reply.{" "}
          <Link
            href="/auth/login"
            style={{
              color: t.text.link,
              textDecoration: "underline",
              fontWeight: 600,
            }}
          >
            Sign in
          </Link>
        </Typography>
      )}

      {errorMessage && !notAuthenticated && (
        <Typography
          sx={{
            fontFamily,
            fontSize: t.typography.paragraph3.fontSize,
            color: "error.main",
            mt: 1,
          }}
        >
          {errorMessage}
        </Typography>
      )}

      <Box
        sx={{ display: "flex", justifyContent: "flex-end", mt: t.spacing.md }}
      >
        <PrimaryButton
          fullWidth={false}
          disabled={!canSubmit || isSubmitting}
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
          {isSubmitting ? "Posting..." : submitLabel}
        </PrimaryButton>
      </Box>
    </Box>
  );
};

export default ReplyComposer;
