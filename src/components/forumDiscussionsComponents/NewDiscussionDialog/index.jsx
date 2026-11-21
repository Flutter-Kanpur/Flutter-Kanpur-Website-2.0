"use client";

import { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Link from "next/link";

import PrimaryButton from "@/components/buttons/PrimaryButton/PrimaryButton";
import { t, fontFamily } from "../tokens";

const fieldSx = {
  "& .MuiInputBase-root": {
    fontFamily,
    fontSize: t.typography.paragraph3.fontSize,
    borderRadius: t.radius.sm,
  },
  "& .MuiInputLabel-root": {
    fontFamily,
    fontSize: t.typography.paragraph3.fontSize,
  },
};

const NewDiscussionDialog = ({ open, form, onClose, onSubmit }) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [notAuthenticated, setNotAuthenticated] = useState(false);

  const canSubmit = title.trim().length > 0 && body.trim().length > 0;

  const close = () => {
    if (isSubmitting) return;
    setTitle("");
    setBody("");
    setTags("");
    setErrorMessage("");
    setNotAuthenticated(false);
    onClose();
  };

  const handleSubmit = async () => {
    if (!canSubmit || isSubmitting) return;
    setIsSubmitting(true);
    setErrorMessage("");
    setNotAuthenticated(false);

    try {
      const result = await onSubmit({
        title: title.trim(),
        body: body.trim(),
        tags: tags
          .split(",")
          .map((tag) => tag.trim())
          .filter(Boolean),
      });

      if (result?.notAuthenticated) {
        setNotAuthenticated(true);
        setErrorMessage("Please sign in to start a discussion");
      } else if (result?.error) {
        setErrorMessage(
          result.error.message || "Failed to create discussion. Please try again."
        );
      } else {
        close();
      }
    } catch (err) {
      setErrorMessage(err?.message || "An unexpected error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={close}
      fullWidth
      maxWidth="sm"
      slotProps={{ paper: { sx: { borderRadius: t.radius.md } } }}
    >
      <DialogTitle
        sx={{
          fontFamily,
          fontSize: t.typography.heading2.fontSize,
          fontWeight: t.typography.label1.fontWeight,
          color: t.text.heading,
        }}
      >
        {form.heading}
      </DialogTitle>

      <DialogContent>
        <Stack spacing={t.spacing.lg} sx={{ pt: t.spacing.sm }}>
          <TextField
            autoFocus
            fullWidth
            required
            label={form.titleLabel}
            placeholder={form.titlePlaceholder}
            value={title}
            onChange={(event) => {
              setTitle(event.target.value);
              if (errorMessage) setErrorMessage("");
              if (notAuthenticated) setNotAuthenticated(false);
            }}
            sx={fieldSx}
          />
          <TextField
            fullWidth
            required
            multiline
            minRows={3}
            label={form.bodyLabel}
            placeholder={form.bodyPlaceholder}
            value={body}
            onChange={(event) => {
              setBody(event.target.value);
              if (errorMessage) setErrorMessage("");
              if (notAuthenticated) setNotAuthenticated(false);
            }}
            sx={fieldSx}
          />
          <TextField
            fullWidth
            label={form.tagsLabel}
            placeholder={form.tagsPlaceholder}
            value={tags}
            onChange={(event) => setTags(event.target.value)}
            sx={fieldSx}
          />

          {notAuthenticated && (
            <Typography
              sx={{
                fontFamily,
                fontSize: t.typography.paragraph3.fontSize,
                color: "error.main",
              }}
            >
              Please sign in to start a discussion.{" "}
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
              }}
            >
              {errorMessage}
            </Typography>
          )}
        </Stack>
      </DialogContent>

      <DialogActions sx={{ px: t.spacing.xl, pb: t.spacing.xl }}>
        <Button
          onClick={close}
          disabled={isSubmitting}
          sx={{
            textTransform: "none",
            fontFamily,
            fontSize: t.typography.label2.fontSize,
            color: t.text.body,
          }}
        >
          {form.cancelLabel}
        </Button>

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
          {isSubmitting ? "Posting..." : form.submitLabel}
        </PrimaryButton>
      </DialogActions>
    </Dialog>
  );
};

export default NewDiscussionDialog;
