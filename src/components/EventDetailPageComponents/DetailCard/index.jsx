"use client";

import React, { useMemo } from "react";
import { Box, Typography, Card, Divider, Button } from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import PaymentIcon from "@mui/icons-material/Payment";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";

const PRODUCT_SANS = "'Product Sans', system-ui, -apple-system, sans-serif";

/**
 * Formats start_at and end_at in IST for the DetailCard date line.
 */
function formatDetailDate(startAt, endAt) {
  if (!startAt) return "";
  try {
    const startDate = new Date(startAt);
    const dayOpts = {
      timeZone: "Asia/Kolkata",
      year: "numeric",
      month: "numeric",
      day: "numeric",
    };
    const isSameDay =
      !endAt ||
      startDate.toLocaleDateString("en-IN", dayOpts) ===
        new Date(endAt).toLocaleDateString("en-IN", dayOpts);

    const timeOpts = {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
      timeZone: "Asia/Kolkata",
    };
    const formatTime = (d) =>
      new Date(d)
        .toLocaleTimeString("en-IN", timeOpts)
        .replace(/\u202f/g, " ")
        .toUpperCase();

    if (isSameDay) {
      const datePart = startDate.toLocaleDateString("en-IN", {
        weekday: "long",
        month: "short",
        day: "numeric",
        timeZone: "Asia/Kolkata",
      });
      const startTime = formatTime(startAt);
      if (!endAt) {
        return `${datePart} · ${startTime} IST`;
      }
      const endTime = formatTime(endAt);
      return `${datePart} · ${startTime} to ${endTime} IST`;
    } else {
      const formatDatePart = (d) =>
        new Date(d).toLocaleDateString("en-IN", {
          day: "numeric",
          month: "short",
          timeZone: "Asia/Kolkata",
        });
      const startStr = `${formatDatePart(startAt)} ${formatTime(startAt)}`;
      const endStr = `${formatDatePart(endAt)} ${formatTime(endAt)}`;
      return `${startStr} – ${endStr} IST`;
    }
  } catch {
    return "";
  }
}

const DetailRow = ({ icon: Icon, children }) => (
  <Box sx={{ display: "flex", gap: "16px", py: "18px", alignItems: "flex-start" }}>
    <Box
      sx={{
        width: "32px",
        height: "32px",
        borderRadius: "50%",
        border: "1.5px solid #4669F2",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
        mt: "2px",
      }}
    >
      <Icon sx={{ color: "#4669F2", fontSize: "18px" }} />
    </Box>
    <Box sx={{ display: "flex", flexDirection: "column", gap: "2px" }}>
      {children}
    </Box>
  </Box>
);

