"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Box from "@mui/material/Box";

import MobileFormLayout from "../../FormComponents/MobileFormLayout";
import FormField from "../../FormComponents/FormField";
import FormInput from "../../FormComponents/FormInput";
import FormTextarea from "../../FormComponents/FormTextarea";
import FormSelect from "../../FormComponents/FormSelect";
import ChipList from "../../FormComponents/ChipList";
import ProjectLinkInput from "../../FormComponents/ProjectLinkInput";
import FileDropzone from "../../FormComponents/FileDropzone";
import PrimaryButton from "../../buttons/PrimaryButton/PrimaryButton";
import { projectTechStack } from "@/data/communityScreenData";

/**
 * UploadProjectScreen 
 */
const UploadProjectScreen = ({ onSubmit }) => {
  const router = useRouter();


  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [techStack, setTechStack] = useState([]);
  const [repoLink, setRepoLink] = useState("");
  const [demoLink, setDemoLink] = useState("");
  const [file, setFile] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const handleTechSelect = (value) =>
    setTechStack((previous) =>
      previous.includes(value) ? previous : [...previous, value],
    );

const handleSubmit = async () => {
  const payload = {
    name: name.trim(),
    description: description.trim(),
    techStack,
    links: {
      repo: repoLink.trim(),
      demo: demoLink.trim(),
    },
    file,
  };

  if (!payload.name || submitting) return;

  try {
    setSubmitting(true);

    // No network fail immediately
    if (typeof navigator !== "undefined" && !navigator.onLine) {
      throw new Error("offline");
    }

    // onSubmit must reject when upload fails
    if (onSubmit) await onSubmit(payload);

    router.push("/community/project/submitted");
  } catch (error) {
    router.push("/community/project/projectUploadError");
  }
};

  return (
    <MobileFormLayout
      title={"Upload project"}
      onBack={() => router.back()}
      headerSx={{
        pt: "82px",
        "& .MuiIconButton-root": { left: "16px", top: "80px" },
      }}
      formSx={{ mt: "147px", mx: "-1.5px" }}
    >
      <FormInput
        label={"Project name"}
        id="project-name"
        value={name}
        placeholder={"Enter title"}
        onChange={(event) => setName(event.target.value)}
      />

      <FormTextarea
        label={"Short description"}
        id="project-description"
        value={description}
        placeholder={"Max 120 characters"}
        height="143px"
        maxLength={120}
        onChange={(event) => setDescription(event.target.value)}
      />

      <Box>
        <FormSelect
          label={"Tech stack"}
          id="project-tech-stack"
          value=""
          selectedValues={techStack}
          options={projectTechStack}
          onChange={handleTechSelect}
        />

        <ChipList
          items={techStack}
          onDelete={(tech) =>
            setTechStack((previous) => previous.filter((item) => item !== tech))
          }
        />
      </Box>

      <FormField label={"Project links"}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "8px",
            mt: "2px",
          }}
        >
          <ProjectLinkInput
            value={repoLink}
            onChange={setRepoLink}
            placeholder={"GitHub / repository link"}
            removable={Boolean(repoLink)}
            onRemove={() => setRepoLink("")}
          />
          <ProjectLinkInput
            value={demoLink}
            onChange={setDemoLink}
            placeholder={"Live demo / APK"}
            removable={Boolean(demoLink)}
            onRemove={() => setDemoLink("")}
          />
        </Box>
      </FormField>

      <FileDropzone file={file} onFile={setFile} />

      <PrimaryButton
        onClick={handleSubmit}
        disabled={submitting}
        endIcon={
          <Image
            src="/assets/explore-page-assets/right-arrow.svg"
            alt=""
            width={18}
            height={18}
          />
        }
        sx={{
          width: "100%",
          minWidth: 0,
          maxWidth: "none",
          mt: "-3px",
          fontSize: "16px",
          fontWeight: "400 !important",
        }}
      >
        {"Submit project"}
      </PrimaryButton>
    </MobileFormLayout>
  );
};

export default UploadProjectScreen;