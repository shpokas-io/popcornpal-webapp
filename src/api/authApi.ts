import axios from "axios";

const API_URL = import.meta.env.VITE_APP_API_URL;

export const login = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, {
      email,
      password,
    });
    console.log("Login API response:", response.data); // log response
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Login API error:", error.response?.data || error.message);
      throw error;
    } else {
      console.error("Login API error:", error);
      throw new Error("An unknown error occurred during login");
    }
  }
};
