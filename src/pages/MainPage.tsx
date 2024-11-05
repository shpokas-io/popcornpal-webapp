import { Typography, Box } from "@mui/material";

const MainPage: React.FC = () => {
  return (
    <Box display="flex" flexDirection="column" alignItems="center" mt={4}>
      <Typography variant="h4">Wlcome to the main Page!</Typography>
      <Typography>Authenticated Content Here</Typography>
    </Box>
  );
};

export default MainPage;
