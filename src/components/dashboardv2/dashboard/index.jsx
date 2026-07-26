import React from "react";
import Box from "@mui/material/Box";
import NavHeader from "../navHeader/NavHeader";
import SearchBar from "../searchBar/SearchBar";
import UpdateCard from "../updateCard/UpdateCard";
import CardContainer from "../cardContainer/CardContainer";
import GradientHeader from "@/components/header/GradientHeader";
import UpdateCardCarousel from "../updateCard/UpdateCardCarousel";

const updateCards = [
  {
    id: 1,
    title: "Design Challenge 2026",
    description: `Join us for an exciting design challenge!
Create Stunning UI/UX design and win
amazing prize!`,
    buttonText: "View Details",
    backgroundImage: "/assets/landing-page-assets/updateCard.png",
  },
  {
    id: 2,
    title: "Flutter Workshop",
    description:
      "Learn Flutter from experts and build real-world applications.",
    buttonText: "Register",
    backgroundImage: "/assets/landing-page-assets/updateCard.png",
  },
  {
    id: 3,
    title: "Community Meetup",
    description: "Network with Flutter developers and industry professionals.",
    buttonText: "Join Now",
    backgroundImage: "/assets/landing-page-assets/updateCard.png",
  },
  {
    id: 4,
    title: "Hackathon 2026",
    description:
      "Participate in our biggest hackathon and win exciting prizes.",
    buttonText: "Apply",
    backgroundImage: "/assets/landing-page-assets/updateCard.png",
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

        <UpdateCardCarousel cards={updateCards} />

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
