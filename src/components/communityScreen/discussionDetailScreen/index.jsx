"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Skeleton from "@mui/material/Skeleton";
import Button from "@mui/material/Button";
import Link from "next/link";
import DiscussionListHeader from "../discussionScreen/DiscussionListHeader";
import FormSubmitButton from "../../FormComponents/FormSubmitButton";
import FormTextarea from "../../FormComponents/FormTextarea";
import QuestionDetail from "./QuestionDetail";
import ReplyCard from "./ReplyCard";
import ReplyModal from "./ReplyModal";
import {
  discussionDetail as fallbackDetail,
  discussionResponses as fallbackResponses,
} from "@/data/discussionDetailData";
import {
  fetchQuestionById,
  postDiscussionAnswer,
} from "@/lib/supabase/community";

const DiscussionDetailScreen = () => {
  const params = useParams();
  const id = params?.id;

  const [question, setQuestion] = useState(fallbackDetail);
  const [responses, setResponses] = useState(fallbackResponses);
  const [isLoading, setIsLoading] = useState(Boolean(id));
  const [newReply, setNewReply] = useState("");
  const [replyingTo, setReplyingTo] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    let isCancelled = false;

    async function loadData() {
      if (!id) return;
      setIsLoading(true);
      try {
        const result = await fetchQuestionById(id);
        if (!isCancelled && result && result.question) {
          setQuestion(result.question);
          setResponses(result.responses || []);
        }
      } catch (err) {
        console.warn("Failed to load question from backend:", err);
      } finally {
        if (!isCancelled) {
          setIsLoading(false);
        }
      }
    }

    loadData();

    return () => {
      isCancelled = true;
    };
  }, [id]);

  const handlePostReply = async () => {
    if (!newReply.trim() || isSubmitting) return;
    setIsSubmitting(true);

    const tempId = `temp-${Date.now()}`;
    const optimisticReply = {
      id: tempId,
      author: "You",
      avatar: "/assets/community-page-assets/avatar-icon.svg",
      time: "Just now",
      postedLabel: "Just now",
      content: newReply.trim(),
      body: newReply.trim(),
      likes: 0,
      replies: [],
    };

    setResponses((prev) => [...prev, optimisticReply]);
    const replyText = newReply;
    setNewReply("");

    try {
      if (id && !id.toString().startsWith("temp")) {
        await postDiscussionAnswer(id, replyText);
      }
    } catch (err) {
      console.warn("Could not post reply to Supabase:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePostSubReply = async (modalData) => {
    const text = typeof modalData === "string" ? modalData : modalData?.text;
    if (!text?.trim()) return;

    const subReply = {
      id: `sub-${Date.now()}`,
      author: "You",
      avatar: "/assets/community-page-assets/avatar-icon.svg",
      time: "Just now",
      content: text.trim(),
      likes: 0,
    };

    setResponses((prev) =>
      prev.map((r) =>
        r.id === replyingTo?.id
          ? { ...r, replies: [...(r.replies || []), subReply] }
          : r
      )
    );

    try {
      if (id && !id.toString().startsWith("temp")) {
        await postDiscussionAnswer(id, text.trim());
      }
    } catch (err) {
      console.warn("Could not save sub-reply to Supabase:", err);
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: { xs: "480px", md: "840px" },
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

      {isLoading ? (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <Skeleton width="80%" height={32} />
          <Skeleton width="100%" height={20} />
          <Skeleton width="90%" height={20} />
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Skeleton variant="circular" width={36} height={36} />
            <Skeleton width="30%" height={20} />
          </Box>
        </Box>
      ) : (
        <QuestionDetail question={question} />
      )}

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
          {responses.length}
        </Box>
      </Box>

      <Box sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <FormTextarea
          placeholder="Write a reply"
          value={newReply}
          onChange={(e) => setNewReply(e.target.value)}
          height="96px"
        />
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            disabled={!newReply.trim() || isSubmitting}
            onClick={handlePostReply}
            sx={{
              bgcolor: "#4167F2",
              color: "#FFFFFF",
              borderRadius: "999px",
              px: 3,
              py: "8px",
              fontSize: "14px",
              textTransform: "none",
              fontWeight: 600,
              fontFamily:
                'var(--font-product-sans), "Product Sans", sans-serif',
              "&:hover": { bgcolor: "#3355D6" },
              "&:disabled": { bgcolor: "#E0E0E0", color: "#9E9E9E" },
            }}
          >
            {isSubmitting ? "Posting..." : "Reply"}
          </Button>
        </Box>
      </Box>

      <Box sx={{ display: "flex", flexDirection: "column", gap: "18px" }}>
        {responses.map((response, index) => (
          <Box key={response.id}>
            <ReplyCard reply={response} onReplyClick={setReplyingTo} />
            {index < responses.length - 1 && (
              <Box sx={{ height: "1px", bgcolor: "#ECECEC", mt: "18px" }} />
            )}
          </Box>
        ))}
      </Box>

      <ReplyModal
        isOpen={Boolean(replyingTo)}
        replyingTo={replyingTo}
        onClose={() => setReplyingTo(null)}
        onSubmit={handlePostSubReply}
      />
    </Box>
  );
};

export default DiscussionDetailScreen;