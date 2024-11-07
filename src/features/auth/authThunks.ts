import { createAsyncThunk } from "@reduxjs/toolkit";
import { LoginPayload, LoginResponse } from "./authTypes";
import { login } from "../../api/authApi";
import { saveTokenToLocalStorage } from "./authUtils";

export const loginUser = createAsyncThunk(
  "auth/login",
  async ({ email, password }: LoginPayload, { rejectWithValue }) => {
    try {
      const response: LoginResponse = await login(email, password);
      saveTokenToLocalStorage(response.token);
      return response;
    } catch {
      return rejectWithValue("Login failed");
    }
  }
);
