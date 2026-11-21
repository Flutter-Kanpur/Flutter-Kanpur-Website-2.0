"use client";

import React, { useState } from "react";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import UpdateCard from "./UpdateCard";

/**
 * UpdateCardCarousel
 *
 * Renders a horizontally scrollable carousel of UpdateCards.
 * Shows a skeleton placeholder while slides are loading.
 * If a card has a btn_url, the button opens that URL in a new tab.
 *
 * @param {Array}   cards   – Array of slide objects ({ id, title, description, buttonText, backgroundImage, btn_url })
 * @param {boolean} loading – Show skeleton while fetching
 */
const UpdateCardCarousel = ({ cards = [], loading = false }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleScroll = (e) => {
    const scrollLeft = e.target.scrollLeft;
    const cardWidth = e.target.offsetWidth;

    const index = Math.round(scrollLeft / cardWidth);
    setCurrentIndex(index);
  };

  if (loading) {
    return (
      <Box sx={{ width: "100%" }}>
        <Skeleton
          variant="rectangular"
          width="100%"
          height={187}
          sx={{ borderRadius: "32px" }}
          animation="wave"
        />
      </Box>
    );
  }

  return (
    <Box sx={{ width: "100%" }}>
      {/* Cards */}
      <Box
        onScroll={handleScroll}
        sx={{
          display: "flex",
          overflowX: "auto",
          scrollSnapType: "x mandatory",
          gap: "16px",

          "&::-webkit-scrollbar": {
            display: "none",
          },

          scrollbarWidth: "none",
        }}
      >
        {cards.map((card) => (
          <Box
            key={card.id}
            sx={{
              flex: "0 0 100%",
              scrollSnapAlign: "center",
            }}
          >
            <UpdateCard
              title={card.title}
              description={card.description}
              buttonText={card.buttonText}
              backgroundImage={card.backgroundImage}
              onButtonClick={
                card.btn_url
                  ? () => window.open(card.btn_url, "_blank", "noopener,noreferrer")
                  : undefined
              }
            />
          </Box>
        ))}
      </Box>

      {/* Dots */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mt: 2,
          gap: "2px",
        }}
      >
        {cards.map((_, index) => (
          <Box
            key={index}
            sx={{
              width: "8px",
              height: "8px",
              borderRadius: "999px",
              bgcolor: currentIndex === index ? "#000000" : "#D9D9D9",
              transition: "all .3s ease",
            }}
          />
        ))}
      </Box>
    </Box>
  );
};

export default UpdateCardCarousel;
