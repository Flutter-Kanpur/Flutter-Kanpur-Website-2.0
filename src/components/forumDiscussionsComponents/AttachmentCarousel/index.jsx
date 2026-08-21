"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";

import { t, assets, fontFamily } from "../tokens";

const GAP = parseInt(t.spacing.sm, 10);

const ArrowIcon = ({ src }) => (
  <Box
    aria-hidden
    sx={{
      width: 14,
      height: 14,
      bgcolor: t.text.onLight,
      maskImage: `url(${src})`,
      WebkitMaskImage: `url(${src})`,
      maskRepeat: "no-repeat",
      WebkitMaskRepeat: "no-repeat",
      maskPosition: "center",
      WebkitMaskPosition: "center",
      maskSize: "contain",
      WebkitMaskSize: "contain",
    }}
  />
);

const navButtonSx = (side) => ({
  position: "absolute",
  top: "50%",
  [side]: 0,
  transform: "translateY(-50%)",
  width: 28,
  height: 28,
  bgcolor: t.surface.card,
  border: `1px solid ${t.border.subtle}`,
  boxShadow: "0 1px 4px rgba(16, 24, 40, 0.12)",
  zIndex: 1,
  "&:hover": { bgcolor: t.surface.hover },
});

const AttachmentCarousel = ({
  attachments = [],
  width = t.size.attachment.width,
  height = t.size.attachment.height,
  viewportWidth = t.size.carousel.width,
  viewportHeight = t.size.carousel.height,
  label = "Attachments",
  showControls = true,
}) => {
  const scrollerRef = useRef(null);
  const [canScrollBack, setCanScrollBack] = useState(false);
  const [canScrollForward, setCanScrollForward] = useState(false);

  const syncBounds = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    setCanScrollBack(el.scrollLeft > 1);
    setCanScrollForward(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
  }, []);

  useEffect(() => {
    syncBounds();
    window.addEventListener("resize", syncBounds);
    return () => window.removeEventListener("resize", syncBounds);
  }, [syncBounds, attachments]);

  const slide = (direction) =>
    scrollerRef.current?.scrollBy({
      left: direction * (width + GAP),
      behavior: "smooth",
    });

  if (!attachments.length) return null;

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        maxWidth: viewportWidth,
        mt: t.spacing.lg,
      }}
    >
      {showControls && canScrollBack && (
        <IconButton
          onClick={() => slide(-1)}
          aria-label="Previous attachment"
          sx={navButtonSx("left")}
        >
          <ArrowIcon src={assets.backArrow} />
        </IconButton>
      )}

      <Box
        ref={scrollerRef}
        onScroll={syncBounds}
        role="group"
        aria-label={label}
        sx={{
          display: "flex",
          alignItems: "center",
          gap: t.spacing.sm,
          height: viewportHeight,
          overflowX: "auto",
          scrollSnapType: "x mandatory",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          "&::-webkit-scrollbar": { display: "none" },
        }}
      >
        {attachments.map((attachment) => (
          <Box
            key={attachment.id}
            sx={{
              width,
              height,
              flexShrink: 0,
              scrollSnapAlign: "start",
              borderRadius: t.radius.md,
              bgcolor: attachment.src ? "transparent" : t.surface.placeholder,
              overflow: "hidden",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {attachment.src ? (
              <Box
                component="img"
                src={attachment.src}
                alt={attachment.alt || ""}
                sx={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            ) : (
              <Typography
                sx={{
                  fontFamily,
                  fontSize: t.typography.label3.fontSize,
                  color: t.text.muted,
                  px: t.spacing.sm,
                  textAlign: "center",
                }}
              >
                {attachment.alt}
              </Typography>
            )}
          </Box>
        ))}
      </Box>

      {showControls && canScrollForward && (
        <IconButton
          onClick={() => slide(1)}
          aria-label="Next attachment"
          sx={navButtonSx("right")}
        >
          <ArrowIcon src={assets.ctaArrow} />
        </IconButton>
      )}
    </Box>
  );
};

export default AttachmentCarousel;
