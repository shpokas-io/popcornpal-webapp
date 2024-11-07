import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  Box,
  useMediaQuery,
  Container,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useTheme } from "@mui/material/styles";
import { Link } from "react-router-dom";
import DrawerContent from "./DrawerContent";
import UserMenu from "./userMenu";

const NavBar: React.FC = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const navItems = [
    { label: "Home", path: "/" },
    { label: "Movies", path: "/movies" },
    { label: "Favorites", path: "/favorites" },
  ];

  return (
    <AppBar
      position="static"
      sx={{
        backgroundImage: "linear-gradient(90deg, #ff6e7f, #bfe9ff)",
        boxShadow: "none",
      }}
    >
      <Container>
        <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
          <Typography
            variant="h6"
            sx={{
              fontFamily: "Roboto, sans-serif",
              fontWeight: 700,
              color: "#fff",
            }}
          >
            PopcornPal
          </Typography>

          {isMobile ? (
            <>
              <IconButton
                color="inherit"
                edge="end"
                onClick={handleDrawerToggle}
              >
                <MenuIcon />
              </IconButton>
              <Drawer
                anchor="right"
                open={drawerOpen}
                onClose={handleDrawerToggle}
              >
                <DrawerContent
                  navItems={navItems}
                  onClose={handleDrawerToggle}
                />
              </Drawer>
            </>
          ) : (
            <Box sx={{ display: "flex", gap: 4 }}>
              {navItems.map((item) => (
                <Typography
                  key={item.label}
                  variant="body1"
                  component={Link}
                  to={item.path}
                  sx={{ textDecoration: "none", color: "white" }}
                >
                  {item.label}
                </Typography>
              ))}
              <UserMenu />
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default NavBar;
