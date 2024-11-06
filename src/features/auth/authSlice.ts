import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { login } from "../../api/authApi";

interface AuthState {
  token: string | null;
  userName: string | null;
  preferredGenre: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  token: localStorage.getItem("token"),
  userName: null,
  preferredGenre: null,
  loading: false,
  error: null,
};

//Async action for login
export const loginUser = createAsyncThunk(
  "auth/login",
  async (
    { email, password }: { email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await login(email, password);
      localStorage.setItem("token", response.access_token);
      return {
        token: response.access_token,
        userName: response.userName,
        preferredGenre: response.preferredGenre,
      };
    } catch {
      return rejectWithValue("Login failed");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.token = null;
      state.userName = null;
      state.preferredGenre = null;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        loginUser.fulfilled,
        (
          state,
          action: PayloadAction<{
            token: string;
            userName: string;
            preferredGenre: string;
          }>
        ) => {
          state.loading = false;
          state.token = action.payload.token;
          state.userName = action.payload.userName;
          state.preferredGenre = action.payload.preferredGenre;
        }
      )
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
