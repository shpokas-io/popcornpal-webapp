import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthState, LoginResponse } from "./authTypes";
import { loginUser } from "./authThunks";
import {
  getTokenFromLocalStorage,
  removeTokenFromLocalStorage,
} from "./authUtils";
import { setTokenToLocalStorage } from "./authUtils";

const initialState: AuthState = {
  token: getTokenFromLocalStorage(),
  userName: null,
  preferredGenre: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.token = null;
      state.userName = null;
      state.preferredGenre = null;
      removeTokenFromLocalStorage();
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
        (state, action: PayloadAction<LoginResponse>) => {
          state.loading = false;
          state.token = action.payload.token;
          state.userName = action.payload.userName;
          state.preferredGenre = action.payload.preferredGenre;
          setTokenToLocalStorage(action.payload.token);
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
