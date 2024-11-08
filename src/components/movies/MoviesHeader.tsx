import React from "react";
import { Box, Typography } from "@mui/material";
import logo from "../../assets/images/logo-nobc.png";

const MoviesHeader: React.FC = () => (
  <Box display="flex" flexDirection="column" alignItems="center" mt={4} mb={4}>
    <img
      src={logo}
      alt="PopcornPal Logo"
      style={{ width: "150px", marginBottom: "20px" }}
    />
    <Typography
      variant="h6"
      color="textSecondary"
      textAlign="center"
      gutterBottom
    >
      "Prepare for movie overload! You're about to enter a world where popcorn
      is a food group and reality is optional."
    </Typography>
  </Box>
);

export default MoviesHeader;
