"use client";

import { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/navigation";
import GradientHeader from "@/components/header/GradientHeader";
import FormField from "@/components/FormComponents/FormField";
import FormInput from "@/components/FormComponents/FormInput";
import FormSelect from "@/components/FormComponents/FormSelect";
import FormTextarea from "@/components/FormComponents/FormTextarea";
import ProjectLinkInput from "@/components/FormComponents/ProjectLinkInput";
import FormSubmitButton from "@/components/FormComponents/FormSubmitButton";
import { colors } from "@/theme/colors";
import { openCallApplyRoles } from "@/data/exploreScreenData";

const fontFamily = 'var(--font-product-sans), "Product Sans", sans-serif';
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const ERROR_BORDER = { borderColor: "#E53935" };

/**
 * ApplyOpenCallScreen — Mobile "Apply for Open Call" form
 * (route: /explore/open-calls/[id]/apply)
 */
const ApplyOpenCallScreen = ({ callId, onSubmit }) => {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [description, setDescription] = useState("");
  const [github, setGithub] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [portfolio, setPortfolio] = useState("");
  const [attempted, setAttempted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const nameValid = name.trim().length > 0;
  const emailValid = EMAIL_PATTERN.test(email.trim());
  const roleValid = role.length > 0;

  const basePath = `/explore/open-calls/${callId}/apply`;

  const handleSubmit = async () => {
    if (submitting) return;

    setAttempted(true);
    if (!nameValid || !emailValid || !roleValid) return;

    const payload = {
      callId,
      name: name.trim(),
      email: email.trim(),
      role,
      description: description.trim(),
      links: {
        github: github.trim(),
        linkedin: linkedin.trim(),
        portfolio: portfolio.trim(),
      },
    };

    try {
      setSubmitting(true);

      // No network → fail immediately
      if (typeof navigator !== "undefined" && !navigator.onLine) {
        throw new Error("offline");
      }

      // onSubmit must reject when the request fails
      if (onSubmit) await onSubmit(payload);

      router.push(`${basePath}/submitted`);
    } catch (error) {
      router.push(`${basePath}/error`);
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "480px",
        minHeight: "100vh",
        mx: "auto",
        pb: "110px",
        boxSizing: "border-box",
        overflowX: "hidden",
        backgroundColor: "#FFFFFF",
      }}
    >
      <GradientHeader
        variant="plain"
        title="Apply for Open Call"
        onBack={() => router.back()}
        sx={{
          mt: "69px",
          mb: "-1px",
          "& .MuiTypography-root": { ml: 0, fontSize: "20px", fontWeight: 500 },
        }}
      />

      <Box
        sx={{
          px: "22px",
          display: "flex",
          flexDirection: "column",
          gap: "26px",
        }}
      >
      <Box
        sx={{
          mb: "-4px",
          px: "36px",
          py: "20px",
          borderRadius: "20px",
          backgroundColor: colors.primary[50],
          textAlign: "center",
        }}
      >
        <Typography
          sx={{
            fontFamily,
            fontSize: "16px",
            lineHeight: "24px",
            color: colors.neutral[950],
          }}
        >
          Fill in the details below to apply. Our team will review your
          application.
        </Typography>
      </Box>

      <FormInput
        label="Full Name"
        id="apply-name"
        value={name}
        placeholder="Eg. Angelica Singh"
        autoComplete="name"
        inputSx={attempted && !nameValid ? ERROR_BORDER : {}}
        onChange={(event) => setName(event.target.value)}
      />

      <FormInput
        label="Email"
        id="apply-email"
        type="email"
        value={email}
        placeholder="Eg. angie.work@gmail.com"
        autoComplete="email"
        inputSx={attempted && !emailValid ? ERROR_BORDER : {}}
        onChange={(event) => setEmail(event.target.value)}
      />

      <FormSelect
        label="Area of Expertise / Role"
        id="apply-role"
        value={role}
        selectedValues={role ? [role] : []}
        options={openCallApplyRoles}
        openDirection="down"
        onChange={setRole}
      />

      <FormTextarea
        label="Topic / Contribution Description"
        id="apply-description"
        value={description}
        placeholder="In your words..."
        height="99px"
        onChange={(event) => setDescription(event.target.value)}
      />

      <FormField label="Work / Profile Links">
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "8px",
            mt: "2px",
          }}
        >
          <ProjectLinkInput
            value={github}
            onChange={setGithub}
            placeholder="GitHub link"
            removable={Boolean(github)}
            onRemove={() => setGithub("")}
          />
          <ProjectLinkInput
            value={linkedin}
            onChange={setLinkedin}
            placeholder="LinkedIn link"
            removable={Boolean(linkedin)}
            onRemove={() => setLinkedin("")}
          />
          <ProjectLinkInput
            value={portfolio}
            onChange={setPortfolio}
            placeholder="Portfolio / Website"
            removable={Boolean(portfolio)}
            onRemove={() => setPortfolio("")}
          />
        </Box>
      </FormField>

      <FormSubmitButton
        showArrow
        onClick={handleSubmit}
        disabled={submitting}
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
        Submit application
      </FormSubmitButton>
      </Box>
    </Box>
  );
};

export default ApplyOpenCallScreen;
