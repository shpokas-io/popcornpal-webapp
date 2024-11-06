import { Typography, Box, Button } from "@mui/material";
import { useAppDispatch } from "../hooks/hooks";
import { logout } from "../features/auth/authSlice";
import NavBar from "../components/NavBar";
import logo from "../assets/images/logo-nobc.png";

const MainPage: React.FC = () => {
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  //Array of dynamic welcome messages
  const welcomeMessages = [
    "Welcome back, movie buff!",
    "Ready to dive into some cinematic magic?",
    "Lights, camera, action! Let’s find your next favorite movie.",
    "Popcorn’s ready! Let's explore the movie world.",
    "Ready for a binge-worthy experience?",
  ];

  //Randomly select one message
  const randomMessage =
    welcomeMessages[Math.floor(Math.random() * welcomeMessages.length)];

  return (
    <>
      <NavBar />
      <Box display="flex" flexDirection="column" alignItems="center" mt={4}>
        <img
          src={logo}
          alt="App Logo"
          style={{ width: "150px", marginBottom: "20px" }}
        />
        <Typography variant="h4">{randomMessage}</Typography>
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
    </>
  );
};

export default MainPage;
