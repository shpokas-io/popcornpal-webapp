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
  Avatar,
  Menu,
  MenuItem,
  Button,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useTheme } from "@mui/material/styles";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { logout } from "../features/auth/authSlice";

const NavBar: React.FC = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const dispatch = useAppDispatch();
  const { userName, preferredGenre } = useAppSelector((state) => state.auth);

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logout());
    handleMenuClose();
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
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        paddingTop: 2,
      }}
      role="presentation"
      onClick={handleDrawerToggle}
      onKeyDown={handleDrawerToggle}
    >
      {/* Top content in the Drawer */}
      <Box>
        <Typography variant="h6" sx={{ textAlign: "center", my: 2 }}>
          PopcornPal
        </Typography>
        <Divider />

        {/* User Info and Logout inside Drawer on Mobile */}
        {isMobile && (
          <Box display="flex" flexDirection="column" alignItems="center" mt={2}>
            <Avatar sx={{ bgcolor: "#ff6e7f", mb: 1 }}>U</Avatar>
            <Typography variant="subtitle1">{userName}</Typography>
            <Typography variant="body2" color="textSecondary">
              Favorite genre: {preferredGenre}
            </Typography>
            <Divider sx={{ my: 1, width: "80%" }} />
          </Box>
        )}

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
      {/* Bottom-aligned Logout button */}
      {isMobile && (
        <Box sx={{ p: 2 }}>
          <Button
            onClick={handleLogout}
            variant="contained"
            color="secondary"
            fullWidth
          >
            Logout
          </Button>
        </Box>
      )}
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

          {/* User Icon and Menu for Desktop */}
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            transformOrigin={{ vertical: "top", horizontal: "right" }}
          >
            <MenuItem>
              <Typography variant="subtitle1">{userName}</Typography>
            </MenuItem>
            <MenuItem>
              <Typography variant="body2">
                Favorite genre: {preferredGenre}
              </Typography>
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default NavBar;
