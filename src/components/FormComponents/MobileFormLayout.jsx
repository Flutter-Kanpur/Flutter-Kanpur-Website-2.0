import Box from "@mui/material/Box";
import GradientHeader from "@/components/header/GradientHeader";

const MobileFormLayout = ({
  title,
  onBack,
  children,
  formSx = {},
}) => (
  <Box
    sx={{
      width: "100%",
      maxWidth: "480px",
      minHeight: "100vh",
      mx: "auto",
      position: "relative",
      px: "22px",
      pb: "110px",
      boxSizing: "border-box",
      overflowX: "hidden",
      backgroundColor: "#FFFFFF",
    }}
  >
    <GradientHeader
      title={title}
      onBack={onBack}
      sx={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 0,
        mb: 0,
        height: "290px",
        pt: "75px",
        background:
          "linear-gradient(180deg, #A9C9F5 0%, #DDE9F9 52%, #FFFFFF 100%)",
        "& .MuiTypography-root": {
          ml: 0,
          fontSize: "20px",
          fontWeight: 500,
        },
        "& .MuiIconButton-root": {
          left: "16px",
          top: "73px",
        },
        "& .MuiSvgIcon-root": {
          fontSize: "18px",
        },
      }}
    />

    <Box
      sx={{
        position: "relative",
        zIndex: 1,
        mt: "145px",
        display: "flex",
        flexDirection: "column",
        gap: "27px",
        ...formSx,
      }}
    >
      {children}
    </Box>
  </Box>
);

export default MobileFormLayout;
