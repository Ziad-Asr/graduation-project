// src/store/slices/courts/thunk.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import baseURL from "../../../Api/baseURL";

export const fetchCourts = createAsyncThunk(
  "courts/fetchCourts",
  async (_, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };
      const response = await baseURL.get("/Court/getAll", config);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch courts"
      );
    }
  }
);
