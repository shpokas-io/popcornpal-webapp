import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

export const fetchMoviesApi = async () => {
  const response = await axios.get(`${API_URL}/movies`);
  return response.data.data || [];
};

export const addFavoriteApi = async (movieId: string, token: string) => {
  return await axios.post(`${API_URL}/movies/${movieId}/favorite`, null, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const removeFavoriteApi = async (movieId: string, token: string) => {
  return await axios.delete(`${API_URL}/movies/${movieId}/favorite`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const fetchFavoritesApi = async (token: string) => {
  const response = await axios.get(`${API_URL}/movies/favorites`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data.data;
};
