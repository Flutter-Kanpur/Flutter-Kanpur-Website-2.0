"use client";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import RevampButton from "@/components/buttons/revampbutton/RevampButton";
import { colors } from "@/theme/colors";

/**
 * LoadMoreButton — centred white outlined pill .
 */
const LoadMoreButton = ({ onClick, label = "Load more", sx }) => (
  <RevampButton
    text={
      <>
        <KeyboardArrowDownIcon sx={{ fontSize: 20 }} />
        {label}
      </>
    }
    width="auto"
    bgColor="#FFFFFF"
    onClick={onClick}
    sx={{
      alignSelf: "center",
      height: "45px",
      px: "22px",
      py: 0,
      gap: "8px",
      border: "1px solid #D6D6D6",
      color: colors.neutral[950],
      backgroundImage: "none",
      boxShadow: "inset 0px 0px 8px rgba(0, 0, 0, 0.06)",
      "&:hover": {
        backgroundImage: "none",
        backgroundColor: "#FFFFFF",
        transform: "none",
      },
      ...sx,
    }}
  />
);

export default LoadMoreButton;
