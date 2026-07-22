"use client";

import React from "react";
import { Box, Button, Typography } from "@mui/material";
import Image from "next/image";
import GuidelineCard from "./guidelineCard";

const guidelinesData = [
  {
    title: "Respect & Conduct",
    description:
      "We expect all members to interact with each other respectfully and professionally. Differences in opinions, experience levels, and perspectives are natural and welcome, but disrespectful behavior, harassment, or offensive language is not acceptable. Every member deserves to be treated with dignity.",
  },
  {
    title: "Inclusivity",
    description:
      "Flutter Kanpur is an inclusive community. We encourage patience, empathy, and support—especially toward beginners and new members. Avoid language or behavior that may discourage participation or make others feel unwelcome. Inclusivity helps the community grow stronger.",
  },
  {
    title: "Meaningful Participation",
    description:
      "Conversations, feedback, and contributions should be constructive and relevant. Healthy discussions are encouraged, but personal attacks, unnecessary negativity, or disruptive behavior reduce the value of the community. When offering feedback, focus on being helpful and respectful.",
  },
  {
    title: "Responsible Sharing",
    description:
      "Members are encouraged to share resources, projects, and opportunities that add value to the community. Excessive self-promotion, spam, or irrelevant advertising is discouraged. Sharing should always prioritize community benefit over personal promotion.",
  },
  {
    title: "Privacy & Trust",
    description:
      "Respecting privacy is essential. Do not share personal information, private conversations, or sensitive details without consent. Trust allows members and contributors to collaborate openly and confidently.",
  },
];

export default function CommunityGuidelines() {
  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100%",
        bgcolor: "#fff",
        px: { xs: 2.5, md: 4, lg: 5 },
        pt: { xs: 2, md: 3.5 },
        pb: { xs: 4, md: 6 },
        overflowY: "auto",
      }}
    >
      <Button
        variant="outlined"
        size="small"
        onClick={() => window.history.back()}
        startIcon={
          <Image
            src="/assets/profile-page-assets/back_arrow_icon.svg"
            alt="Back"
            width={14}
            height={14}
          />
        }
        sx={{
          height: { xs: 36, md: 40 },
          minWidth: "auto",
          width: "fit-content",
          borderRadius: "12px",
          px: 2,
          mb: { xs: 3, md: 4 },
          borderColor: "#DADADA",
          color: "#3A3A3A",
          fontSize: { xs: "14px", md: "16px" },
          fontWeight: 500,
          textTransform: "none",
          boxShadow: "0px 1px 3px rgba(0,0,0,0.05)",
          "& .MuiButton-startIcon": { mr: 0.75 },
          "&:hover": {
            borderColor: "#DADADA",
            background: "#fff",
          },
        }}
      >
        Back
      </Button>

      <Box sx={{ maxWidth: 1500, mb: { xs: 3, md: 4 } }}>
        <Typography
          component="h1"
          sx={{
            fontSize: { xs: 22, md: 28 },
            fontWeight: 700,
            color: "#111",
            letterSpacing: "-0.02em",
            mb: 1.5,
          }}
        >
          Community Guidelines
        </Typography>
        <Typography
          sx={{
            fontSize: { xs: 14, md: 18 },
            color: "#666",
            lineHeight: 1.7,
            maxWidth: 1500,
          }}
        >
          Flutter Kanpur is a collaborative space for developers, designers,
          learners, and contributors to connect, learn, and grow together. Our
          goal is to create an environment where everyone feels safe, respected,
          and encouraged to participate. These guidelines exist to maintain a
          healthy and welcoming community experience for all members.
        </Typography>
      </Box>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            md: "1fr 1fr",
          },
          gap: { xs: 2, md: 2.5 },
          maxWidth: 1500,
        }}
      >
        {guidelinesData.map((guideline) => (
          <GuidelineCard
            key={guideline.title}
            title={guideline.title}
            description={guideline.description}
          />
        ))}
      </Box>

      <Typography
        sx={{
          mt: { xs: 4, md: 6 },
          pt: 2,
          borderTop: "1px solid #F0F0F0",
          fontSize: 16,
          color: "#9CA3AF",
          maxWidth: 1500,
        }}
      >
        Last Updated on April, 2026
      </Typography>
    </Box>
  );
}
