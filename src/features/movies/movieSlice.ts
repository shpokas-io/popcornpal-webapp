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
  selectedMovie: null,
  isModalOpen: false,
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
      state.selectedMovie = action.payload;
      state.isModalOpen = true;
    },
    closeModal: (state) => {
      state.selectedMovie = null;
      state.isModalOpen = false;
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

export const selectFilteredSortedMovies = createSelector(
  selectMoviesState,
  ({ movies, searchTerm, sortOption, currentPage, moviesPerPage }) => {
    const filteredMovies = movies.filter((movie) =>
      movie.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const sortedMovies = sortMovies(filteredMovies, sortOption);
    const startIndex = (currentPage - 1) * moviesPerPage;
    return sortedMovies.slice(startIndex, startIndex + moviesPerPage);
  }
);

export const selectFilteredMoviesCount = createSelector(
  selectMoviesState,
  ({ movies, searchTerm }) => {
    return movies.filter((movie) =>
      movie.title.toLowerCase().includes(searchTerm.toLowerCase())
    ).length;
  }
);

export const selectModalState = createSelector(
  selectMoviesState,
  ({ isModalOpen, selectedMovie }) => ({
    isOpen: isModalOpen,
    movie: selectedMovie,
  })
);

export default movieSlice.reducer;
