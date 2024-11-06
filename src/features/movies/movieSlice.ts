import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

interface Movie {
  id: number;
  title: string;
  description: string;
  poster_url: string;
}

interface MovieState {
  movies: Movie[];
  loading: boolean;
  error: string | null;
}

const initialState: MovieState = {
  movies: [],
  loading: false,
  error: null,
};

//Async thunk for fetching movies from the backend
export const fetchMovies = createAsyncThunk("movies/fetchMovies", async () => {
  const response = await axios.get("http://localhost:3000/movies");
  return Array.isArray(response.data.data) ? response.data.data : [];
});

const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.movies = action.payload;
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch movies";
      });
  },
});

export default movieSlice.reducer;
