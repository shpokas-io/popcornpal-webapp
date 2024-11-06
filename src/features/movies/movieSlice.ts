import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface Movie {
  id: number;
  title: string;
  description: string;
  poster_url?: string;
  genre?: string;
  release_date?: string;
  rating?: number;
}

interface MovieState {
  movies: Movie[];
  loading: boolean;
  error: string | null;
  sortOption: string;
}

const initialState: MovieState = {
  movies: [],
  loading: false,
  error: null,
  sortOption: "title",
};

//Fetch movies from the backend
export const fetchMovies = createAsyncThunk("movies/fetchMovies", async () => {
  const response = await axios.get("http://localhost:3000/movies");
  return Array.isArray(response.data.data) ? response.data.data : [];
});

// Function to handle sorting
const sortMovies = (movies: Movie[], sortOption: string) => {
  return [...movies].sort((a, b) => {
    if (sortOption === "title") {
      return a.title.localeCompare(b.title);
    } else if (sortOption === "release_date") {
      return (
        (new Date(a.release_date || "").getTime() || 0) -
        (new Date(b.release_date || "").getTime() || 0)
      );
    } else if (sortOption === "rating") {
      return (a.rating || 0) - (b.rating || 0);
    }
    return 0;
  });
};

const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    setSortOption: (state, action: PayloadAction<string>) => {
      state.sortOption = action.payload;
      state.movies = sortMovies(state.movies, state.sortOption);
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
        state.movies = sortMovies(action.payload, state.sortOption);
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch movies";
      });
  },
});

export const { setSortOption } = movieSlice.actions;
export default movieSlice.reducer;
