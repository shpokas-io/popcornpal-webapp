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
  modal: {
    isOpen: boolean;
    movie: Movie | null;
  };
  currentPage: number;
  moviesPerPage: number;
  totalMovies: number;
}