const DetailCard = ({ event, isStatic = false }) => {
  const dateLine = useMemo(() => {
    if (isStatic || !event) {
      return "Wednesday, Feb 18 · 7:30 AM to 9:00 AM IST";
    }
    return formatDetailDate(event.start_at, event.end_at);
  }, [event, isStatic]);

  // Static fallback rendering
  if (isStatic || !event) {
    return (
      <Card
        sx={{
          width: "100%",
          borderRadius: "32px",
          p: "24px",
          boxShadow: "none",
          border: "1px solid #E0E0E0",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <DetailRow icon={CalendarMonthIcon}>
          <Typography
            sx={{
              fontFamily: PRODUCT_SANS,
              fontSize: "18px",
              fontWeight: 450,
              color: "#000000",
            }}
          >
            {dateLine}
          </Typography>
        </DetailRow>

        <Divider sx={{ borderColor: "#F2F2F2" }} />

        <DetailRow icon={LocationOnOutlinedIcon}>
          <Typography
            sx={{
              fontFamily: PRODUCT_SANS,
              fontSize: "18px",
              fontWeight: 450,
              color: "#000000",
            }}
          >
            Cubbon Park
          </Typography>
          <Typography
            sx={{
              fontFamily: PRODUCT_SANS,
              fontSize: "18px",
              fontWeight: 450,
              color: "#6D6D6D",
              lineHeight: "1.4",
            }}
          >
            XHHW+VP6, Dr Ambedkar Rd, Ambedkar Veedhi, Sampangi Rama Nagar, Bengaluru, Karnataka 560001 · Bangalore
          </Typography>
        </DetailRow>

        <Divider sx={{ borderColor: "#F2F2F2" }} />

        <DetailRow icon={PaymentIcon}>
          <Typography
            sx={{
              fontFamily: PRODUCT_SANS,
              fontSize: "20px",
              fontWeight: 450,
              color: "#000000",
            }}
          >
            Registration fee : <Box component="span" sx={{ fontWeight: 600 }}>500/-</Box>
          </Typography>
        </DetailRow>

        <Divider sx={{ borderColor: "#F2F2F2" }} />

        <DetailRow icon={GroupOutlinedIcon}>
          <Typography
            sx={{
              fontFamily: PRODUCT_SANS,
              fontSize: "18px",
              fontWeight: 500,
              color: "#000000",
            }}
          >
            Only 52 slots left
          </Typography>
        </DetailRow>

        <Box sx={{ mt: "12px" }}>
          <Button
            variant="contained"
            sx={{
              bgcolor: "#101010",
              color: "#FFFFFF",
              borderRadius: "100px",
              py: "16px",
              px: "32px",
              textTransform: "none",
              fontFamily: PRODUCT_SANS,
              fontSize: "18px",
              fontWeight: 400,
              "&:hover": {
                bgcolor: "#333333",
              },
              boxShadow: "none",
            }}
          >
            Register now
          </Button>
        </Box>
      </Card>
    );
  }

  // Live event rendering
  const isOnline = event.location_type === "online";
  const locationTitle = isOnline ? "Online event" : (event.location_text || "Venue details will be shared soon.");
  const locationSubtext = isOnline ? "Meeting link will be shared via registered email." : null;

  // Fee row
  const currencySymbol = event.currency === "USD" ? "$" : "₹";
  const feeLabel = event.is_paid
    ? `Registration fee : ${currencySymbol}${event.price ?? 0}/-`
    : "Free";

  // Check if registration is closed
  const isEnded = Boolean(event.isClosed);
  const hasUrl = Boolean(event.registration_url);
  const isClosed = isEnded || !hasUrl;

  return (
    <Card
      sx={{
        width: "100%",
        borderRadius: "32px",
        p: "24px",
        boxShadow: "none",
        border: "1px solid #E0E0E0",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* DATE ROW */}
      <DetailRow icon={CalendarMonthIcon}>
        <Typography
          sx={{
            fontFamily: PRODUCT_SANS,
            fontSize: "18px",
            fontWeight: 450,
            color: "#000000",
          }}
        >
          {dateLine}
        </Typography>
      </DetailRow>

      <Divider sx={{ borderColor: "#F2F2F2" }} />

      {/* LOCATION ROW */}
      <DetailRow icon={LocationOnOutlinedIcon}>
        <Typography
          sx={{
            fontFamily: PRODUCT_SANS,
            fontSize: "18px",
            fontWeight: 450,
            color: "#000000",
          }}
        >
          {locationTitle}
        </Typography>
        {locationSubtext ? (
          <Typography
            sx={{
              fontFamily: PRODUCT_SANS,
              fontSize: "18px",
              fontWeight: 450,
              color: "#6D6D6D",
              lineHeight: "1.4",
            }}
          >
            {locationSubtext}
          </Typography>
        ) : null}
      </DetailRow>

      <Divider sx={{ borderColor: "#F2F2F2" }} />

      {/* FEE ROW */}
      <DetailRow icon={PaymentIcon}>
        <Typography
          sx={{
            fontFamily: PRODUCT_SANS,
            fontSize: "20px",
            fontWeight: 450,
            color: "#000000",
          }}
        >
          {feeLabel}
        </Typography>
      </DetailRow>

      {/* CAPACITY ROW (Hide when null) */}
      {event.capacity != null ? (
        <>
          <Divider sx={{ borderColor: "#F2F2F2" }} />
          <DetailRow icon={GroupOutlinedIcon}>
            <Typography
              sx={{
                fontFamily: PRODUCT_SANS,
                fontSize: "18px",
                fontWeight: 500,
                color: "#000000",
              }}
            >
              Capacity: {event.capacity} seats
            </Typography>
          </DetailRow>
        </>
      ) : null}

      <Box sx={{ mt: "12px" }}>
        <Button
          variant="contained"
          disabled={isClosed}
          {...(!isClosed && hasUrl
            ? {
                component: "a",
                href: event.registration_url,
                target: "_blank",
                rel: "noopener noreferrer",
              }
            : {})}
          sx={{
            bgcolor: "#101010",
            color: "#FFFFFF",
            borderRadius: "100px",
            py: "16px",
            px: "32px",
            textTransform: "none",
            fontFamily: PRODUCT_SANS,
            fontSize: "18px",
            fontWeight: 400,
            "&:hover": {
              bgcolor: "#333333",
            },
            "&.Mui-disabled": {
              bgcolor: "#E0E0E0",
              color: "#8A8A8A",
            },
            boxShadow: "none",
          }}
        >
          {isClosed ? "Registration closed" : "Register now"}
        </Button>
      </Box>
    </Card>
  );
};

export default DetailCard;
