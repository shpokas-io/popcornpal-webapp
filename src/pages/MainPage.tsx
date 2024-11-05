import { Typography, Box, Button } from "@mui/material";
import { useAppDispatch } from "../hooks/hooks";
import { logout } from "../features/auth/authSlice";

const MainPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" mt={4}>
      <Typography variant="h4">Welcome to the main Page!</Typography>
      <Typography>Authenticated Content Here</Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={handleLogout}
        sx={{ mt: 2 }}
      >
        Logout
      </Button>
    </Box>
  );
};

export default MainPage;
