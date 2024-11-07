export interface Movie {
  id: string;
  title: string;
  description: string;
  poster_url?: string;
  genre?: string;
  release_date?: string;
  rating?: number;
}

export interface MovieState {
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
