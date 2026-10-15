"use client";

import { useRouter } from "next/navigation";

import PrimaryButton from "@/components/buttons/PrimaryButton/PrimaryButton";
import ReadyToGrowSection from "@/components/landingPageComponents/ReadyToGrowSection";
import { t, fontFamily } from "../tokens";

const ShowcaseCTA = ({ title, description, buttonLabel, buttonHref }) => {
  const router = useRouter();

  return (
    <ReadyToGrowSection
      title={title}
      description={description}
      backgroundColor={t.surface.cta}
      borderRadius={t.radius.xxl}
      renderButton={() => (
        <PrimaryButton
          fullWidth={false}
          onClick={() => router.push(buttonHref)}
          sx={{
            width: "auto",
            minWidth: 0,
            maxWidth: "none",
            height: 48,
            px: t.spacing.xxl,
            fontFamily,
            fontSize: t.typography.label1.fontSize,
            fontWeight: t.typography.label1.fontWeight,
          }}
        >
          {buttonLabel}
        </PrimaryButton>
      )}
    />
  );
};

export default ShowcaseCTA;
