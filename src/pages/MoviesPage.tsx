import React, { useEffect } from "react";
import { Container, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../hooks/hooks";
import { RootState } from "../app/store";
import { fetchMovies } from "../features/movies/movieThunks";
import {
  selectModalState,
  selectFilteredSortedMovies,
  selectFilteredMoviesCount,
} from "../features/movies/movieSelectors"; // Corrected import
import { setPage } from "../features/movies/movieSlice";
import MovieModal from "../components/movies/MovieModal";
import SearchAndSortControls from "../components/movies/SearchAndSortControls";
import MovieGrid from "../components/movies/MovieGrid";
import PageHeader from "../components/ui/PageHeader";
import PaginationControls from "../components/pagination/PaginationControls";
import logo from "../assets/images/logo-nobc.png";

const MoviesPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const loading = useSelector((state: RootState) => state.movies.loading);
  const error = useSelector((state: RootState) => state.movies.error);
  const { isOpen, movie } = useSelector(selectModalState);
  const movies = useSelector(selectFilteredSortedMovies);
  const totalFilteredMovies = useSelector(selectFilteredMoviesCount);
  const { currentPage, moviesPerPage } = useSelector(
    (state: RootState) => state.movies
  );

  useEffect(() => {
    dispatch(fetchMovies());
  }, [dispatch]);

  const handlePageChange = (page: number) => {
    dispatch(setPage(page));
  };

  return (
    <Container>
      <PageHeader
        logoSrc={logo}
        heading="Prepare for movie overload! You're about to enter a world where popcorn is a food group and reality is optional."
      />
      <SearchAndSortControls />
      {loading && <Typography>Loading movies...</Typography>}
      {error && <Typography color="error">{error}</Typography>}
      <MovieGrid movies={movies} />
      <PaginationControls
        totalItems={totalFilteredMovies}
        itemsPerPage={moviesPerPage}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
      <MovieModal isOpen={isOpen} movie={movie} />
    </Container>
  );
};

export default MoviesPage;
