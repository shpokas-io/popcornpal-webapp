import React from "react";
import { Container, Grid, Typography, Box, Pagination } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/store";
import {
  setPage,
  selectFilteredSortedMovies,
  selectFilteredMoviesCount,
  selectModalState,
} from "../features/movies/movieSlice";
import { useFetchMovies } from "../hooks/hooks";
import MovieCard from "../components/movies/MovieCard";
import MovieModal from "../components/movies/MovieModal";
import SearchAndSortControls from "../components/movies/SearchAndSortControls";
import logo from "../assets/images/logo-nobc.png";

const MoviesPage: React.FC = () => {
  useFetchMovies();
  const dispatch = useDispatch();

  const { loading, error, currentPage, moviesPerPage } = useSelector(
    (state: RootState) => state.movies
  );
  const movies = useSelector(selectFilteredSortedMovies);
  const totalFilteredMovies = useSelector(selectFilteredMoviesCount);
  const { isOpen, movie: selectedMovie } = useSelector(selectModalState);

  return (
    <Container>
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

      <SearchAndSortControls />

      {loading && <Typography>Loading movies...</Typography>}
      {error && <Typography color="error">{error}</Typography>}

      <Grid container spacing={4}>
        {movies.map((movie) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={movie.id}>
            <MovieCard movie={movie} />
          </Grid>
        ))}
      </Grid>

      <Box display="flex" justifyContent="center" mt={4}>
        <Pagination
          count={Math.ceil(totalFilteredMovies / moviesPerPage)}
          page={currentPage}
          onChange={(_, value) => dispatch(setPage(value))}
          color="primary"
        />
      </Box>

      <MovieModal isOpen={isOpen} movie={selectedMovie} />
    </Container>
  );
};

export default MoviesPage;
