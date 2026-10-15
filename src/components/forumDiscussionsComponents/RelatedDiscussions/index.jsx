"use client";

import Box from "@mui/material/Box";
import ButtonBase from "@mui/material/ButtonBase";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import AttachmentCarousel from "../AttachmentCarousel";
import AuthorRow from "../AuthorRow";
import { t, fontFamily } from "../tokens";

const RelatedDiscussions = ({
  title,
  discussions = [],
  answersLabel,
  onSelect,
  emptyLabel,
}) => (
  <Box
    component="aside"
    aria-label={title}
    sx={{
      bgcolor: t.surface.card,
      border: `1px solid ${t.border.subtle}`,
      borderRadius: t.radius.sm,
      p: t.spacing.md,
    }}
  >
    <Typography
      component="h2"
      sx={{
        fontFamily,
        fontSize: t.typography.paragraph3.fontSize,
        fontWeight: t.typography.label2.fontWeight,
        color: t.text.heading,
        px: t.spacing.sm,
        pt: t.spacing.sm,
      }}
    >
      {title}
    </Typography>

    <Divider sx={{ mt: t.spacing.md, borderColor: t.border.subtle }} />

    {discussions.length === 0 ? (
      <Typography
        sx={{
          fontFamily,
          fontSize: t.typography.label3.fontSize,
          color: t.text.muted,
          px: t.spacing.sm,
          py: t.spacing.lg,
        }}
      >
        {emptyLabel}
      </Typography>
    ) : (
      <Stack spacing={t.spacing.md} sx={{ mt: t.spacing.md }}>
        {discussions.map((discussion) => (
          <ButtonBase
            key={discussion.id}
            onClick={() => onSelect(discussion.id)}
            disableRipple
            sx={{
              display: "block",
              width: "100%",
              textAlign: "left",
              border: `1px solid ${t.border.subtle}`,
              borderRadius: t.radius.sm,
              p: t.spacing.md,
              transition:
                "border-color 0.15s ease, background-color 0.15s ease",
              "&:hover": {
                borderColor: t.border.active,
                bgcolor: t.surface.hover,
              },
            }}
          >
            <Typography
              sx={{
                fontFamily,
                fontSize: t.typography.paragraph3.fontSize,
                fontWeight: t.typography.paragraph3.fontWeight,
                lineHeight: 1.5,
                color: t.text.link,
              }}
            >
              {discussion.title}
            </Typography>

            <AttachmentCarousel
              attachments={discussion.attachments?.slice(0, 2)}
              width={t.size.railAttachment.width}
              height={t.size.railAttachment.height}
              viewportWidth="100%"
              viewportHeight={t.size.railAttachment.height}
              label={`Attachments for ${discussion.title}`}
              showControls={false}
            />

            <Box sx={{ mt: t.spacing.md }}>
              <AuthorRow
                author={discussion.author}
                timeLabel={discussion.postedAt}
                size="sm"
                trailing={
                  <Typography
                    sx={{
                      fontFamily,
                      fontSize: t.typography.label3.fontSize,
                      color: t.text.heading,
                      flexShrink: 0,
                    }}
                  >
                    {discussion.responses.length} {answersLabel}
                  </Typography>
                }
              />
            </Box>
          </ButtonBase>
        ))}
      </Stack>
    )}
  </Box>
);

export default RelatedDiscussions;
