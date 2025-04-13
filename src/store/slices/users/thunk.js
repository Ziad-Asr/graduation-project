import { createAsyncThunk } from "@reduxjs/toolkit";
import { useGetData } from "../../../hooks/useGetData";
import { toast } from "react-toastify";

export const fetchUsers = createAsyncThunk(
  "/admin/users",
  async (_, { rejectWithValue }) => {
    try {
      const response = await useGetData(`/AdminAuth/users`);

      if (!response || !response) {
        throw new Error("Invalid response from server.");
      }

      return response;
    } catch (error) {
      let errorMessage = "An error occurred while fetching users.";

      if (error.message.includes("Network Error")) {
        errorMessage = "No internet connection. Please check your connection.";
      } else if (error.response) {
        const { statusCode, messege } = error.response;
        if (statusCode === 400 && messege) {
          errorMessage = messege;
        }
      }

      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);
