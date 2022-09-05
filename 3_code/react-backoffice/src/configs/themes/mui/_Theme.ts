import { createTheme } from "@mui/material";
// import { colors } from "../Colors";

// const mainPallete = {
//   primary: "#151D3B",
//   secondary: "#D82148",
//   thirnary: "#6EBF8B",
//   forth: "#DADBBD",
// }

export const MuiTheme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          // fontSize: 16,
          // fontWeight: 500,
          // background: 'linear-gradient(90deg, #FF8329 11.75%, #D0428C 51.5%, #A200EE 91.26%)'
        }
      }
    },
  },
  palette: {
    // mode: 'dark',
    primary: {
      main: '#151D3B',
      // main: '#90a4ae',
      // light: "#c1d5e0",
      // dark: "#62757f",
      // contrastText: '#000000'
    },
    secondary: {
      main: '#D82148',
      // main: '#e0e0e0',
      // light: "#ffffff",
      // dark: "#aeaeae",
      // contrastText: '#000000'
    },
    // oldPrimary: {
    //   dark: colors.primaryBlue.dark,
    //   light: colors.primaryBlue.light,
    //   main: colors.primaryBlue.main,
    //   contrastText: colors.text.contrastHigh,
    // },
    // oldSecondary: {
    //   dark: colors.secondaryPurple.dark,
    //   light: colors.secondaryPurple.light,
    //   main: colors.secondaryPurple.main,
    //   contrastText: colors.text.contrastHigh,
    // },
    // plainWhite: {
    //   main: colors.white,
    //   contrastText: colors.text.contrastLow,
    // },
    // text: {
    //   primary: colors.text.primary,
    //   secondary: colors.text.secondary,
    // },
    // tint: { ...colors },
  },
  shape: {
    borderRadius: 8
  },
  typography:{
    fontFamily: "'Work Sans', 'Roboto','Helvetica','Arial',sans-serif"
  },
})