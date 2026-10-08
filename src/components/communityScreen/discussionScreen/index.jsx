"use client";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import DiscussionListHeader from "./DiscussionListHeader";
import FormSubmitButton from "../../FormComponents/FormSubmitButton";
import FilterRow from "./FilterRow";
import QuestionCard from "./QuestionCard";
import {
  
  discussionQuestions,
} from "@/data/communityScreenData";

/**
 * DiscussionScreen 
 */
const DiscussionScreen = () => {
  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "480px",
        minHeight: "100vh",
        mx: "auto",
        px: "16px",
        pb: "80px",
        pt: "20px",
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        backgroundColor: "#fff",
      }}
    >
      <DiscussionListHeader title={"Discussion"} />

      <FormSubmitButton
        component={Link}
        href="/community/ask"
        showArrow
      >
        {"Start a new discussion"}
      </FormSubmitButton>

      <FilterRow />

      <Typography
        sx={{
          fontFamily: 'var(--font-product-sans), "Product Sans", sans-serif',
          fontSize: "14px",
          color: "#6D6D6D",
        }}
      >
        {"24,181,717 questions"}
      </Typography>

      <Box sx={{ display: "flex", flexDirection: "column", gap: "14px" }}>
        {discussionQuestions.map((question) => (
          <QuestionCard key={question.id} question={question} />
        ))}
      </Box>
    </Box>
  );
};

export default DiscussionScreen;