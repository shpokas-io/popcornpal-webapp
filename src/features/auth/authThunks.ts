import { createAsyncThunk } from "@reduxjs/toolkit";
import { LoginPayload, LoginResponse, ApiLoginResponse } from "./authTypes";
import { login } from "./authApi";
import { saveTokenToLocalStorage } from "./authUtils";

export const loginUser = createAsyncThunk(
  "auth/login",
  async ({ email, password }: LoginPayload, { rejectWithValue }) => {
    try {
      const response: ApiLoginResponse = await login(email, password);
      saveTokenToLocalStorage(response.access_token);

      const loginResponse: LoginResponse = {
        token: response.access_token,
        userName: null,
        preferredGenre: null,
      };
      return loginResponse;
    } catch {
      return rejectWithValue("Login failed");
    }
  }
);
