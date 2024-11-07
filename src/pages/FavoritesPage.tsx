import React, { useEffect } from "react";
import { Container, Grid, Typography, Box, Pagination } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../app/store";
import { setPage } from "../features/movies/movieSlice";
import { fetchFavorites } from "../features/movies/movieThunks";
import MovieCard from "../components/movies/MovieCard";
import logo from "../assets/images/logo-nobc.png";

const FavoritesPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { favorites, loading, error, currentPage, moviesPerPage } = useSelector(
    (state: RootState) => state.movies
  );

  useEffect(() => {
    dispatch(fetchFavorites());
  }, [dispatch]);

  //Pagination logic for favorites
  const totalFavorites = favorites.length;
  const paginatedFavorites = favorites.slice(
    (currentPage - 1) * moviesPerPage,
    currentPage * moviesPerPage
  );

  return (
    <Container>
      {/* Logo and Page Heading */}
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
          "Your favorite flicks in one place – because life’s too short for bad
          movies!"
        </Typography>
      </Box>

      {/* Loading and Error Messages */}
      {loading && <Typography>Loading favorites...</Typography>}
      {error && <Typography color="error">{error}</Typography>}

      {/* Favorite Movies Grid */}
      <Grid container spacing={4}>
        {paginatedFavorites.map((movie) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={movie.id}>
            <MovieCard movie={movie} isFavorite={true} />
          </Grid>
        ))}
      </Grid>

      {/* Pagination Controls */}
      <Box display="flex" justifyContent="center" mt={4}>
        <Pagination
          count={Math.ceil(totalFavorites / moviesPerPage)}
          page={currentPage}
          onChange={(_, value) => dispatch(setPage(value))}
          color="primary"
        />
      </Box>
    </Container>
  );
};

export default FavoritesPage;
