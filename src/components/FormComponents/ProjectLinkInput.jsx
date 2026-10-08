import Box from "@mui/material/Box";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { fieldSx } from "./FormField";

const ProjectLinkInput = ({
  value,
  onChange,
  placeholder,
  removable = false,
  onRemove,
}) => (
  <Box sx={{ position: "relative", width: "100%" }}>
    <Box
      component="input"
      type="url"
      value={value}
      onChange={(event) => onChange?.(event.target.value)}
      placeholder={placeholder}
      sx={{
        ...fieldSx,
        height: "48px",
        px: "15px",
        pr: removable ? "50px" : "15px",
      }}
    />

    {removable && (
      <Box
        component="button"
        type="button"
        aria-label="Remove project link"
        onClick={onRemove}
        sx={{
          position: "absolute",
          top: "50%",
          right: "12px",
          transform: "translateY(-50%)",
          width: "30px",
          height: "30px",
          p: 0,
          border: 0,
          background: "transparent",
          color: "#E53935",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
        }}
      >
        <DeleteOutlineOutlinedIcon sx={{ fontSize: "20px" }} />
      </Box>
    )}
  </Box>
);

export default ProjectLinkInput;
