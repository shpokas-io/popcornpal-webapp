import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import {
  fetchMovies,
  addFavorite,
  removeFavorite,
  fetchFavorites,
} from "../movies/movieThunks";
import { sortMovies } from "./movieUtils";

export interface Movie {
  id: string;
  title: string;
  description: string;
  poster_url?: string;
  genre?: string;
  release_date?: string;
  rating?: number;
}

interface MovieState {
  movies: Movie[];
  favorites: Movie[];
  loading: boolean;
  error: string | null;
  sortOption: string;
  searchTerm: string;
  selectedMovie: Movie | null;
  isModalOpen: boolean;
  currentPage: number;
  moviesPerPage: number;
  totalMovies: number;
}

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

//Selectors
export const selectFilteredSortedMovies = (state: RootState) => {
  const { movies, searchTerm, sortOption, currentPage, moviesPerPage } =
    state.movies;
  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const sortedMovies = sortMovies(filteredMovies, sortOption);
  const startIndex = (currentPage - 1) * moviesPerPage;
  return sortedMovies.slice(startIndex, startIndex + moviesPerPage);
};

export const selectFilteredMoviesCount = (state: RootState) => {
  const { movies, searchTerm } = state.movies;
  return movies.filter((movie) =>
    movie.title.toLowerCase().includes(searchTerm.toLowerCase())
  ).length;
};

export const selectModalState = (state: RootState) => ({
  isOpen: state.movies.isModalOpen,
  movie: state.movies.selectedMovie,
});

export default movieSlice.reducer;
