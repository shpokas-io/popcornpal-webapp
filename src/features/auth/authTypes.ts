export interface AuthState {
  token: string | null;
  userName: string | null;
  preferredGenre: string | null;
  loading: boolean;
  error: string | null;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  userName: string;
  preferredGenre: string;
}