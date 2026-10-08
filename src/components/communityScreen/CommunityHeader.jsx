"use client";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Image from "next/image";

const CommunityHeader = () => {
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Typography
        sx={{
          fontFamily: 'var(--font-product-sans), "Product Sans", sans-serif',
          color: "#000000",
          fontWeight: 700,
          fontSize: "22px",
          lineHeight: 1.3,
        }}
      >
        Community
      </Typography>

      <Box sx={{ display: "flex", alignItems: "center", gap: "20px" }}>
        <Image
          src="/assets/landing-page-assets/bell-icon.svg"
          alt="Notifications"
          width={22}
          height={22}
        />
        <Image
          src="/assets/landing-page-assets/menu.svg"
          alt="Menu"
          width={20}
          height={20}
        />
      </Box>
    </Box>
  );
};

export default CommunityHeader;
