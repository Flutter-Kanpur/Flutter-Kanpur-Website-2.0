"use client";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Image from "next/image";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import { useRouter } from "next/navigation";

const DiscussionListHeader = ({ title }) => {
  const router = useRouter();

  return (
    <Box
      sx={{
        width: "100%",
        display: "grid",
        gridTemplateColumns: "40px 1fr 40px",
        alignItems: "center",
      }}
    >
      <IconButton
        aria-label="Go back"
        onClick={() => router.back()}
        sx={{ p: 0, width: "32px", height: "32px", color: "#000000" }}
      >
        <ArrowBackRoundedIcon />
      </IconButton>

      <Typography
        sx={{
          fontFamily: 'var(--font-product-sans), "Product Sans", sans-serif',
          fontSize: "18px",
          fontWeight: 600,
          color: "#000000",
          textAlign: "center",
        }}
      >
        {title}
      </Typography>

      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
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

export default DiscussionListHeader;
