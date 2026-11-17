"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import { Box, Typography, Button, Skeleton } from "@mui/material";
import DetailCard from "@/components/EventDetailPageComponents/DetailCard";
import LeftPart from "@/components/EventDetailPageComponents/LeftPart";
import EventCard from "@/components/EventDetailPageComponents/EventCard";
import FooterComponent from "@/components/FooterComponent";
import NavbarSection from "@/components/EventsNavbar/NavbarSection";
import { useEventDetail } from "@/hooks/useEventDetail";
import { ULTRA_WIDE_MEDIA } from "@/theme/breakpoints";

const ULTRA_RAIL_WIDTH = "620px";
const PRODUCT_SANS = "'Product Sans', system-ui, -apple-system, sans-serif";

const EventDetailPage = () => {
  const params = useParams();
  const router = useRouter();
  const id = params?.id;

  const { event, loading, error, notFound, isStatic } = useEventDetail(id);

  return (
    <>
      <Box
        sx={{
          [ULTRA_WIDE_MEDIA]: {
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
          [ULTRA_WIDE_MEDIA]: { maxWidth: "none" },
        }}
      >
        {/* LOADING STATE */}
        {loading ? (
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "1fr 468px",
              gap: "30px",
              width: "100%",
              alignItems: "start",
              [ULTRA_WIDE_MEDIA]: {
                gridTemplateColumns: `1fr ${ULTRA_RAIL_WIDTH}`,
              },
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "32px",
                width: "100%",
              }}
            >
              <Box sx={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                <Skeleton variant="text" width="60%" height={30} />
                <Skeleton variant="text" width="90%" height={60} />
                <Box sx={{ display: "flex", gap: "12px" }}>
                  <Skeleton
                    variant="rounded"
                    width={100}
                    height={36}
                    sx={{ borderRadius: "100px" }}
                  />
                  <Skeleton
                    variant="rounded"
                    width={100}
                    height={36}
                    sx={{ borderRadius: "100px" }}
                  />
                </Box>
              </Box>
              <Skeleton
                variant="rounded"
                width="100%"
                height={390}
                sx={{ borderRadius: "32px" }}
              />
              <Box sx={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                <Skeleton variant="text" width="40%" height={36} />
                <Skeleton variant="text" width="100%" height={24} />
                <Skeleton variant="text" width="100%" height={24} />
                <Skeleton variant="text" width="80%" height={24} />
              </Box>
            </Box>

            <Box sx={{ position: "relative" }}>
              <Skeleton
                variant="rounded"
                width="100%"
                height={450}
                sx={{ borderRadius: "32px" }}
              />
            </Box>
          </Box>
        ) : notFound ? (
          /* NOT FOUND STATE */
          <Box
            sx={{
              py: "100px",
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "24px",
            }}
          >
            <Typography
              sx={{
                fontSize: "32px",
                fontWeight: 700,
                color: "#000",
                fontFamily: PRODUCT_SANS,
              }}
            >
              Event not found
            </Typography>
            <Button
              variant="contained"
              onClick={() => router.push("/eventsPage")}
              sx={{
                bgcolor: "#101010",
                color: "#FFFFFF",
                borderRadius: "100px",
                py: "14px",
                px: "36px",
                textTransform: "none",
                fontFamily: PRODUCT_SANS,
                fontSize: "16px",
                fontWeight: 400,
                "&:hover": { bgcolor: "#333333" },
                boxShadow: "none",
              }}
            >
              Browse all events
            </Button>
          </Box>
        ) : error ? (
          /* ERROR STATE */
          <Box
            sx={{
              py: "100px",
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "24px",
            }}
          >
            <Typography
              sx={{
                fontSize: "24px",
                fontWeight: 600,
                color: "#DC2626",
                fontFamily: PRODUCT_SANS,
              }}
            >
              Could not load this event. Please try again.
            </Typography>
            <Button
              variant="contained"
              onClick={() => router.push("/eventsPage")}
              sx={{
                bgcolor: "#101010",
                color: "#FFFFFF",
                borderRadius: "100px",
                py: "14px",
                px: "36px",
                textTransform: "none",
                fontFamily: PRODUCT_SANS,
                fontSize: "16px",
                fontWeight: 400,
                "&:hover": { bgcolor: "#333333" },
                boxShadow: "none",
              }}
            >
              Browse all events
            </Button>
          </Box>
        ) : (
          /* SUCCESS CONTENT (LIVE OR STATIC) */
          <>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "1fr 468px",
                gap: "30px",
                width: "100%",
                alignItems: "start",
                [ULTRA_WIDE_MEDIA]: {
                  gridTemplateColumns: `1fr ${ULTRA_RAIL_WIDTH}`,
                },
              }}
            >
              {/* LEFT SIDE */}
              <Box
                sx={{
                  minWidth: 0,
                  [ULTRA_WIDE_MEDIA]: {
                    "& > div > div:nth-of-type(2)": {
                      width: "100%",
                      height: "auto",
                      aspectRatio: "795 / 390",
                    },
                  },
                }}
              >
                <LeftPart event={event} isStatic={isStatic} />
              </Box>

              {/* RIGHT SIDE */}
              <Box sx={{ position: "relative" }}>
                <Box sx={{ position: "sticky", top: "120px" }}>
                  <DetailCard event={event} isStatic={isStatic} />
                </Box>
              </Box>
            </Box>

            {/* BELOW CONTENT */}
            <Box
              sx={{
                mt: "120px",
                width: "100%",
                [ULTRA_WIDE_MEDIA]: {
                  "& .MuiGrid-container > div > div": { maxWidth: "none" },
                },
              }}
            >
              <EventCard currentEventId={event?.id} isStatic={isStatic} />
            </Box>
          </>
        )}

        <Box sx={{ mt: "120px", width: "100%" }}>
          <FooterComponent />
        </Box>
      </Box>
    </>
  );
};

export default EventDetailPage;
