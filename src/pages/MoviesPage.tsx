import React, { useEffect } from "react";
import { Container, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../hooks/hooks";
import { RootState } from "../app/store";
import { fetchMovies } from "../features/movies/movieThunks";
import { selectModalState } from "../features/movies/movieSlice";
import MovieModal from "../components/movies/MovieModal";
import SearchAndSortControls from "../components/movies/SearchAndSortControls";
import MovieGrid from "../components/movies/MovieGrid";
import MoviesHeader from "../components/movies/MoviesHeader";
import MoviesPagination from "../components/movies/MoviesPagination";

const MoviesPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { loading, error } = useSelector((state: RootState) => ({
    loading: state.movies.loading,
    error: state.movies.error,
  }));

  const { isOpen, movie: selectedMovie } = useSelector(selectModalState);

  useEffect(() => {
    dispatch(fetchMovies());
  }, [dispatch]);

  return (
    <Container>
      <MoviesHeader />
      <SearchAndSortControls />
      {loading && <Typography>Loading movies...</Typography>}
      {error && <Typography color="error">{error}</Typography>}
      <MovieGrid />
      <MoviesPagination />
      <MovieModal isOpen={isOpen} movie={selectedMovie} />
    </Container>
  );
};

export default MoviesPage;
