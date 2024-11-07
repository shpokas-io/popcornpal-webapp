import { createAsyncThunk } from "@reduxjs/toolkit";
import { LoginPayload, LoginResponse, ApiLoginResponse } from "./authTypes";
import { login } from "../../api/authApi";
import { saveTokenToLocalStorage } from "./authUtils";

export const loginUser = createAsyncThunk(
  "auth/login",
  async ({ email, password }: LoginPayload, { rejectWithValue }) => {
    try {
      const response: ApiLoginResponse = await login(email, password);
      saveTokenToLocalStorage(response.access_token);

      console.log("Login successful, response:", response);

      const loginResponse: LoginResponse = {
        token: response.access_token,
        userName: null,
        preferredGenre: null,
      };
      console.log("Login successful, response:", loginResponse);
      return loginResponse;
    } catch (error) {
      console.error("Login error in thunk:", error);
      return rejectWithValue("Login failed");
    }
  }
);
