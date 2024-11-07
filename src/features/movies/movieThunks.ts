import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import {
  fetchMoviesApi,
  addFavoriteApi,
  removeFavoriteApi,
  fetchFavoritesApi,
} from "./movieService";

const getToken = (state: RootState): string => {
  const token = state.auth.token;
  if (!token) {
    throw new Error("Authentication token is missing");
  }
  return token;
};

export const fetchMovies = createAsyncThunk("movies/fetchMovies", async () => {
  return await fetchMoviesApi();
});

export const addFavorite = createAsyncThunk<void, string>(
  "movies/addFavorite",
  async (movieId, { getState }) => {
    const state = getState() as RootState;
    const token = getToken(state);
    await addFavoriteApi(movieId, token);
  }
);

export const removeFavorite = createAsyncThunk<void, string>(
  "movies/removeFavorite",
  async (movieId, { getState }) => {
    const state = getState() as RootState;
    const token = getToken(state);
    await removeFavoriteApi(movieId, token);
  }
);

export const fetchFavorites = createAsyncThunk(
  "movies/fetchFavorites",
  async (_, { getState }) => {
    const state = getState() as RootState;
    const token = getToken(state);
    return await fetchFavoritesApi(token);
  }
);
