import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

import axios from "axios";

export const fetchBookings = createAsyncThunk(
  "bookings/fetchBookings",
  async ({ courtId, date }, { rejectWithValue }) => {
    try {
      // const response = await useGetData(`/Booking/${courtId}/${date}`);

      const response = await axios.get(
        `http://localhost:5000/api/Booking/${courtId}/${date}`
      );

      return response?.data;
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
