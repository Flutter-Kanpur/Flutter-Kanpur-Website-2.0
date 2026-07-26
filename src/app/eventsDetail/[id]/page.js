import DetailCard from "@/components/EventDetailPageComponents/DetailCard";
import LeftPart from "@/components/EventDetailPageComponents/LeftPart";
import PaddingContainer from "@/components/PaddingContainer";
import EventCard from "@/components/EventDetailPageComponents/EventCard";
import FooterComponent from "@/components/FooterComponent";
import NavbarSection from "@/components/EventsNavbar/NavbarSection";
import { Box } from "@mui/material";
import React from "react";

const Index = () => {
  return (
    <>
      <NavbarSection />
      <Box
        sx={{
          width: "100%",
          maxWidth: "1440px",
          px: "32px",
          mx: "auto",
          mt: "100px",
          mb: "80px",
          boxSizing: "border-box",
        }}
      >
        {/* MAIN LAYOUT */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "1fr 468px",
            gap: "30px",
            width: "100%",
            alignItems: "start",
          }}
        >
          {/* LEFT SIDE */}
          <Box sx={{ minWidth: 0 }}>
            <LeftPart />
          </Box>

          {/* RIGHT SIDE */}
          <Box
            sx={{
              position: "relative",
            }}
          >
            <Box
              sx={{
                position: "sticky",
                top: "120px",
              }}
            >
              <DetailCard />
            </Box>
          </Box>
        </Box>

        {/* BELOW CONTENT */}
        <Box
          sx={{
            mt: "120px",
            width: "100%",
          }}
        >
          <EventCard />
        </Box>

        <Box
          sx={{
            mt: "120px",
            width: "100%",
          }}
        >
          <FooterComponent />
        </Box>
      </Box>
    </>
  );
};

export default Index;
