"use client";

import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Skeleton from "@mui/material/Skeleton";
import Button from "@mui/material/Button";
import SectionHeader from "./SectionHeader";
import DiscussionCard from "./DiscussionCard";
import { useRouter } from "next/navigation";
import {
  fetchCommunityItems,
  mapCommunityItemToFeaturedDiscussion,
} from "@/lib/supabase/community";

const FeaturedDiscussions = () => {
  const router = useRouter();
  const [discussions, setDiscussions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAndMapDiscussions = async () => {
    const rawData = await fetchCommunityItems();
    return (rawData || []).map((item, index) =>
      mapCommunityItemToFeaturedDiscussion(item, index)
    );
  };

  useEffect(() => {
    let isCancelled = false;

    async function loadInitialData() {
      try {
        const mapped = await fetchAndMapDiscussions();
        if (!isCancelled) {
          setDiscussions(mapped);
          setError(null);
        }
      } catch (err) {
        if (!isCancelled) {
          console.error("Failed to load featured discussions for mobile:", err);
          setError(err?.message || "Failed to load discussions.");
        }
      } finally {
        if (!isCancelled) {
          setIsLoading(false);
        }
      }
    }

    loadInitialData();

    return () => {
      isCancelled = true;
    };
  }, []);

  const handleRetry = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const mapped = await fetchAndMapDiscussions();
      setDiscussions(mapped);
    } catch (err) {
      console.error("Failed to refresh discussions:", err);
      setError(err?.message || "Failed to load discussions.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "14px" }}>
      <SectionHeader
        title="Featured discussions"
        actionLabel="Explore all"
        onAction={() => router.push("/community/discussion")}
      />

      {/* Loading state with skeletons */}
      {isLoading && (
        <Box
          sx={{
            display: "flex",
            overflowX: "auto",
            gap: "14px",
            mx: "-16px",
            px: "16px",
            "&::-webkit-scrollbar": { display: "none" },
            scrollbarWidth: "none",
          }}
        >
          {[1, 2].map((key) => (
            <Box
              key={key}
              sx={{
                flex: "0 0 88%",
                p: "18px",
                borderRadius: "20px",
                bgcolor: "#FFFFFF",
                border: "1px solid rgba(0,0,0,0.06)",
                boxShadow: "0 2px 16px rgba(0,0,0,0.06)",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: "10px", mb: 2 }}>
                <Skeleton variant="circular" width={40} height={40} />
                <Box sx={{ flex: 1 }}>
                  <Skeleton width="60%" height={16} />
                  <Skeleton width="30%" height={12} />
                </Box>
              </Box>
              <Skeleton width="80%" height={24} sx={{ mb: 1 }} />
              <Skeleton width="100%" height={16} />
              <Skeleton width="90%" height={16} sx={{ mb: 2 }} />
            </Box>
          ))}
        </Box>
      )}

      {/* Error fallback UI */}
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
            Unable to load discussions
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
      {!isLoading && !error && discussions.length === 0 && (
        <Box
          sx={{
            p: 3,
            borderRadius: "16px",
            bgcolor: "#f9fafb",
            border: "1px dashed #e5e7eb",
            textAlign: "center",
          }}
        >
          <Typography sx={{ color: "#4b5563", fontSize: "14px" }}>
            No community discussions found.
          </Typography>
        </Box>
      )}

      {/* Dynamically mapped discussions */}
      {!isLoading && !error && discussions.length > 0 && (
        <Box
          sx={{
            display: "flex",
            overflowX: "auto",
            gap: "14px",
            mx: "-16px",
            px: "16px",
            scrollSnapType: "x mandatory",
            "&::-webkit-scrollbar": { display: "none" },
            scrollbarWidth: "none",
          }}
        >
          {discussions.map((discussion) => (
            <Box
              key={discussion.id}
              sx={{
                flex: "0 0 88%",
                scrollSnapAlign: "start",
              }}
            >
              <DiscussionCard discussion={discussion} />
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default FeaturedDiscussions;