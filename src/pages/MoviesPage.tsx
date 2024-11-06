import React, { useState } from "react";
import {
  Container,
  Grid,
  TextField,
  Typography,
  Box,
  Card,
  CardContent,
  CardMedia,
  Button,
} from "@mui/material";
import logo from "../assets/images/logo-nobc.png";

const MoviesPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  //Hardcoded movies data(replace with redux later)
  const movies = [
    {
      id: 1,
      title: "Inception",
      description: "A mind-bending thriller by Christopher Nolan.",
      posterUrl: "https://via.placeholder.com/300x450",
    },
    {
      id: 2,
      title: "Interstellar",
      description: "A journey beyond the stars and time.",
      posterUrl: "https://via.placeholder.com/300x450",
    },
    {
      id: 3,
      title: "The Dark Knight",
      description: "A gritty, action-packed Batman story.",
      posterUrl: "https://via.placeholder.com/300x450",
    },
    {
      id: 4,
      title: "The Matrix",
      description: "Reality is a simulation.",
      posterUrl: "https://via.placeholder.com/300x450",
    },
  ];

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  return (
    <Container>
      {/* Logo */}
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        mt={4}
        mb={4}
      >
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
          "Prepare for movie overload! You're about to enter a world where
          popcorn is a food group and reality is optional."
        </Typography>
      </Box>

      {/* Search Bar */}
      <TextField
        label="Search Movies"
        variant="outlined"
        fullWidth
        value={searchTerm}
        onChange={handleSearch}
        sx={{ marginBottom: 2 }}
      />

      {/* Movie Grid */}
      <Grid container spacing={4}>
        {movies
          .filter((movies) =>
            movies.title.toLowerCase().includes(searchTerm.toLowerCase())
          )
          .map((movie) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={movie.id}>
              <Card>
                <CardMedia
                  component="img"
                  height="300"
                  image={movie.posterUrl}
                  alt={movie.title}
                />
                <CardContent sx={{ height: 100, overflow: "hidden" }}>
                  <Typography variant="h6" noWrap>
                    {movie.title}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" noWrap>
                    {movie.description}
                  </Typography>
                </CardContent>

                <Box textAlign="center" mb={2}>
                  <Button variant="contained" color="primary" size="small">
                    View Details
                  </Button>
                </Box>
              </Card>
            </Grid>
          ))}
      </Grid>
    </Container>
  );
};

export default MoviesPage;
