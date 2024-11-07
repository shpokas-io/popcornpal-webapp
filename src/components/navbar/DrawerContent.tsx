import React from "react";
import {
  Box,
  Typography,
  Divider,
  List,
  ListItem,
  ListItemText,
  Avatar,
  Button,
} from "@mui/material";
import { Link } from "react-router-dom";
import { logout } from "../../features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";

interface DrawerContentProps {
  navItems: { label: string; path: string }[];
  onClose: () => void;
}

const DrawerContent: React.FC<DrawerContentProps> = ({ navItems, onClose }) => {
  const dispatch = useAppDispatch();
  const { userName, preferredGenre } = useAppSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    onClose();
  };

  return (
    <Box
      sx={{ width: 250, paddingTop: 2 }}
      role="presentation"
      onClick={onClose}
    >
      <Typography variant="h6" sx={{ textAlign: "center", my: 2 }}>
        PopcornPal
      </Typography>
      <Divider />
      <Box display="flex" flexDirection="column" alignItems="center" mt={2}>
        <Avatar sx={{ bgcolor: "#ff6e7f", mb: 1 }}>U</Avatar>
        <Typography variant="subtitle1">{userName}</Typography>
        <Typography variant="body2" color="textSecondary">
          Favorite genre: {preferredGenre}
        </Typography>
      </Box>
      <Divider sx={{ my: 1, width: "80%" }} />
      <List>
        {navItems.map((item) => (
          <ListItem
            key={item.label}
            component={Link}
            to={item.path}
            sx={{
              color: "text.primary",
              "&:hover": { backgroundColor: "action.hover" },
            }}
          >
            <ListItemText primary={item.label} />
          </ListItem>
        ))}
      </List>
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
    </Box>
  );
};

export default DrawerContent;
