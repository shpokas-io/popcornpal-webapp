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
    { label: "PRofile", path: "/profile" },
  ];
  const drawer = (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onCLick={handleDrawerToggle}
      onKeyDown={handleDrawerToggle}
    >
      <List>
        {navItems.map((item) => (
          <ListItem button key={item.label} component={Link} to={item.path}>
            <ListItemText primary={item.label} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
  return (
    <AppBar position="static">
      <Toolbar>
        {/* Logo */}
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          PopcornPal
        </Typography>
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
          // Horizontal nav for Desktop
          <Box sx={{ display: "flex", gap: 3 }}>
            {navItems.map((item) => (
              <Typography
                key={item.label}
                variant="body1"
                component={Link}
                to={item.path}
                sx={{ textDecoration: "none", color: "inherit" }}
              >
                {item.label}
              </Typography>
            ))}
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
