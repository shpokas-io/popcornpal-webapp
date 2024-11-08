import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { RootState } from "../../app/store";
import {
  fetchMovies,
  addFavorite,
  removeFavorite,
  fetchFavorites,
} from "../movies/movieThunks";
import { sortMovies } from "./movieUtils";
import { Movie, MovieState } from "./movieTypes";

const initialState: MovieState = {
  movies: [],
  favorites: [],
  loading: false,
  error: null,
  sortOption: "title",
  searchTerm: "",
  modal: {
    isOpen: false,
    movie: null,
  },
  currentPage: 1,
  moviesPerPage: 8,
  totalMovies: 0,
};

const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    setSortOption: (state, action: PayloadAction<string>) => {
      state.sortOption = action.payload;
    },
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    openModal: (state, action: PayloadAction<Movie>) => {
      state.modal.movie = action.payload;
      state.modal.isOpen = true;
    },
    closeModal: (state) => {
      state.modal.movie = null;
      state.modal.isOpen = false;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.totalMovies = action.payload.length;
        state.movies = sortMovies(action.payload, state.sortOption);
      })
      .addCase(addFavorite.fulfilled, (state, action) => {
        const movie = state.movies.find(
          (movie) => movie.id === action.meta.arg
        );
        if (movie && !state.favorites.some((fav) => fav.id === movie.id)) {
          state.favorites.push(movie);
        }
      })
      .addCase(removeFavorite.fulfilled, (state, action) => {
        state.favorites = state.favorites.filter(
          (fav) => fav.id !== action.meta.arg
        );
      })
      .addCase(fetchFavorites.fulfilled, (state, action) => {
        state.favorites = action.payload;
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch movies";
      });
  },
});

export const { setSortOption, setSearchTerm, setPage, openModal, closeModal } =
  movieSlice.actions;

export const selectMoviesState = (state: RootState) => state.movies;

// Memoized selector for filtering movies
export const selectFilteredMovies = createSelector(
  [selectMoviesState],
  ({ movies, searchTerm }) => {
    const filteredMovies = movies.filter((movie) =>
      movie.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return filteredMovies;
  }
);

// Memoized selector for sorting the filtered movies
export const selectSortedFilteredMovies = createSelector(
  [selectFilteredMovies, selectMoviesState],
  (filteredMovies, { sortOption }) => {
    return sortMovies(filteredMovies, sortOption);
  }
);

// Memoized selector for paginated and sorted movies
export const selectFilteredSortedMovies = createSelector(
  [selectSortedFilteredMovies, selectMoviesState],
  (sortedMovies, { currentPage, moviesPerPage }) => {
    const startIndex = (currentPage - 1) * moviesPerPage;
    return sortedMovies.slice(startIndex, startIndex + moviesPerPage);
  }
);

// Selector for the total count of filtered movies
export const selectFilteredMoviesCount = createSelector(
  [selectFilteredMovies],
  (filteredMovies) => filteredMovies.length
);

export const selectTopRatedMovies = createSelector(
  (state: RootState) => state.movies.movies,
  (movies) =>
    movies
      .slice()
      .sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0))
      .slice(0, 5)
);

export const selectModalState = createSelector(
  selectMoviesState,
  ({ modal }) => modal
);

export default movieSlice.reducer;
