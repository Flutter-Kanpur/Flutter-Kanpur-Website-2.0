"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Box from "@mui/material/Box";


import FormInput from "../../FormComponents/FormInput";
import FormTextarea from "../../FormComponents/FormTextarea";
import FormSelect from "../../FormComponents/FormSelect";
import ChipList from "../../FormComponents/ChipList";
import FileDropzone from "../../FormComponents/FileDropzone";
import { askQuestionCategories } from "@/data/communityScreenData";
import MobileFormLayout from "../../FormComponents/MobileFormLayout";
import PrimaryButton from "../../buttons/PrimaryButton/PrimaryButton";

const AskQuestionScreen = ({ onPost }) => {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");
  const [file, setFile] = useState(null);

  const handleCategorySelect = (value) => {
    setCategories((previous) =>
      previous.includes(value) ? previous : [...previous, value],
    );
  };

  const addTag = () => {
    const clean = tagInput
      .trim()
      .replace(/^#+/, "")
      .replace(/\s+/g, "");

    if (!clean) return;

    const tag = `#${clean}`;

    setTags((previous) =>
      previous.includes(tag) ? previous : [...previous, tag],
    );
    setTagInput("");
  };

  const handleTagKeyDown = (event) => {
    if (event.key === "Enter" || event.key === ",") {
      event.preventDefault();
      addTag();
    }
  };

  const handlePost = async () => {
    const payload = {
      title: title.trim(),
      details: details.trim(),
      categories,
      tags,
      file,
    };

    if (!payload.title) return;

    try {
      // No network → fail straight away instead of waiting for a request to time out.
      if (typeof navigator !== "undefined" && !navigator.onLine) {
        throw new Error("offline");
      }

      // Real submit goes here. `onPost` must return a promise that REJECTS when
      // the upload fails (for fetch: throw if !response.ok).
      if (onPost) await onPost(payload);

      router.push("/community/ask/postedScreen");
    } catch (error) {
      router.push("/community/ask/networkErrorScreen");
    }
  };

  return (
    <MobileFormLayout
      title="Ask a question"
      onBack={() => router.back()}
    >
      
      <FormInput
        label="Question title"
        id="ask-title"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
      />

      <FormTextarea
        label="Details"
        id="ask-details"
        value={details}
        onChange={(event) => setDetails(event.target.value)}
        placeholder="Add more context, code snippets, or what you’ve tried so far."
      />

      <Box>
        <FormSelect
          label="Choose a category"
          id="ask-category"
          value={categories}
          selectedValues={categories}
          options={askQuestionCategories}
          onChange={handleCategorySelect}
        />

        <ChipList
          items={categories}
          onDelete={(category) =>
            setCategories((previous) =>
              previous.filter((item) => item !== category),
            )
          }
        />
      </Box>

      <Box>
        <FormInput
          label="Tags"
          id="ask-tags"
          value={tagInput}
          placeholder="add tags"
          onChange={(event) => setTagInput(event.target.value)}
          onKeyDown={handleTagKeyDown}
          onBlur={addTag}
        />

        <ChipList
          items={tags}
          onDelete={(tag) =>
            setTags((previous) => previous.filter((item) => item !== tag))
          }
        />
      </Box>

      <FileDropzone file={file} onFile={setFile} />

      <PrimaryButton
        onClick={handlePost}
        sx={{
          width: "100%",
          minWidth: 0,
          maxWidth: "none",
          mt: "-3px",
          fontSize: "16px",
          fontWeight: "400 !important",
        }}
      >
        Post question
      </PrimaryButton>
    </MobileFormLayout>
  );
};

export default AskQuestionScreen;