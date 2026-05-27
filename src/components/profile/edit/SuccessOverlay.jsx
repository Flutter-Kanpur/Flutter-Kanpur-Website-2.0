import { Box, Typography } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";

export default function SuccessOverlay() {
  return (
    <Box
      sx={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0,0,0,0.75)",
        zIndex: 9999,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          width: 80,
          height: 80,
          borderRadius: "50%",
          border: "4px solid white",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          mb: 2,
        }}
      >
        <CheckIcon sx={{ color: "white", fontSize: 50 }} />
      </Box>

      <Typography variant="h6" sx={{ color: "white", fontWeight: "bold" }}>
        Profile updated
      </Typography>
    </Box>
  );
}