import React, { useEffect } from "react";
import { Container, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../app/store";
import { setPage } from "../features/movies/movieSlice";
import { fetchFavorites } from "../features/movies/movieThunks";
import MovieGrid from "../components/movies/MovieGrid";
import PaginationControls from "../components/pagination/PaginationControls";
import PageHeader from "../components/ui/PageHeader";
import logo from "../assets/images/logo-nobc.png";

const FavoritesPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { favorites, loading, error, currentPage, moviesPerPage } = useSelector(
    (state: RootState) => state.movies
  );

  useEffect(() => {
    dispatch(fetchFavorites());
  }, [dispatch]);

  const totalFavorites = favorites.length;
  const paginatedFavorites = favorites.slice(
    (currentPage - 1) * moviesPerPage,
    currentPage * moviesPerPage
  );

  return (
    <Container>
      <PageHeader
        logoSrc={logo}
        heading="Your favorite flicks in one place – because life’s too short for bad movies!"
      />

      {loading && <Typography>Loading favorites...</Typography>}
      {error && <Typography color="error">{error}</Typography>}

      <MovieGrid movies={paginatedFavorites} isFavorite />

      <PaginationControls
        totalItems={totalFavorites}
        itemsPerPage={moviesPerPage}
        currentPage={currentPage}
        onPageChange={(value) => dispatch(setPage(value))}
      />
    </Container>
  );
};

export default FavoritesPage;
