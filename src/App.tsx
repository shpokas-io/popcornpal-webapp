import React from "react";
import { Provider } from "react-redux";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { store } from "./app/store";
import Login from "./pages/Login";
import MainPage from "./pages/MainPage";
import MoviesPage from "./pages/MoviesPage";
import NavBar from "./components/NavBar";
import { useAppSelector } from "./hooks/hooks";
import { ThemeProvider, CssBaseline, Box } from "@mui/material";
import theme from "./theme";

const App: React.FC = () => {
  const token = useAppSelector((state) => state.auth.token);

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box
          sx={{
            minHeight: "100vh",
            backgroundColor: theme.palette.background.default,
            color: theme.palette.text.primary,
          }}
        >
          <Router>
            {token && <NavBar />}
            <Routes>
              <Route
                path="/login"
                element={token ? <Navigate to="/" /> : <Login />}
              />
              <Route
                path="/"
                element={token ? <MainPage /> : <Navigate to="/login" />}
              />
              <Route
                path="/movies"
                element={token ? <MoviesPage /> : <Navigate to="/login" />}
              />
            </Routes>
          </Router>
        </Box>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
