import { createAsyncThunk } from "@reduxjs/toolkit";
import { useInsertData } from "../../../hooks/useInsertData";
import { toast } from "react-toastify";

export const login = createAsyncThunk(
  "/auth/login",
  async (data, { rejectWithValue }) => {
    try {
      const response = await useInsertData(`/users/login`, data);
      if (!response || !response.data) {
        throw new Error("Invalid response from server.");
      }
      localStorage.setItem("userInfo", JSON.stringify(response.data));
      return response.data;
    } catch (error) {
      let errorMessage = "An error occurred while processing your request.";
      if (error.message.includes("Network Error")) {
        errorMessage = "No internet connection. Please check your connection.";
      } else if (error.response && error.response.data?.message) {
        errorMessage = error.response.data.message;
      }
      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);
