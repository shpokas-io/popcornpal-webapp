import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import {
  fetchMoviesApi,
  addFavoriteApi,
  removeFavoriteApi,
  fetchFavoritesApi,
} from "./movieService";

const retrieveToken = (state: RootState): string => {
  const token = state.auth.token;
  if (!token) throw new Error("Authentication token is missing");
  return token;
};

export const fetchMovies = createAsyncThunk("movies/fetchMovies", async () => {
  try {
    return await fetchMoviesApi();
  } catch {
    throw new Error("Failed to fetch movies");
  }
});

export const addFavorite = createAsyncThunk<void, string>(
  "movies/addFavorite",
  async (movieId, { getState }) => {
    const token = retrieveToken(getState() as RootState);
    try {
      await addFavoriteApi(movieId, token);
    } catch {
      throw new Error("Failed to add favorite");
    }
  }
);

export const removeFavorite = createAsyncThunk<void, string>(
  "movies/removeFavorite",
  async (movieId, { getState }) => {
    const token = retrieveToken(getState() as RootState);
    try {
      await removeFavoriteApi(movieId, token);
    } catch {
      throw new Error("Failed to remove favorite");
    }
  }
);

export const fetchFavorites = createAsyncThunk(
  "movies/fetchFavorites",
  async (_, { getState }) => {
    const token = retrieveToken(getState() as RootState);
    try {
      return await fetchFavoritesApi(token);
    } catch {
      throw new Error("Failed to fetch favorites");
    }
  }
);
