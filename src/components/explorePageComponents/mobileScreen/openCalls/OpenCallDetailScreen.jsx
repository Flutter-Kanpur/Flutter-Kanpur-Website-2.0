"use client";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/navigation";
import MobileScreenShell from "@/components/FormComponents/MobileScreenShell";
import FormSubmitButton from "@/components/FormComponents/FormSubmitButton";
import Tag from "../Tag";
import { colors } from "@/theme/colors";
import { openCalls } from "@/data/exploreScreenData.js";

const fontFamily = 'var(--font-product-sans), "Product Sans", sans-serif';

const Section = ({ heading, children }) => (
  <Box sx={{ mt: "24px" }}>
    <Typography
      sx={{
        fontFamily,
        fontSize: "16px",
        lineHeight: "24px",
        color: colors.neutral[950],
      }}
    >
      {heading}
    </Typography>
    <Typography
      sx={{
        mt: "8px",
        fontFamily,
        fontSize: "16px",
        lineHeight: "24px",
        color: colors.neutral[500],
        whiteSpace: "pre-line",
      }}
    >
      {children}
    </Typography>
  </Box>
);

/**
 * OpenCallDetailScreen — Mobile open-call details
 * (route: /explore/open-calls/[id])
 */
const OpenCallDetailScreen = ({ callId }) => {
  const router = useRouter();
  const call =
    openCalls.find((c) => String(c.id) === String(callId)) ?? openCalls[0];

  const handleApply = () => router.push(`/explore/open-calls/${call.id}/apply`);

  return (
    <MobileScreenShell title="Open calls" contentSx={{ pt: "26px" }}>
      <Typography
        sx={{
          fontFamily,
          fontSize: "24px",
          lineHeight: "32px",
          color: colors.neutral[950],
        }}
      >
        {call.title}
      </Typography>

      <Typography
        sx={{
          mt: "12px",
          fontFamily,
          fontSize: "16px",
          lineHeight: "24px",
          color: colors.neutral[500],
        }}
      >
        {call.summary}
      </Typography>

      <Box sx={{ mt: "11px", display: "flex" }}>
        <Tag
          label={call.type}
          sx={{
            height: "32px",
            backgroundColor: "#FFFFFF",
            border: `1px solid ${colors.neutral[200]}`,
          }}
        />
      </Box>

      <Box sx={{ mt: "22px", borderTop: "1px dashed #D1D1D1" }} />

      <Box sx={{ mt: "2px" }}>
        <Section heading="About this opportunity">{call.about}</Section>
        <Section heading="Who can apply">{call.whoCanApply}</Section>
        <Section heading="What we’re looking for">{call.lookingFor}</Section>
        <Section heading="Application deadline">{call.deadline}</Section>
      </Box>

      <Box sx={{ mt: "22px" }}>
        <FormSubmitButton
          showArrow
          onClick={handleApply}
          sx={{
            width: "100%",
            minWidth: 0,
            maxWidth: "none",
            height: 46,
            fontSize: 16,
            fontWeight: 400,
          }}
        >
          Apply now
        </FormSubmitButton>
      </Box>
    </MobileScreenShell>
  );
};

export default OpenCallDetailScreen;
