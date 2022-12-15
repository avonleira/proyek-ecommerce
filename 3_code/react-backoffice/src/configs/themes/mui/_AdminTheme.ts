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
      main: "#fd841f",
      contrastText: "#fff"
    },
    secondary: {
      main: colors.grey[40],
    }
  },
  // shape: {
  //   borderRadius: 8
  // },
  typography:{
    fontFamily: "'Roboto','Helvetica','Arial',sans-serif"
  },
})