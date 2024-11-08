import { createSelector } from "reselect";
import { RootState } from "../../app/store";
import { sortMovies, SortOption } from "./movieUtils";

export const selectMoviesState = (state: RootState) => state.movies;

export const selectFilteredMovies = createSelector(
  [selectMoviesState],
  ({ movies, searchTerm }) =>
    movies.filter((movie) =>
      movie.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
);

export const selectSortedFilteredMovies = createSelector(
  [selectFilteredMovies, selectMoviesState],
  (filteredMovies, { sortOption }) =>
    sortMovies(filteredMovies, sortOption as SortOption)
);

export const selectFilteredSortedMovies = createSelector(
  [selectSortedFilteredMovies, selectMoviesState],
  (sortedMovies, { currentPage, moviesPerPage }) => {
    const startIndex = (currentPage - 1) * moviesPerPage;
    return sortedMovies.slice(startIndex, startIndex + moviesPerPage);
  }
);

export const selectFilteredMoviesCount = createSelector(
  [selectFilteredMovies],
  (filteredMovies) => filteredMovies.length
);

export const selectTopRatedMovies = createSelector(
  [selectMoviesState],
  ({ movies }) =>
    [...movies].sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0)).slice(0, 5)
);

export const selectModalState = createSelector(
  selectMoviesState,
  ({ modal }) => modal
);
