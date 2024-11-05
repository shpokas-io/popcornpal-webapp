import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Box,
  useMediaQuery,
  Divider,
  Container,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useTheme } from "@mui/material/styles";
import { Link } from "react-router-dom";

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
    { label: "Profile", path: "/profile" },
  ];

  const drawer = (
    <Box
      sx={{
        width: 250,
        backgroundColor: theme.palette.background.paper,
        height: "100%",
        paddingTop: 2,
      }}
      role="presentation"
      onClick={handleDrawerToggle}
      onKeyDown={handleDrawerToggle}
    >
      <Typography variant="h6" sx={{ textAlign: "center", my: 2 }}>
        PopcornPal
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem
            key={item.label}
            component={Link}
            to={item.path}
            sx={{
              color: theme.palette.text.primary,
              "&:hover": {
                backgroundColor: theme.palette.action.hover,
              },
            }}
          >
            <ListItemText primary={item.label} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
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
          {/* Logo */}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography
              variant="h6"
              component="div"
              sx={{
                flexGrow: 1,
                fontFamily: "Roboto, sans-serif",
                fontWeight: 700,
                letterSpacing: 1,
                color: "#fff",
                mr: 2,
              }}
            >
              PopcornPal
            </Typography>
          </Box>

          {/* Burger menu for mobile */}
          {isMobile ? (
            <>
              <IconButton
                color="inherit"
                edge="end"
                onClick={handleDrawerToggle}
                aria-label="menu"
              >
                <MenuIcon />
              </IconButton>
              <Drawer
                anchor="right"
                open={drawerOpen}
                onClose={handleDrawerToggle}
              >
                {drawer}
              </Drawer>
            </>
          ) : (
            <Box
              sx={{
                display: "flex",
                gap: 4,
                justifyContent: "center",
                flexGrow: 1,
              }}
            >
              {navItems.map((item) => (
                <Typography
                  key={item.label}
                  variant="body1"
                  component={Link}
                  to={item.path}
                  sx={{
                    textDecoration: "none",
                    color: "white",
                    fontSize: "1rem",
                    "&:hover": {
                      color: "#ffccb",
                    },
                  }}
                >
                  {item.label}
                </Typography>
              ))}
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default NavBar;
