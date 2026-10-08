"use client";
 
import { useRouter } from "next/navigation";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { startDiscussionCard } from "@/data/communityScreenData";
 
const StartDiscussionCard = () => {
  const router = useRouter();
 
  return (
    <Box
      sx={{
        width: "88%",
        borderRadius: "24px",
        background: "linear-gradient(135deg, #00A46B 0%, #00B374 60%, #00C97F 100%)",
        p: "20px",
        margin:"auto",
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
 
      {/* Overlapping avatar stack */}
      <Box sx={{ display: "flex", alignItems: "center" }}>
        {startDiscussionCard.avatars.map((src, index) => (
          <Box
            key={src}
            component="img"
            src={src}
            alt=""
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