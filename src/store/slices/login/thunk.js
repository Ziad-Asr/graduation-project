import { createAsyncThunk } from "@reduxjs/toolkit";
import { useInsertData } from "../../../hooks/useInsertData";
import { toast } from "react-toastify";

export const login = createAsyncThunk(
  "/auth/login",
  async (data, { rejectWithValue }) => {
    try {
      const response = await useInsertData(`/auth/login`, data);

      if (!response || !response.data || !response.data.token) {
        throw new Error("Invalid response from server.");
      }

      const { message, token } = response.data;
      localStorage.setItem("userToken", token);

      toast.success(message);
      return response.data;
    } catch (error) {
      let errorMessage = "An error occurred while processing your request.";

      if (error.message.includes("Network Error")) {
        errorMessage = "No internet connection. Please check your connection.";
      } else if (error.response) {
        const { statusCode, messege } = error.response.data;
        if (statusCode === 400 && messege) {
          errorMessage = messege;
        }
      }

      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);
