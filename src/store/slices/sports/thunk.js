import { createAsyncThunk } from "@reduxjs/toolkit";
import { useGetData } from "../../../hooks/useGetData";
import { toast } from "react-toastify";
import baseURL from "../../../Api/baseURL";

export const fetchSports = createAsyncThunk(
  "sports/fetchSports",
  async (_, { rejectWithValue }) => {
    try {
      const response = await useGetData(`/Sport/getAll`);
      return response;
    } catch (error) {
      let errorMessage = "An error occurred while fetching sports.";
      if (error.messege.includes("Network Error")) {
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

export const addSport = createAsyncThunk(
  "sports/addSport",
  async (sportName, { rejectWithValue }) => {
    try {
      const response = await baseURL.post(`/Sport/add?SportName=${sportName}`);
      return response.data;
    } catch (error) {
      let errorMessage = "Failed to add sport.";
      if (error?.response?.data?.messege) {
        errorMessage = error.response.data.messege;
      }
      return rejectWithValue(errorMessage);
    }
  }
);

export const updateSport = createAsyncThunk(
  "sports/updateSport",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await baseURL.put("/Sport/Update", formData);
      return response.data;
    } catch (error) {
      let errorMessage = "Failed to update sport.";
      if (error?.response?.data?.messege) {
        errorMessage = error.response.data.messege;
      }
      return rejectWithValue(errorMessage);
    }
  }
);
