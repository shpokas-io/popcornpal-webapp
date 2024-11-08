import React from "react";
import { Grid } from "@mui/material";
import MovieCard from "./MovieCard";
import { Movie } from "../../features/movies/movieTypes";

interface MovieGridProps {
  movies: Movie[];
  isFavorite?: boolean;
  disableSnackbar?: boolean;
}

const MovieGrid: React.FC<MovieGridProps> = ({
  movies,
  isFavorite = false,
  disableSnackbar = false,
}) => (
  <Grid container spacing={4}>
    {movies.map((movie) => (
      <Grid item xs={12} sm={6} md={4} lg={3} key={movie.id}>
        <MovieCard
          movie={movie}
          isFavorite={isFavorite}
          disableSnackbar={disableSnackbar}
        />
      </Grid>
    ))}
  </Grid>
);

export default MovieGrid;
