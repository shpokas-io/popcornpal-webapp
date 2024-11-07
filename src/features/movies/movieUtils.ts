import { Movie } from "../movies/movieSlice";

export const sortMovies = (movies: Movie[], sortOption: string) => {
  return [...movies].sort((a, b) => {
    if (sortOption === "title") return a.title.localeCompare(b.title);
    if (sortOption === "release_date")
      return (
        (new Date(a.release_date || "").getTime() || 0) -
        (new Date(b.release_date || "").getTime() || 0)
      );
    if (sortOption === "rating") return (a.rating || 0) - (b.rating || 0);
    return 0;
  });
};
