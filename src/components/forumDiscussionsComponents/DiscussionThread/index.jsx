"use client";

import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import AttachmentCarousel from "../AttachmentCarousel";
import AuthorRow from "../AuthorRow";
import TagChip from "../TagChip";
import { t, fontFamily } from "../tokens";

/** The opening post: title, tags, body, attachments and the author line. */
const DiscussionThread = ({ discussion, onTagClick }) => (
  <Box component="article">
    <Typography
      component="h2"
      sx={{
        fontFamily,
        fontSize: { xs: t.typography.display3.fontSize, md: "31.88px" },
        fontWeight: t.typography.heading1.fontWeight,
        lineHeight: 1.25,
        color: t.text.heading,
      }}
    >
      {discussion.title}
    </Typography>

    {discussion.tags?.length > 0 && (
      <Stack
        direction="row"
        flexWrap="wrap"
        spacing={0}
        sx={{ gap: t.spacing.md, mt: t.spacing.xl }}
      >
        {discussion.tags.map((tag) => (
          <TagChip
            key={tag}
            label={tag}
            onClick={onTagClick ? () => onTagClick(tag) : undefined}
          />
        ))}
      </Stack>
    )}

    <Divider sx={{ mt: t.spacing.xl, borderColor: t.border.subtle }} />

    <Typography
      sx={{
        fontFamily,
        fontSize: t.typography.paragraph3.fontSize,
        fontWeight: t.typography.paragraph3.fontWeight,
        lineHeight: 1.7,
        color: t.text.body,
        mt: t.spacing.xl,
      }}
    >
      {discussion.body}
    </Typography>

    <AttachmentCarousel
      attachments={discussion.attachments}
      label={`Attachments for ${discussion.title}`}
    />

    <Box sx={{ mt: t.spacing.xl }}>
      <AuthorRow
        author={discussion.author}
        timeLabel={`Posted ${discussion.postedAt}`}
      />
    </Box>
  </Box>
);

export default DiscussionThread;
