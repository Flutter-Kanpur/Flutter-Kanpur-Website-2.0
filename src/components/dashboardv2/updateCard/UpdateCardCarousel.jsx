"use client";

import React, { useState } from "react";
import Box from "@mui/material/Box";
import UpdateCard from "./UpdateCard";

const UpdateCardCarousel = ({ cards = [] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleScroll = (e) => {
    const scrollLeft = e.target.scrollLeft;
    const cardWidth = e.target.offsetWidth;

    const index = Math.round(scrollLeft / cardWidth);
    setCurrentIndex(index);
  };

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
              onButtonClick={() => console.log("Clicked:", card.title)}
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
              width: currentIndex === index ? "8px" : "8px",
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
