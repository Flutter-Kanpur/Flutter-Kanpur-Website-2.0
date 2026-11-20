"use client";

import { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import ButtonBase from "@mui/material/ButtonBase";
import MobileScreenShell from "@/components/FormComponents/MobileScreenShell";
import DetailSection from "@/components/FormComponents/DetailSection";
import FormSubmitButton from "@/components/FormComponents/FormSubmitButton";
import Tag from "../Tag";
import { CompanyLogo } from "./JobCard";
import { colors } from "@/theme/colors";
import { jobs } from "@/data/jobsData";

const fontFamily = 'var(--font-product-sans), "Product Sans", sans-serif';

const InfoTile = ({ label, value }) => (
  <Box
    sx={{
      minWidth: "110px",
      boxSizing: "border-box",
      pt: "14px",
      pb: "12px",
      px: "16px",
      borderRadius: "16px",
      backgroundColor: colors.primary[50],
    }}
  >
    <Typography
      sx={{
        fontFamily,
        fontSize: "16px",
        fontWeight: 500,
        lineHeight: "24px",
        color: colors.neutral[950],
      }}
    >
      {label}
    </Typography>
    <Typography
      sx={{
        mt: "2px",
        fontFamily,
        fontSize: "14px",
        lineHeight: "20px",
        color: colors.neutral[500],
      }}
    >
      {value}
    </Typography>
  </Box>
);

/**
 * JobDetailScreen — Mobile "Job details" (route: /explore/jobs/[id])
 */
const JobDetailScreen = ({ jobId }) => {
  const job = jobs.find((j) => String(j.id) === String(jobId)) ?? jobs[0];
  const [saved, setSaved] = useState(Boolean(job.saved));

  const handleApply = () => {
    if (job.applyUrl) window.open(job.applyUrl, "_blank", "noopener,noreferrer");
  };

  const { info } = job;

  return (
    <MobileScreenShell title="Job details" contentSx={{ pt: "16px" }}>
      <Typography
        sx={{
          fontFamily,
          fontSize: "24px",
          lineHeight: "32px",
          color: colors.neutral[950],
        }}
      >
        {job.title}
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
        {job.description}
      </Typography>

      <Box sx={{ mt: "10px", display: "flex", alignItems: "center", gap: "8px" }}>
        <CompanyLogo company={job.company} />
        <Typography
          sx={{
            fontFamily,
            fontSize: "14px",
            lineHeight: "20px",
            color: colors.neutral[500],
          }}
        >
          {job.company.name} | {job.company.location}
        </Typography>
      </Box>

      <Box sx={{ mt: "10px", display: "flex", flexWrap: "wrap", gap: "8px" }}>
        {job.tags.map((tag) => (
          <Tag
            key={tag}
            label={tag}
            sx={{
              height: "33px",
              backgroundColor: "#FFFFFF",
              border: `1px solid ${colors.neutral[100]}`,
            }}
          />
        ))}
      </Box>

      <Box sx={{ mt: "22px", borderTop: "1px dashed #D1D1D1" }} />

      <DetailSection heading="Required Skills" mt="26px">
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
          {job.skills.map((skill) => (
            <Tag
              key={skill}
              label={skill}
              sx={{
                height: "32px",
                backgroundColor: colors.primary[100],
                color: colors.neutral[950],
              }}
            />
          ))}
        </Box>
      </DetailSection>

      <DetailSection heading="About the role" gap="9px">
        {job.about}
      </DetailSection>
      <DetailSection heading="What you’ll do" gap="9px">
        {job.responsibilities}
      </DetailSection>

      <Box
        sx={{
          mt: "22px",
          ml: "-1px",
          width: "calc(100% + 1px)",
          display: "flex",
          flexWrap: "wrap",
          gap: "8px",
        }}
      >
        <InfoTile label="Location" value={info.location} />
        <InfoTile label="Job type" value={info.jobType} />
        <InfoTile label="Duration" value={info.duration} />
        <InfoTile label="Start date" value={info.startDate} />
        <InfoTile label="Experience level" value={info.experience} />
      </Box>

      <Box sx={{ mt: "48px" }}>
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
            borderRadius: "100px",
          }}
        >
          Apply now
        </FormSubmitButton>
      </Box>

      <ButtonBase
        disableRipple
        onClick={() => setSaved((v) => !v)}
        sx={{
          mt: "13px",
          display: "flex",
          width: "100%",
          justifyContent: "center",
          fontFamily,
          fontSize: "16px",
          lineHeight: "24px",
          color: colors.neutral[950],
        }}
      >
        {saved ? "Saved" : "Save job"}
      </ButtonBase>
    </MobileScreenShell>
  );
};

export default JobDetailScreen;
