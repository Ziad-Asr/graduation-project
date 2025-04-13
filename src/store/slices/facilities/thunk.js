import { createAsyncThunk } from "@reduxjs/toolkit";
import { useGetData } from "../../../hooks/useGetData";
import { toast } from "react-toastify";

export const fetchFacilities = createAsyncThunk(
  "facilities/fetchFacilities",
  async (_, { rejectWithValue }) => {
    try {
      const response = await useGetData(`/Facilities/GetAll`);
      return response; // Assuming the response is already in the desired format
    } catch (error) {
      let errorMessage = "An error occurred while fetching facilities.";
      if (error.message.includes("Network Error")) {
        errorMessage = "No internet connection. Please check your connection.";
      } else if (error.response) {
        const { statusCode, message } = error.response.data;
        if (statusCode === 400 && message) {
          errorMessage = message;
        }
      }
      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);
