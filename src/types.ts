export interface Movie {
  id: string | number;
  title: string;
  description: string;
  poster_url?: string;
  genre?: string;
  release_date?: string;
  rating?: number;
}
