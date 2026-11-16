"use client";

import { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import DiscussionListHeader from "../discussionScreen/DiscussionListHeader";
import FormSubmitButton from "../../FormComponents/FormSubmitButton";
import FormTextarea from "../../FormComponents/FormTextarea";
import QuestionDetail from "./QuestionDetail";
import ReplyCard from "./ReplyCard";
import ReplyModal from "./ReplyModal";
import {
  discussionDetail,
  discussionResponses,
} from "@/data/discussionDetailData";

const DiscussionDetailScreen = () => {
  const [newReply, setNewReply] = useState("");
  const [replyingTo, setReplyingTo] = useState(null);

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
      <DiscussionListHeader title="Discussion" />

      <FormSubmitButton component={Link} href="/community/ask" showArrow>
        Start a new discussion
      </FormSubmitButton>

      <QuestionDetail question={discussionDetail} />

      <Box sx={{ height: "1px", bgcolor: "#ECECEC" }} />

      <Box sx={{ display: "flex", alignItems: "center", gap: "6px" }}>
        <Typography
          sx={{
            fontFamily: 'var(--font-product-sans), "Product Sans", sans-serif',
            fontSize: "17px",
            fontWeight: 600,
            color: "#000000",
          }}
        >
          Responses
        </Typography>
        <Box
          sx={{
            width: "20px",
            height: "20px",
            borderRadius: "50%",
            border: "1.5px solid #000000",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "11px",
            fontWeight: 600,
          }}
        >
          {discussionResponses.length}
        </Box>
      </Box>

      <FormTextarea
        placeholder="Write a reply"
        value={newReply}
        onChange={(e) => setNewReply(e.target.value)}
        height="96px"
      />

      <Box sx={{ display: "flex", flexDirection: "column", gap: "18px" }}>
        {discussionResponses.map((response, index) => (
          <Box key={response.id}>
            <ReplyCard reply={response} onReplyClick={setReplyingTo} />
            {index < discussionResponses.length - 1 && (
              <Box sx={{ height: "1px", bgcolor: "#ECECEC", mt: "18px" }} />
            )}
          </Box>
        ))}
      </Box>

      <ReplyModal
        isOpen={Boolean(replyingTo)}
        replyingTo={replyingTo}
        onClose={() => setReplyingTo(null)}
        onSubmit={() => {
          // No backend exists yet for posting replies
        }}
      />
    </Box>
  );
};

export default DiscussionDetailScreen;