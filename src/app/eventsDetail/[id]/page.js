import DetailCard from "@/components/EventDetailPageComponents/DetailCard";
import LeftPart from "@/components/EventDetailPageComponents/LeftPart";
import PaddingContainer from "@/components/PaddingContainer";
import EventCard from "@/components/EventDetailPageComponents/EventCard";
import FooterComponent from "@/components/FooterComponent";
import NavbarSection from "@/components/EventsNavbar/NavbarSection";
import { Box } from "@mui/material";
import React from "react";
const ULTRA_WIDE = "@media (min-width:2400px)";
const ULTRA_RAIL_WIDTH = "620px";

const Index = () => {
  return (
    <>
      <Box
        sx={{
          [ULTRA_WIDE]: {
            "& .MuiToolbar-root": { px: "32px" },
          },
        }}
      >
        <NavbarSection />
      </Box>

      <Box
        sx={{
          width: "100%",
          maxWidth: "1440px",
          px: "32px",
          mx: "auto",
          mt: "100px",
          mb: "80px",
          boxSizing: "border-box",
          [ULTRA_WIDE]: { maxWidth: "none" },
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
            [ULTRA_WIDE]: {
              gridTemplateColumns: `1fr ${ULTRA_RAIL_WIDTH}`,
            },
          }}
        >
          {/* LEFT SIDE */}
          <Box
            sx={{
              minWidth: 0,
              [ULTRA_WIDE]: {
                "& > div > div:nth-of-type(2)": {
                  width: "100%",
                  height: "auto",
                  aspectRatio: "795 / 390",
                },
              },
            }}
          >
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
            [ULTRA_WIDE]: {
              "& .MuiGrid-container > div > div": { maxWidth: "none" },
            },
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
