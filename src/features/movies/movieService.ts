import axios from "axios";

export const fetchMoviesApi = async () => {
  const response = await axios.get("http://localhost:3000/movies");
  return response.data.data || [];
};

export const addFavoriteApi = async (movieId: string, token: string) => {
  return await axios.post(
    `http://localhost:3000/movies/${movieId}/favorite`,
    null,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
};

export const removeFavoriteApi = async (movieId: string, token: string) => {
  return await axios.delete(
    `http://localhost:3000/movies/${movieId}/favorite`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
};

export const fetchFavoritesApi = async (token: string) => {
  const response = await axios.get("http://localhost:3000/movies/favorites", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data.data;
};
