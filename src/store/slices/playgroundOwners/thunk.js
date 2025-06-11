import { createAsyncThunk } from "@reduxjs/toolkit";
import { useGetData } from "../../../hooks/useGetData";
import { toast } from "react-toastify";
import { useInsertData } from "../../../hooks/useInsertData";

export const fetchPlaygroundOwners = createAsyncThunk(
  "/admin/owners",
  async (_, { rejectWithValue }) => {
    try {
      const response = await useGetData(`/AdminAuth/owners`);

      if (!response) {
        throw new Error("Invalid response from server.");
      }

      return response?.data;
    } catch (error) {
      let errorMessage = "An error occurred while fetching owners.";

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

export const approveOwner = createAsyncThunk(
  "playgroundOwners/approveOwner",
  async (ownerId) => {
    try {
      const response = await useInsertData(`/AdminAuth/approve/${ownerId}`, {});

      if (!response?.success) {
        throw new Error(response?.message || "Failed to approve owner.");
      }

      toast.success(response.message || "Owner approved successfully");
      return response.data;
    } catch (error) {
      let errorMessage = "An error occurred while approving the owner.";

      if (error.message.includes("Network Error")) {
        errorMessage = "No internet connection. Please check your connection.";
      } else if (error.response) {
        const { statusCode, message } = error.response;
        if (statusCode === 400 && message) {
          errorMessage = message;
        }
      }

      toast.error(errorMessage);
      // return rejectWithValue(errorMessage);
    }
  }
);
