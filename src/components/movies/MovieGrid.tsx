import React from "react";
import { Grid } from "@mui/material";
import { useSelector } from "react-redux";
import { selectFilteredSortedMovies } from "../../features/movies/movieSlice";
import MovieCard from "./MovieCard";

const MovieGrid: React.FC = () => {
  const movies = useSelector(selectFilteredSortedMovies);

  return (
    <Grid container spacing={4}>
      {movies.map((movie) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={movie.id}>
          <MovieCard movie={movie} />
        </Grid>
      ))}
    </Grid>
  );
};

export default MovieGrid;
