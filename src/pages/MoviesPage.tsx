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
      <Typography variant="h4" gutterBottom>
        Movies
      </Typography>

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
                <CardContent>
                  <Typography variant="h6">{movie.title}</Typography>
                  <Typography variant="body2" color="textSecondary">
                    {movie.description}
                  </Typography>
                  <Box mt={2}>
                    <Button variant="contained" color="primary" size="small">
                      View Details
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
      </Grid>
    </Container>
  );
};

export default MoviesPage;
