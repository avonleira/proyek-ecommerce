import { createTheme } from "@mui/material";
import { colors } from "../Colors";

export const AdminMuiTheme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
        }
      }
    },
  },
  palette: {
    primary: {
      main: colors.bluePurple.main,
    },
    secondary: {
      main: colors.cutePink.main,
    }
  },
  // shape: {
  //   borderRadius: 8
  // },
  typography:{
    fontFamily: "'Roboto','Helvetica','Arial',sans-serif"
  },
})