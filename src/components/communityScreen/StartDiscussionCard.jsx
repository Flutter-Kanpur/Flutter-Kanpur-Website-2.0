"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { startDiscussionCard } from "@/data/communityScreenData";
import { fetchCommunityMembers } from "@/lib/supabase/community";

const StartDiscussionCard = () => {
  const router = useRouter();
  const [avatars, setAvatars] = useState(startDiscussionCard.avatars);

  useEffect(() => {
    let isCancelled = false;

    async function loadAvatars() {
      try {
        const users = await fetchCommunityMembers();
        if (!isCancelled && users.length > 0) {
          const userAvatars = users
            .map((u) => u.photo_url)
            .filter(Boolean)
            .slice(0, 5);

          if (userAvatars.length >= 2) {
            setAvatars(userAvatars);
          }
        }
      } catch (e) {
        console.warn("Could not load dynamic avatars:", e);
      }
    }

    loadAvatars();

    return () => {
      isCancelled = true;
    };
  }, []);

  return (
    <Box
      sx={{
        width: "88%",
        borderRadius: "24px",
        background: "linear-gradient(135deg, #00A46B 0%, #00B374 60%, #00C97F 100%)",
        p: "20px",
        margin: "auto",
        display: "flex",
        flexDirection: "column",
        gap: "14px",
        position: "relative",
        overflow: "hidden",
        boxSizing: "border-box",
      }}
    >
      <Typography
        sx={{
          fontFamily: 'var(--font-product-sans), "Product Sans", sans-serif',
          color: "#FFFFFF",
          fontWeight: 700,
          fontSize: "18px",
          lineHeight: "auto",
        }}
      >
        Confused about where to start?
      </Typography>

      {/* Overlapping avatar stack from Supabase users */}
      <Box sx={{ display: "flex", alignItems: "center" }}>
        {avatars.map((src, index) => (
          <Box
            key={`${src}-${index}`}
            component="img"
            src={src}
            alt="Community member"
            sx={{
              width: "28px",
              height: "28px",
              borderRadius: "50%",
              border: "2px solid rgba(255,255,255,0.9)",
              objectFit: "cover",
              ml: index === 0 ? 0 : "-10px",
            }}
          />
        ))}
      </Box>

      <Typography
        sx={{
          fontFamily: 'var(--font-product-sans), "Product Sans", sans-serif',
          color: "rgba(255,255,255,0.92)",
          fontWeight: 400,
          fontSize: "15px",
          lineHeight: "22px",
        }}
      >
        Ask questions, share ideas, or help others by starting a conversation with the community.
      </Typography>

      <Button
        variant="contained"
        onClick={() => router.push("/community/ask")}
        sx={{
          alignSelf: "flex-start",
          mt: "4px",
          bgcolor: "#FFFFFF",
          color: "#0A0A0A",
          borderRadius: "999px",
          px: "22px",
          py: "10px",
          fontSize: "15px",
          fontWeight: 600,
          textTransform: "none",
          boxShadow: "none",
          "&:hover": { bgcolor: "#F2F2F2", boxShadow: "none" },
        }}
      >
        Ask a question
      </Button>
    </Box>
  );
};

export default StartDiscussionCard;