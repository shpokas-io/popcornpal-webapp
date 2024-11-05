import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#ff6e7f",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#b7e9ff",
      contrastText: "#333333",
    },
    background: {
      default: "#1c1c1e",
      paper: "#2c2c2e",
    },
    text: {
      primary: "#e0e0e0",
      secondary: "#b3b3b3",
      disabled: "#9e9e9e",
    },
    warning: {
      main: "#ffd700",
    },
  },
  typography: {
    fontFamily: "Roboto, sans-serif",
    h4: {
      fontWeight: 700,
      letterSPacing: 1,
      color: "#fff",
    },
    body1: {
      color: "#fff",
    },
  },
});

export default theme;
