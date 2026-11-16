import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export const fieldSx = {
  width: "100%",
  boxSizing: "border-box",
  border: "1px solid #D2D2D2",
  borderRadius: "15px",
  backgroundColor: "#FFFFFF",
  color: "#111111",
  fontFamily: "inherit",
  fontSize: "14px",
  outline: "none",
  transition: "border-color 0.15s ease, box-shadow 0.15s ease",
  "&::placeholder": {
    color: "#B0B0B0",
    opacity: 1,
  },
  "&:focus": {
    borderColor: "#4167F2",
    boxShadow: "0 0 0 1px #4167F2",
  },
};

const FormField = ({ label, htmlFor, children, sx = {} }) => (
  <Box
    sx={{
      width: "100%",
      display: "flex",
      flexDirection: "column",
      gap: "8px",
      ...sx,
    }}
  >
    {label && (
      <Typography
        component="label"
        htmlFor={htmlFor}
        sx={{
          color: "#111111",
          fontSize: "16px",
          lineHeight: "20px",
          fontWeight: 500,
          m: 0,
        }}
      >
        {label}
      </Typography>
    )}

    {children}
  </Box>
);

export default FormField;
