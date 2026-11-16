"use client";

import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Skeleton from "@mui/material/Skeleton";
import Button from "@mui/material/Button";
import Link from "next/link";
import DiscussionListHeader from "./DiscussionListHeader";
import FormSubmitButton from "../../FormComponents/FormSubmitButton";
import FilterRow from "./FilterRow";
import QuestionCard from "./QuestionCard";
import { discussionQuestions as fallbackQuestions } from "@/data/communityScreenData";
import { fetchDiscussionQuestions } from "@/lib/supabase/community";

/**
 * DiscussionScreen — Dynamic Discussion feed connected to Supabase backend
 */
const DiscussionScreen = () => {
  const [questions, setQuestions] = useState(fallbackQuestions);
  const [activeFilter, setActiveFilter] = useState("All");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isCancelled = false;

    async function loadQuestions() {
      setIsLoading(true);
      setError(null);
      try {
        const data = await fetchDiscussionQuestions(activeFilter);
        if (!isCancelled) {
          if (data && data.length > 0) {
            setQuestions(data);
          } else if (activeFilter === "All") {
            setQuestions(fallbackQuestions);
          } else {
            setQuestions([]);
          }
        }
      } catch (err) {
        if (!isCancelled) {
          console.error("Failed to load discussion questions:", err);
          setError(err?.message || "Failed to load discussions.");
          setQuestions(fallbackQuestions);
        }
      } finally {
        if (!isCancelled) {
          setIsLoading(false);
        }
      }
    }

    loadQuestions();

    return () => {
      isCancelled = true;
    };
  }, [activeFilter]);

  const handleRetry = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await fetchDiscussionQuestions(activeFilter);
      if (data && data.length > 0) {
        setQuestions(data);
      } else {
        setQuestions(fallbackQuestions);
      }
    } catch (err) {
      setError(err?.message || "Failed to reload discussions.");
    } finally {
      setIsLoading(false);
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
      <DiscussionListHeader title={"Discussion"} />

      <FormSubmitButton
        component={Link}
        href="/community/ask"
        showArrow
      >
        {"Start a new discussion"}
      </FormSubmitButton>

      <FilterRow
        activeFilter={activeFilter}
        onSelectFilter={(newFilter) => setActiveFilter(newFilter)}
      />

      <Typography
        sx={{
          fontFamily: 'var(--font-product-sans), "Product Sans", sans-serif',
          fontSize: "14px",
          color: "#6D6D6D",
        }}
      >
        {isLoading
          ? "Loading discussions..."
          : `${questions.length} ${
              questions.length === 1 ? "discussion" : "discussions"
            }`}
      </Typography>

      {/* Loading Skeletons */}
      {isLoading && (
        <Box sx={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          {[1, 2, 3].map((key) => (
            <Box
              key={key}
              sx={{
                width: "100%",
                borderRadius: "18px",
                border: "1px solid #ECECEC",
                bgcolor: "#FFFFFF",
                p: "16px",
                boxSizing: "border-box",
              }}
            >
              <Skeleton width="85%" height={26} sx={{ mb: 1 }} />
              <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <Skeleton variant="circular" width={32} height={32} />
                <Box sx={{ flex: 1 }}>
                  <Skeleton width="40%" height={16} />
                  <Skeleton width="20%" height={12} />
                </Box>
                <Skeleton width={60} height={16} />
              </Box>
            </Box>
          ))}
        </Box>
      )}

      {/* Error state fallback */}
      {!isLoading && error && (
        <Box
          sx={{
            p: 3,
            borderRadius: "16px",
            bgcolor: "#fef2f2",
            border: "1px solid #fee2e2",
            textAlign: "center",
          }}
        >
          <Typography sx={{ color: "#991b1b", fontSize: "14px", fontWeight: 600, mb: 1 }}>
            Unable to fetch latest discussions
          </Typography>
          <Typography sx={{ color: "#7f1d1d", fontSize: "12px", mb: 2 }}>
            {error}
          </Typography>
          <Button
            size="small"
            onClick={handleRetry}
            sx={{
              bgcolor: "#1a1a1a",
              color: "#fff",
              borderRadius: "999px",
              textTransform: "none",
              fontSize: "12px",
              px: 2,
              "&:hover": { bgcolor: "#333" },
            }}
          >
            Retry
          </Button>
        </Box>
      )}

      {/* Empty state */}
      {!isLoading && !error && questions.length === 0 && (
        <Box
          sx={{
            p: 4,
            borderRadius: "18px",
            border: "1px dashed #E5E5E5",
            textAlign: "center",
          }}
        >
          <Typography
            sx={{
              fontFamily: 'var(--font-product-sans), "Product Sans", sans-serif',
              fontSize: "15px",
              color: "#6D6D6D",
              mb: 1,
            }}
          >
            No discussions found for &quot;{activeFilter}&quot;.
          </Typography>
          <Button
            onClick={() => setActiveFilter("All")}
            sx={{
              color: "#4167F2",
              textTransform: "none",
              fontSize: "14px",
              fontWeight: 600,
            }}
          >
            Show all discussions
          </Button>
        </Box>
      )}

      {/* Questions list */}
      {!isLoading && questions.length > 0 && (
        <Box sx={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          {questions.map((question) => (
            <QuestionCard key={question.id} question={question} />
          ))}
        </Box>
      )}
    </Box>
  );
};

export default DiscussionScreen;