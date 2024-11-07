import React, { useState } from "react";
import {
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  Typography,
  Divider,
} from "@mui/material";
import { useAppSelector, useAppDispatch } from "../../hooks/hooks";
import { logout } from "../../features/auth/authSlice";

const UserMenu: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { userName, preferredGenre } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logout());
    handleMenuClose();
  };

  return (
    <>
      <IconButton color="inherit" onClick={handleMenuOpen}>
        <Avatar sx={{ bgcolor: "#ff6e7f" }}>U</Avatar>
      </IconButton>
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
    </>
  );
};

export default UserMenu;
