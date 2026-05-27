"use client";
import React, { useState } from "react";
import { Box, Typography, Button, MobileStepper } from "@mui/material";
import { useRouter } from "next/navigation";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import WrapperComponent from "@/components/WrapperComponent";

const STEPS = [
  {
    title: "Discover what's happening",
    subtitle: (
      <>
        Stay updated with meetups, workshops,
        <br />
        and challenges happening in the Flutter
        <br />
        Kanpur community.
      </>
    ),
  },
  {
    title: "Learn and build together",
    subtitle: (
      <>
        Join events, explore teams, and learn <br />
        through real-world discussions and hands- <br />
        on sessions.
      </>
    ),
  },
  {
    title: "Be part of the community",
    subtitle: (
      <>
        Connect with developers and designers, <br />
        contribute to projects, and grow together.
      </>
    ),
  },
];

export default function DiscoverPage() {
  const router = useRouter();
  const [activeStep, setActiveStep] = useState(0); //0,1,2
  const maxSteps = STEPS.length; // 3

  const handleNext = () => {
    if (activeStep < maxSteps - 1) setActiveStep((s) => s + 1);
    else router.push("/Auth/signup");
  };

  const step = STEPS[activeStep];

  return (
    <WrapperComponent style={{ display: "flex", flexDirection: "row", alignItems: "center", paddingY: 0, backgroundColor: "#fff", gap: '10px', height: '100%' }}>
      <Box
        sx={{
          height: "100dvh",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#fff",
        }}
      >
        <Box
          sx={{
            justifyContent: "right",
          }}
        >
          <Typography
            onClick={() => router.push("/Auth/signup")}
            sx={{
              fontSize: { xs: 14, sm: 17, md: 20 },
              fontWeight: 400,
              marginTop: 2,
              textAlign: "right",
              mb: 1,
              px: 3,
              pt: 3,
              color: "#4167F2",
              cursor: "pointer", // ✅ makes it feel clickable
            }}
          >
            Skip
          </Typography>
        </Box>

        {/* ✅ Top area (can be image/illustration). It auto takes remaining height */}
        <Box sx={{ flex: 1 }} />

        {/* ✅ Bottom content area */}
        <Box sx={{ px: 3, pb: 2 }}>
          <Typography
            sx={{
              fontSize: { xs: 20, sm: 22, md: 24 },
              fontWeight: 700,
              textAlign: "center",
              color: "#000000",
              mb: 1,
            }}
          >
            {step.title}
          </Typography>

          <Typography
            sx={{
              fontSize: { xs: 12.5, sm: 13.5, md: 14.5 },
              color: "#6D6D6D",
              textAlign: "center", // (your current is center; choose one)
              lineHeight: 1.6,
              fontWeight: 400,
              maxWidth: 360,
              mb: 2,
            }}
          >
            {step.subtitle}
          </Typography>

          {/* ✅ Carousel indicator (dots) */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "2px", // space between indicators
              mt: 1.5,
            }}
          >
            {Array.from({ length: maxSteps }).map((_, index) => {
              const isActive = index === activeStep;

              return (
                <Box
                  key={index}
                  sx={{
                    height: 6,
                    width: isActive ? 32 : 8, // ✅ active expands, others stay dot
                    borderRadius: 999,
                    backgroundColor: isActive ? "#0A0A0A" : "#D9D9D9",
                    transition: "width 220ms ease, background-color 220ms ease",
                  }}
                />
              );
            })}
          </Box>
        </Box>

        {/* ✅ Bottom fixed button area */}
        <Box
          sx={{
            px: 3,
            pb: "max(16px, env(safe-area-inset-bottom))",
          }}
        >

          <Button
            fullWidth
            onClick={handleNext}
            endIcon={<ArrowForwardRoundedIcon sx={{ fontSize: 22 }} />}
            sx={{
              height: "39px",
              width: activeStep === maxSteps - 1 ? "162px" : "120px",
              borderRadius: "100px",
              backgroundColor: "#0A0A0A",
              color: "#fff",
              fontWeight: 400,
              justifyContent: "center",
              alignItems: "center",
              marginLeft: activeStep === maxSteps - 1 ? "49px" : "70px",

              flow: "horizontal",
              padding: "10px 28px 10px 28px",
              fontSize: 16,
              textTransform: "none",
              boxShadow: "inset 4px 6px 6px rgba(226,226,226,0.2)",

              "& .MuiButton-endIcon": {
                marginLeft: "8px",
              },

              "&:hover": {
                backgroundColor: "#000",
              },
            }}
          >
            {activeStep === maxSteps - 1 ? "Get Started" : "Next"}
          </Button>
        </Box>
      </Box>
    </WrapperComponent>
  );
}
