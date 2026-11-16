import { createTheme } from "@mui/material/styles";
import { colors, fonts } from "./index";

const muiTheme = createTheme({
  palette: {
    primary: {
      main: colors.primary[500],
    },

    text: {
      primary: colors.neutral[950],
      secondary: colors.neutral[500],
    },

    background: {
      default: colors.base.white,
    },
  },

  typography: {
    fontFamily: fonts.primary,
  },
});

export default muiTheme;