import React, { useState } from "react";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

const UpdateCard = ({
  title = "Design Challenge 2026",
  description = "Join us for an exciting design challenge!",
  buttonText = "View Details",
  onButtonClick = () => {},
  backgroundImage = "/assets/landing-page-assets/updateCard.png",
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Card
      elevation={0}
      sx={{
        width: "100%",
        maxWidth: "100%",
        borderRadius: "32px",
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        boxShadow: "none",
        minHeight: "200px",
        height: "187px",
        minHeight: "187px",
        position: "relative",
        overflow: "hidden",
        boxSizing: "border-box",
      }}
    >
      <Box
        sx={{
          width: "calc(100% - 62px)",
          position: "absolute",
          top: "22px",
          left: "31px",
          display: "flex",
          flexDirection: "column",
          gap: "8px",
        }}
      >
        <Typography
          variant="h5"
          sx={{
            fontFamily: '"Product Sans" !important',
            color: "#FFFFFF",
            fontSize: "18px",
            fontWeight: 700,
            lineHeight: "32px",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {title}
        </Typography>

        <Typography
          variant="body2"
          sx={{
            color: "#EDEDED",
            whiteSpace: "pre-line",
            fontSize: "15px",
            fontWeight: 400,
            lineHeight: "20px",
            opacity: 0.95,
            textShadow: "0 1px 4px rgba(0, 0, 0, 0.15)",
          }}
        >
          {description}
        </Typography>

        <Button
          variant="contained"
          disableElevation
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={onButtonClick}
          sx={{
            bgcolor: "#FFFFFF",
            color: "#000000",
            borderRadius: "100px",
            px: "28px",
            py: "10px",
            fontSize: "14px",
            fontWeight: 400,
            textTransform: "none",
            alignSelf: "flex-start",
            transform: isHovered ? "translateY(-2px)" : "none",
          }}
        >
          {buttonText}
        </Button>
      </Box>
    </Card>
  );
};

export default UpdateCard;
