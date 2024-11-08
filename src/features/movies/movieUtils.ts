import { Movie } from "../movies/movieTypes";

type SortOption = "title" | "release_date" | "rating";

export const sortMovies = (movies: Movie[], sortOption: SortOption) => {
  const sortingStrategies: Record<SortOption, (a: Movie, b: Movie) => number> =
    {
      title: (a, b) => a.title.localeCompare(b.title),
      release_date: (a, b) =>
        (new Date(a.release_date || "").getTime() || 0) -
        (new Date(b.release_date || "").getTime() || 0),
      rating: (a, b) => (a.rating || 0) - (b.rating || 0),
    };

  const sortFunction = sortingStrategies[sortOption];
  return [...movies].sort(sortFunction);
};
