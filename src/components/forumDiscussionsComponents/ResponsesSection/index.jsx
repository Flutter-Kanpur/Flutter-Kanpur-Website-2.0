"use client";

import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import ReplyComposer from "../ReplyComposer";
import ResponseItem from "../ResponseItem";
import { t, fontFamily } from "../tokens";

const ResponsesSection = ({
  label,
  responses = [],
  replyPlaceholder,
  replySubmitLabel,
  onAddResponse,
  onToggleLike,
}) => (
  <Box component="section" sx={{ mt: t.spacing.xl }}>
    <Divider
      sx={{ borderStyle: "dashed", borderColor: t.border.strong, mb: t.spacing.xl }}
    />

    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: t.spacing.sm,
        mb: t.spacing.lg,
      }}
    >
      <Typography
        component="h3"
        sx={{
          fontFamily,
          fontSize: t.typography.heading2.fontSize,
          fontWeight: t.typography.heading2.fontWeight,
          color: t.text.heading,
        }}
      >
        {label}
      </Typography>

      <Box
        aria-label={`${responses.length} responses`}
        sx={{
          width: 20,
          height: 20,
          borderRadius: t.radius.full,
          border: `1px solid ${t.border.strong}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily,
          fontSize: "11px",
          color: t.text.heading,
        }}
      >
        {responses.length}
      </Box>
    </Box>

    <ReplyComposer
      placeholder={replyPlaceholder}
      submitLabel={replySubmitLabel}
      onSubmit={onAddResponse}
    />

    <Stack spacing={0} sx={{ mt: t.spacing.xl }}>
      {responses.map((response) => (
        <ResponseItem
          key={response.id}
          response={response}
          onToggleLike={() => onToggleLike(response.id)}
        />
      ))}
    </Stack>
  </Box>
);

export default ResponsesSection;
