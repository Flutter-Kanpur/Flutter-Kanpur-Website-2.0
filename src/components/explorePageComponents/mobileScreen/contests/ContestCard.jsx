"use client";

import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import RevampButton from "@/components/buttons/revampbutton/RevampButton";
import Tag from "../Tag";
import { colors } from "@/theme/colors";

const fontFamily = 'var(--font-product-sans), "Product Sans", sans-serif';

const pad = (n) => String(n).padStart(2, "0");

// "6d 12:54:00"
const formatRemaining = (ms) => {
  const total = Math.max(0, Math.floor(ms / 1000));
  const d = Math.floor(total / 86400);
  const h = Math.floor((total % 86400) / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = total % 60;
  return `${d}d ${pad(h)}:${pad(m)}:${pad(s)}`;
};

// Live countdown. First render uses the static duration so server and client
// markup match; the ticking starts after mount.
const useCountdown = (durationMs) => {
  const [remaining, setRemaining] = useState(durationMs);

  useEffect(() => {
    const endsAt = Date.now() + durationMs;
    const tick = () => setRemaining(Math.max(0, endsAt - Date.now()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [durationMs]);

  return remaining;
};

/**
 * ContestCard — compact card for the mobile Contests list
 * (category, heart, title, tags, countdown, CTA).
 */
const ContestCard = ({ contest, onContinue }) => {
  const [saved, setSaved] = useState(Boolean(contest.saved));
  const remaining = useCountdown(contest.endsInMs);

  return (
    <Box
      sx={{
        boxSizing: "border-box",
        pt: "20px",
        pb: "19px",
        px: "20px",
        border: `1px solid ${colors.neutral[200]}`,
        borderRadius: "24px",
        backgroundColor: "#FFFFFF",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography
          sx={{
            fontFamily,
            fontSize: "14px",
            lineHeight: "20px",
            color: colors.neutral[500],
          }}
        >
          {contest.category}
        </Typography>
        <IconButton
          onClick={() => setSaved((v) => !v)}
          aria-label={saved ? "Remove from favourites" : "Add to favourites"}
          sx={{ p: 0, my: "-1px", color: colors.neutral[950] }}
        >
          {saved ? (
            <FavoriteIcon sx={{ fontSize: 22 }} />
          ) : (
            <FavoriteBorderIcon sx={{ fontSize: 22 }} />
          )}
        </IconButton>
      </Box>

      <Typography
        sx={{
          mt: "5px",
          fontFamily,
          fontSize: "18px",
          fontWeight: 500,
          lineHeight: "28px",
          color: colors.neutral[950],
        }}
      >
        {contest.title}
      </Typography>

      <Box sx={{ mt: "7px", display: "flex", flexWrap: "wrap", gap: "4px" }}>
        {contest.tags.map((tag) => (
          <Tag
            key={tag}
            label={tag}
            sx={{
              backgroundColor: colors.primary[100],
              color: colors.neutral[950],
            }}
          />
        ))}
      </Box>

      <Box sx={{ mt: "18px", borderTop: `1px solid ${colors.neutral[100]}` }} />

      <Box
        sx={{
          mt: "9px",
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ position: "relative", top: "3px" }}>
          <Typography
            sx={{
              fontFamily,
              fontSize: "14px",
              lineHeight: "20px",
              color: colors.neutral[500],
            }}
          >
            Ends in
          </Typography>
          <Typography
            sx={{
              fontFamily,
              fontSize: "16px",
              lineHeight: "24px",
              color: colors.warning[600],
              fontVariantNumeric: "tabular-nums",
            }}
          >
            {formatRemaining(remaining)}
          </Typography>
        </Box>

        <RevampButton
          text="Continue contest"
          onClick={onContinue}
          width="auto"
          sx={{ height: "36px", px: "24px", py: 0, fontSize: "14px" }}
        />
      </Box>
    </Box>
  );
};

export default ContestCard;
