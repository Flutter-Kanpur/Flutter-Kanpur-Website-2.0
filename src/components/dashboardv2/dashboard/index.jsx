import React from "react";
import Box from "@mui/material/Box";
import NavHeader from "../navHeader/NavHeader";
import SearchBar from "../searchBar/SearchBar";
import CardContainer from "../cardContainer/CardContainer";
import GradientHeader from "@/components/header/GradientHeader";
import UpdateCardCarousel from "../updateCard/UpdateCardCarousel";
import { useCarouselSlides } from "@/hooks/useCarouselSlides";

const FALLBACK_CARDS = [
  {
    id: 1,
    title: "Design Challenge 2026",
    description: `Join us for an exciting design challenge!\nCreate Stunning UI/UX design and win\namazing prize!`,
    buttonText: "View Details",
    backgroundImage: "/assets/landing-page-assets/updateCard.png",
    btn_url: null,
  },
  {
    id: 2,
    title: "Flutter Workshop",
    description:
      "Learn Flutter from experts and build real-world applications.",
    buttonText: "Register",
    backgroundImage: "/assets/landing-page-assets/updateCard.png",
    btn_url: null,
  },
  {
    id: 3,
    title: "Community Meetup",
    description: "Network with Flutter developers and industry professionals.",
    buttonText: "Join Now",
    backgroundImage: "/assets/landing-page-assets/updateCard.png",
    btn_url: null,
  },
  {
    id: 4,
    title: "Hackathon 2026",
    description:
      "Participate in our biggest hackathon and win exciting prizes.",
    buttonText: "Apply",
    backgroundImage: "/assets/landing-page-assets/updateCard.png",
    btn_url: null,
  },
];

/**
 * Dashboard - Mobile dashboard wrapper with gradient background
 */
const Dashboard = ({
  events = [],
  announcements = [],
  loading = false,
  onSearchClick,
  children,
}) => {
  const { slides, loading: slidesLoading, error: slidesError } = useCarouselSlides();

  // On error or empty, fall back to hardcoded cards
  const useHardcoded = slidesError || (!slidesLoading && slides.length === 0);
  const carouselCards = useHardcoded ? FALLBACK_CARDS : slides;

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "480px",
        minHeight: "100vh",
        mx: "auto",
        position: "relative",
        px: "16px",
        pb: "80px",
        boxSizing: "border-box",
        overflowX: "hidden",
        backgroundColor: "#fff",
      }}
    >
      {/* Gradient Background Layer */}
      <GradientHeader
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 0,
          mb: 0,
        }}
      />

      {/* Page Content */}
      <Box
        sx={{
          position: "relative",
          zIndex: 1,
          pt: "60px",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        <NavHeader />

        <SearchBar onSearchClick={onSearchClick} />

        <UpdateCardCarousel cards={carouselCards} loading={slidesLoading} />

        <CardContainer
          events={events}
          announcements={announcements}
          loading={loading}
        />

        {children}
      </Box>
    </Box>
  );
};

export default Dashboard;
