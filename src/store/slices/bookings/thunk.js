import { createAsyncThunk } from "@reduxjs/toolkit";
import { useGetData } from "../../../hooks/useGetData";
import { toast } from "react-toastify";

export const fetchBookings = createAsyncThunk(
  "bookings/fetchBookings",
  async ({ courtId, date }, { rejectWithValue }) => {
    try {
      const response = await useGetData(`/Booking/${courtId}/${date}`);

      console.log("response");
      console.log(response);

      return response;
    } catch (error) {
      let errorMessage = "An error occurred while fetching bookings.";
      if (error.message?.includes("Network Error")) {
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
