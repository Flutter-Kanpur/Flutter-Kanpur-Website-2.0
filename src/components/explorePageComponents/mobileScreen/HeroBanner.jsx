"use client";

import { useRef, useState } from "react";
import Box from "@mui/material/Box";
import UpdateCard from "@/components/dashboardv2/updateCard/UpdateCard";

const HeroBanner = ({ slides = [] }) => {
  const trackRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleScroll = () => {
    const el = trackRef.current;

    if (!el || !el.clientWidth) return;

    const index = Math.round(el.scrollLeft / el.clientWidth);
    setCurrentIndex(index);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box
        ref={trackRef}
        onScroll={handleScroll}
        sx={{
          display: "flex",
          overflowX: "auto",
          scrollSnapType: "x mandatory",
          scrollbarWidth: "none",
          gap: "16px",

          "&::-webkit-scrollbar": {
            display: "none",
          },
        }}
      >
        {slides.map((slide) => (
          <Box
            key={slide.id}
            sx={{
              flex: "0 0 100%",
              scrollSnapAlign: "start",
            }}
          >
            <UpdateCard
              title={slide.title}
              description={slide.description}
              buttonText={slide.ctaLabel}
              onButtonClick={slide.onCta}
            />
          </Box>
        ))}
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mt: 2,
          gap: "4px",
        }}
      >
        {slides.map((slide, index) => (
          <Box
            key={slide.id}
            sx={{
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              bgcolor:
                currentIndex === index ? "#1F1F1F" : "#D9D9D9",
              transition: "all .3s ease",
            }}
          />
        ))}
      </Box>
    </Box>
  );
};

export default HeroBanner;